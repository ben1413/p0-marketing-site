/**
 * Client-side reads via Conclave BFF (`/api/conclave/gaming/*` → `/api/v1/gaming/*`).
 * Forwards `Authorization`, cookies, and dev-bypass headers; never embeds server secrets.
 */

import type { ConclaveDecisionOutcome, Decision, EvaluationRecord, TrailEvent } from "./conclaveTypes";
import {
  buildSimulationSubmitPayload,
  type DemoSimulationSurveyParams,
} from "./generateSimulationResult";
import { mapCoreProposalList } from "./mapFromCore";
import { describeConclaveLiveAuthFailure } from "./plainLanguage";
import { getConclaveAuthHeadersForFetch } from "./conclaveAuthBridge";

/** Browser must call this prefix only — see `projectbuild-app/app/api/conclave/gaming/[...path]/route.ts` on Build. */
export const CONCLAVE_GAMING_BFF_BASE = "/api/conclave/gaming";

async function conclaveJsonHeaders(): Promise<Record<string, string>> {
  const auth = await getConclaveAuthHeadersForFetch();
  return { ...auth, "Content-Type": "application/json" };
}

async function conclaveGetHeaders(): Promise<Record<string, string>> {
  return getConclaveAuthHeadersForFetch();
}

function conclaveGamingUrl(pathWithQuery: string): string {
  const p = pathWithQuery.startsWith("/") ? pathWithQuery.slice(1) : pathWithQuery;
  return `${CONCLAVE_GAMING_BFF_BASE}/${p}`;
}

function httpErrorMessage(res: Response, data: { error?: string }): string {
  if (res.status === 401) return describeConclaveLiveAuthFailure();
  return data.error ?? res.statusText ?? `HTTP ${res.status}`;
}

export type { DemoSimulationSurveyParams };

/**
 * POST /gaming/simulations (BFF) — creates report and attaches to proposal in one step on Core.
 */
export async function runSimulationHarnessForProposal(input: {
  proposalId: string;
  gameId: string;
  type: string;
  proposedActions?: Record<string, unknown>;
  survey?: DemoSimulationSurveyParams;
}): Promise<{ ok: boolean; message?: string; reportId?: string }> {
  try {
    const body = buildSimulationSubmitPayload(
      {
        proposalId: input.proposalId,
        gameId: input.gameId,
        type: input.type,
        proposedActions: input.proposedActions,
      },
      input.survey
    );
    const res = await fetch(conclaveGamingUrl("simulations"), {
      method: "POST",
      credentials: "include",
      headers: await conclaveJsonHeaders(),
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      report?: { id?: string };
      error?: string;
    };
    if (!res.ok) {
      return { ok: false, message: httpErrorMessage(res, data) };
    }
    if (!data.ok || !data.report?.id) {
      return {
        ok: false,
        message: data.error ?? "Unexpected response from simulation API.",
      };
    }
    return { ok: true, reportId: data.report.id };
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : "Network error" };
  }
}

/** POST /gaming/execution/deploy via BFF (admin role in production). */
export async function deployDecisionViaConclave(input: {
  gameId: string;
  decisionProposalId: string;
  summary: string;
  branch?: string;
}): Promise<{ ok: boolean; message?: string; deploymentId?: string }> {
  try {
    const res = await fetch(conclaveGamingUrl("execution/deploy"), {
      method: "POST",
      credentials: "include",
      headers: await conclaveJsonHeaders(),
      body: JSON.stringify({
        gameId: input.gameId,
        branch: input.branch ?? "conclave",
        summary: input.summary,
        decisionProposalId: input.decisionProposalId,
        authorityMode: "human_led",
      }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
      deploymentId?: string;
      code?: string;
    };
    if (!res.ok) {
      return { ok: false, message: httpErrorMessage(res, data) };
    }
    if (!data.ok) {
      return { ok: false, message: data.error ?? "Deploy did not complete." };
    }
    return { ok: true, deploymentId: data.deploymentId };
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : "Network error" };
  }
}

type GamingOutcomeRow = {
  deploymentId: string;
  status: string;
  predicted?: {
    returnRateEstimate?: number;
    revenueRiskBounded?: boolean;
  };
  actual?: {
    returnRate?: number;
    revenueImpact?: number;
    reportRateDelta?: number;
  };
  delta?: {
    returnRateError?: number;
    revenueError?: number;
  };
  evaluatedAt?: number;
};

function mapGamingOutcomeToView(o: GamingOutcomeRow): ConclaveDecisionOutcome {
  const predParts: string[] = [];
  if (o.predicted?.returnRateEstimate != null) {
    predParts.push(`return estimate ~${(o.predicted.returnRateEstimate * 100).toFixed(1)}%`);
  }
  if (o.predicted?.revenueRiskBounded) {
    predParts.push("revenue treated as bounded-risk");
  }
  const predictedSummary =
    predParts.length > 0 ? `Predicted: ${predParts.join("; ")}.` : "Predicted slice on file.";

  let actualSummary: string | undefined;
  let deltaSummary: string | undefined;
  if (o.status === "evaluated") {
    const a = o.actual ?? {};
    const actParts: string[] = [];
    if (a.returnRate != null) actParts.push(`return ~${(a.returnRate * 100).toFixed(1)}%`);
    if (a.revenueImpact != null) actParts.push(`revenue impact ${a.revenueImpact}`);
    if (a.reportRateDelta != null) actParts.push(`report rate delta ${a.reportRateDelta}`);
    actualSummary = actParts.length > 0 ? `Actual: ${actParts.join("; ")}.` : "Actuals recorded.";

    const d = o.delta ?? {};
    const delParts: string[] = [];
    if (d.returnRateError != null) {
      delParts.push(`return error ${(d.returnRateError * 100).toFixed(2)} pp`);
    }
    if (d.revenueError != null) delParts.push(`revenue error ${d.revenueError}`);
    deltaSummary = delParts.length > 0 ? `Delta vs prediction: ${delParts.join("; ")}.` : undefined;
  }

  return {
    deploymentId: o.deploymentId,
    status: o.status === "evaluated" ? "evaluated" : "pending",
    predictedSummary,
    actualSummary,
    deltaSummary,
  };
}

async function fetchOutcomeRowForProposal(proposalId: string): Promise<GamingOutcomeRow | null> {
  const sp = new URLSearchParams();
  sp.set("decisionProposalId", proposalId);
  const res = await fetch(conclaveGamingUrl(`outcomes?${sp.toString()}`), {
    credentials: "include",
    headers: await conclaveGetHeaders(),
  });
  if (res.status === 404) return null;
  if (!res.ok) return null;
  const data = (await res.json()) as { ok?: boolean; outcome?: GamingOutcomeRow };
  if (!data.ok || !data.outcome || typeof data.outcome !== "object") return null;
  return data.outcome;
}

function mergeOutcomeIntoDecision(
  d: Decision,
  outcome: ConclaveDecisionOutcome,
  evaluatedAtMs?: number
): Decision {
  const trail: TrailEvent[] = [...d.trail];
  const hasOutcome = trail.some((t) => t.type === "outcome_recorded");
  if (outcome.status === "evaluated" && !hasOutcome) {
    const ts = evaluatedAtMs ? new Date(evaluatedAtMs).toISOString() : d.updatedAt;
    const desc = [outcome.predictedSummary, outcome.actualSummary, outcome.deltaSummary]
      .filter(Boolean)
      .join(" ");
    trail.push({
      id: `${d.id}-outcome`,
      type: "outcome_recorded",
      actor: "outcomes",
      description: desc || "Outcome evaluated vs prediction.",
      timestamp: ts,
    });
  }
  return {
    ...d,
    deploymentId: d.deploymentId ?? outcome.deploymentId,
    outcome,
    trail,
  };
}

const OUTCOME_FETCH_CHUNK = 6;

/** Best-effort: one GET outcome per proposal (404 = no row). */
export async function attachOutcomesToDecisions(decisions: Decision[]): Promise<Decision[]> {
  const result: Decision[] = [];
  for (let i = 0; i < decisions.length; i += OUTCOME_FETCH_CHUNK) {
    const slice = decisions.slice(i, i + OUTCOME_FETCH_CHUNK);
    const merged = await Promise.all(
      slice.map(async (d) => {
        const row = await fetchOutcomeRowForProposal(d.id);
        if (!row) return d;
        const view = mapGamingOutcomeToView(row);
        return mergeOutcomeIntoDecision(d, view, row.evaluatedAt);
      })
    );
    result.push(...merged);
  }
  return result;
}

export type GovernanceMetricsSnapshot = {
  total_entries: number;
  elevated_risk_count: number;
  escalation_required_count: number;
  escalation_violation_count: number;
  block_count: number;
  enforcement_rate: number;
};

export async function fetchConclaveDecisions(gameId?: string | null): Promise<{
  ok: boolean;
  decisions: Decision[];
  message?: string;
}> {
  try {
    const sp = new URLSearchParams();
    sp.set("limit", "50");
    const trimmed = gameId?.trim();
    if (trimmed) sp.set("gameId", trimmed);
    const res = await fetch(conclaveGamingUrl(`decisions?${sp.toString()}`), {
      credentials: "include",
      headers: await conclaveGetHeaders(),
    });
    const data = (await res.json()) as { ok?: boolean; items?: unknown[]; error?: string };
    if (!res.ok) {
      return {
        ok: false,
        decisions: [],
        message: httpErrorMessage(res, data),
      };
    }
    if (!data.ok || !Array.isArray(data.items)) {
      return { ok: false, decisions: [], message: "Unexpected response from gaming decisions API." };
    }
    return { ok: true, decisions: mapCoreProposalList(data.items) };
  } catch (e) {
    return {
      ok: false,
      decisions: [],
      message: e instanceof Error ? e.message : "Network error",
    };
  }
}

export async function fetchGovernanceMetrics(opts?: {
  gameId?: string | null;
}): Promise<{ ok: boolean; metrics?: GovernanceMetricsSnapshot; message?: string }> {
  try {
    const sp = new URLSearchParams();
    sp.set("aggregate", "true");
    const trimmed = opts?.gameId?.trim();
    if (trimmed) sp.set("gameId", trimmed);
    const res = await fetch(conclaveGamingUrl(`governance?${sp.toString()}`), {
      credentials: "include",
      headers: await conclaveGetHeaders(),
    });
    const data = (await res.json()) as { metrics?: GovernanceMetricsSnapshot; error?: string };
    if (!res.ok) {
      return { ok: false, message: httpErrorMessage(res, data) };
    }
    return { ok: true, metrics: data.metrics };
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : "Network error" };
  }
}

/** Audit rows from live proposals; outcome chip uses merged outcome when Core returned a row. */
export function stubEvaluationsFromDecisions(decisions: Decision[]): EvaluationRecord[] {
  return decisions.map((d) => ({
    id: `live-eval-${d.id}`,
    proposalId: d.id,
    deploymentId: d.deploymentId,
    governanceChip: d.governanceSummary?.elevated_risk
      ? "warn"
      : d.governanceSummary
        ? "pass"
        : "unknown",
    simulationChip:
      d.simulationStatus === "passed"
        ? "pass"
        : d.simulationStatus === "failed"
          ? "fail"
          : d.simulationStatus === "pending" || d.simulationStatus === "stale"
            ? "warn"
            : "unknown",
    outcomeChip:
      d.outcome?.status === "evaluated"
        ? "pass"
        : d.outcome?.status === "pending"
          ? "warn"
          : "unknown",
    constraintsEvaluated: d.governanceSummary?.total_constraints ?? 0,
    escalationViolation: d.governanceSummary?.escalation_violation ?? false,
    createdAt: d.updatedAt,
    notes: d.outcome
      ? "Proposal + outcome from Core (when row exists)."
      : "Proposal only — no outcome row for this id.",
  }));
}
