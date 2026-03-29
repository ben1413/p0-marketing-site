# Greenlight — Demo Script
**Runtime: 18–22 minutes** · Nexus Online demo data · No setup required

**Before you start:**
- Open `/dashboard` — the LiveRiskAlert should be visible at the top
- Have `/story` and `/activity` tabbed in background
- Disable notifications on your machine

---

## Opening (0:00 — 1:00)

**Say:** *"I want to show you what an AI-assisted live ops decision looks like when something goes wrong — and how you know it went wrong before your players tell you."*

Open the dashboard. Don't say anything for 2 seconds. Let them read the red banner.

**Then say:** *"That red alert fired automatically. No support ticket. No analyst pulling a report. The system detected that a deployed change was performing differently than the simulation predicted — and surfaced it. Let me show you the full story."*

---

## Wow Moment #3 — "It knew before you did" (1:00 — 3:30)

*You're on the dashboard.*

Point to the narrative line at the top of System Health.

**Say:** *"This isn't a chart. It's the system's current read, in plain English. It's synthesized from pending proposals, active risks, and agent behavior — not written by anyone on the team."*

Click into the Matchmaking domain card.

**Say:** *"Matchmaking queue pressure is elevated. There's a proposal ready to deploy — but the simulation is stale. The system blocked it automatically. A human doesn't have to catch this."*

---

## Wow Moment #2 — "We stopped it" (3:30 — 6:30)

Navigate to `/proposals`.

Point to the blocked card at the top (Diamond tier matchmaking).

**Say:** *"This is what a blocked deploy looks like in Greenlight. Not a 400 error in a log. A plain-language explanation: the simulation is 9 hours old. Matchmaking requires a simulation within 30 minutes of deploy. The system enforces that — not a process document, not a team convention. The API itself won't let it through."*

Expand the card. Show the trail.

**Say:** *"Every step is on the record. Who proposed it. When the simulation ran. When the block fired. It's a chain. You can't edit it. You can't delete it."*

---

## Wow Moment #1 — "You can prove it" (6:30 — 10:00)

Click into the **auto-mute moderation proposal** (dec-006, deployed, worse than expected).

Point to the accountability trail.

**Say:** *"This one went differently. It was approved — correctly — and deployed. But look at the approval note: 'Monitor false positive rate closely.' The person who approved it flagged the exact risk that materialized."*

Scroll to the outcome card.

**Say:** *"Greenlight kept measuring after deploy. Retention dropped 3% instead of the predicted +5%. It caught that in 47 minutes. Industry baseline for detection without this layer is 6 to 18 hours. By the time a human would have noticed in their end-of-day analytics review, the exposure had already compounded across thousands of sessions."*

Point to the `Immutable · Ledger sealed` badge on the deployed and outcome_recorded trail events.

**Say:** *"Every one of those events — the proposal, the simulation, the approval note, the deploy, the outcome drift — is permanently sealed. No one on my team can alter it. A publisher or regulator can verify it offline, without connecting to my servers."*

---

## Wow Moment #4 — "Here's what your AI may do" (10:00 — 12:00)

Scroll down to the Agent Identities section on the dashboard.

Point to Marcus (elevated pressure, 2 violations).

**Say:** *"This is one of the AI agents operating in this system. Two policy violations this week. Trust score 72%. The system knows this — and it factors into governance scoring on proposals Marcus submits."*

Click the "How?" toggle to expand the trust breakdown.

**Say:** *"This isn't a black box score. It's derived entirely from Ledger-sealed events — proposals submitted, policy violations, authority compliance. Every input is traceable. It cannot be manually edited. When someone asks 'can this AI be trusted?' — this is the answer."*

---

## Wow Moment #5 — "Take it" (12:00 — 14:30)

Navigate to `/activity`.

**Say:** *"Every governance decision in this system — proposed, simulated, approved, deployed, outcome recorded — is in this table. Every row is a sealed record."*

Point to LedgerIntegrityCard (click to expand if needed).

**Say:** *"Immutability here isn't a promise. It's enforced at three layers: append-only API, authority attribution required on every write, and KMS-signed artifact bundles. You or your compliance team can verify any of these records offline. Without connecting to my servers."*

Click Export PDF.

**Say:** *"That's your publisher audit. Or your regulator ask. Or your post-mortem. In the time it takes to hit print."*

---

## The Proof Story (14:30 — 17:00)

Navigate to `/story`.

**Say:** *"Let me show you the moderation incident from start to finish. One concrete scenario — 9 events, sealed chain, full timing."*

Click through the replay scrubber slowly — T+0, then jump to T+2h 27min (detection beat).

**Say:** *"This is the moment. 47 minutes after the outcome window opened. No human noticed. No support ticket had been filed. The system compared the baseline it set at deploy time against live signals — and flagged it."*

Toggle "Show what would have happened without Greenlight."

**Say:** *"Without this layer: detection happens when someone pulls end-of-day analytics. Average 6 to 18 hours. The exposure window is open the entire time. With this layer: 47 minutes."*

Click "Download signed artifact." Show the JSON.

**Say:** *"That's the proof. A signed bundle you can verify independently. Not a screenshot. Not a log export. A cryptographically verifiable record."*

---

## Closing — the question that closes deals (17:00 — 20:00)

**Say:** *"I want to ask you something. When your last live ops incident happened — could you reconstruct, in under 5 minutes, who proposed the change, what the simulation said, who approved it, and what the system predicted would happen versus what actually did?"*

**Pause.**

*"Most teams can't. Not because they're not careful — but because that reconstruction requires cross-cutting coordination across Jira, Slack, analytics, and whoever was on call that night.*

*Greenlight makes that a 30-second click."*

---

## Objections you'll hear

**"We could build this ourselves."**
Navigate to `/why-not-build`. Walk through Section 2 (where it breaks) — specifically the "No unified decision model" and "No immutable audit chain" points.

*"You could build any piece. The problem is building all of them consistently, across every decision surface, as your team and tooling evolve. That's the standardization problem. It's the hard part."*

**"What model is your simulation using?"**
Navigate to proposal detail → SimulationMethodologyCard.

*"Not ML. It's governance-enforced risk scoring with auditable thresholds. You configure them. Every constraint is transparent. The gate is in the deploy path itself — not a recommendation."*

**"How does this integrate with what we already have?"**
Navigate to `/settings` → IntegrationPaths.

*"First event in under a day. Full governance live in 1 to 2 weeks. You don't replace your pipeline. Greenlight attaches to your decision points."*

**"Can your team alter the records?"**
Navigate to `/activity` → expand LedgerIntegrityCard → chain of custody section.

*"A database admin with direct Firestore access could theoretically modify a raw document. That's why we have KMS-signed artifacts. The signed bundle exists outside our servers. You can verify it independently."*

---

## Notes for the demo runner

- Keep the demo in Demo mode (`GREENLIGHT_DEMO_MODE=true`) — seed data is more compelling than a partially-filled live environment
- Don't rush the 2-second silence after opening the dashboard
- The "take it" moment (PDF export) always lands — give it a full beat of silence after the print dialog opens
- If they want to see the "blocked deploy" in action live: show the simulation stale callout on the Matchmaking proposal in the timeline — don't try to actually trigger a Core API block in demo
