# EVAL_SCORE_METHODOLOGY

## Purpose

Define how agent evaluation scores are calculated, what data points feed them, how scores are segmented across configuration versions, and how they surface in ProjectBuild.

This document is a first draft of the methodology. It should be treated as a living document — the scoring model will be refined as real usage data accumulates.

---

## What An Eval Score Measures

An eval score measures how well an agent is behaving relative to its defined role, governance constraints, and the quality of its outputs.

It does not measure whether the agent is "intelligent." It measures whether the agent is operating correctly inside the system.

A high eval score means:

- The agent is staying within its governance boundaries
- Its outputs are consistently useful and accurate
- It is not being blocked frequently
- Its actions are being approved rather than rejected
- Outcomes it contributes to are being promoted to the ledger

A low eval score is a signal that something needs attention — either the agent's configuration, its allowed actions, or its behavioral tuning.

---

## Score Segments

Every eval score is segmented by configuration version.

When an agent's configuration changes, a new segment begins. Scores from different segments are not averaged together. This ensures that the effect of every configuration change is independently visible.

```text
Agent: "Research Agent"
─────────────────────────────────────────────────
Config v1  (runs 1–47)    Score: 91%   Blocked: 2    Promoted: 18
Config v2  (runs 48–103)  Score: 87%   Blocked: 6    Promoted: 14  <- tweak
Config v3  (runs 104+)    Score: ...   Blocked: ...  Promoted: ...
```

The current config version's score is the "live" score shown on the agent card and popup.

Historical segments are visible on the Agent Profile page.

---

## Data Points

The eval score is composed of six data points. Each is weighted. Weights are subject to revision as the methodology matures.

### 1. Governance Pass Rate (30%)

**What it measures:** How often the agent's requested actions are approved by the governance gate versus blocked.

**Formula:**
```text
Governance Pass Rate = allowed_actions / (allowed_actions + blocked_actions)
```

**Why it matters:** An agent that is frequently blocked is either poorly configured (its allowed actions don't match its job), behaving outside its defined scope, or running into user-defined rules. Frequent blocks are a signal that the configuration and behavior are misaligned.

**Data source:** `GovDecisionRecord` — `outcome: "allowed" | "blocked"` per run.

---

### 2. Promote Rate (25%)

**What it measures:** How often outputs from this agent result in a Promote to the ledger.

**Formula:**
```text
Promote Rate = ledger_items_attributed_to_agent / total_agent_runs
```

**Why it matters:** Promotes represent outcomes that humans or the system deemed worth sealing as institutional memory. If an agent's outputs are regularly promoted, the agent is producing decisions and artifacts of genuine value. Low promote rate may indicate the agent is generating noise rather than outcomes.

**Data source:** `LedgerItem.agent` field — counts items where this agent was attributed.

---

### 3. Task Completion Rate (20%)

**What it measures:** How often tasks created or assigned to this agent reach `status: "done"`.

**Formula:**
```text
Task Completion Rate = tasks_done / tasks_created_by_agent
```

**Why it matters:** If an agent is creating board tasks via `create_board_task` actions but those tasks are never completed, the agent is adding work without driving outcomes.

**Data source:** `Task` objects in Build Firestore — filtered by `createdBy: agentId`, grouped by `status`.

---

### 4. Action Quality Rate (15%)

**What it measures:** How often agent-proposed actions are accepted by humans versus dismissed.

This differs from Governance Pass Rate, which measures Core's policy gate. Action Quality Rate measures whether humans — after seeing the proposed action — choose to apply it or ignore it.

**Formula:**
```text
Action Quality Rate = applied_actions / proposed_actions
```

**Why it matters:** An agent may pass the governance gate but still propose actions that humans consistently dismiss as irrelevant or wrong. That is a different failure mode — not a governance problem but a reasoning or context problem.

**Data source:** Build tracks whether `actionsRequested` items were applied or dismissed after being returned by Core.

**Note:** This requires Build to log action acceptance/dismissal events. This is a v1.1 data point — collect it from day one but do not include it in the initial score calculation until enough data exists.

---

### 5. Memory Write Quality (5%)

**What it measures:** How often brain writes (`write_brain` actions) from this agent are superseded shortly after creation.

**Formula:**
```text
Memory Write Quality = 1 - (superseded_within_24h / total_brain_writes)
```

**Why it matters:** Frequent rapid supersession suggests the agent is writing low-quality or incorrect working memory. This is a weak signal on its own but meaningful in aggregate.

**Data source:** `brainDocs` — filtered by `agentId`, comparing `createdAt` to `supersededAt`.

---

### 6. Behavioral Consistency (5%)

**What it measures:** Whether the agent's governance pass rate, promote rate, and task completion rate are stable over time or erratic.

**Formula:**

Calculate the standard deviation of governance pass rate and promote rate across the last 20 runs. High standard deviation = low consistency score.

**Why it matters:** An agent that is highly variable — excellent on some runs, poor on others — is less trustworthy than one with a lower but consistent score. Predictability has value in a team environment.

**Data source:** Derived from the rolling window of `GovDecisionRecord` and `LedgerItem` data.

---

## Score Calculation

```text
Eval Score = 
  (Governance Pass Rate × 0.30) +
  (Promote Rate × 0.25) +
  (Task Completion Rate × 0.20) +
  (Action Quality Rate × 0.15) +    <- v1.1, weight redistributed until live
  (Memory Write Quality × 0.05) +
  (Behavioral Consistency × 0.05)
```

Score is expressed as a percentage (0–100%).

Score is recalculated after every run. The rolling calculation uses all runs in the current config segment.

---

## Score Tiers

| Tier | Score | Meaning |
| --- | --- | --- |
| Excellent | 90–100% | Agent is operating well within its scope |
| Good | 75–89% | Agent is performing, minor issues possible |
| Watch | 60–74% | Configuration review recommended |
| At Risk | 40–59% | Frequent blocks or low output quality — action needed |
| Critical | Below 40% | Agent should be suspended pending review |

Tier labels appear on the agent card, popup, and profile page.

---

## Custom Agent Eval

Custom agents are evaluated using the same methodology.

The key difference: custom agents start with no baseline. The first config segment is their entire eval history until they make a change.

This is intentional. The eval score is the feedback loop that tells the customer whether their wiring is producing the behavior they intended.

If a customer's custom agent drops from 87% to 61% after a configuration change, the segment view tells them exactly when and why.

---

## Brownfield / Imported Agent Eval

Imported agents start at config v1 with no historical data.

The eval record begins at the first run under Core. There is no way to backfill eval scores from a prior provider.

This is not a weakness — it is the moment the agent enters an accountable system. The customer's baseline is whatever the agent achieves in its first config segment under Core governance.

---

## Eval Surfaces in ProjectBuild

### Agent card (compact)

- Eval score badge (percentage)
- Tier color indicator

### Agent popup

- Score + tier badge
- Blocked count (raw number)
- Run count (raw number)

### Agent Profile page

- Current segment score with tier
- Full segment history (config v1, v2, v3...)
- Per-data-point breakdown: governance pass rate, promote rate, task completion rate
- Timeline chart of score over runs
- Governance activity feed (recent allowed / blocked decisions)

### Ledger Viewer — Evals tab

- Aggregate across all agents: total runs, total blocks, per-agent score
- Highlight agents in Watch or below

---

## What Eval Does Not Measure

- Whether the agent's outputs are factually correct (that is an evaluation pipeline problem, not a runtime score problem)
- Whether humans are satisfied with the agent (satisfaction is a product metric, not an eval metric)
- Whether the agent is "smart" or "capable" in a general sense

The eval score is an operational health metric. It answers one question: is this agent behaving correctly inside this system?

---

## Recommended Related Documents

- `AGENT_CONFIGURATION_POLICY.md`
- `GOVERNANCE_ARCHITECTURE.md`
- `LEDGER_INTEGRATION.md`
- `AGENT_RUNTIME_ARCHITECTURE.md`
