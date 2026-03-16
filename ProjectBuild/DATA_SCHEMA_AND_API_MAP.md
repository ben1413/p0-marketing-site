# DATA_SCHEMA_AND_API_MAP

## Purpose

Map every Core API endpoint Build needs to call, with its real request and response shapes, so engineers can build against the live system without guessing.

These schemas reflect the actual Zod validators and route handlers in Core. They are the source of truth for integration.

---

## Core API Base

```text
https://<core-host>/api/v1
```

All routes require authentication. Auth is project-scoped.

---

## Agent Execution

### Run Simple

The smallest unit of work. One agent, one prompt, one response.

```text
POST /api/v1/agents/run/simple
```

Request body:

```ts
{
  agentId: string                // required
  message?: string               // required if prompt not set
  prompt?: string                // required if message not set
  memoryScope: "working" | "core" | "team" | "personal"
  runId?: string
  allowActions?: string[]
  actions?: unknown[]
  writeMemory?: boolean
  writeMemoryTags?: string[]
  writeMemoryPersona?: string
  writeMemoryJobTitle?: string
  humanAck?: boolean
}
```

Response body:

```ts
{
  ok: true
  reply: string
  trace: object
  memoryUsed: object
  actionsRequested: ActionRequest[]
  completedAt: string
  agentId: string
}
```

### Run Orchestration

Single agent, multi-step task with tool calls and memory writes.

```text
POST /api/v1/agents/run
```

Request body shares the same shape as `run/simple`.

Core manages tool execution, action normalization, and trace persistence internally.

### Agent Orchestration (Meeting Run)

Multiple agents collaborating in a shared session.

```text
POST /api/v1/agents/run/meeting
```

Request body:

```ts
{
  message: string                // required
  memoryScope: "working" | "core" | "team" | "personal"
  routing?: "completion_time" | "round_robin" | "role_priority"
  agentIds?: string[]            // required if meetingId not provided
  meetingId?: string             // required if agentIds not provided
  agentOrder?: string[]          // required when routing is "role_priority"
  runId?: string
  humanAck?: boolean
}
```

Response body:

```ts
{
  ok: true
  replies: MeetingTurnReply[]
}
```

Where `MeetingTurnReply` is:

```ts
{
  agentId: string
  reply: string
  completedAt: string
  actions: ActionRequest[]
  trace: object
}
```

Routing modes:

- `completion_time`: all agents run in parallel, replies sorted by completion time.
- `round_robin`: agents run in sequence, cycling through the list.
- `role_priority`: agents run in order defined by `agentOrder`, remaining agents appended after.

---

## Agent Management

### List Agents

```text
GET /api/v1/agents/list
```

Returns all agents in the project.

### Get Agent

```text
GET /api/v1/agents/[id]
```

### Register Agent

```text
POST /api/v1/agents/register
```

### Update Agent

```text
POST /api/v1/agents/update
```

### Halt / Suspend / Resume Agent

```text
POST /api/v1/agents/[id]/halt
POST /api/v1/agents/[id]/suspend
POST /api/v1/agents/[id]/resume
```

### Authorize Agent

```text
POST /api/v1/agents/authorize
```

### List Agent Runs

```text
GET /api/v1/agents/runs
```

---

## Brain (Working Memory)

Brain is the mutable working memory store. Durable, scoped, supersedable.

### Write Brain

```text
POST /api/v1/brain/put
```

Request body:

```ts
{
  key: string                    // required
  content: string                // required
  memoryType?: "working" | "core" | "team" | "personal"  // default: "working"
  persona?: string
  jobTitle?: string
  agentId?: string
  decayAt?: string               // ISO date string
  source?: "human" | "agent" | "system"  // default: "human"
  confidence?: number
}
```

### Recall Brain

```text
GET /api/v1/brain/recall
```

Query params:

```text
memoryType  "working" | "core" | "team" | "personal"  (default: "working")
limit       number  (default: 50, max: 200)
persona     string  (optional filter)
jobTitle    string  (optional filter)
agentId     string  (optional filter, required for "personal" scope)
```

Response:

```ts
{
  ok: true
  items: BrainDoc[]
}
```

### Supersede Brain Entry

```text
POST /api/v1/brain/supersede
```

Marks an existing brain entry as superseded and creates the replacement.

---

## Ledger

The ledger is append-only. The only write path is Promote.

### Promote

```text
POST /api/v1/ledger/promote
```

Request body:

```ts
{
  evaluationId: string           // required
  summary?: string               // required if content not set
  content?: string               // required if summary not set
  authorityMode: "human_led" | "human_in_the_loop" | "agent_autonomous"
  actor?: {
    type?: "human" | "agent" | "service"
    id?: string
  }
  actorId?: string
  type?: "note" | "decision" | "task" | "artifact" | "code"  // default: "decision"
  title?: string
  tags?: string[] | string
  customerId?: string
  projectId?: string
  runId?: string
  agent?: string
  sourceMessageId?: string
  decisionState?: string
  clientCommitmentHash?: string
  bouncePii?: boolean
  payload?: Record<string, unknown>
  opaqueRefs?: string[]          // artifact ids or URIs, max 512 chars each
}
```

Notes:

- `summary` or `content` must be present and non-empty.
- `authorityMode` must exactly match one of the three values.
- `type` defaults to `"decision"` when not provided.
- Calling this creates both a `ledgerItem` and a `memorySummary` index entry.

### Get Ledger Item

```text
GET /api/v1/ledger/[id]
```

Cold retrieval. Full record including evidence and metadata.

### List Ledger Items

```text
GET /api/v1/ledger
```

Returns a paginated list of ledger items for the project.

### Ledger UI

Combined payload for rendering the Ledger panel. Returns sealing, evals, and governance data in a single call.

```text
GET /api/v1/ledger/ui
```

Query params:

```text
evaluationId    string   (optional; scopes sealing panel to one evaluation)
limit           number   (default: 50, max: 200)
```

Response shape:

```ts
{
  ok: true
  sealing: {
    evaluations: EvaluationSummary[]
    items: LedgerItemSummary[]
    totalCount: number
  }
  evals: {
    records: EvalRecordSummary[]
    aggregates: {
      byAgent: { agentId, attemptCount, blockedCount }[]
    }
  }
  gov: {
    agents: GovAgentSummary[]
    recentDecisions: GovDecisionSummary[]
  }
  rateLimitUsage?: object
}
```

Where `LedgerItemSummary` is:

```ts
{
  id: string
  evaluationId: string
  type: string
  title?: string
  summary?: string
  createdAt: string
  authorityMode: string
  actor?: object
  agent?: string
  runId?: string
  tags?: string[]
}
```

### Ledger UI Assessments

```text
GET /api/v1/ledger/ui/assessments
```

### Ledger UI Behavior

```text
GET /api/v1/ledger/ui/behavior
```

---

## Evaluations

Evaluations are the assessment lifecycle for agent outputs. A Promote always requires an `evaluationId`.

### Create Evaluation

```text
POST /api/v1/evaluations
```

### Get Evaluation

```text
GET /api/v1/evaluations/[id]
```

### Close Evaluation

```text
POST /api/v1/evaluations/[id]/close
```

### List Evaluations

```text
GET /api/v1/evaluations
```

---

## Meetings

Meetings are structured multi-agent sessions with durable transcripts.

### Create Meeting

```text
POST /api/v1/meetings
```

### Get Meeting

```text
GET /api/v1/meetings/[id]
```

### Add Turn

```text
POST /api/v1/meetings/[id]/turns
```

### Close Meeting

```text
POST /api/v1/meetings/[id]/close
```

### List Meetings

```text
GET /api/v1/meetings
```

---

## Artifacts

### Generate Artifact

```text
POST /api/v1/artifacts/generate
```

### Get Artifact

```text
GET /api/v1/artifacts/[id]
```

### List Artifacts

```text
GET /api/v1/artifacts/list
```

---

## Governance

### List Governance Rules

```text
GET /api/v1/governance-rules
```

### Create / Update Rule

```text
POST /api/v1/governance-rules
GET  /api/v1/governance-rules/[id]
```

### Governance Control

```text
POST /api/v1/gov/control
```

### Governance Decisions

```text
GET /api/v1/gov/decisions
```

Returns the list of governance gate outcomes: allowed and blocked actions with reasons.

---

## Authority and Delegations

```text
GET  /api/v1/authority/delegations
POST /api/v1/authority/delegations
GET  /api/v1/authority/delegations/[id]
```

---

## Marketplace

### List Assets

```text
GET /api/v1/marketplace
```

### Get Asset

```text
GET /api/v1/marketplace/[id]
```

### Install Asset

```text
POST /api/v1/marketplace/[id]/install
```

### Publish Asset

```text
POST /api/v1/marketplace/[id]/publish
```

---

## Projects (Core-side)

Core maintains its own project registry used for auth scoping.

```text
GET  /api/v1/projects
POST /api/v1/projects
GET  /api/v1/projects/[id]
```

---

## Keys

```text
GET  /api/v1/keys
POST /api/v1/keys/[id]/revoke
```

---

## Events and Observability

```text
GET /api/v1/events
GET /api/v1/metrics/system
```

---

## Memory Scopes Reference

All memory-scoped operations use one of:

| Scope | Description |
| --- | --- |
| `working` | Project-level shared memory. Default. |
| `core` | Persistent cross-project memory. |
| `team` | Team-scoped shared memory. |
| `personal` | Agent-specific private memory. Requires `agentId`. |

---

## Ledger Item Types Reference

| Type | Description |
| --- | --- |
| `decision` | A committed decision. Default. |
| `note` | A sealed note or observation. |
| `task` | A completed task outcome. |
| `artifact` | A sealed artifact reference. |
| `code` | A committed code output. |

---

## Authority Mode Reference

| Mode | Description |
| --- | --- |
| `human_led` | Human initiates and confirms. |
| `human_in_the_loop` | Agent proposes, human approves. |
| `agent_autonomous` | Agent promotes directly via API. No UI approval required. |

---

## Actor Types Reference

| Type | Description |
| --- | --- |
| `human` | A user in the workspace. |
| `agent` | A registered Core agent. |
| `service` | An external system or service account. |

---

## Build-Owned Objects (Firestore)

Build owns these collections and is responsible for their lifecycle.

| Collection | Key Fields |
| --- | --- |
| `workspaces` | `id`, `name`, `owner`, `createdAt` |
| `projects` (Build) | `id`, `workspaceId`, `name`, `description`, `createdAt`, `createdBy` |
| `rooms` | `id`, `projectId`, `createdAt` |
| `tracks` | `id`, `projectId`, `name`, `description`, `createdAt` |
| `threads` | `id`, `trackId`, `createdAt` |
| `boards` | `id`, `projectId` |
| `tasks` | `id`, `projectId`, `title`, `description`, `status`, `createdBy`, `assignedTo`, `createdAt` |
| `decisions` | `id`, `projectId`, `summary`, `status`, `createdBy` |
| `risks` | `id`, `projectId`, `description`, `severity` |

Build reads Core objects via API. Build does not write to Core collections directly.

---

## Key Rules For Build Engineers

- Every Promote call requires a valid `evaluationId` from Core.
- `authorityMode` must match exactly: `human_led`, `human_in_the_loop`, or `agent_autonomous`.
- Either `summary` or `content` must be present in a Promote payload.
- `memoryScope` defaults to `working` for most agent runs.
- `personal` scope requires an explicit `agentId`.
- Use `GET /api/v1/ledger/ui` to populate the Ledger panel. Do not list `ledgerItems` directly for the UI.
- Cold retrieval (`GET /api/v1/ledger/[id]`) should only be called when a user explicitly requests full detail.
- Agents never write to Build collections directly. All agent state changes flow through `actionsRequested` returned by Core.
