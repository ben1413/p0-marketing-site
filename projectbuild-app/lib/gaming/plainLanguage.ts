/**
 * Single module for operator-facing copy derived from technical fields.
 */

import type {
  AgentIdentity,
  ConclaveDecisionOutcome,
  ConclaveGovernanceSummary,
  Decision,
  DomainHealthCard,
  EvaluationChip,
  GovernanceHealthAggregate,
  SimulationSurfaceStatus,
  SystemState,
} from "./conclaveTypes";

export function describeRiskLevel(
  level: "low" | "medium" | "high" | "elevated" | string
): string {
  switch (level) {
    case "low":
      return "Risk is within normal bounds.";
    case "medium":
      return "Elevated attention suggested.";
    case "high":
    case "elevated":
      return "High risk — review constraints and authority before shipping.";
    default:
      return "Risk state needs human interpretation.";
  }
}

export function describeSimulationStatus(status: SimulationSurfaceStatus): string {
  switch (status) {
    case "none":
      return "No simulation on record for this decision.";
    case "pending":
      return "Simulation is still running or not started.";
    case "passed":
      return "Latest simulation passed.";
    case "failed":
      return "Latest simulation did not pass — deploy may be blocked when enforcement is on.";
    case "stale":
      return "Simulation is older than the freshness window — run again before deploy.";
    case "unavailable":
      return "Simulation unavailable — manual review required.";
    default:
      return "Simulation state unclear.";
  }
}

export function describeAuthorityMode(mode: string): string {
  switch (mode) {
    case "human_led":
      return "Human-led: people approve and execute.";
    case "human_in_the_loop":
      return "Human in the loop: agent proposes, human confirms key steps.";
    case "agent_autonomous":
      return "Agent-autonomous path (still governed — tier and guards apply).";
    default:
      return mode || "Authority mode not specified.";
  }
}

export function describeGovernanceHealth(g: GovernanceHealthAggregate): string {
  switch (g.tier) {
    case "healthy":
      return "Governance signals are stable.";
    case "watch":
      return "Governance is in watch state — review open items.";
    case "critical":
      return "Governance is in a critical state — pause discretionary deploys.";
    default:
      return "Governance health unknown.";
  }
}

export function describeAgentPressure(a: AgentIdentity): string {
  switch (a.pressureLevel) {
    case "low":
      return `${a.name} is operating under normal load.`;
    case "medium":
      return `${a.name} is under elevated load — watch for boundary drift.`;
    case "high":
      return `${a.name} is under high pressure — consider throttling automated actions.`;
    default:
      return `${a.name} pressure state is unclear.`;
  }
}

export function describeGovernanceSummary(s: ConclaveGovernanceSummary): string {
  if (s.constraintsSkipped) {
    return "Constraint evaluation was skipped for this run — this is not the same as “all clear”.";
  }
  const parts: string[] = [];
  parts.push(`${s.total_constraints} constraint(s) evaluated.`);
  if (s.elevated_risk) parts.push("Elevated risk flagged.");
  if (s.escalation_violation) parts.push("Escalation required but not satisfied.");
  if (s.high_drift_constraints > 0)
    parts.push(`${s.high_drift_constraints} constraint(s) show high drift.`);
  return parts.join(" ");
}

export function narrateSystemState(s: SystemState): string {
  return s.narrative;
}

/** One-line header for the timeline column (synthetic or live). */
export function narrateTimelineSection(decisions: Decision[]): string {
  const blocked = decisions.filter((d) => d.lastDeployBlock).length;
  const pending = decisions.filter((d) => d.status === "pending").length;
  const deployed = decisions.filter((d) => d.status === "deployed").length;
  const parts: string[] = [];
  if (blocked > 0) {
    parts.push(
      `${blocked} decision${blocked > 1 ? "s" : ""} blocked on deploy gate (e.g. stale simulation)`
    );
  }
  if (pending > 0) {
    parts.push(`${pending} waiting on simulation or approval`);
  }
  if (deployed > 0) {
    parts.push(`${deployed} shipped — expand for trail and outcome`);
  }
  return parts.length > 0 ? `${parts.join(" · ")}.` : "No decisions in this snapshot.";
}

/** One-line header above domain cards. */
export function narrateDomainStrip(domains: DomainHealthCard[]): string {
  const atRisk = domains.filter((d) => d.atRisk);
  const pending = domains.reduce((n, d) => n + d.pendingProposals, 0);
  if (atRisk.length === 0 && pending === 0) {
    return "No domain is flagged; pending work is quiet.";
  }
  const riskNames = atRisk.map((d) => d.name).join(", ");
  const lead =
    atRisk.length > 0
      ? `${atRisk.length} domain${atRisk.length > 1 ? "s" : ""} at risk (${riskNames})`
      : "No at-risk domains";
  return `${lead}; ${pending} proposal(s) queued across domains.`;
}

export function narrateAgentStrip(agents: AgentIdentity[]): string {
  const withTask = agents.filter((a) => a.currentTask).length;
  return `${agents.length} agent${agents.length !== 1 ? "s" : ""} on this title; ${withTask} showing a current task line.`;
}

/** In-process governance cache aggregate (dev / inspection — may be empty on cold start). */
export function narrateGovernanceMetrics(m: {
  total_entries: number;
  elevated_risk_count: number;
  escalation_required_count: number;
  escalation_violation_count: number;
}): string {
  if (m.total_entries === 0) {
    return "Governance cache is empty (no engine evaluations recorded in this process yet).";
  }
  return `${m.total_entries} evaluation(s) in cache — ${m.elevated_risk_count} elevated risk, ${m.escalation_required_count} escalation required, ${m.escalation_violation_count} escalation violation(s).`;
}

export function narrateDecisionOutcome(o: ConclaveDecisionOutcome): string {
  if (o.status === "pending") {
    return `Outcome pending for deployment ${o.deploymentId.slice(0, 8)}… — ${o.predictedSummary}`;
  }
  const delta = o.deltaSummary ? ` ${o.deltaSummary}` : "";
  return `Evaluated: ${o.actualSummary ?? "Actuals recorded."}${delta}`;
}

export function describeEvaluationChip(chip: EvaluationChip): string {
  switch (chip) {
    case "pass":
      return "OK";
    case "warn":
      return "Watch";
    case "fail":
      return "Failed";
    case "skipped":
      return "Skipped";
    case "unknown":
      return "Unknown";
    default:
      return String(chip);
  }
}

/**
 * Merge Core deploy error text + optional JSON body (SIMULATION_GATE_BLOCKED).
 */
/** When Conclave BFF returns 401 from forwarded gaming routes. */
export function describeConclaveLiveAuthFailure(): string {
  return "Live data requires authentication. Switch to Demo mode or sign in, then try again.";
}

export function formatSimulationDeployFailure(input: {
  errorText?: string;
  code?: string;
  details?: Record<string, unknown>;
}): { headline: string; detail: string; subcode?: string } {
  const raw = input.errorText ?? "";
  const subMatch = raw.match(/\[(SIMULATION_[A-Z_]+)\]/);
  const subcode = subMatch?.[1] ?? (input.details?.reason as string | undefined);

  if (subcode === "SIMULATION_STALE" || input.details?.reason === "SIMULATION_STALE") {
    return {
      headline: "Deploy blocked — simulation is stale",
      detail:
        "The linked simulation is outside the allowed freshness window. Re-run simulation, then deploy again.",
      subcode: "SIMULATION_STALE",
    };
  }
  if (subcode === "SIMULATION_MISMATCH" || input.details?.reason === "SIMULATION_MISMATCH") {
    return {
      headline: "Deploy blocked — decision changed since simulation",
      detail:
        "The decision fingerprint no longer matches the simulated version. Re-simulate after edits, then deploy.",
      subcode: "SIMULATION_MISMATCH",
    };
  }
  if (input.code === "SIMULATION_GATE_BLOCKED" || raw.includes("SIMULATION_GATE_BLOCKED")) {
    return {
      headline: "Deploy blocked — simulation gate",
      detail:
        raw ||
        "Linked deploy requires a passing, fresh simulation when enforcement is enabled.",
      subcode,
    };
  }
  return {
    headline: "Deploy could not complete",
    detail: raw || "See technical message for details.",
    subcode,
  };
}

export function decisionStatusLabel(status: Decision["status"]): string {
  switch (status) {
    case "proposed":
      return "Proposed";
    case "pending":
      return "Pending";
    case "approved":
      return "Approved";
    case "deployed":
      return "Deployed";
    case "blocked":
      return "Blocked";
    case "rejected":
      return "Rejected";
    default:
      return status;
  }
}
