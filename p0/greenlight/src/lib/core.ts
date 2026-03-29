/**
 * Core API client — server-side only.
 * All calls use GREENLIGHT_CORE_API_KEY (never exposed to the browser).
 * The CORE_URL points at your Project0 Core instance.
 */

const CORE_URL = process.env.CORE_URL ?? "http://localhost:3000";
const API_KEY = process.env.GREENLIGHT_CORE_API_KEY ?? "";
const GAME_ID = process.env.GREENLIGHT_GAME_ID ?? "";

async function coreGet<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`/api/v1${path}`, CORE_URL);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${API_KEY}` },
    next: { revalidate: 10 },
  });
  if (!res.ok) throw new Error(`Core ${res.status} on GET ${path}`);
  return res.json();
}

async function corePost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${CORE_URL}/api/v1${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? `Core ${res.status}`);
  }
  return res.json();
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Proposal = {
  id: string;
  gameId: string;
  type: "economy" | "content" | "matchmaking" | "moderation" | "experiment" | "emergency";
  title: string;
  description?: string;
  status: "pending" | "approved" | "rejected" | "executed" | "rolled_back";
  governanceTier?: "promoted" | "critical";
  proposedActions?: Record<string, unknown>;
  createdAt: string;
  simulation?: { passed?: boolean; status?: string };
};

export type Deploy = {
  deploymentId: string;
  proposalTitle: string;
  status: "deployed" | "rolled_back" | "pending";
  deployedAt: string;
  authorityMode?: string;
};

export type DashboardData = {
  proposals: Proposal[];
  recentDeploys: Deploy[];
  stats: {
    openProposals: number;
    deploysThisWeek: number;
    simPassRate: number;
    activeIncidents: number;
  };
};

/** Mirrors GET /api/v1/metrics/usage on Core (display-only pct/remaining; status is canonical). */
export type QuotaUsageEntry = {
  used: number;
  limit: number;
  status: string;
  pct: number | null;
  remaining: number | null;
};

export type CoreUsageSummary = {
  ok: boolean;
  projectId: string;
  period: string;
  tier: string;
  usage: Record<string, QuotaUsageEntry>;
};

// ---------------------------------------------------------------------------
// Data fetchers
// ---------------------------------------------------------------------------

/** Returns null if no API key configured or Core request fails (UI should degrade gracefully). */
export async function coreGetUsage(period?: string): Promise<CoreUsageSummary | null> {
  if (!API_KEY) return null;
  try {
    return await coreGet<CoreUsageSummary>("/metrics/usage", period ? { period } : undefined);
  } catch {
    return null;
  }
}

export async function getDashboardData(): Promise<DashboardData> {
  const [proposalsRes, incidentsRes] = await Promise.allSettled([
    coreGet<{ ok: boolean; items: Proposal[] }>("/gaming/decisions", { gameId: GAME_ID, limit: "10" }),
    coreGet<{ ok: boolean; items: { status: string }[] }>("/gaming/incidents", { gameId: GAME_ID }),
  ]);

  const proposals =
    proposalsRes.status === "fulfilled" ? proposalsRes.value.items ?? [] : [];
  const incidents =
    incidentsRes.status === "fulfilled" ? incidentsRes.value.items ?? [] : [];

  const openProposals = proposals.filter((p) => p.status === "pending").length;
  const executed = proposals.filter((p) => p.status === "executed");
  const simmed = proposals.filter((p) => p.simulation?.status === "complete");
  const simPassed = simmed.filter((p) => p.simulation?.passed === true);
  const simPassRate = simmed.length > 0 ? Math.round((simPassed.length / simmed.length) * 100) : 100;
  const activeIncidents = incidents.filter((i) => i.status !== "resolved").length;

  const recentDeploys: Deploy[] = executed.slice(0, 5).map((p) => ({
    deploymentId: p.id,
    proposalTitle: p.title,
    status: "deployed",
    deployedAt: p.createdAt,
  }));

  return {
    proposals: proposals.slice(0, 8),
    recentDeploys,
    stats: {
      openProposals,
      deploysThisWeek: executed.length,
      simPassRate,
      activeIncidents,
    },
  };
}

export async function getProposals(gameId?: string): Promise<Proposal[]> {
  const res = await coreGet<{ ok: boolean; items: Proposal[] }>("/gaming/decisions", {
    gameId: gameId ?? GAME_ID,
    limit: "50",
  });
  return res.items ?? [];
}

export async function createProposal(input: {
  title: string;
  type: Proposal["type"];
  description?: string;
  governanceTier?: "promoted" | "critical";
  proposedActions?: Record<string, unknown>;
}): Promise<{ decisionProposalId: string }> {
  return corePost("/gaming/decisions/propose", {
    gameId: GAME_ID,
    ...input,
    proposedActions: input.proposedActions ?? {},
    proposedBy: { type: "human", id: "operator" },
  });
}

export async function runSimulation(proposalId: string): Promise<{
  simulationId: string;
  simulation: { passed?: boolean; summary?: string; score?: Record<string, number> };
}> {
  return corePost(`/gaming/decisions/${proposalId}/simulate`, {});
}

export async function approveProposal(proposalId: string): Promise<{ ok: boolean }> {
  return corePost(`/gaming/decisions/${proposalId}/approve`, {});
}

export async function rejectProposal(proposalId: string, reason: string): Promise<{ ok: boolean }> {
  return corePost(`/gaming/decisions/${proposalId}/reject`, { reason });
}

export async function deployProposal(proposalId: string): Promise<{
  deploymentId: string;
  ledgerItemId?: string;
}> {
  return corePost("/gaming/execution/deploy", {
    gameId: GAME_ID,
    decisionProposalId: proposalId,
    branch: `proposal/${proposalId}`,
    summary: `Deploy for proposal ${proposalId}`,
    authorityMode: "human_led",
  });
}
