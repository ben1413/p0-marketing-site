import type { ConclaveDemoBundle, Decision, EvaluationRecord, SystemState } from "./conclaveTypes";
import { NEXUS_ONLINE_DEMO_GAME_ID } from "./conclaveTypes";

const iso = (daysAgo: number, hour = 12) => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - daysAgo);
  d.setUTCHours(hour, 0, 0, 0);
  return d.toISOString();
};

const decisionMatchTuning: Decision = {
  id: "nx-prop-match-001",
  gameId: NEXUS_ONLINE_DEMO_GAME_ID,
  type: "matchmaking",
  title: "Widened skill band in ranked (EU prime)",
  intent:
    "Loosen matchmaking strictness in EU peak hours so queue times drop without opening obvious smurf lanes.",
  status: "blocked",
  authorityMode: "human_in_the_loop",
  governanceSummary: {
    total_constraints: 4,
    elevated_risk: true,
    escalation_required: false,
    escalation_satisfied: true,
    escalation_violation: false,
    high_drift_constraints: 1,
    persistent_high_trend_detected: false,
    constraintsSkipped: false,
  },
  simulationStatus: "stale",
  createdAt: iso(2, 9),
  updatedAt: iso(0, 14),
  trail: [
    {
      id: "nx-prop-match-001-t1",
      type: "proposed",
      actor: "agent:match-tuner-eu",
      description: "Proposal opened from live-ops agent (EU shard).",
      timestamp: iso(2, 9),
    },
    {
      id: "nx-prop-match-001-t2",
      type: "simulated",
      actor: "simulation",
      description: "Queue P95 −18%; predicted mild MMR spread widening.",
      timestamp: iso(2, 10),
      metadata: { passed: true },
    },
    {
      id: "nx-prop-match-001-t3",
      type: "approved",
      actor: "human:lead_live_ops",
      description: "Approved for deploy during war room.",
      timestamp: iso(1, 8),
    },
    {
      id: "nx-prop-match-001-t4",
      type: "blocked",
      actor: "execution / simulation gate",
      description:
        "Deploy blocked — simulation older than matchmaking freshness window (30m).",
      timestamp: iso(0, 14),
      metadata: { subcode: "SIMULATION_STALE" },
    },
  ],
  lastDeployBlock: {
    code: "SIMULATION_GATE_BLOCKED",
    subcode: "SIMULATION_STALE",
    rawMessage: "[SIMULATION_STALE] Simulation exceeded freshness threshold for matchmaking",
    details: {
      reason: "SIMULATION_STALE",
      decisionId: "nx-prop-match-001",
      simulationAgeHuman: "4h 12m",
    },
  },
  approvalRequirements: [
    { role: "Live ops lead", required: true },
    { role: "Economy", required: false },
  ],
  approvals: [{ role: "Live ops lead", actor: "human:lead_live_ops", at: iso(1, 8) }],
  expedited: true,
  expeditedReasonCode: "WAR_ROOM",
};

const decisionEconomyShipped: Decision = {
  id: "nx-prop-eco-014",
  gameId: NEXUS_ONLINE_DEMO_GAME_ID,
  type: "economy",
  title: "Daily login streak bonus +5%",
  intent: "Increase daily engagement with a small, reversible streak bonus.",
  status: "deployed",
  authorityMode: "human_led",
  governanceSummary: {
    total_constraints: 6,
    elevated_risk: false,
    escalation_required: false,
    escalation_satisfied: true,
    escalation_violation: false,
    high_drift_constraints: 0,
    persistent_high_trend_detected: false,
  },
  simulationStatus: "passed",
  deploymentId: "nx-dep-eco-014-8f2a",
  outcome: {
    deploymentId: "nx-dep-eco-014-8f2a",
    status: "evaluated",
    predictedSummary: "Predicted +1.2% D1 retention, revenue risk bounded.",
    actualSummary: "D1 retention +0.9%; return rate within band.",
    deltaSummary: "Slightly under predicted — within governance tolerance.",
  },
  createdAt: iso(18, 11),
  updatedAt: iso(12, 16),
  trail: [
    {
      id: "nx-prop-eco-014-t1",
      type: "proposed",
      actor: "human:economy_designer",
      description: "Proposal drafted after A/B pre-read.",
      timestamp: iso(18, 11),
    },
    {
      id: "nx-prop-eco-014-t2",
      type: "simulated",
      actor: "simulation",
      description: "Stress sim: no runaway inflation in 30d horizon.",
      timestamp: iso(17, 15),
      metadata: { passed: true },
    },
    {
      id: "nx-prop-eco-014-t3",
      type: "approved",
      actor: "human:exec_producer",
      description: "Approved under standard economy tier.",
      timestamp: iso(16, 10),
    },
    {
      id: "nx-prop-eco-014-t4",
      type: "deployed",
      actor: "execution",
      description: "Deployed to production; deploymentId recorded.",
      timestamp: iso(15, 9),
      metadata: { deploymentId: "nx-dep-eco-014-8f2a" },
    },
    {
      id: "nx-prop-eco-014-t5",
      type: "outcome_recorded",
      actor: "outcomes / admin evaluate",
      description: "Post-deploy evaluation captured actuals vs prediction.",
      timestamp: iso(12, 16),
    },
  ],
  rolloutPlan: {
    label: "10% → 50% → 100%",
    stages: ["10%", "50%", "100%"],
  },
};

const decisionModerationPending: Decision = {
  id: "nx-prop-mod-003",
  gameId: NEXUS_ONLINE_DEMO_GAME_ID,
  type: "moderation",
  title: "Tighten auto-mute for repeat slur variants",
  intent: "Reduce toxic chat recurrence without increasing false positives above 0.5%.",
  status: "pending",
  authorityMode: "human_led",
  simulationStatus: "pending",
  createdAt: iso(0, 11),
  updatedAt: iso(0, 11),
  trail: [
    {
      id: "nx-prop-mod-003-t1",
      type: "proposed",
      actor: "agent:trust-safety-assist",
      description: "Drafted from incident cluster #4482.",
      timestamp: iso(0, 11),
    },
  ],
  targeting: { cohortRef: "global_chat", notes: "All regions; holdout TBD" },
};

const agents: SystemState["agents"] = [
  {
    id: "agent-match-tuner-eu",
    name: "Match Tuner (EU)",
    role: "analyst",
    domain: "matchmaking",
    trustScore: 0.82,
    pressureLevel: "high",
    recentViolations: 0,
    behavioralSummary: "Proposes queue adjustments; respects simulation-first policy.",
    lastActionAt: iso(0, 9),
    currentTask: "Waiting on fresh simulation for ranked band change (EU).",
  },
  {
    id: "agent-trust-safety-assist",
    name: "Trust & Safety Assist",
    role: "operator",
    domain: "moderation",
    trustScore: 0.76,
    pressureLevel: "medium",
    recentViolations: 1,
    behavioralSummary: "One soft guardrail nudge last week; re-certified.",
    lastActionAt: iso(0, 11),
    currentTask: "Drafting auto-mute tightening from incident cluster #4482.",
  },
  {
    id: "svc-economy-eval",
    name: "Economy Evaluator",
    role: "service",
    domain: "economy",
    trustScore: 0.91,
    pressureLevel: "low",
    recentViolations: 0,
    behavioralSummary: "Batch scoring only; no autonomous deploy.",
    lastActionAt: iso(1, 4),
    currentTask: "Idle — last batch scored login streak proposal.",
  },
];

const systemState: SystemState = {
  gameId: NEXUS_ONLINE_DEMO_GAME_ID,
  capturedAt: iso(0, 15),
  narrative:
    "Matchmaking is the hottest domain right now: one deploy is blocked on stale simulation, and moderation has a fresh proposal waiting in queue.",
  domains: [
    {
      id: "dom-match",
      name: "Matchmaking",
      atRisk: true,
      pendingProposals: 1,
      headline: "Blocked deploy — refresh simulation before retry.",
    },
    {
      id: "dom-moderation",
      name: "Moderation",
      atRisk: false,
      pendingProposals: 1,
      headline: "New policy tightening — simulation not finished.",
    },
    {
      id: "dom-economy",
      name: "Economy",
      atRisk: false,
      pendingProposals: 0,
      headline: "Last ship tracked clean; no open proposals.",
    },
  ],
  agents,
  activeRisks: [
    "Simulation freshness enforcement is ON for linked deploys.",
    "EU peak traffic in 3h — queue pressure may spike.",
  ],
  pendingActions: [
    "Re-run simulation for nx-prop-match-001",
    "Assign reviewer for nx-prop-mod-003",
  ],
  governanceHealth: {
    tier: "watch",
    openEscalations: 0,
    lastEvaluatedAt: iso(0, 14),
  },
};

const evaluations: EvaluationRecord[] = [
  {
    id: "nx-eval-001",
    proposalId: "nx-prop-match-001",
    governanceChip: "warn",
    simulationChip: "warn",
    outcomeChip: "unknown",
    constraintsEvaluated: 4,
    escalationViolation: false,
    createdAt: iso(0, 14),
    notes: "Stale sim — treated as watch, not pass.",
  },
  {
    id: "nx-eval-002",
    proposalId: "nx-prop-eco-014",
    deploymentId: "nx-dep-eco-014-8f2a",
    governanceChip: "pass",
    simulationChip: "pass",
    outcomeChip: "pass",
    constraintsEvaluated: 6,
    escalationViolation: false,
    createdAt: iso(12, 16),
  },
  {
    id: "nx-eval-003",
    proposalId: "nx-prop-mod-003",
    governanceChip: "warn",
    simulationChip: "unknown",
    outcomeChip: "unknown",
    constraintsEvaluated: 0,
    escalationViolation: false,
    createdAt: iso(0, 11),
    notes: "Pending — constraints not fully evaluated yet.",
  },
];

/**
 * Labeled demo bundle — not live Firestore data.
 */
export function getNexusOnlineDemo(): ConclaveDemoBundle {
  return {
    label: "Demo — Nexus Online (synthetic)",
    gameId: NEXUS_ONLINE_DEMO_GAME_ID,
    decisions: [decisionMatchTuning, decisionEconomyShipped, decisionModerationPending],
    systemState,
    evaluations,
  };
}
