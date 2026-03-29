/**
 * Nexus Online — demo seed data.
 *
 * Used when GREENLIGHT_DEMO_MODE=true or when Core is unreachable.
 * All records are clearly labeled as demo data.
 * Represents ~30 days of a believable live game operation.
 */

import type {
  Decision,
  AgentIdentity,
  SystemState,
  EvaluationRecord,
  TrailEvent,
} from "./types";

export const DEMO_GAME_ID = "nexus-online-demo";
export const DEMO_GAME_NAME = "Nexus Online";

// ---------------------------------------------------------------------------
// Agents
// ---------------------------------------------------------------------------

export const DEMO_AGENTS: AgentIdentity[] = [
  {
    id: "agent-analyst-001",
    name: "Ana",
    role: "analyst",
    domain: "Economy & Matchmaking",
    trustScore: 0.87,
    pressureLevel: "normal",
    recentViolations: 0,
    behavioralSummary: "Proposed 4 economy changes this month. 3 deployed, 1 pending simulation. All within policy.",
    lastActionAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45m ago
  },
  {
    id: "agent-designer-001",
    name: "Marcus",
    role: "designer",
    domain: "Content & Events",
    trustScore: 0.72,
    pressureLevel: "elevated",
    recentViolations: 2,
    behavioralSummary: "2 content proposals flagged for missing simulation this week. Confidence scores trending below threshold.",
    lastActionAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3h ago
  },
  {
    id: "agent-operator-001",
    name: "Kai",
    role: "operator",
    domain: "Moderation & Incidents",
    trustScore: 0.94,
    pressureLevel: "normal",
    recentViolations: 0,
    behavioralSummary: "Resolved 6 incidents in the last 30 days. All resolutions sealed to Ledger. Zero policy violations.",
    lastActionAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(), // 20m ago
  },
];

// ---------------------------------------------------------------------------
// Trail events helpers
// ---------------------------------------------------------------------------

function daysAgo(n: number, h = 0): string {
  return new Date(Date.now() - 1000 * 60 * 60 * (n * 24 + h)).toISOString();
}

function trail(...events: Omit<TrailEvent, "id">[]): TrailEvent[] {
  return events.map((e, i) => ({ ...e, id: `trail-${i}` }));
}

// ---------------------------------------------------------------------------
// Decisions
// ---------------------------------------------------------------------------

export const DEMO_DECISIONS: Decision[] = [
  // 1 — DEPLOYED with outcome (the showcase decision)
  {
    id: "dec-001",
    gameId: DEMO_GAME_ID,
    type: "economy",
    title: "Increase veteran sword drop rate by 15%",
    description: "Veteran segment (level 40+) retention dropping 8% week-over-week. Hypothesis: drop rate too low creates frustration.",
    intent: "Improve retention for veteran players by making rare drops more achievable.",
    status: "deployed",
    authorityMode: "human_led",
    governanceTier: "promoted",
    proposedActions: { itemId: "sword_rare", dropRateMultiplier: 1.15, segment: "veteran" },
    simulationStatus: "passed",
    simulationAge: "3 days ago",
    simulationScore: { composite: 0.74, revenue: 0.12, retention: 0.68, risk: 0.18, confidence: 0.81 },
    simulationSummary: "Predicted +8% retention in veteran segment. Revenue impact neutral to slightly positive.",
    deploymentId: "deploy-001-abc",
    ledgerItemId: "ledger-item-001",
    outcome: {
      status: "evaluated",
      predicted: { retention: 0.08, revenue: 0.02, risk: 0.18 },
      actual:    { retention: 0.11, revenue: 0.03 },
      delta:     { retention: 0.03, revenue: 0.01 },
      deployedAt: daysAgo(12),
      evaluatedAt: daysAgo(9),
    },
    createdAt: daysAgo(15),
    updatedAt: daysAgo(9),
    trail: trail(
      { type: "proposed",  actor: "Ana (Analyst Agent)",        description: "Proposed based on veteran segment retention analysis. Risk score 0.18.",          timestamp: daysAgo(15) },
      { type: "simulated", actor: "Simulation runner",           description: "Simulation passed — composite 0.74, confidence 0.81. Hash locked.",               timestamp: daysAgo(14, 2) },
      { type: "approved",  actor: "Priya Mehta (human_led)",     description: "Approved after reviewing simulation report. Confidence above threshold.",         timestamp: daysAgo(14) },
      { type: "deployed",  actor: "Priya Mehta (human_led)",     description: "Deployed via one-call authorize. DeploymentId: deploy-001-abc. Ledger sealed.",   timestamp: daysAgo(12) },
      { type: "outcome_recorded", actor: "Measurement system",  description: "Retention +11% vs predicted +8%. Revenue +3% vs predicted +2%. Performing better than expected.", timestamp: daysAgo(9) }
    ),
  },

  // 2 — BLOCKED (the simulation gate wow moment)
  {
    id: "dec-002",
    gameId: DEMO_GAME_ID,
    type: "matchmaking",
    title: "Tighten skill bracket for Diamond tier",
    description: "Queue times acceptable but match quality complaints rising. Tighten MMR range by 20%.",
    intent: "Reduce mismatch complaints in Diamond tier by tightening matchmaking brackets.",
    status: "blocked",
    authorityMode: "human_led",
    governanceTier: "promoted",
    proposedActions: { tier: "diamond", mmrRange: 200, current: 250 },
    simulationStatus: "stale",
    simulationAge: "9 hours ago",
    simulationSummary: "Simulation was run before the MMR range was adjusted. Decision changed after simulation.",
    blockReason: "[SIMULATION_STALE] Simulation is 9 hours old (matchmaking threshold: 30 minutes). Re-run simulation before deploy.",
    createdAt: daysAgo(2),
    updatedAt: daysAgo(0, 9),
    trail: trail(
      { type: "proposed",  actor: "Ana (Analyst Agent)",    description: "Proposed after queue analysis. Original MMR range: 250.",             timestamp: daysAgo(2) },
      { type: "simulated", actor: "Simulation runner",       description: "Simulation passed — composite 0.68, matchmaking type (30m threshold).", timestamp: daysAgo(0, 11) },
      { type: "blocked",   actor: "Deployment gate",         description: "[SIMULATION_STALE] Simulation 9h old. Matchmaking requires simulation within 30m of deploy. Re-run required.", timestamp: daysAgo(0, 0) }
    ),
  },

  // 3 — PENDING, needs simulation (classic "needs attention")
  {
    id: "dec-003",
    gameId: DEMO_GAME_ID,
    type: "economy",
    title: "Seasonal pass price adjustment — Q2",
    description: "Align seasonal pass pricing with regional purchasing power parity. 4 regions affected.",
    intent: "Improve conversion on seasonal pass by pricing appropriately for each region.",
    status: "proposed",
    authorityMode: "human_led",
    governanceTier: "critical",
    proposedActions: { regions: ["NA", "EU", "LATAM", "SEA"], priceMultiplier: { LATAM: 0.6, SEA: 0.65, NA: 1.0, EU: 1.1 } },
    simulationStatus: "none",
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
    trail: trail(
      { type: "proposed", actor: "Marcus (Designer Agent)", description: "Proposed for Q2 seasonal pass. Critical tier — simulation required before approval.", timestamp: daysAgo(1) }
    ),
  },

  // 4 — APPROVED, waiting to deploy
  {
    id: "dec-004",
    gameId: DEMO_GAME_ID,
    type: "content",
    title: "Winter event — day 14 challenge unlock",
    description: "Unlock day 14 challenge tier 48h ahead of schedule based on engagement data.",
    intent: "Accelerate Winter event engagement by unlocking day 14 challenges early.",
    status: "approved",
    authorityMode: "human_led",
    governanceTier: "promoted",
    proposedActions: { event: "winter-2026", challengeDay: 14, unlockAt: "2026-03-30T18:00:00Z" },
    simulationStatus: "passed",
    simulationAge: "4 hours ago",
    simulationScore: { composite: 0.81, revenue: 0.22, retention: 0.71, risk: 0.12, confidence: 0.88 },
    simulationSummary: "Strong engagement signal. Low risk. Revenue boost from accelerated pass completions.",
    createdAt: daysAgo(0, 8),
    updatedAt: daysAgo(0, 3),
    trail: trail(
      { type: "proposed",  actor: "Marcus (Designer Agent)", description: "Proposed 8h ago based on Winter event engagement metrics.",              timestamp: daysAgo(0, 8) },
      { type: "simulated", actor: "Simulation runner",        description: "Simulation passed — composite 0.81, confidence 0.88.",                  timestamp: daysAgo(0, 5) },
      { type: "approved",  actor: "Dev Patel (human_led)",    description: "Approved. Ready to deploy when coordination window opens.",              timestamp: daysAgo(0, 3) }
    ),
  },

  // 5 — REJECTED
  {
    id: "dec-005",
    gameId: DEMO_GAME_ID,
    type: "economy",
    title: "Double crafting resource drop rate for 24h",
    description: "Proposed as response to player complaints about resource scarcity.",
    intent: "Temporarily increase crafting resource drops to address player frustration.",
    status: "rejected",
    authorityMode: "human_led",
    governanceTier: "promoted",
    proposedActions: { resourceMultiplier: 2.0, durationHours: 24 },
    simulationStatus: "failed",
    simulationSummary: "Risk score 0.84 — above 0.80 threshold. Predicted -18% revenue from economy inflation.",
    simulationScore: { composite: 0.21, revenue: -0.18, retention: 0.04, risk: 0.84, confidence: 0.76 },
    createdAt: daysAgo(5),
    updatedAt: daysAgo(4),
    trail: trail(
      { type: "proposed",  actor: "Ana (Analyst Agent)",    description: "Proposed based on player feedback. Revenue risk noted.",                               timestamp: daysAgo(5) },
      { type: "simulated", actor: "Simulation runner",       description: "Simulation FAILED — risk 0.84 exceeds threshold (0.80). Economy inflation predicted.", timestamp: daysAgo(5) },
      { type: "rejected",  actor: "Priya Mehta (human_led)", description: "Rejected — simulation risk score too high. Consider smaller multiplier (1.25–1.5) with limited targeting.", timestamp: daysAgo(4) }
    ),
  },

  // 6 — DEPLOYED with worse-than-expected outcome
  {
    id: "dec-006",
    gameId: DEMO_GAME_ID,
    type: "moderation",
    title: "Lower auto-mute threshold for toxic language",
    description: "Reduce auto-mute confidence threshold from 0.85 to 0.75 to catch more violations.",
    intent: "Reduce toxic language in-game by catching borderline violations earlier.",
    status: "deployed",
    authorityMode: "human_in_the_loop",
    governanceTier: "promoted",
    proposedActions: { muteTriggerConfidence: 0.75, current: 0.85 },
    simulationStatus: "passed",
    simulationAge: "18 days ago",
    simulationScore: { composite: 0.61, revenue: 0.0, retention: 0.14, risk: 0.31, confidence: 0.69 },
    deploymentId: "deploy-006-xyz",
    ledgerItemId: "ledger-item-006",
    outcome: {
      status: "worse_than_expected",
      predicted: { retention: 0.05 },
      actual:    { retention: -0.03 },
      delta:     { retention: -0.08 },
      deployedAt: daysAgo(20),
      evaluatedAt: daysAgo(17),
    },
    createdAt: daysAgo(22),
    updatedAt: daysAgo(17),
    trail: trail(
      { type: "proposed",        actor: "Kai (Operator Agent)",    description: "Proposed after spike in reported toxic language.",                                   timestamp: daysAgo(22) },
      { type: "simulated",       actor: "Simulation runner",        description: "Simulation passed — moderate confidence (0.69). Risk 0.31.",                         timestamp: daysAgo(21) },
      { type: "approved",        actor: "Priya Mehta (human_led)",  description: "Approved with note: monitor false positive rate closely.",                           timestamp: daysAgo(21) },
      { type: "deployed",        actor: "Dev Patel (human_led)",    description: "Deployed. DeploymentId: deploy-006-xyz. Sealed to Ledger.",                          timestamp: daysAgo(20) },
      { type: "outcome_recorded", actor: "Measurement system",     description: "Retention -3% vs predicted +5%. False positive mutes causing player frustration. Rollback recommended.", timestamp: daysAgo(17) }
    ),
  },
];

// ---------------------------------------------------------------------------
// System state
// ---------------------------------------------------------------------------

export const DEMO_SYSTEM_STATE: SystemState = {
  gameId: DEMO_GAME_ID,
  gameName: DEMO_GAME_NAME,
  capturedAt: new Date().toISOString(),
  narrative: "2 proposals need simulation before deploy. Matchmaking queue pressure elevated — Diamond tier blocked.",
  domains: [
    { domain: "Economy",     health: "warning",  summary: "1 critical proposal pending simulation.",            pendingProposals: 1, activeRisk: false },
    { domain: "Matchmaking", health: "warning",  summary: "1 proposal blocked — simulation stale (9h old).",    pendingProposals: 1, activeRisk: true  },
    { domain: "Content",     health: "healthy",  summary: "1 proposal approved and ready to deploy.",           pendingProposals: 0, activeRisk: false },
    { domain: "Moderation",  health: "critical", summary: "Deployed change performing worse than predicted. Rollback recommended.", pendingProposals: 0, activeRisk: true },
  ],
  agents: DEMO_AGENTS,
  activeRisks: [
    {
      id: "risk-001",
      domain: "Moderation",
      description: "Auto-mute threshold change underperforming — retention -3% vs predicted +5%. Rollback open.",
      severity: "high",
    },
    {
      id: "risk-002",
      domain: "Matchmaking",
      description: "Diamond tier matchmaking proposal blocked — simulation stale. Queue complaints rising.",
      severity: "medium",
    },
  ],
  pendingActions: [
    {
      id: "action-001",
      type: "simulate",
      description: "Seasonal pass pricing (critical tier) needs simulation before it can be approved.",
      href: "/proposals/dec-003",
      count: 1,
    },
    {
      id: "action-002",
      type: "simulate",
      description: "Matchmaking proposal simulation is stale — re-run before deploy.",
      href: "/proposals/dec-002",
      count: 1,
    },
    {
      id: "action-003",
      type: "review_outcome",
      description: "Auto-mute moderation change is performing worse than expected. Review rollback.",
      href: "/proposals/dec-006",
      count: 1,
    },
  ],
  governanceHealth: "warning",
};

// ---------------------------------------------------------------------------
// Audit records
// ---------------------------------------------------------------------------

export const DEMO_AUDIT_RECORDS: EvaluationRecord[] = [
  { id: "eval-001", proposalId: "dec-001", proposalTitle: "Increase veteran sword drop rate by 15%",     type: "economy",     authorityMode: "human_led",         governanceTier: "promoted", simulationResult: "passed", deploymentId: "deploy-001-abc", ledgerItemId: "ledger-item-001", outcomeStatus: "evaluated",          createdAt: daysAgo(15) },
  { id: "eval-002", proposalId: "dec-002", proposalTitle: "Tighten skill bracket for Diamond tier",       type: "matchmaking", authorityMode: "human_led",         governanceTier: "promoted", simulationResult: "skipped",                                                                                               createdAt: daysAgo(2) },
  { id: "eval-003", proposalId: "dec-003", proposalTitle: "Seasonal pass price adjustment — Q2",          type: "economy",     authorityMode: "human_led",         governanceTier: "critical", simulationResult: "n/a",                                                                                                   createdAt: daysAgo(1) },
  { id: "eval-004", proposalId: "dec-004", proposalTitle: "Winter event — day 14 challenge unlock",       type: "content",     authorityMode: "human_led",         governanceTier: "promoted", simulationResult: "passed",                                                                                                createdAt: daysAgo(0, 8) },
  { id: "eval-005", proposalId: "dec-005", proposalTitle: "Double crafting resource drop rate for 24h",   type: "economy",     authorityMode: "human_led",         governanceTier: "promoted", simulationResult: "failed",                                                                                                createdAt: daysAgo(5) },
  { id: "eval-006", proposalId: "dec-006", proposalTitle: "Lower auto-mute threshold for toxic language", type: "moderation",  authorityMode: "human_in_the_loop", governanceTier: "promoted", simulationResult: "passed", deploymentId: "deploy-006-xyz", ledgerItemId: "ledger-item-006", outcomeStatus: "worse_than_expected", createdAt: daysAgo(22) },
];
