/**
 * Map Core gaming JSON shapes → Conclave view models.
 * Uses structural typing only (portable when this folder ships standalone).
 */

import type {
  ConclaveDecisionStatus,
  Decision,
  SimulationSurfaceStatus,
} from "./conclaveTypes";

type CoreProposalLike = {
  id: string;
  gameId: string;
  type: string;
  title: string;
  description?: string;
  proposedActions?: Record<string, unknown>;
  status: string;
  recommendedAuthorityMode?: string;
  governanceTier?: string;
  proposedBy?: { type: string; id: string };
  simulation?: {
    status?: string;
    passed?: boolean;
    generatedAt?: number;
    summary?: string;
  };
  createdAt: string;
  updatedAt: string;
  ledgerItemId?: string | null;
  evaluationId?: string | null;
  executedAt?: string | null;
};

function mapCoreStatusToConclave(status: string): ConclaveDecisionStatus {
  switch (status) {
    case "draft":
    case "proposed":
      return "proposed";
    case "simulating":
    case "awaiting_approval":
      return "pending";
    case "approved":
      return "approved";
    case "rejected":
      return "rejected";
    case "executing":
    case "executed":
      return "deployed";
    case "rolled_back":
      return "blocked";
    default:
      return "pending";
  }
}

function deriveSimulationSurface(p: CoreProposalLike): SimulationSurfaceStatus {
  if (!p.simulation || p.simulation.status === "pending") return "pending";
  if (p.simulation.status !== "complete") return "unavailable";
  if (p.simulation.passed === false) return "failed";
  if (p.simulation.passed === true) return "passed";
  return "none";
}

function defaultIntent(p: CoreProposalLike): string {
  const who =
    p.proposedBy?.type === "agent"
      ? "An agent"
      : p.proposedBy?.type === "service"
        ? "A service"
        : "The team";
  return `${who} proposed a ${p.type} change: ${p.title}.`;
}

/**
 * Minimal trail from Core fields when no log merge is available.
 */
function defaultTrail(p: CoreProposalLike): Decision["trail"] {
  const events: Decision["trail"] = [
    {
      id: `${p.id}-proposed`,
      type: "proposed",
      actor: `${p.proposedBy?.type ?? "human"}:${p.proposedBy?.id ?? "unknown"}`,
      description: `Proposal opened — ${p.title}`,
      timestamp: p.createdAt,
    },
  ];
  if (p.simulation?.status === "complete") {
    events.push({
      id: `${p.id}-sim`,
      type: "simulated",
      actor: "simulation",
      description: p.simulation.summary ?? "Simulation complete",
      timestamp: p.updatedAt,
      metadata: { passed: p.simulation.passed },
    });
  }
  if (p.status === "approved" || p.status === "executed" || p.status === "executing") {
    events.push({
      id: `${p.id}-approved`,
      type: "approved",
      actor: "governance",
      description: "Approved for execution",
      timestamp: p.updatedAt,
    });
  }
  if (p.status === "executed" && p.executedAt) {
    events.push({
      id: `${p.id}-deployed`,
      type: "deployed",
      actor: "execution",
      description: "Deployed to live configuration",
      timestamp: p.executedAt,
    });
  }
  return events;
}

export function mapCoreProposalToDecision(p: CoreProposalLike): Decision {
  return {
    id: p.id,
    gameId: p.gameId,
    type: p.type,
    title: p.title,
    intent: p.description?.split("\n")[0]?.slice(0, 200) || defaultIntent(p),
    status: mapCoreStatusToConclave(p.status),
    authorityMode: p.recommendedAuthorityMode ?? "human_led",
    simulationStatus: deriveSimulationSurface(p),
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    trail: defaultTrail(p),
    ...(p.proposedActions && Object.keys(p.proposedActions).length > 0
      ? { proposedActions: p.proposedActions }
      : {}),
  };
}

export function mapCoreProposalList(items: unknown[]): Decision[] {
  return items
    .filter((x): x is CoreProposalLike => typeof x === "object" && x != null && "id" in x)
    .map((x) => mapCoreProposalToDecision(x as CoreProposalLike));
}
