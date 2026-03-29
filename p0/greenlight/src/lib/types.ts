/**
 * Greenlight UI data contracts.
 *
 * These are VIEW MODELS — the shape the UI needs, derived from Core API
 * responses. Not the same as Core's contracts; these are the Greenlight layer.
 *
 * All surfaces import from here. All BFF mappers produce these shapes.
 */

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export type DecisionType =
  | "economy"
  | "content"
  | "matchmaking"
  | "moderation"
  | "experiment"
  | "emergency";

export type DecisionStatus =
  | "proposed"
  | "approved"
  | "deployed"
  | "blocked"
  | "rejected"
  | "pending";

export type AuthorityMode =
  | "human_led"
  | "human_in_the_loop"
  | "agent_autonomous";

export type GovernanceTier = "promoted" | "critical";

export type SimulationStatus =
  | "none"
  | "pending"
  | "passed"
  | "failed"
  | "stale"
  | "mismatch";

export type GovernanceHealth = "healthy" | "warning" | "critical";

export type PressureLevel = "normal" | "elevated" | "critical";

export type TrailEventType =
  | "proposed"
  | "simulated"
  | "approved"
  | "rejected"
  | "blocked"
  | "deployed"
  | "outcome_recorded"
  | "rollback_opened"
  | "incident_resolved"
  | "superseded";

// ---------------------------------------------------------------------------
// 1. TrailEvent — the accountability chain
// ---------------------------------------------------------------------------

export type TrailEvent = {
  id: string;
  type: TrailEventType;
  /** Plain language: "Ana Torres (human_led)" or "Analyst Agent" */
  actor: string;
  /** Plain language: "Simulation passed — composite 0.72, risk 0.18" */
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
  /** SHA-256 commitment hash computed at seal time */
  commitmentHash?: string;
  /** Evaluation boundary this event was sealed under */
  evaluationId?: string;
  /** For outcomes/rollbacks: the sealed entry this derives from */
  parentLedgerId?: string;
  /** Authority mode declared at seal time */
  authorityMode?: "human_led" | "human_in_the_loop" | "agent_autonomous";
};

// ---------------------------------------------------------------------------
// 2. OutcomeSummary — predicted vs actual
// ---------------------------------------------------------------------------

export type OutcomeSummary = {
  status: "pending" | "evaluated" | "worse_than_expected";
  predicted?: {
    revenue?: number;
    retention?: number;
    risk?: number;
  };
  actual?: {
    revenue?: number;
    retention?: number;
    risk?: number;
  };
  delta?: {
    revenue?: number;
    retention?: number;
  };
  deployedAt?: string;
  evaluatedAt?: string;
};

// ---------------------------------------------------------------------------
// 3. Decision — the primary unit of work
// ---------------------------------------------------------------------------

export type Decision = {
  id: string;
  gameId: string;
  type: DecisionType;
  title: string;
  description?: string;
  /** Plain-language one sentence: "Increase sword drop rate to reduce churn in veteran segment." */
  intent: string;
  status: DecisionStatus;
  authorityMode?: AuthorityMode;
  governanceTier: GovernanceTier;
  proposedActions?: Record<string, unknown>;
  /** Derived from proposal.simulation */
  simulationStatus: SimulationStatus;
  /** Human-readable age: "4h 12m ago" */
  simulationAge?: string;
  simulationScore?: {
    composite?: number;
    revenue?: number;
    retention?: number;
    risk?: number;
    confidence?: number;
  };
  simulationSummary?: string;
  deploymentId?: string;
  ledgerItemId?: string;
  outcome?: OutcomeSummary;
  createdAt: string;
  updatedAt: string;
  trail: TrailEvent[];
  /** Whether this proposal is currently blocked and why */
  blockReason?: string;
  /** Expected approval chain — who needs to sign off */
  expectedApprovers?: Approver[];
};

export type Approver = {
  name: string;
  role: string;
  status: "approved" | "awaiting" | "rejected";
  at?: string;
};

// ---------------------------------------------------------------------------
// 4. AgentIdentity — agent character in the system
// ---------------------------------------------------------------------------

export type AgentIdentity = {
  id: string;
  name: string;
  role: "analyst" | "designer" | "operator";
  domain: string;
  trustScore: number; // 0-1
  pressureLevel: PressureLevel;
  recentViolations: number;
  /** Plain language: "Proposed 3 economy changes this week, 2 within policy." */
  behavioralSummary: string;
  lastActionAt: string;
};

// ---------------------------------------------------------------------------
// 5. DomainHealth — per-area status
// ---------------------------------------------------------------------------

export type DomainHealth = {
  domain: string; // "Economy" | "Matchmaking" | "Moderation" | "Content"
  health: GovernanceHealth;
  /** One sentence: "2 pending proposals, one flagged at elevated risk." */
  summary: string;
  pendingProposals: number;
  activeRisk: boolean;
};

// ---------------------------------------------------------------------------
// 6. Risk — active system risk
// ---------------------------------------------------------------------------

export type Risk = {
  id: string;
  domain: string;
  /** Plain language: "Matchmaking queue pressure 40% above baseline." */
  description: string;
  severity: "low" | "medium" | "high" | "critical";
};

// ---------------------------------------------------------------------------
// 7. PendingAction — what needs operator attention
// ---------------------------------------------------------------------------

export type PendingAction = {
  id: string;
  type: "simulate" | "approve" | "review_outcome" | "resolve_incident";
  /** Plain language: "2 proposals need simulation before deploy." */
  description: string;
  href: string;
  count?: number;
};

// ---------------------------------------------------------------------------
// 8. SystemState — the health panel's data model
// ---------------------------------------------------------------------------

export type SystemState = {
  gameId: string;
  gameName: string;
  capturedAt: string;
  /** Master narrative: "3 proposals pending review. Matchmaking queue pressure elevated." */
  narrative: string;
  domains: DomainHealth[];
  agents: AgentIdentity[];
  activeRisks: Risk[];
  pendingActions: PendingAction[];
  governanceHealth: GovernanceHealth;
};

// ---------------------------------------------------------------------------
// 9. EvaluationRecord — audit table row
// ---------------------------------------------------------------------------

export type EvaluationRecord = {
  id: string;
  proposalId: string;
  proposalTitle: string;
  type: DecisionType;
  authorityMode?: AuthorityMode;
  governanceTier: GovernanceTier;
  simulationResult: "passed" | "failed" | "skipped" | "n/a";
  deploymentId?: string;
  ledgerItemId?: string;
  outcomeStatus?: "pending" | "evaluated" | "worse_than_expected";
  createdAt: string;
};
