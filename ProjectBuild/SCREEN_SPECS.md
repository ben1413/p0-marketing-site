# SCREEN_SPECS

## Purpose

Define every component, state, data source, and interaction for each of the six v1 screens. Engineers should be able to build directly from this document without needing to make product decisions.

Reference `USER_FLOWS.md` for the scenarios each screen must support.
Reference `DATA_SCHEMA_AND_API_MAP.md` for the exact API shapes.
Reference `OBJECT_MODEL.md` for the Firestore object fields.

---

## Layout System

All screens except Workspace Home and Agent Directory use the three-panel shell.

```text
+------------------+-----------------------------+------------------+
|   LEFT PANEL     |       CENTER PANEL          |   RIGHT PANEL    |
|   (240px fixed)  |       (flex, fills)         |   (280px fixed)  |
|                  |                             |                  |
|  Project list    |  Room / Track / Board /     |  Tracks          |
|  with CORE badge |  Ledger content             |  Artifacts       |
|  Active project  |                             |  Ledger preview  |
|  highlighted     |                             |  Board preview   |
+------------------+-----------------------------+------------------+
|              BOTTOM INPUT BAR                                     |
|  Agent picker  |  Model picker  |  Message input  |  Voice  Send  |
|  (Room Mode and Track Mode only)                                  |
+-------------------------------------------------------------------+
```

Left and right panels are fixed width. Center panel fills remaining space.

Bottom input bar is visible in Room Mode and Track Mode only.

The bottom bar has two rows:
- Top row: agent selector dropdown + model selector dropdown + collapsible principles panel
- Bottom row: message textarea + voice button + send button

---

## Left Panel (shared across all project screens)

The left panel is identical across Project Room, Track Workspace, Board, and Ledger Viewer.

**Project list**

Scrollable list of all projects.

Each project shows:
- Project name
- `CORE` badge if it is a Core system project (e.g. system-level projects)
- Active state highlight when current project

On click: navigate to `/projects/[id]/room`

**Bottom of left panel**

- Link to Workspace Home
- Link to Agent Directory

---

## Bottom Input Bar (shared, Room and Track only)

The input bar has two rows.

**Row 1 — Agent and model controls**

Left side: Agent selector dropdown
- Shows agent name and job title: e.g. `TONI / SYSTEMS ARCH`
- Dropdown lists all active agents from `GET /api/v1/agents/list`
- Selecting agent updates the active agent for the next run
- Single agent selected = `run/simple`
- Meeting flow handled separately via Start Meeting button (see Room spec)

Right side: Model selector dropdown
- Shows current model: e.g. `GPT-5.2`
- Dropdown options populated from `GET /api/v1/model-definitions`
- Default: agent's configured model
- Override: user can switch per-message

Far right: `PRINCIPLES` toggle button
- Expands a collapsible panel below Row 1 showing the selected agent's principles
- Principles panel shows:
  - `INTERNAL IDENTITY` — agent's persona description
  - `NON-NEGOTIABLES` — agent's core restrictions
- Panel collapses on toggle or when a different agent is selected

**Row 2 — Message input**

Full-width textarea.

Placeholder text reflects the current mode:
- Room: `Message…`
- Track: `Message… or try "add task [title]" / "move [X] to done"`

Voice button (mic icon): activates voice input.

Send button: submits message.

On submit (single agent):
```text
POST /api/v1/agents/run/simple
{ agentId, message, memoryScope: "working" }
```

While running: input disabled, agent thinking indicator shown in center panel.

---

## Screen 1 — Workspace Home

### Purpose

Entry point for the organization. Shows all projects, available agents, and recent activity.

### Route

```text
/
```

### Layout

Full-width. No three-panel shell.

```text
+---------------------------------------------------------------+
|  Header: Workspace name + user avatar                        |
+---------------------------------------------------------------+
|  [+ Create Project]                                          |
+-------------------+-------------------+----------------------+
|  Projects         |  Agents           |  Recent Activity     |
|  (grid or list)   |  (compact list)   |  (event feed)        |
+-------------------+-------------------+----------------------+
```

### Components

**Project card**

Shows:
- Project name
- Description (truncated to 2 lines)
- `CORE` badge if system project
- Number of tracks
- Last activity time

On click: navigate to `/projects/[id]/room`

Empty state: "No projects yet. Create your first project."

**Create Project button**

On click: opens Create Project modal.

**Create Project modal**

Fields:
- Name (required)
- Description (optional)

On submit:
- Write `Project` to Firestore
- Write `Room` to Firestore with `projectId`
- Close modal, navigate to `/projects/[id]/room`

**Agent list (compact)**

Calls: `GET /api/v1/agents/list`

Each agent shows:
- Name and job title: e.g. `TONI / SYSTEMS ARCH`
- Status badge (active / halted / suspended)

On click: navigate to `/agents`

**Recent Activity feed**

Shows recent system events scoped to the workspace.

Each event: timestamp, description, project name.

Empty state: "No activity yet."

### State

```ts
{
  projects: Project[]
  agents: Agent[]
  loading: boolean
  createModalOpen: boolean
}
```

---

## Screen 2 — Project Room

### Purpose

Default landing page for a project. The shared live collaboration space where humans and agents coexist.

### Route

```text
/projects/[id]/room
```

### Mode

Room Mode — three-panel layout with bottom input bar.

### Left Panel

Standard left panel. Active project highlighted.

### Center Panel

**Breadcrumb header**

```text
[PROJECT NAME] / ROOM
```

**Room activity feed**

Chronological stream of everything that has happened in this project.

Human messages:
- Align right
- Author name above bubble
- `PROMOTE` label beneath bubble

Agent messages:
- Align left
- Agent role label above bubble (e.g. `SCRIBE`, `RESEARCH AGENT`)
- Reply text in bubble
- `PROMOTE` label beneath bubble
- Action chips if `actionsRequested` were applied (e.g. "Created task: Research vendors")
- Trace toggle: expands model name, token count, latency

System events (subdued style):
- Board updates: "Task created by Research Agent"
- Promotes: "Decision promoted by Ben"
- Track activity: "New track: Sponsorships"

**Promote inline behavior**

`PROMOTE` label appears beneath every message bubble (human and agent).

On click: opens Promote confirmation panel anchored to that message.

Pre-fills summary from message content.

No navigation required — panel overlays in place.

**Loading state:** skeleton rows while fetching history.

**Empty state:** "The room is quiet. Start a conversation or invite an agent."

**Start Meeting button**

Visible above input bar or as a persistent button in the center panel header.

On click: opens Start Meeting modal (see Shared Components).

### Right Panel

**Tracks section**

Header: `TRACKS` + `+ New Track` button.

Lists all tracks for this project.

Each track shows: name, last activity time.

On track click: navigate to `/projects/[id]/tracks/[trackId]`

New Track:
- Inline create form
- Fields: name, description
- On submit: write `Track` + `Thread` to Firestore, navigate to new track

**Board preview section**

Header: `BOARD`

Shows three count chips: `Tasks [n]`, `Decisions [n]`, `Risks [n]`

On click: navigate to `/projects/[id]/board`

**Ledger preview section**

Header: `LEDGER`

Shows inline counts: `Sealing: [n]  Evals: [n]  Gov: [n] agents, [n] decisions`

`Open Ledger` button navigates to `/projects/[id]/ledger`

Last 3 sealed items shown as compact rows: type badge, summary, timestamp.

### Bottom Input Bar

Standard bottom input bar as defined above.

Agent selector defaults to last used agent.

Model selector defaults to agent's configured model.

### State

```ts
{
  project: Project
  room: Room
  tracks: Track[]
  messages: ThreadMessage[]
  agents: Agent[]
  selectedAgentId: string
  selectedModel: string
  principlesPanelOpen: boolean
  inputValue: string
  isRunning: boolean
  meetingModalOpen: boolean
  ledgerPreview: LedgerItemSummary[]
  boardCounts: { tasks: number, decisions: number, risks: number }
  promoteTarget: ThreadMessage | null
}
```

---

## Screen 3 — Track Workspace

### Purpose

Focused thinking lane for a single workstream. Center panel scoped to this track's thread only.

### Route

```text
/projects/[id]/tracks/[trackId]
```

### Mode

Track Mode — three-panel layout with bottom input bar.

### Left Panel

Standard left panel. Active project highlighted.

Below project list, show track list for the active project with current track highlighted.

On track click: navigate to that track.

### Center Panel

**Breadcrumb header**

```text
[PROJECT NAME] / [TRACK NAME]
```

Track name is editable inline on click.

**Thread conversation**

Scoped to this track's `Thread` only.

Same message bubble pattern as Room:
- Human messages right-aligned with `PROMOTE` label
- Agent messages left-aligned with role label, `PROMOTE` label, action chips, trace toggle
- Artifact references shown inline: file name, type badge, download link

`PROMOTE` is present on every message bubble. It is always one tap away.

**Empty state:** "This track has no messages yet. Start a conversation."

### Right Panel

**Tracks section**

Same as Room right panel — full list of tracks, current track highlighted.

New Track button present.

**Ledger actions section**

Header: `LEDGER`

Lists items promoted from this track specifically.

Each shows: type badge, summary, timestamp.

`Open Ledger` link navigates to `/projects/[id]/ledger`

**Board preview section**

Same board count chips as Room. Navigates to Board on click.

### Bottom Input Bar

Standard bottom input bar.

Placeholder: `Message… or try "add task [title]" / "move [X] to done"`

Agent and model selectors persist last selection within the session.

Principles panel shows selected agent's identity and non-negotiables.

### State

```ts
{
  project: Project
  track: Track
  thread: Thread
  messages: ThreadMessage[]
  agents: Agent[]
  selectedAgentId: string
  selectedModel: string
  principlesPanelOpen: boolean
  inputValue: string
  isRunning: boolean
  promoteTarget: ThreadMessage | null
  ledgerItems: LedgerItemSummary[]
  boardCounts: { tasks: number, decisions: number, risks: number }
}
```

---

## Screen 4 — Board

### Purpose

Operational view of all active work. Kanban columns for tasks, decisions, risks, and done items. During a live meeting, the board activates as the PM Console.

### Route

```text
/projects/[id]/board
```

### Mode

Board Mode — three-panel layout, no bottom input bar (unless a meeting is active).

### Left Panel

Standard left panel.

### Center Panel

**Board header**

```text
PM CONSOLE    [Project selector dropdown]
```

Project selector dropdown: switch between projects without leaving the board.

Right side of header:
- `PROMOTED MEETINGS` button — opens list of previously promoted meetings
- `END MEETING` button — visible only during active meeting
- `CLOSE` button

**Participants strip**

Shown when a meeting is active.

Displays participant names: `Participants  [Cindi]  [Toni]`

**Board columns**

Four columns side by side:

| Column | Content |
| --- | --- |
| TASKS | `Task` objects with `status: "open"` |
| DECISIONS | `Decision` objects with `status: "open"` |
| RISKS | `Risk` objects |
| DONE | `Task` and `Decision` objects with `status: "done"` |

Each column header shows count badge.

Add buttons at base of each column: `+ Add task`, `+ Add decision`, `+ Add risk`

**Task card**

Shows:
- Title
- Description (truncated)
- Created by (human name or agent name)
- Assigned to (if set)
- Agent badge if agent-created
- `PROMOTE` button

On drag to Done: update `Task.status` to `"done"` in Firestore.

On click: open task detail in right panel.

**Decision card** — same pattern, shows summary, status badge, `PROMOTE`.

**Risk card** — shows description, severity badge.

**Empty column state:** dashed outline placeholder `+ Add [item type]`

**Ledger strip**

Shown below the board columns, always visible.

```text
Sealing: [n]   Evals: [n]   Gov: [n] agents, [n] decisions   [Open Ledger]
```

Data from: `GET /api/v1/ledger/ui?limit=1` (counts only)

`Open Ledger` navigates to `/projects/[id]/ledger`

**Meeting bar**

Shown only when a meeting is active. Pinned to bottom of center panel above the input bar.

```text
● RECORDING  [0:00]  |  Meeting with [agent names]      [END MEETING]  [COLLAPSE]
```

Clicking `END MEETING`:
- Stops the meeting
- Opens Promote Meeting modal (see Shared Components)

**Bottom input bar (meeting mode only)**

Visible during active meeting.

Placeholder: `Message… or try "add task Ship feature" / "move X to done"`

Sending a message during a meeting:
```text
POST /api/v1/agents/run/meeting
{ meetingId, message, memoryScope: "working" }
```

Board updates from `actionsRequested` are applied in real time as replies arrive.

### Right Panel

**Board summary section**

Total counts per column.

**Filter controls**

Filter by: assigned to, created by, agent vs human, date range.

**Selected item detail**

When a card is clicked, detail appears here:
- Full title and description
- Status
- Created by + date
- Assigned to
- `PROMOTE` button
- History of changes

### State

```ts
{
  project: Project
  board: Board
  tasks: Task[]
  decisions: Decision[]
  risks: Risk[]
  loading: boolean
  activeMeeting: Meeting | null
  meetingRunning: boolean
  recordingSeconds: number
  promoteModalOpen: boolean
  promoteMeetingModalOpen: boolean
  promoteTarget: Task | Decision | null
  selectedCard: Task | Decision | Risk | null
  filterState: BoardFilter
  ledgerCounts: { sealing: number, evals: number, govAgents: number, govDecisions: number }
}
```

---

## Screen 5 — Agent Directory

### Purpose

Browse, configure, and control all agents. Uses three-panel layout with agent list on the left, detail and run history in the center, and config/governance on the right.

Agents are not created from scratch. They are selected from the platform's pre-built agent catalog and instantiated into the project's agent bank. The directory shows the project's current bank of agent instances.

For full agent control, users navigate to the Agent Profile page (Screen 7).

### Route

```text
/agents
```

### Mode

Three-panel layout. No input bar.

```text
+------------------+-----------------------------+------------------+
|   AGENT LIST     |    AGENT DETAIL / RUNS      |  CONFIG + GOV    |
|   (240px)        |    (flex, fills)            |  (280px)         |
+------------------+-----------------------------+------------------+
```

### Left Panel

**Agent list**

Calls: `GET /api/v1/agents/list`

Each agent row shows:
- Display name and job title: `TONI / SYSTEMS ARCH`
  - Display name is user-set and optional. All Core behavior is keyed by `agentId` + principles, never by display name.
- Status badge: `active` / `suspended` / `halted`
- Eval score badge (percentage + tier color)

On click: load agent detail in center panel.

Active agent highlighted.

**Add Agent button**

Opens the Agent Catalog modal — a browsable list of pre-built agent types from the platform bank.

Each catalog entry shows: job title, persona description, default allowed actions.

On select: `POST /api/v1/agents/register` instantiates the type into this project's agent bank. The new agent appears in the list immediately.

User can optionally set a display name after adding. If none is set, the job title is used as the display label.

### Center Panel

**Agent detail header**

When an agent is selected:

- Display name (user-set, editable inline)
- Job title (from principles — not editable here)
- Personality type badge: `DIRECT` / `COLLABORATIVE` / `ANALYTICAL` / `ADVISORY`
- Eval score badge: score + tier label (e.g. `91% — Excellent`)
- Status badge
- Authority mode
- Model
- `View Full Profile` link → navigates to `/agents/[id]`

**Principles section (collapsible)**

- `INTERNAL IDENTITY` — agent's persona description
- `NON-NEGOTIABLES` — agent's core restrictions

Collapsed by default. Toggle to expand.

**Run history**

Calls: `GET /api/v1/agents/runs?agentId=...`

List of recent runs:
- Timestamp
- Reply preview (truncated)
- Actions taken
- Governance outcome badge

**Empty state:** "Select an agent to view details."

### Right Panel

**Personality type (project owner only)**

Project owner can set the personality type for this agent in this project.

Selector: `direct` / `collaborative` / `analytical` / `advisory`

Save: updates `agentProjectConfig.personalityType` in Firestore. Propagates to all users in the project.

Read-only for non-owners. Shows current type as a badge with label "Set by project owner."

**Control actions**

- `Pause` — calls `POST /api/v1/agents/[id]/suspend`
- `Resume` — calls `POST /api/v1/agents/[id]/resume`
- `Halt` — opens halt confirmation dialog

**Governance activity**

Calls: `GET /api/v1/gov/decisions?agentId=...&limit=20`

Each record: action, outcome badge (allowed / blocked), reason, timestamp.

**Halt confirmation dialog**

Fields:
- Trigger: `ruleViolation` / `safetySignal` / `humanOverride` / `evaluationFailure`
- Reason (required)

On confirm: `POST /api/v1/agents/[id]/halt { trigger, reason }`

### State

```ts
{
  agents: Agent[]
  selectedAgentId: string | null
  selectedAgentDetail: Agent | null
  runs: AgentRun[]
  govDecisions: GovDecisionRecord[]
  loading: boolean
  catalogModalOpen: boolean
  personalityType: "direct" | "collaborative" | "analytical" | "advisory"
  haltDialogOpen: boolean
  isProjectOwner: boolean
}
```

### Center Panel

**Agent detail header**

When an agent is selected:

- Name (display name)
- Job title
- Personality type badge: `DIRECT` / `COLLABORATIVE` / `ANALYTICAL` / `ADVISORY`
- Eval score badge: score + tier label (e.g. `91% — Excellent`)
- Status badge
- Authority mode
- Model
- `View Full Profile` link → navigates to `/agents/[id]`

**Principles section (collapsible)**

- `INTERNAL IDENTITY` — persona description
- `NON-NEGOTIABLES` — restrictions

Collapsed by default. Toggle to expand.

**Run history**

Calls: `GET /api/v1/agents/runs?agentId=...`

List of recent runs:
- Timestamp
- Reply preview (truncated)
- Actions taken
- Governance outcome badge

**Empty state:** "Select an agent to view details."

### Right Panel

**Personality type (project owner only)**

Project owner can set the personality type for this agent in this project.

Selector: `direct` / `collaborative` / `analytical` / `advisory`

Save: updates `agentProjectConfig.personalityType` in Firestore. Propagates to all users in the project.

Read-only for non-owners. Shows current type as a badge with label "Set by project owner."

**Control actions**

- `Pause` — calls `POST /api/v1/agents/[id]/suspend`
- `Resume` — calls `POST /api/v1/agents/[id]/resume`
- `Halt` — opens halt confirmation dialog

**Governance activity**

Calls: `GET /api/v1/gov/decisions?agentId=...&limit=20`

Each record: action, outcome badge (allowed / blocked), reason, timestamp.

**Halt confirmation dialog**

Fields:
- Trigger: `ruleViolation` / `safetySignal` / `humanOverride` / `evaluationFailure`
- Reason (required)

On confirm: `POST /api/v1/agents/[id]/halt { trigger, reason }`

### State

```ts
{
  agents: Agent[]
  selectedAgentId: string | null
  selectedAgentDetail: Agent | null
  runs: AgentRun[]
  govDecisions: GovDecisionRecord[]
  loading: boolean
  personalityType: "direct" | "collaborative" | "analytical" | "advisory"
  haltDialogOpen: boolean
  isProjectOwner: boolean
}
```

---

## Screen 7 — Agent Profile

### Purpose

Full control page for a single agent. Project owners use this page to configure personality type, view the full eval score breakdown, inspect configuration version history, and manage governance settings. This is the one place in the product where agent configuration can be changed.

### Route

```text
/agents/[id]
```

### Mode

Three-panel layout. No input bar.

```text
+------------------+-----------------------------+------------------+
|   PROFILE NAV    |    MAIN CONTENT             |  ACTIONS + GOV   |
|   (240px)        |    (flex, fills)            |  (280px)         |
+------------------+-----------------------------+------------------+
```

### Left Panel

**Agent identity card**

- Agent name
- Job title
- Status badge
- Authority mode badge
- Personality type badge
- Model

**Navigation sections**

- Overview (default)
- Eval Scores
- Configuration History
- Run History
- Governance

On click: scrolls center panel to that section or swaps content.

### Center Panel

**Overview section**

Agent name as page heading.

Subheading: job title.

Three stats inline at top:
- Current eval score (large): `91%` with tier label `EXCELLENT`
- Total runs: `247`
- Blocked: `6`

**Principles section**

`INTERNAL IDENTITY`

Full persona description. Scrollable if long.

`NON-NEGOTIABLES`

Full restrictions list.

`RESPONSIBILITIES`

Full job responsibilities (the JD). This is the full version of what the popup shows truncated.

**Personality type section**

Current personality type: badge + plain-English description of what it means.

Project owner: selector to change type.

```text
Personality Type
[ DIRECT ▾ ]
Concise, action-oriented. Minimal explanation. Suited to fast execution contexts.
```

Note: "Changes apply to all users in this project."

On change: writes `agentProjectConfig.personalityType` to Firestore, begins new eval segment.

**Custom agent section (custom agents only)**

Shows:
- Domain context field (one editable field)
- Allowed actions (editable tag list — add/remove from platform action library)
- Save button

On save: creates new config version record, new eval segment begins.

---

**Eval Scores section**

Header: `EVAL SCORES`

Current segment:

```text
Config v[n]  |  Runs [n]  |  Score: [n]%  |  Tier: [GOOD]
```

Score breakdown table:

| Data Point | Weight | Score |
| --- | --- | --- |
| Governance Pass Rate | 30% | 94% |
| Promote Rate | 25% | 87% |
| Task Completion Rate | 20% | 89% |
| Action Quality Rate | 15% | — (collecting) |
| Memory Write Quality | 5% | 96% |
| Behavioral Consistency | 5% | 91% |

Historical segments:

```text
Config v1  Runs 1–47     91%  Excellent   Blocked: 2
Config v2  Runs 48–103   87%  Good        Blocked: 6  ← change applied
Config v3  Runs 104+     ...  ...         ...
```

Each segment row expandable to show the config that was active.

---

**Configuration History section**

Versioned list of all config changes.

Each entry:
- Config version number
- Changed by (who made the change)
- Timestamp
- Diff of what changed (e.g. "Personality type: collaborative → direct")
- Eval score for this segment (final score if closed, live score if current)

On click: expand to see full config snapshot at that version.

---

**Run History section**

Same as Agent Directory run list, with additional filtering:
- Filter by config version
- Filter by governance outcome

---

**Governance section**

Governance rules that apply to this agent.

Each rule: condition, action (block / require_ack / escalate), created by, created at.

Recent governance decisions feed.

### Right Panel

**Control actions**

- `Pause` — `POST /api/v1/agents/[id]/suspend`
- `Resume` — `POST /api/v1/agents/[id]/resume`
- `Halt` — opens halt confirmation dialog with trigger + reason

**Halt confirmation dialog**

Fields:
- Trigger: `ruleViolation` / `safetySignal` / `humanOverride` / `evaluationFailure`
- Reason (required)

On confirm: `POST /api/v1/agents/[id]/halt { trigger, reason }`

**Import agent (custom agents only)**

If this agent was created via import, shows import metadata:
- Original agent name
- Import timestamp
- Note: "Eval history begins from first run under Core."

**Links**

- `View in Ledger` → `/projects/[id]/ledger` filtered by this agent
- `View Runs` → links to run history section

### State

```ts
{
  agent: Agent
  agentProjectConfig: AgentProjectConfig
  evalSegments: EvalSegment[]
  currentSegmentScore: EvalScore
  configHistory: AgentConfigVersion[]
  runs: AgentRun[]
  govRules: GovernanceRule[]
  govDecisions: GovDecisionRecord[]
  activeSection: "overview" | "eval" | "config" | "runs" | "gov"
  saving: boolean
  haltDialogOpen: boolean
  isProjectOwner: boolean
}
```

---

## Screen 6 — Ledger Viewer

### Purpose

Read-only view of the immutable decision record. Three panels: evaluation selector left, sealed items center with tabs, full item detail right.

### Route

```text
/projects/[id]/ledger
```

### Mode

Three-panel layout. No input bar.

### Data Source

Single call: `GET /api/v1/ledger/ui?evaluationId=...&limit=50`

### Left Panel

**Evaluation list**

Header: `EVALUATIONS` + `+ New` button

Lists all evaluations for this project.

Each row: title, status badge (open / closed), date.

On select: reload center panel scoped to that evaluation.

`+ New`: `POST /api/v1/evaluations`, then select new evaluation.

### Center Panel

**Breadcrumb**

```text
[PROJECT NAME] / LEDGER
```

**Tabs**

Three tabs across top of center panel:

| Tab | Content | Data source |
| --- | --- | --- |
| Sealing | Sealed ledger items | `sealing.items` |
| Evals | Governance activity | `evals.records` |
| Gov | Agent states and decisions | `gov.agents`, `gov.recentDecisions` |

**Sealing tab**

Each item row shows:
- Type badge (`decision` / `artifact` / `task` / `note` / `code`)
- Summary (truncated)
- Authority mode badge
- Actor: human name or agent name
- Timestamp

Sorted by `createdAt` descending.

On click: load full detail in right panel (cold retrieval: `GET /api/v1/ledger/[id]`)

Empty state: "No sealed decisions for this evaluation."

Load more button. Never auto-load beyond `limit=50`.

**Evals tab**

Each record: agent name, action attempted, outcome badge (allowed / blocked), timestamp.

Aggregates row at top: total attempts, blocked count, per-agent breakdown.

**Gov tab**

Agent list: name, job title, status, allowed actions.

Recent decisions list: agent, action, outcome badge, reason, timestamp.

### Right Panel

**Item detail**

Empty state: "Select an item to view full detail."

When item selected (cold retrieval `GET /api/v1/ledger/[id]`):

- Full summary or content
- Type badge
- Authority mode badge
- Actor (type + name)
- Agent attribution (if agent-involved)
- Run ID
- Tags
- Evaluation context
- Evidence references (`opaqueRefs`)
- Timestamp
- `Copy ID` button

### State

```ts
{
  project: Project
  evaluations: EvaluationSummary[]
  selectedEvaluationId: string | null
  ledgerItems: LedgerItemSummary[]
  evalRecords: EvalRecordSummary[]
  govAgents: GovAgentSummary[]
  govDecisions: GovDecisionSummary[]
  selectedItemId: string | null
  selectedItemDetail: LedgerItem | null
  activeTab: "sealing" | "evals" | "gov"
  loading: boolean
}
```

---

## Shared Components

### Promote Confirmation Panel

Triggered by tapping `PROMOTE` beneath any message bubble or board card.

Appears as an overlay anchored to the source item. Does not navigate away.

Fields:
- Summary (pre-filled from message content or card title, editable)
- Type selector: `decision` / `artifact` / `task` / `note` / `code`
- Authority mode selector — options depend on source reply's truth posture:
  - `truthPosture === "unknown"`: only `human_led` and `human_in_the_loop` are offered. `agent_autonomous` is not rendered. (Core will also reject it with 400 if attempted.)
  - `truthPosture === "known"` or `"inferred"`: all three authority modes available. Default: `human_led`.
- Truth posture (pre-filled from agent response metadata, read-only display: `● KNOWN` / `◐ INFERRED` / `○ UNKNOWN`)
- Tags (multi-value input)
- Evidence references (optional)

On confirm:
1. If no evaluation exists for this project: `POST /api/v1/evaluations`
2. `POST /api/v1/ledger/promote { evaluationId, summary, authorityMode, actor, type, tags, projectId, runId, truthPosture }`
3. Close panel
4. Source item `PROMOTE` label changes to `SEALED` state

On cancel: close panel, no writes.

### Start Meeting Modal

Triggered by "Start Meeting" button in Room or Track.

```text
+---------------------------------------+
|  Start meeting                        |
|  Select 1 or more agents to join.    |
|                                       |
|  [ ] Toni / Systems Arch              |
|  [ ] Izzi / Adversarial Colleague     |
|  [ ] Cindi / Wisdom & Teacher         |
|                                       |
|  Meeting name (optional)              |
|  [____________________________]       |
|                                       |
|  [  Start  ]  [  Cancel  ]           |
+---------------------------------------+
```

Start button disabled until at least one agent is checked.

On Start:
- `POST /api/v1/meetings { participantAgentIds, name, projectId }`
- Navigate to Board (PM Console mode) with meeting active
- Meeting bar appears at bottom of board

### Promote Meeting Modal

Triggered when `END MEETING` is clicked on the meeting bar.

```text
+---------------------------------------+
|  Promote this Meeting?                |
|  Save this meeting to your ledger.   |
|                                       |
|  Meeting name (optional)              |
|  [____________________________]       |
|                                       |
|  [  Yes  ]  [  No  ]                 |
+---------------------------------------+
```

On Yes:
- `POST /api/v1/ledger/promote { evaluationId, summary: meetingName, type: "decision", authorityMode: "human_led", actor, projectId }`
- Close modal
- Meeting ends

On No:
- Meeting ends without promoting
- No ledger write

### Agent Popup

A scrollable overlay triggered when a user clicks an agent's name or avatar anywhere in the product — from the agent selector dropdown, the agent list in the Directory, or any agent attribution on a message bubble.

The popup provides quick reference without navigating away.

```text
+--------------------------------------------+
|  TONI                                       |
|  Systems Architect  ·  ANALYTICAL  ·  91%   |
|                                             |
|  INTERNAL IDENTITY                          |
|  [persona description — full text,          |
|   scrollable]                               |
|                                             |
|  NON-NEGOTIABLES                            |
|  [restrictions list]                        |
|                                             |
|  RESPONSIBILITIES                           |
|  [job description — full list,              |
|   scrollable]                               |
|                                             |
|  ────────────────────────────────           |
|  Runs: 247   Blocked: 6   Score: 91%        |
|                                             |
|  [ View Full Profile ]                      |
+--------------------------------------------+
```

**Popup contents:**

- Agent name (large)
- Job title + personality type badge + eval score
- Full `INTERNAL IDENTITY` text (scrollable)
- Full `NON-NEGOTIABLES` list (scrollable)
- Full `RESPONSIBILITIES` / JD (scrollable)
- Three key stats: Runs, Blocked, Score
- `View Full Profile` button → navigates to `/agents/[id]`

**Non-editable.** All fields are read-only in the popup. Configuration is only possible on the Agent Profile page.

**Custom fields are not shown in the popup.** Personality type badge is visible but not changeable here.

Closes on click outside or pressing Escape.

Data source: `GET /api/v1/agents/[id]` + `agentProjectConfig` from Firestore.

---

### Agent Principles Panel

Collapsible panel in the bottom input bar. Toggled by `PRINCIPLES` button.

Shows the selected agent's:
- `INTERNAL IDENTITY` — persona description
- `NON-NEGOTIABLES` — restrictions

Read-only. Updates when a different agent is selected.

Collapses on second toggle or on message submit.

### Agent Thinking Indicator

Shown in the message feed while `isRunning: true`.

One indicator per active agent.

Shows: agent name, animated pulse.

Collapses and is replaced by the agent reply when the run completes.

### Agent Message Bubble

Used in Room and Track feeds.

- Aligns left
- Agent role label above bubble
- Truth posture indicator beside role label: `● KNOWN` (muted green) / `◐ INFERRED` (muted amber) / `○ UNKNOWN` (muted grey)
- On hover of indicator: tooltip showing basis ("Grounded in 2 memory references" / "Reasoned from available context" / "Agent lacks information to answer reliably")
- Reply text
- `PROMOTE` label beneath bubble (pre-fills truth posture in Promote confirmation panel)
- Action chips for applied actions
- Trace toggle (expands: model name, tokens used, latency, truth posture, memory refs)

### Human Message Bubble

- Aligns right
- `YOU` label above bubble
- Message text
- `PROMOTE` label beneath bubble

### Board Card

Used in Tasks, Decisions, Risks columns.

- Title
- Created-by attribution with agent badge if agent-created
- `PROMOTE` button
- Draggable between columns

---

## Navigation Map

```text
/                              Workspace Home
/projects/[id]/room            Project Room
/projects/[id]/tracks/[id]     Track Workspace
/projects/[id]/board           Board (+ PM Console during meetings)
/projects/[id]/ledger          Ledger Viewer
/agents                        Agent Directory
/agents/[id]                   Agent Profile (full control page)
```

All project-scoped routes share the same left panel.

Navigating between projects updates the left panel active state and loads the new project's room.

The Board activates into PM Console mode when a meeting is running. Returning to the board after a meeting ends shows standard board view.

Agent name / avatar is clickable anywhere in the product. Click always opens the Agent Popup. The popup contains a `View Full Profile` link to the Agent Profile page.

---

## Meeting Model Notes (current vs target)

This section documents what Core has built today and what the target model looks like so Build UI does not make incorrect assumptions.

### What is built in Core today

| Feature | Status | Notes |
| --- | --- | --- |
| Human text input | Live | `message` on `run/meeting` |
| Human transcribe (voice → STT → text) | Live | Voice session + transcribe API |
| Agent text reply | Live | Every meeting turn returns `reply` + `truthPosture` |
| Agent audio / TTS | Not in Core | Surface responsibility — if built, take `reply` text and pass to a TTS engine |
| Turn cap enforcement | Partial | Enforced when a stored `meetingId` is passed. Ad-hoc inline multi-agent runs have no turn cap today |
| First-wins (cancel other agents) | Not built | All agents currently run to completion. "First to finish" affects display order only. Token cost is N× per turn |

### Current behavior to design for

Every open question to a multi-agent meeting returns **N replies** (one per agent). All agents run to completion. Build UI should:

- Display all N replies in the order Core returns them — do not imply only one agent will respond
- Treat the turn limit as finite — never use copy that suggests conversations can run indefinitely
- Handle 429 from turn cap: surface the reason and let the user start a new meeting

### Target model (contribution stream — not yet built)

Core's design direction is a **contribution stream**: one ordered list of contributions, each from a single speaker (human or agent). Open question → all agents race, first to finish wins, others are cancelled. See `docs/MEETING_NATURAL_CONVERSATION.md` and `docs/MEETING_ROUNDTABLE_VISION.md` in Core.

When that model ships:
- Build will receive **one agent reply** per open question (not N)
- The message feed naturally becomes a single chronological stream of contributions
- Token cost drops significantly

### Natural conversation modalities

| Modality | Human input | Agent output |
| --- | --- | --- |
| Text / chat | Type | Text reply |
| Transcribe only | Speak (STT → text) or type | Text reply |
| Transcribe + agent audio | Speak (STT → text) or type | Text reply + surface plays it via TTS |

The platform should treat all three as first-class. Human input is always content + optional source (`text` or `transcription`). Agent audio is always a surface toggle — Core does not do TTS.
