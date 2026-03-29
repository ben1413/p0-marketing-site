/**
 * Demo / harness: builds a believable POST body for `POST /api/v1/gaming/simulations`.
 * Core is the notary — this is illustrative input only, not a real game model.
 *
 * Optional survey fields support pre-demo personalization (Typeform, etc.) later.
 */

import type { Decision } from "./conclaveTypes";

export type DemoSimulationSurveyParams = {
  /** Replaces default "Nexus Online" phrasing in human summaries only (UI / trail). */
  gameName?: string;
  /** Scales sampleSize when set. */
  dauRange?: "small" | "mid" | "large";
  /** Hints which template to prefer when `type` is ambiguous (optional). */
  primaryDomain?: string;
};

export type SimulationSubmitBody = {
  proposalId: string;
  gameId: string;
  tier: "fast" | "standard" | "comprehensive";
  sampleSize: number;
  distributions?: {
    revenue?: { p5?: number; p50?: number; p95?: number };
    retention?: { p5?: number; p50?: number; p95?: number };
    fairness?: { p5?: number; p50?: number; p95?: number };
  };
  tailRiskFlags?: string[];
  confidence?: number | null;
  durationMs?: number | null;
  modelVersions?: Record<string, string>;
};

function sampleSizeForSurvey(survey?: DemoSimulationSurveyParams): number {
  const r = survey?.dauRange ?? "mid";
  if (r === "small") return 28_000;
  if (r === "large") return 220_000;
  return 72_000;
}

function gameLabel(survey?: DemoSimulationSurveyParams): string {
  const n = survey?.gameName?.trim();
  return n && n.length > 0 ? n : "Nexus Online";
}

/** One-line trail / operator copy (Core still builds structured summary from report fields). */
export function humanSimulationSummaryLine(
  type: string,
  survey?: DemoSimulationSurveyParams
): string {
  const g = gameLabel(survey);
  switch (type) {
    case "matchmaking":
      return `${g}: skill-band change projects ~12% reduction in progression stall for mid-bracket cohort; churn risk within band (harness).`;
    case "economy":
      return `${g}: grant curve projects ~9% winback in at-risk cohort; inflation risk low given capped grant (harness).`;
    case "moderation":
      return `${g}: stricter auto-hold projects ~34% fewer false negatives; appeal rate up slightly, within SLA (harness).`;
    case "content":
      return `${g}: calendar shift projects stable engagement with minor prime-time lift; no tail-risk flags (harness).`;
    case "experiment":
      return `${g}: variant mix projects measurable lift on primary KPI with guardrails satisfied (harness).`;
    case "emergency":
      return `${g}: emergency patch path simulated under expedited tier; rollback window explicit (harness).`;
    default:
      return `${g}: change simulated under standard tier; confidence within governance band (harness).`;
  }
}

export function buildSimulationSubmitPayload(
  input: {
    proposalId: string;
    gameId: string;
    type: string;
    proposedActions?: Record<string, unknown>;
  },
  survey?: DemoSimulationSurveyParams
): SimulationSubmitBody {
  const sampleSize = sampleSizeForSurvey(survey);
  const tier: SimulationSubmitBody["tier"] = input.type === "emergency" ? "fast" : "standard";

  switch (input.type) {
    case "matchmaking":
      return {
        proposalId: input.proposalId,
        gameId: input.gameId,
        tier,
        sampleSize,
        confidence: 0.81,
        durationMs: 4200,
        tailRiskFlags: [],
        distributions: {
          retention: { p5: -0.02, p50: 0.08, p95: 0.14 },
          fairness: { p5: -0.01, p50: 0.03, p95: 0.07 },
        },
        modelVersions: { matchmaking: "harness-1.2", cohort: "eu-prime-v3" },
      };
    case "economy":
      return {
        proposalId: input.proposalId,
        gameId: input.gameId,
        tier,
        sampleSize: Math.round(sampleSize * 1.05),
        confidence: 0.74,
        durationMs: 5100,
        tailRiskFlags: [],
        distributions: {
          revenue: { p5: 0.01, p50: 0.06, p95: 0.11 },
          retention: { p5: 0.02, p50: 0.09, p95: 0.15 },
        },
        modelVersions: { economy: "harness-1.1", grants: "capped-v2" },
      };
    case "moderation":
      return {
        proposalId: input.proposalId,
        gameId: input.gameId,
        tier: "comprehensive",
        sampleSize: Math.round(sampleSize * 0.35),
        confidence: 0.88,
        durationMs: 3800,
        tailRiskFlags: [],
        distributions: {
          fairness: { p5: -0.4, p50: -0.34, p95: -0.22 },
        },
        modelVersions: { moderation: "harness-1.0", queue: "appeal-aware" },
      };
    case "content":
      return {
        proposalId: input.proposalId,
        gameId: input.gameId,
        tier,
        sampleSize,
        confidence: 0.77,
        durationMs: 2900,
        tailRiskFlags: [],
        distributions: {
          retention: { p5: 0.0, p50: 0.04, p95: 0.09 },
        },
        modelVersions: { content: "harness-1.0" },
      };
    case "experiment":
      return {
        proposalId: input.proposalId,
        gameId: input.gameId,
        tier: "comprehensive",
        sampleSize,
        confidence: 0.69,
        durationMs: 6100,
        tailRiskFlags: [],
        distributions: {
          revenue: { p5: -0.01, p50: 0.03, p95: 0.08 },
          retention: { p5: 0.01, p50: 0.05, p95: 0.1 },
        },
        modelVersions: { experiment: "harness-1.1" },
      };
    case "emergency":
      return {
        proposalId: input.proposalId,
        gameId: input.gameId,
        tier: "fast",
        sampleSize: Math.min(15_000, sampleSize),
        confidence: 0.62,
        durationMs: 1200,
        tailRiskFlags: [],
        distributions: {
          retention: { p5: -0.05, p50: 0.02, p95: 0.06 },
        },
        modelVersions: { emergency: "harness-0.9" },
      };
    default:
      return {
        proposalId: input.proposalId,
        gameId: input.gameId,
        tier,
        sampleSize,
        confidence: 0.75,
        durationMs: 4000,
        tailRiskFlags: [],
        distributions: {
          retention: { p5: 0, p50: 0.05, p95: 0.1 },
        },
        modelVersions: { generic: "harness-1.0" },
      };
  }
}

/** Client-only: refresh Nexus-style demo state after “Run simulation” (no Core round-trip). */
export function applyDemoHarnessSimulation(d: Decision, survey?: DemoSimulationSurveyParams): Decision {
  const now = new Date().toISOString();
  const line = humanSimulationSummaryLine(d.type, survey);
  return {
    ...d,
    simulationStatus: "passed",
    lastDeployBlock: undefined,
    updatedAt: now,
    trail: [
      ...d.trail,
      {
        id: `${d.id}-harness-sim-${Date.now()}`,
        type: "simulated",
        actor: "Conclave demo runner",
        description: line,
        timestamp: now,
        metadata: { passed: true, harness: true },
      },
    ],
  };
}

/** Client-only: mark demo decision deployed after gate passes (illustrative). */
export function applyDemoHarnessDeploy(d: Decision): Decision {
  const now = new Date().toISOString();
  const depId = d.deploymentId ?? `demo-dep-${d.id}-${Date.now()}`;
  return {
    ...d,
    status: "deployed",
    deploymentId: depId,
    updatedAt: now,
    trail: [
      ...d.trail,
      {
        id: `${d.id}-harness-deploy-${Date.now()}`,
        type: "deployed",
        actor: "execution (demo)",
        description: "Deploy authorized — simulation gate passed (demo harness).",
        timestamp: now,
        metadata: { deploymentId: depId },
      },
    ],
  };
}
