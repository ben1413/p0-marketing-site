# USER_FLOWS

## Purpose

Trace every major user scenario end to end through the system so screen specs and component state are grounded in real interaction sequences.

Each flow shows what the human does, what Build does, what Core does, and what state changes result.

---

## Flow 1 — Create a Workspace and First Project

**Who:** New user setting up the platform for the first time.

**Entry point:** Workspace Home (empty state)

```text
Human arrives at Workspace Home
  ->
No projects exist
  ->
Human clicks "Create Project"
  ->
Build renders Create Project modal
  ->
Human enters: name, description
  ->
Build writes Project to Firestore
  {
    workspaceId,
    name,
    description,
    createdAt,
    createdBy
  }
  ->
Build creates Room for the project automatically
  {
    projectId,
    createdAt
  }
  ->
Build redirects to Project Room
```

**State after this flow:**

- One `Project` in Firestore
- One `Room` linked to that project
- User is on the Project Room screen

---

## Flow 2 — Create a Track

**Who:** Human inside a project who wants to start a focused workstream.

**Entry point:** Project Room, right panel

```text
Human clicks "New Track" in right panel
  ->
Build renders Create Track inline form
  ->
Human enters: name, description (e.g. "Sponsorships")
  ->
Build writes Track to Firestore
  {
    projectId,
    name,
    description,
    createdAt
  }
  ->
Build creates Thread for the track automatically
  {
    trackId,
    createdAt
  }
  ->
Track appears in right panel list
  ->
Human clicks track name
  ->
Center panel shifts to Track Workspace for that track
```

**State after this flow:**

- One `Track` in Firestore
- One `Thread` linked to that track
- Center panel shows Track Workspace

---

## Flow 3 — Chat with an Agent in a Track

**Who:** Human working in a track who wants agent help.

**Entry point:** Track Workspace, center panel input

```text
Human types message: "Research catering vendors"
  ->
Human selects agent (e.g. Research Agent) from agent picker
  ->
Build sends:
  POST /api/v1/agents/run/simple
  {
    agentId,
    message: "Research catering vendors",
    memoryScope: "working"
  }
  ->
Build renders agent thinking indicator
  ->
Core assembles cognitive context bundle
  (identity, persona, job, team map, hot memory, warm memory)
  ->
Core executes LLM
  ->
Core returns:
  {
    reply: "...",
    actionsRequested: [...],
    memoryUsed: {...},
    trace: {...}
  }
  ->
Build appends reply to Thread as agent message
  ->
Build checks actionsRequested
```

**If actionsRequested includes create_board_task:**

```text
Build writes new Task to Firestore
  {
    projectId,
    title: (from action payload),
    description: (from action payload),
    status: "open",
    createdBy: agentId,
    createdAt
  }
  ->
Board badge updates to show new task
```

**State after this flow:**

- Agent reply visible in thread
- One or more `Task` objects created in Firestore
- Board reflects new tasks

---

## Flow 4 — Multi-Agent Collaboration (Meeting Run)

**Who:** Human who wants multiple agents to respond to the same prompt.

**Entry point:** Track Workspace or Room, agent picker with multi-select

```text
Human types prompt
  ->
Human selects multiple agents (e.g. Research Agent, Legal Agent, Finance Agent)
  ->
Build sends:
  POST /api/v1/agents/run/meeting
  {
    message,
    agentIds: [...],
    memoryScope: "working",
    routing: "completion_time"
  }
  ->
Build renders multiple thinking indicators
  ->
Core runs agents (parallel for completion_time routing)
  ->
Core returns:
  {
    replies: [
      { agentId, reply, completedAt, actions, trace },
      { agentId, reply, completedAt, actions, trace },
      ...
    ]
  }
  ->
Build renders replies in order of completedAt
  ->
Each agent appears as a distinct participant in the thread
  ->
Build processes all actionsRequested across all replies
  ->
Board and Track state updated accordingly
```

**State after this flow:**

- Multiple agent replies in thread, each attributed to its agent
- Board tasks, risks, or decisions created from any agent's action requests

---

## Flow 5 — Human Moves a Board Task

**Who:** Human reviewing the board after agent activity.

**Entry point:** Board screen

```text
Human opens Board tab for the project
  ->
Build loads all Tasks, Decisions, Risks for projectId from Firestore
  ->
Human sees tasks in "Tasks" column created by agents
  ->
Human drags task from "Tasks" column to "Done"
  ->
Build updates Task status in Firestore
  { status: "done" }
  ->
Board column updates immediately (optimistic)
```

**State after this flow:**

- `Task.status` updated in Firestore
- Task appears in Done column

---

## Flow 6 — Human Promotes an Outcome to the Ledger (human_led)

**Who:** Human who decides an agent output or task result should become a permanent record.

**Entry point:** Track Workspace, agent reply with Promote button, or Board task

```text
Human reviews agent reply or completed task
  ->
Human clicks "Promote" on the item
  ->
Build renders Promote confirmation panel
  Shows:
    summary (pre-filled from reply or task title)
    authority mode selector (default: human_led)
    tags input
    evidence references
  ->
Human reviews, edits summary if needed, confirms
  ->
Build creates Evaluation if none exists for this project
  POST /api/v1/evaluations
  ->
Build sends:
  POST /api/v1/ledger/promote
  {
    evaluationId,
    summary,
    authorityMode: "human_led",
    actor: { type: "human", id: userId },
    type: "decision",
    tags: [...],
    projectId,
    runId (if from an agent run)
  }
  ->
Core seals LedgerItem
Core creates MemorySummary in warm index
  ->
Build receives confirmation
  ->
Promote button on item changes to "Sealed" state
  ->
Ledger preview in right panel updates
```

**State after this flow:**

- One immutable `LedgerItem` in Core
- One `MemorySummary` in warm index
- Item visible in Ledger Viewer

---

## Flow 7 — Agent Proposes Promote (human_in_the_loop)

**Who:** Agent running in a track that proposes a decision should be sealed.

**Entry point:** Agent run response

```text
Core returns actionsRequested including:
  { action: "propose_promote", summary: "...", type: "decision" }
  ->
Build renders a "Proposed Promote" card in the thread
  Clearly labeled: "Agent is proposing this be promoted"
  ->
Human reviews the proposal
  ->
Human approves (clicks "Promote") or dismisses
  ->
If approved:
    Build opens Promote confirmation panel
    authority mode is set to "human_in_the_loop"
    ->
    Human confirms
    ->
    Build calls POST /api/v1/ledger/promote
    { authorityMode: "human_in_the_loop", ... }
    ->
    Core seals the item
```

**State after this flow:**

- Ledger item sealed with `authorityMode: "human_in_the_loop"`
- Attribution shows both the agent that proposed and the human that approved

---

## Flow 8 — Autonomous Promote (agent_autonomous)

**Who:** An agent with `agent_autonomous` authority and an active delegation.

**Entry point:** Agent run, no human in the loop

```text
Agent run completes
  ->
Core governance gate evaluates:
  agent has delegation for agent_autonomous
  action is in allowedActions
  ->
Core calls POST /api/v1/ledger/promote internally
  { authorityMode: "agent_autonomous", actor: { type: "agent", id: agentId } }
  ->
Core seals LedgerItem
  ->
Build receives notification (if subscribed to events)
  ->
Build updates Ledger preview to reflect new sealed item
  ->
No approval UI shown — item was committed before Build rendered anything
```

**State after this flow:**

- Ledger item sealed with `authorityMode: "agent_autonomous"`
- Visible in Ledger Viewer with agent attribution
- No approval prompt was shown in the UI

---

## Flow 9 — View Ledger History

**Who:** Human reviewing committed outcomes.

**Entry point:** Ledger Viewer screen, or right panel ledger preview

```text
Human opens Ledger Viewer
  ->
Build calls:
  GET /api/v1/ledger/ui?evaluationId=...&limit=50
  ->
Core returns:
  {
    sealing: { evaluations, items, totalCount },
    evals: { records, aggregates },
    gov: { agents, recentDecisions }
  }
  ->
Build renders three panels:
  Decision Sealing: list of sealed items
  Evals: governance activity
  Gov: agent states and recent decisions
  ->
Human clicks an item
  ->
Build calls: GET /api/v1/ledger/[id]
  (cold retrieval)
  ->
Build renders full detail panel:
  summary, actor, authority mode, agent, tags, timestamp, evidence refs
```

**State after this flow:**

- Human has reviewed sealed history
- Cold retrieval called once per detail view (not on list load)

---

## Flow 10 — Halt an Agent

**Who:** Workspace admin who needs to stop an agent immediately.

**Entry point:** Agent Directory

```text
Human opens Agent Directory
  ->
Build calls: GET /api/v1/agents/list
  ->
Agents shown with status indicators
  ->
Human finds agent, clicks "Halt"
  ->
Build opens confirmation dialog
  Human selects trigger: ruleViolation / safetySignal / humanOverride / evaluationFailure
  Human enters reason
  ->
Build sends:
  POST /api/v1/agents/[id]/halt
  { trigger, reason }
  ->
Core creates AgentControlRecord { op: "halt", trigger, reason, triggeredBy }
  ->
Agent status in Build updates to "halted"
  ->
Any new run requests for this agent will be rejected by Core until resume
```

**State after this flow:**

- `AgentControlRecord` with `op: "halt"` in Core
- Agent shows halted status in Agent Directory
- Agent cannot execute until a resume record is created

---

## Flow 11 — Agent Directory: Browse and Configure Agents

**Who:** Human setting up or reviewing agents.

**Entry point:** Agent Directory screen

```text
Human opens Agent Directory
  ->
Build calls: GET /api/v1/agents/list
  ->
Build renders agent cards
  Each card shows: name, persona, job title, authority mode, status, model
  ->
Human clicks "View Runs" on an agent
  ->
Build calls: GET /api/v1/agents/runs?agentId=...
  ->
Build renders run history
  ->
Human clicks "Edit" on an agent
  ->
Build renders agent edit form
  ->
Human updates allowed actions, authority mode, persona
  ->
Build calls: POST /api/v1/agents/update
  ->
Agent configuration updated in Core
```

---

## State Summary

Each flow produces a specific set of state changes. This table maps flow to owned objects:

| Flow | Build writes | Core writes |
| --- | --- | --- |
| Create project | `Project`, `Room` | — |
| Create track | `Track`, `Thread` | — |
| Chat with agent | `Thread` messages, `Task` (if actioned) | `Run`, trace |
| Meeting run | `Thread` messages, board items | `Run` records per agent |
| Move task | `Task.status` | — |
| Promote (human_led) | — | `LedgerItem`, `MemorySummary`, `Evaluation` |
| Promote (hitl) | — | `LedgerItem`, `MemorySummary` |
| Promote (autonomous) | — | `LedgerItem`, `MemorySummary` |
| View ledger | — (read only) | — |
| Halt agent | — | `AgentControlRecord` |
| Edit agent | — | `Agent` (updated) |
