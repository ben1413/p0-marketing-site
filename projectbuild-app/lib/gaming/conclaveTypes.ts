/**
 * Conclave view models — UI contracts over Core gaming APIs.
 * Portable: no imports from Core; map from API JSON in mapFromCore.ts.
 */

export type ConclaveDecisionStatus =
  | "proposed"
  | "approved"
  | "deployed"
  | "blocked"
  | "rejected"
  | "pending";

export type TrailEventType =
  | "proposed"
  | "simulated"
  | "approved"
  | "blocked"
  | "deployed"
  | "outcome_recorded"
  | "rollback_opened"
  | string;

export type TrailEvent = {
  id: string;
  type: TrailEventType;
  actor: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
};

/** Slim governance projection (aligns with Core GovernanceSummary + audit stub). */
export type ConclaveGovernanceSummary = {
  total_constraints: number;
  elevated_risk: boolean;
  escalation_required: boolean;
  escalation_satisfied: boolean;
  escalation_violation: boolean;
  high_drift_constraints: number;
  persistent_high_trend_detected: boolean;
  /** When true, evaluation was skipped — must not read as “zero constraints”. */
  constraintsSkipped?: boolean;
};

export type SimulationSurfaceStatus =
  | "none"
  | "pending"
  | "passed"
  | "failed"
  | "stale"
  | "unavailable";

export type ConclaveDecisionOutcome = {
  deploymentId: string;
  status: "pending" | "evaluated";
  predictedSummary: string;
  actualSummary?: string;
  deltaSummary?: string;
};

/** Phase B+ stubs — present on view model for schema stability. */
export type ConclaveDecisionStubs = {
  rolloutPlan?: { label: string; stages?: string[] };
  expedited?: boolean;
  expeditedReasonCode?: string;
  targeting?: { cohortRef?: string; notes?: string };
  impactEstimate?: {
    support?: string;
    revenue?: string;
    abuse?: string;
    notes?: string;
  };
  approvalRequirements?: { role: string; required: boolean }[];
  approvals?: { role: string; actor: string; at: string }[];
  commsBundle?: { version?: string; locales?: string[] };
};

export type Decision = ConclaveDecisionStubs & {
  id: string;
  gameId: string;
  /** Opaque Core payload; optional on view model, used by simulation harness when present. */
  proposedActions?: Record<string, unknown>;
  type: string;
  title: string;
  intent: string;
  status: ConclaveDecisionStatus;
  authorityMode: string;
  governanceSummary?: ConclaveGovernanceSummary;
  simulationStatus: SimulationSurfaceStatus;
  /** Derived from outcome when not present on proposal — display only; not canonical (Core execution/outcome stores source of truth). */
  deploymentId?: string;
  outcome?: ConclaveDecisionOutcome;
  createdAt: string;
  updatedAt: string;
  trail: TrailEvent[];
  lastDeployBlock?: {
    code: "SIMULATION_GATE_BLOCKED";
    subcode: string;
    rawMessage?: string;
    details?: Record<string, unknown>;
  };
};

export type AgentIdentity = {
  id: string;
  name: string;
  role: string;
  domain: string;
  trustScore: number;
  pressureLevel: "low" | "medium" | "high";
  recentViolations: number;
  behavioralSummary: string;
  lastActionAt: string;
  /** Short “what they’re on right now” line for operator empathy (Phase A display stub). */
  currentTask?: string;
};

export type DomainHealthCard = {
  id: string;
  name: string;
  atRisk: boolean;
  pendingProposals: number;
  headline: string;
};

export type GovernanceHealthAggregate = {
  tier: "healthy" | "watch" | "critical";
  openEscalations: number;
  lastEvaluatedAt?: string;
};

export type SystemState = {
  gameId: string;
  capturedAt: string;
  narrative: string;
  domains: DomainHealthCard[];
  agents: AgentIdentity[];
  activeRisks: string[];
  pendingActions: string[];
  governanceHealth: GovernanceHealthAggregate;
};

export type EvaluationChip = "pass" | "warn" | "fail" | "skipped" | "unknown";

export type EvaluationRecord = {
  id: string;
  proposalId: string;
  deploymentId?: string;
  governanceChip: EvaluationChip;
  simulationChip: EvaluationChip;
  outcomeChip: EvaluationChip;
  constraintsEvaluated: number;
  escalationViolation: boolean;
  createdAt: string;
  notes?: string;
};

export const NEXUS_ONLINE_DEMO_GAME_ID = "nexus-online-demo";

export type ConclaveDemoBundle = {
  label: string;
  gameId: string;
  decisions: Decision[];
  systemState: SystemState;
  evaluations: EvaluationRecord[];
};
