# BUILDER_MODE

## Purpose

Capture the builder mode vision: a Cursor-light IDE embedded inside ProjectBuild, toggled from the same chat surface. Chat mode for reasoning and planning; builder mode for coding. Promote from builder mode goes into a queue for team approval at the next meeting.

This doc reconstructs the design from the original jam session. It should be the source of truth for building the builder experience.

---

## Design Philosophy

- **Intuitive, not alien** — We don't have to follow traditional workflows to a T, but we stay close enough to the beaten track that it feels familiar. No reinventing the wheel.
- **Fast** — Agent/human teams should not get bogged down in boring infra acts. Version control, branch management, PR creation — these should fade into the background when they're working.
- **Stay creative, stay building** — The goal is flow. The builder space exists so teams spend time on the work, not on the plumbing.
- **Side by side** — Human and agent work on the same feature together. The agent is like a mid/junior dev pair-programming with you. You work on the part you want; the agent builds alongside you. Shared context, shared branch, shared outcome.

---

## Two Modes

### Chat Mode (default)

The spot where you sit and communicate with agents — one-on-one or multiple, whatever you need.

- Talk back and forth
- Get ready to do things
- Reason through problems
- Plan work
- Create board tasks, decisions, risks
- Promote to ledger when outcomes are ready

This is the screen in the screenshot: the collaboration space with the message feed, agent bubbles, and input bar.

### Builder Mode

Click a button and the same screen real estate flips into builder mode.

- **Same size, same layout** — it "marries" itself to whatever the screen was. Full replacement of the center content.
- **Cursor-light** — an embedded IDE (file tree, editor, code context) built into the board. Not a rip-off of Cursor; inspired by it. Similar interaction model.
- **Why this over MCPs** — MCPs are expensive. This approach (embedded IDE + Companion) will win out.
- **Persistent controls** — agent picker, LLM selector (flip through models to reason against) stay available. You're still in the same project, same agents, same context. You've just switched from chat to code.

---

## The Toggle

A single control switches between modes:

- **Chat mode** → center panel shows message feed, input bar
- **Builder mode** → center panel shows Cursor-light IDE (file tree, editor, agent chat strip)

Left panel (projects) and right panel (tracks, artifacts, ledger preview) can stay or adapt. The key is: one click, same real estate, different surface.

---

## Builder Mode Contents

- **File tree** — bound to a local folder via Companion
- **Code editor** — humans code directly here. Not just reviewing agent output; they write, edit, and own parts of the feature.
- **Process/terminal panel** — the IDE can run a script or process (dev server, build, test) visibly next to the editor. You see it live. Output, logs, errors — right there.
- **Agent chat strip** — same agent/LLM picker, same reasoning, but in the context of the code. The agent works on the same feature, same branch. Human and agent are side by side.
- **Diff view** — when agent proposes changes, accept/reject. Human can also make direct edits; agent sees them.
- **Promote entry point** — but with a different flow (see below)

**The metaphor:** You're the senior dev. The agent is your mid/junior dev. You're both in the same file tree, same branch, same feature. You take the parts you want; the agent handles the rest. The process panel shows what's running. No handoffs, no context loss.

---

## Version Control

Every time a human opens builder mode, they should be working on a branch — **never main/production**.

- **Previous branch** — resume work on a branch they (or the team) already created
- **New branch** — create a fresh branch for this session
- **Never main** — main/production is protected. Builder mode does not open on it.

This needs to be thought through carefully. Version control is central to the builder experience:

- How does the Companion know which branch to open? (last-used? project-scoped default? explicit picker?)
- What if the repo has no branches yet? (create `builder/[track-name]` or `builder/[date]`?)
- What if they're already on main when they click Builder? (Companion must switch or create before allowing edits)
- Branch naming conventions — link to track? to task? to agent run?
- Merge flow — when team approves at next meeting, how does the branch get merged? Human does it? Automated as part of approval?

Version control should feel invisible when it's working and impossible to bypass when it matters.

---

## Day-in-the-Life

*Assume the project is already up and running. 5 humans, 20 agents (4 per human). Board with tasks.*

### Morning — Board

- Team meets on the board
- Tasks get assigned for the day
- "The next thing everybody's working on" gets assigned
- Everyone leaves the board and goes to their **personal workspace**

### Personal Workspace

- Your own space with your agents
- Jamming, planning, "what does my day look like?" (calendar, priorities)
- Different roles: PM-minded, systems thinker, product builder — not everyone is a straight coder
- Everyone *can* code (builder mode is always available), but some live mostly here
- This is chat mode: reasoning, planning, board updates, maybe no coding at all

### Builder Mode — Actual Work

- Launch builder mode when you start work on assigned tasks
- Code, pair with agents, run processes
- Two promote paths (see below)

### End of Day — Promote

Two ways to promote from builder mode:

1. **Team Promote bucket** — Ideas, drafts, "not ready but I want visibility." Put it in so everybody sees it. Could be rejected ("it's a stupid idea") — doesn't mean it's permanent. Just in that space for now.
2. **Finished work** — What you completed on your branch. Promote it through. Goes to the queue.

### Next Morning — Review

- Meet again (scrum, standup, whatever the team does)
- Present what you worked on from the previous day (from your branch)
- If everyone approves → promote to ledger
- Code moves through to production

---

## Promote from Builder Mode: Two Paths

### 1. Team Promote Bucket (ideas, drafts)

- For work that's **not ready** but you want the team to see it
- "Hey, this is a great idea — put it in the team promote bucket"
- Doesn't mean it's in there forever
- Team can reject ("oh, it's a stupid idea, I don't like it")
- At least it's in that space for now — shared visibility, low commitment

### 2. Finished-Work Queue (ready for review)

- For work you **completed** on your branch
- Promote at end of day → goes to queue
- Waits for approval from the rest of the team
- Approval happens at **the next meeting** — async, not immediate
- Team reviews builder-mode promotions as a batch
- If approved → ledger → code moves to production
- If rejected → back to builder

This keeps builder output from bypassing team review. Code changes and decisions from builder mode get the same governance as everything else — just on a different cadence.

---

## The Loop

```text
Morning: Board (assign tasks)
    ↓
Personal Workspace (jam, plan, maybe no code)
    ↓
Builder Mode (actual work — code, pair with agents)
    ↓
End of day: Promote
    ├── Team Promote bucket (ideas, drafts — visibility, low commitment)
    └── Finished-work queue (ready for review)
    ↓
Next morning: Present, team approves or rejects
    ↓
Ledger (if approved) → production — or back to builder if rejected
```

---

## Relationship to Existing Docs

- **P0_PLATFORM_PACKAGING.md** — Builder Architecture, Companion Protocol, reasoning vs builder mode state. This doc fills in the UX and the promote-queue flow.
- **Companion** — owns file ops, git, dev server. Builder mode talks to Companion to bind folders, read/write files, run diffs.
- **Team Promote** — P0_PLATFORM_PACKAGING mentions "team promote" as a surface pattern. The queue + next-meeting approval is the builder-mode instantiation of that.

---

## Build Order

**Shell first, components second.** Scaffold the BuilderShell floating container with correct dimensions and layout zones before building FileTree and CodeEditor. Components drop into the shell — avoids layout refactoring when the shell dictates different dimensions.

## Checkpoint Schema (last-promote timestamp)

Store last promote timestamp **per user, per branch, per project**. Two engineers on the same project on different branches need independent checkpoints.

Firestore key pattern: `projectId` + `userId` + `branch`

---

## What to Build

1. **Mode toggle** — button in the header or input bar that switches Chat ↔ Builder
2. **Builder mode layout** — center panel becomes Cursor-light (file tree + editor + process/terminal panel + agent strip)
3. **Version control gate** — on builder open: ensure branch is not main; create or switch to a safe branch before allowing edits
4. **Companion integration** — bind folder, list files, read/write, git status, diff
5. **Promote-from-builder flow** — instead of immediate ledger promote, write to a queue
6. **Queue UI** — list of pending promotions, team can approve/reject at next meeting
7. **Meeting integration** — "builder promotions" as an agenda item; batch approval

---

## Open Questions

- Does the queue live in Firestore (Build-owned) or Core?
- How does "next meeting" get defined — calendar integration, or manual "we'll review in standup"?
- Can you promote from builder mode to the ledger directly (human_led) if you want to skip the queue, or is queue always required for builder output?
- Version control: branch picker UX? Default branch naming? Auto-create vs explicit "create branch" step?
