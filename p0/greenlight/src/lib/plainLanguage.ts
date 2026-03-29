/**
 * Plain language module.
 *
 * Every surface imports from here. No raw API enum strings in the UI.
 * If an operator wouldn't understand it, it goes through this module first.
 */

import type {
  SimulationStatus,
  AuthorityMode,
  GovernanceTier,
  PressureLevel,
  GovernanceHealth,
  SystemState,
  OutcomeSummary,
  AgentIdentity,
  Decision,
} from "./types";

// ---------------------------------------------------------------------------
// Simulation
// ---------------------------------------------------------------------------

export function describeSimulationStatus(
  status: SimulationStatus,
  age?: string,
  summary?: string
): string {
  switch (status) {
    case "none":
      return "No simulation — manual review required before deploy.";
    case "pending":
      return "Simulation in progress…";
    case "passed":
      return age
        ? `Simulation passed ${age}${summary ? ` — ${summary}` : ""}`
        : `Simulation passed${summary ? ` — ${summary}` : ""}`;
    case "failed":
      return summary
        ? `Simulation failed — ${summary}`
        : "Simulation failed — review results before deploying.";
    case "stale":
      return age
        ? `Simulation stale — last run ${age}. Re-run before deploy.`
        : "Simulation stale — re-run before deploy.";
    case "mismatch":
      return "Proposal changed after simulation — re-run to verify this version.";
    default:
      return "Simulation status unknown.";
  }
}

export function describeDeployBlockReason(
  errorString: string,
  details?: {
    reason?: string;
    simulationSummary?: string;
    simulationAge?: string;
    decisionId?: string;
  }
): string {
  const age = details?.simulationAge;
  const summary = details?.simulationSummary;

  if (errorString.includes("[SIMULATION_STALE]")) {
    const ageStr = age ? ` (was ${age})` : "";
    return `Simulation is too old to trust${ageStr}. Re-run the simulation before deploying.`;
  }
  if (errorString.includes("[SIMULATION_MISMATCH]")) {
    return "This proposal was changed after the simulation ran. Re-run simulation to verify the current version.";
  }
  if (errorString.includes("[SIMULATION_FAILED]")) {
    return summary
      ? `Last simulation failed — ${summary}. Review before deploying.`
      : "Last simulation failed. Review simulation results before deploying.";
  }
  if (errorString.includes("[SIMULATION_REQUIRED]")) {
    return "A passing simulation is required before this proposal can be deployed.";
  }
  if (errorString.includes("[SIMULATION_INCOMPLETE]")) {
    return "Simulation is still in progress. Wait for it to complete before deploying.";
  }
  if (summary) return summary;
  return "Deploy blocked — review the proposal before proceeding.";
}

export function simulationStatusLabel(status: SimulationStatus): string {
  switch (status) {
    case "none":      return "No simulation";
    case "pending":   return "Running…";
    case "passed":    return "Passed";
    case "failed":    return "Failed";
    case "stale":     return "Stale";
    case "mismatch":  return "Mismatch";
    default:          return "Unknown";
  }
}

// ---------------------------------------------------------------------------
// Authority & governance
// ---------------------------------------------------------------------------

export function describeAuthorityMode(mode?: AuthorityMode): string {
  switch (mode) {
    case "human_led":          return "Human approved";
    case "human_in_the_loop":  return "Human in the loop";
    case "agent_autonomous":   return "Agent autonomous";
    default:                   return "Authority not set";
  }
}

export function describeGovernanceTier(tier: GovernanceTier): string {
  switch (tier) {
    case "promoted":  return "Standard review";
    case "critical":  return "Critical — heightened scrutiny";
    default:          return "Standard review";
  }
}

export function describeGovernanceHealth(health: GovernanceHealth): string {
  switch (health) {
    case "healthy":   return "Governance healthy";
    case "warning":   return "Review recommended";
    case "critical":  return "Critical — immediate attention required";
    default:          return "Status unknown";
  }
}

// ---------------------------------------------------------------------------
// Risk
// ---------------------------------------------------------------------------

export function describeRiskLevel(score?: number): string {
  if (score === undefined || score === null) return "Risk not assessed";
  if (score <= 0.25) return `Low risk (${(score * 100).toFixed(0)}%)`;
  if (score <= 0.5)  return `Moderate risk (${(score * 100).toFixed(0)}%)`;
  if (score <= 0.75) return `Elevated risk — review required (${(score * 100).toFixed(0)}%)`;
  return `High risk — escalation expected (${(score * 100).toFixed(0)}%)`;
}

// ---------------------------------------------------------------------------
// Agents
// ---------------------------------------------------------------------------

export function describeAgentPressure(agent: AgentIdentity): string {
  switch (agent.pressureLevel) {
    case "normal":
      return `Operating normally — ${agent.recentViolations === 0 ? "no violations" : `${agent.recentViolations} minor flag${agent.recentViolations > 1 ? "s" : ""}`} this week.`;
    case "elevated":
      return `Elevated — ${agent.recentViolations} policy violation${agent.recentViolations > 1 ? "s" : ""} this week. Review scope.`;
    case "critical":
      return `Critical — repeated violations. Consider restricting domain until review.`;
    default:
      return "Status unknown.";
  }
}

// ---------------------------------------------------------------------------
// System state narrative
// ---------------------------------------------------------------------------

export function narrateSystemState(state: SystemState): string {
  const parts: string[] = [];

  const pending = state.pendingActions.filter(
    (a) => a.type === "simulate" || a.type === "approve"
  );
  if (pending.length > 0) {
    const count = pending.reduce((sum, a) => sum + (a.count ?? 1), 0);
    parts.push(`${count} proposal${count > 1 ? "s" : ""} pending review.`);
  }

  const criticalRisks = state.activeRisks.filter(
    (r) => r.severity === "critical" || r.severity === "high"
  );
  if (criticalRisks.length > 0) {
    parts.push(criticalRisks[0].description);
  } else {
    const atRisk = state.domains.filter((d) => d.activeRisk);
    if (atRisk.length > 0) {
      parts.push(`${atRisk[0].domain} area has active risk signals.`);
    }
  }

  const criticalAgents = state.agents.filter(
    (a) => a.pressureLevel === "critical"
  );
  if (criticalAgents.length > 0) {
    parts.push(`${criticalAgents[0].name} (${criticalAgents[0].role}) requires review.`);
  }

  if (parts.length === 0) {
    return "All systems normal. No pending actions.";
  }

  return parts.join(" ");
}

// ---------------------------------------------------------------------------
// Outcomes
// ---------------------------------------------------------------------------

export function narrateDecisionOutcome(outcome?: OutcomeSummary): string {
  if (!outcome) return "No outcome data yet.";

  if (outcome.status === "pending") {
    return "Outcome measurement in progress — check back in a few minutes.";
  }

  if (outcome.status === "worse_than_expected") {
    const retDelta = outcome.delta?.retention;
    const revDelta = outcome.delta?.revenue;
    const parts = ["Outcome worse than predicted."];
    if (retDelta !== undefined) {
      parts.push(`Retention ${retDelta > 0 ? "+" : ""}${(retDelta * 100).toFixed(1)}% vs expected.`);
    }
    if (revDelta !== undefined) {
      parts.push(`Revenue ${revDelta > 0 ? "+" : ""}${(revDelta * 100).toFixed(1)}% vs expected.`);
    }
    parts.push("Consider rollback.");
    return parts.join(" ");
  }

  // Evaluated — good or neutral
  const retDelta = outcome.delta?.retention;
  const revDelta = outcome.delta?.revenue;
  if (retDelta === undefined && revDelta === undefined) {
    return "Outcome evaluated — performing within expected range.";
  }

  const parts: string[] = [];
  if (retDelta !== undefined) {
    parts.push(
      `Retention ${retDelta >= 0 ? "+" : ""}${(retDelta * 100).toFixed(1)}%`
    );
  }
  if (revDelta !== undefined) {
    parts.push(
      `revenue ${revDelta >= 0 ? "+" : ""}${(revDelta * 100).toFixed(1)}%`
    );
  }

  return `Change performed as expected — ${parts.join(", ")} vs prediction.`;
}

// ---------------------------------------------------------------------------
// Decision status labels
// ---------------------------------------------------------------------------

export const DECISION_STATUS_LABELS: Record<string, string> = {
  proposed:  "Proposed",
  approved:  "Approved",
  deployed:  "Deployed",
  blocked:   "Blocked",
  rejected:  "Rejected",
  pending:   "Pending",
};

export const DECISION_TYPE_LABELS: Record<string, string> = {
  economy:     "Economy",
  content:     "Content",
  matchmaking: "Matchmaking",
  moderation:  "Moderation",
  experiment:  "Experiment",
  emergency:   "Emergency",
};

export const AUTHORITY_SHORT_LABELS: Record<string, string> = {
  human_led:          "Human",
  human_in_the_loop:  "HITL",
  agent_autonomous:   "Agent",
};

// ---------------------------------------------------------------------------
// Trail event descriptions
// ---------------------------------------------------------------------------

export const TRAIL_EVENT_LABELS: Record<string, string> = {
  proposed:          "Proposed",
  simulated:         "Simulation run",
  approved:          "Approved",
  rejected:          "Rejected",
  blocked:           "Deploy blocked",
  deployed:          "Deployed",
  outcome_recorded:  "Outcome recorded",
  rollback_opened:   "Rollback opened",
  incident_resolved: "Incident resolved",
  superseded:        "Superseded",
};
