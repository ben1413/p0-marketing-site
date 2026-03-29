# Greenlight — Build Plan: Beyond First Class

**Source docs:** `CONCLAVE_LIVE_OPS_WORKING_DOC.md` · `GAMING_LIVE_OPS_CTO_HANDOFF.md` · `GAMING_LIVE_OPS_API.md` · `GAMING_SIMULATION_TRUST_V1_1_1_CTO.md`  
**Current state:** Basic scaffold — dashboard shell, proposal feed, new proposal form, BFF proxy, MCP.  
**Goal:** A live ops product that makes a studio director say all five wow moments in a 10-minute demo.

---

## The five wow moments (non-negotiable)

| # | Moment | Trigger | Surface |
|---|--------|---------|---------|
| 1 | **"You can prove it."** | Publisher asks who approved the economy change that caused the incident | Decision Timeline → full trail → sealed artifact link |
| 2 | **"We stopped it."** | System blocked a bad ship before a human had to catch it | Deploy bar showing `SIMULATION_STALE` / `SIMULATION_MISMATCH` in plain English |
| 3 | **"It knew before you did."** | Queue pressure rising, system surfaces proactive risk | System Health narrative line + at-risk domain card |
| 4 | **"Here's what your AI may do."** | Operator asks what the AI is allowed to do | Agent identity chip → role, domain, boundaries |
| 5 | **"Take it."** | Publisher demands audit export on the spot | Governance Audit table → PDF in 10 seconds |

**Phase A is done when all five moments land cleanly in a 10-minute demo.**

---

## What exists (built in prior session)

- [x] Next.js app shell with Tailwind, dark theme
- [x] Sidebar with nav (Dashboard, Proposals, Deploys, Experiments, Incidents, Moderation, Audit Log, Settings)
- [x] Dashboard page — stats bar + proposals feed + governance health + recent deploys
- [x] New Proposal form — type selector, tier selector, JSON actions field
- [x] BFF catch-all proxy `/api/gaming/[...path]` → Core (keys server-side only)
- [x] `src/lib/core.ts` — server-side Core client with typed helpers
- [x] Greenlight MCP — 12 tools, session-aware, renamed from Conclave
- [x] README, .env.example, .gitignore

---

## What is NOT built (the gap)

### Phase A gap — must build before demo

| Missing piece | Why it matters | Wow moment |
|--------------|----------------|-----------|
| **5 UI data contracts** (TypeScript view models) | Everything downstream depends on these. No surface is stable without them. | Foundation |
| **Plain language module** | "simulationStatus: stale" is meaningless to operators. Every surface reads from this module. | All 5 |
| **Demo seed data** — Nexus Online | Without believable data, demo dies in silence. ~30 days, mixed statuses, agents, outcomes. | All 5 |
| **Decision Timeline** | The full trail: proposed → simulated → approved → blocked → deployed → outcome. Expandable cards. | #1, #2 |
| **System Health panel** | Narrative line first, domain cards, agent strip, active risks, pending actions. | #3, #4 |
| **Deploy block surface** | Plain-language simulation gate error (STALE / MISMATCH / FAILED). Not a raw 400. | #2 |
| **Governance Audit page** | Filterable table. Export to PDF (browser print stylesheet). | #5 |
| **Proposal detail page** | Simulate / Approve / Reject / Deploy from UI. Shows full trail. | #1, #2 |
| **Firebase Auth** (operator sign-in) | Required for live mode with real Core data. Email/password. | Demo gate |

### Phase B gap — post first customer

| Missing piece | Notes |
|--------------|-------|
| Multi-party approval workflow | Phase A: display only (stub approvals[]). Phase B: routing + reminders. |
| Change calendar / blackout windows | "No economy pushes during event X" — system-enforced. |
| Incident / war-room mode | Expedited path with required fields. Never skips attribution. |
| Gradual rollout (% ramp) | `rolloutPlan` record on proposal. Execution in game/flags layer. |
| Post-deploy verification | Canary / SLO check as formal step tied to `deploymentId`. |
| Auto-rollback triggers | Metric violates threshold → open rollback proposal with full trail. |

### Phase C gap — enterprise / multi-title

| Missing piece | Notes |
|--------------|-------|
| Portfolio health | Cross-title patterns, reusable guardrails, shared failure mode detection. |
| Cohort / segment targeting | First-class cohort objects, exclusion rules, holdouts. |
| Decision → comms bundle | Versioned strings, in-game message, social copy — linked to proposal. |
| Localization workflow | Tied to comms bundle. |
| Regional rules DSL | Enforceable constraints by region. |
| Near-real-time context | Sub-minute signals next to decision under review (BFF + snapshots). |

---

## Phase A build sequence

Order is fixed. Each block is a dependency for the next.

### Block 1 — 5 UI data contracts (2h)

Define as TypeScript view models in `src/lib/types.ts`. These are the **Greenlight view layer** over Core API responses — not Core's contracts, but what the UI needs.

```typescript
// 1. Decision (timeline card + detail)
type Decision = {
  id: string;
  gameId: string;
  type: DecisionType;
  title: string;
  intent: string;            // plain-language one sentence
  status: DecisionStatus;    // 'proposed' | 'approved' | 'deployed' | 'blocked' | 'rejected' | 'pending'
  authorityMode: AuthorityMode;
  governanceTier: GovernanceTier;
  simulationStatus: SimulationStatus;  // derived: 'none' | 'pending' | 'passed' | 'failed' | 'stale' | 'mismatch'
  simulationAge?: string;     // "4h 12m ago"
  deploymentId?: string;
  outcome?: OutcomeSummary;
  createdAt: string;
  updatedAt: string;
  trail: TrailEvent[];
};

// 2. AgentIdentity (health strip + future detail page)
type AgentIdentity = {
  id: string;
  name: string;
  role: 'analyst' | 'designer' | 'operator';
  domain: string;
  trustScore: number;           // 0-1
  pressureLevel: 'normal' | 'elevated' | 'critical';
  recentViolations: number;
  behavioralSummary: string;    // plain language
  lastActionAt: string;
};

// 3. SystemState (health panel)
type SystemState = {
  gameId: string;
  capturedAt: string;
  narrative: string;            // "3 proposals pending review. Matchmaking queue pressure elevated."
  domains: DomainHealth[];
  agents: AgentIdentity[];
  activeRisks: Risk[];
  pendingActions: PendingAction[];
  governanceHealth: 'healthy' | 'warning' | 'critical';
};

// 4. EvaluationRecord (audit row)
type EvaluationRecord = {
  id: string;
  proposalId: string;
  proposalTitle: string;
  type: DecisionType;
  authorityMode: AuthorityMode;
  governanceTier: GovernanceTier;
  simulationResult: 'passed' | 'failed' | 'skipped' | 'n/a';
  deploymentId?: string;
  outcomeStatus?: 'pending' | 'evaluated' | 'worse_than_expected';
  createdAt: string;
  ledgerItemId?: string;
};

// 5. TrailEvent (accountability chain)
type TrailEvent = {
  id: string;
  type: 'proposed' | 'simulated' | 'approved' | 'rejected' | 'blocked' | 'deployed' | 'outcome_recorded' | 'rollback_opened' | 'incident_resolved';
  actor: string;          // plain language: "Ana Torres (human_led)" or "Analyst Agent"
  description: string;    // "Simulation passed — composite score 0.72, risk 0.18"
  timestamp: string;
  metadata?: Record<string, unknown>;
};
```

### Block 2 — Plain language module (2h)

`src/lib/plainLanguage.ts` — one file, imported everywhere.

```typescript
describeSimulationStatus(proposal)    // "Simulation passed 2h ago — score 0.72"
                                      // "Simulation stale — re-run before deploy (was 8h ago)"
                                      // "Simulation mismatch — proposal changed after simulation"
describeDeployBlockReason(error)      // Parse [SIMULATION_STALE] / [SIMULATION_MISMATCH] → plain English
describeAuthorityMode(mode)           // "Human approved" / "Human in the loop" / "Agent autonomous"
describeGovernanceTier(tier)          // "Standard review" / "Critical — heightened scrutiny"
describeRiskLevel(score)              // "Low risk (0.18)" / "Elevated risk — review required (0.71)"
narrateSystemState(state)             // "3 proposals pending. Matchmaking queue pressure elevated."
narrateDecisionOutcome(outcome)       // "Economy change performed as predicted — +12% retention"
                                      // "⚠ Worse than predicted — consider rollback"
describeAgentPressure(agent)          // "Operating normally" / "Elevated — 2 violations this week"
```

### Block 3 — Demo seed data (2h)

`src/lib/seed.ts` — Nexus Online demo game. ~30 days of realistic data.

- 8 proposals in mixed statuses: 2 pending, 1 approved (not deployed), 1 blocked (SIMULATION_STALE), 1 deployed with outcome, 1 rejected, 1 critical tier
- 3 agents: Ana (analyst), Marcus (designer), Kai (operator)
- 2 active risks: matchmaking queue pressure, economy drift
- 1 pending incident
- 5 trail events per deployed proposal
- Simulation scores, rationale, predicted vs actual outcomes
- All labeled as demo data

### Block 4 — Decision Timeline (3h)

`src/app/(operator)/proposals/page.tsx` + `src/components/DecisionTimeline.tsx`

- Card per proposal: title, type badge, status dot, simulation chip, age
- Blocked cards visually distinct: red border, lock icon, plain-language block reason
- Expand card → full `TrailEvent[]` with timeline visualization
- Simulation age warning when > 4h (yellow) or stale threshold (red)
- One-click actions: Simulate / Approve / Deploy per card (calls BFF)

### Block 5 — System Health panel (2h)

`src/app/(operator)/dashboard/page.tsx` (upgrade) + `src/components/SystemHealth.tsx`

- **Narrative line at top** — one sentence from `narrateSystemState()`
- Domain cards: economy / matchmaking / moderation / content — each with health dot and one-line status
- Agent strip: 3 agents, trust score bar, pressure level chip
- Active risks: ranked list with plain description
- Pending actions: "2 proposals need simulation before deploy"

### Block 6 — Deploy block surface (1h)

`src/components/DeployGateBar.tsx`

- Shown when a deploy returns `SIMULATION_GATE_BLOCKED`
- Never shows raw error codes — `describeDeployBlockReason()` translates:
  - `SIMULATION_STALE` → "Simulation is 8 hours old — re-run before deploy (economy changes require < 24h)"
  - `SIMULATION_MISMATCH` → "Proposal changed after simulation — re-run to verify this version"
  - `SIMULATION_FAILED` → "Last simulation failed — review results before deploying"
- CTA: "Re-run Simulation" button
- Includes `details.simulationAge`, `details.simulationSummary` when Core sends them

### Block 7 — Proposal detail page (2h)

`src/app/(operator)/proposals/[id]/page.tsx`

- Full trail timeline (TrailEvent[])
- Simulation status card with score breakdown (revenue / retention / risk / confidence)
- Outcome card (predicted vs actual delta, status)
- Action bar: Simulate | Approve | Reject | Deploy — each calls BFF with feedback
- Deploy gate bar inline when blocked
- Sealed ledger link when deployed (shows ledgerItemId)

### Block 8 — Governance Audit page (2h)

`src/app/(operator)/activity/page.tsx`

- Table: proposal, type, authority mode, governance tier, simulation result, deploy status, outcome, date
- Filter by: date range, type, status, outcome
- Row expand: full accountability chain
- Export button → `window.print()` with print stylesheet that produces clean PDF
- Print stylesheet: white background, readable font, "Greenlight Governance Audit Export" header, timestamp

### Block 9 — Firebase Auth (operator sign-in) (1h)

`src/lib/auth.ts` + sign-in page

- Firebase email/password for operator access
- ID token forwarded as `Authorization: Bearer <token>` on all BFF calls
- Sign-out in sidebar footer
- Unauthenticated redirect to `/sign-in`

---

## Demo script (20 min)

| Time | Beat | Surface |
|------|------|---------|
| 0:00 | Open System Health. Read narrative line aloud. | Dashboard — System Health |
| 1:30 | "Matchmaking queue pressure is elevated. Here's what the system surfaced." Click domain card. | Matchmaking domain card |
| 3:00 | "Here's what was proposed to fix it." Click proposal. | Decision Timeline |
| 4:30 | "We tried to deploy this. The system stopped it." Show blocked card — SIMULATION_STALE. | Deploy Gate Bar |
| 6:00 | "We re-ran the simulation. It passed. Here's the full approval trail." Show TrailEvent timeline. | Proposal detail |
| 8:00 | "We deployed it. Here's the outcome." Show predicted vs actual delta. | Outcome card |
| 10:00 | "Every step is on the record. Who proposed it, who approved it, what shipped, what happened." Show full trail. | TrailEvent timeline |
| 12:00 | "The AI has an identity too. It can't do anything outside its role." Show agent strip. | System Health — agent |
| 14:00 | "Your publisher wants an audit export." Click Export. Print dialog opens. | Governance Audit → PDF |
| 15:00 | Q&A. |

---

## Files to create (Phase A)

```
src/lib/types.ts                              ← 5 UI data contracts
src/lib/plainLanguage.ts                      ← All plain-language functions
src/lib/seed.ts                               ← Nexus Online demo data
src/components/DecisionTimeline.tsx           ← Proposal list with trail
src/components/TrailEventList.tsx             ← Timeline visualization
src/components/SimulationChip.tsx             ← Status chip with age
src/components/DeployGateBar.tsx              ← Simulation gate error surface
src/components/SystemHealth.tsx               ← Narrative + domains + agents + risks
src/components/DomainCard.tsx                 ← Per-domain health card
src/components/AgentStrip.tsx                 ← Agent identity chips
src/components/OutcomeCard.tsx                ← Predicted vs actual
src/app/(operator)/proposals/page.tsx         ← Decision timeline page
src/app/(operator)/proposals/[id]/page.tsx    ← Proposal detail + actions
src/app/(operator)/activity/page.tsx          ← Governance Audit + export
src/app/sign-in/page.tsx                      ← Firebase Auth sign-in
src/lib/auth.ts                               ← Firebase Auth client
```

---

## Governance invariants (never compromise)

1. **Simulation does not mutate state.** Running a simulation from the UI does not approve, deploy, or change the proposal.
2. **Deploy requires an approved proposal.** The UI never shows "Deploy" on a pending or rejected proposal.
3. **Rollback is a Ledger event.** The rollback UI must surface `ledgerItemId` — it happened on the record.
4. **Plain language does not obscure authority.** `describeAuthorityMode()` shows human vs agent clearly — never softens the distinction.
5. **Loud missing data.** If simulation data is unavailable, show "Simulation unavailable — manual review required." Never show a blank or implied pass.
6. **Demo data is labeled.** Every seeded record shows a "Demo" badge or the Nexus Online label. No fake data passes as real.
