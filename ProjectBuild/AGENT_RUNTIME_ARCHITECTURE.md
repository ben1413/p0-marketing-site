# AGENT_RUNTIME_ARCHITECTURE

## Purpose

Define how agents execute tasks inside Project0 Core.

The runtime is responsible for assembling context, executing models, handling tool usage, enforcing governance, and returning structured results to surfaces such as ProjectBuild.

The runtime is deterministic and policy-aware.

Agent execution always occurs inside Core. External surfaces never execute models directly.

---

## Runtime Responsibilities

The agent runtime manages:

- Context assembly
- Model invocation
- Tool orchestration
- Governance enforcement
- Memory interaction
- Trace recording
- Structured action normalization

The runtime converts user or system intent into governed agent execution.

---

## Agent Execution Lifecycle

Every run follows the same lifecycle.

```text
Intent
  ->
Context Assembly
  ->
Model Execution
  ->
Tool / Action Handling
  ->
Governance Validation
  ->
Result Packaging
  ->
Trace Recording
```

---

## Step 1 — Intent Reception

Intent may originate from:

- Human input
- System workflow
- Another agent
- Scheduled execution

Run APIs:

```text
POST /api/v1/agents/run/simple
POST /api/v1/agents/run
POST /api/v1/agents/run/meeting
```

The request includes:

- `agentId`
- `message` or `prompt`
- `memoryScope`
- Optional: `runId`, `allowActions`, `humanAck`, `writeMemory`

---

## Step 2 — Cognitive Context Assembly

Before the model executes, Core constructs a cognitive context bundle.

Function:

```text
assembleCognitiveContextBundle()
```

The bundle contains:

- Agent identity
- Persona (`AgentPersona`)
- Job role (`AgentJob`)
- Team map
- Mission context
- Hot memory (recent `brainDocs`, limit 20)
- Warm memory (`memorySummaries`, limit 10)
- System instructions

### Persona vs Job

These are distinct concepts in Core.

**Persona** is identity. It is long-lived and defines who the agent is.

Fields:

```ts
{
  name: string
  role: string
  capabilities: string[]
  restrictions: string[]
  defaultAuthority: "human-led" | "human-in-the-loop" | "agent-autonomous"
}
```

**Job** is mission. It is task-scoped and defines what the agent is doing right now.

Fields:

```ts
{
  personaId: string
  objective: string
  allowedActions: string[]
  disallowedActions: string[]
  authorityLevel: "human-led" | "human-in-the-loop" | "agent-autonomous"
}
```

Restrictions are persona-level and long-lived.

`disallowedActions` are job-level and mission-scoped.

Both feed the governance gate.

---

## Step 3 — System Prompt Construction

The runtime converts the bundle into a structured system prompt.

Function:

```text
buildSystemPromptFromBundle()
```

Prompt components include:

- Agent identity and role
- Mission and objective
- Team relationships
- Recent memory (hot)
- Indexed recall (warm)
- System instructions

This prompt defines the cognitive environment of the agent before any reasoning begins.

Human analogy: understanding who you are, your role, and the current situation before acting.

---

## Step 4 — Model Execution

Core invokes the configured model from the model registry.

Model configuration includes:

- Provider
- Model name
- Context limit
- Token cost

During execution the agent may:

- Produce text responses
- Request tool calls
- Request structured actions
- Update memory

All outputs are captured in the run trace.

---

## Step 5 — Tool and Action Handling

Agents may request operations during execution.

These are returned as structured `actionsRequested`.

Example actions:

```text
create_board_task
move_board_task
assign_board_task
write_brain
supersede_brain
draft_decision
create_risk
flag_risk
```

Actions are normalized before being returned to the calling surface.

Agents never directly mutate workspace state.

They request actions. Build or the governance gate decides what gets applied.

---

## Step 6 — Governance Enforcement

All requested actions pass through the governance gate before being returned.

The gate is deterministic. It evaluates every action against:

1. `allowedActions` from the job
2. `disallowedActions` from the job (exact match blocks)
3. `restrictions` from the persona
4. Governance rules from the rule registry
5. `humanAckRequired` / `humanAckReceived`

### Governance Gate Input

```ts
{
  action: string
  allowedActions: string[]
  restrictions: string[]
  disallowedActions?: string[]
  humanAckRequired: boolean
  humanAckReceived: boolean
  rules?: GovernanceRule[]
  agentId?: string
}
```

### Governance Gate Result

```ts
{
  allow: boolean
  reason?: string
}
```

Possible outcomes:

- `allow` — action proceeds
- `block` — action is rejected
- `require_human_ack` — execution pauses pending human acknowledgment
- `escalate` — elevated review required

Every decision is recorded as a `GovDecisionRecord`.

```ts
{
  agentId: string
  action: string
  outcome: "allowed" | "blocked"
  reason?: string
  timestamp: string
  runId?: string
}
```

These records are queryable via:

```text
GET /api/v1/gov/decisions
GET /api/v1/ledger/ui   (behavior stream)
```

---

## Step 7 — Result Packaging

Once execution completes, the runtime returns a structured response.

Response structure:

```ts
{
  ok: true
  reply: string
  actionsRequested: ActionRequest[]
  memoryUsed: object
  trace: object
  completedAt: string
  agentId: string
}
```

For meeting runs, replies are wrapped per agent:

```ts
{
  ok: true
  replies: MeetingTurnReply[]
}
```

Where each `MeetingTurnReply` contains:

```ts
{
  agentId: string
  reply: string
  completedAt: string
  actions: ActionRequest[]
  trace: object
}
```

This allows ProjectBuild to render results and apply approved actions.

---

## Step 8 — Trace Recording

Each run produces a trace record.

Trace data includes:

- Model used
- Token usage (`inputTokens`, `outputTokens`)
- Latency
- Tool calls
- Governance decisions
- Actions requested
- `requestId`

Trace records support:

- Debugging
- Evaluation
- Cost monitoring
- Audit review

---

## Agent Control

Beyond the run lifecycle, agents can be halted, suspended, or resumed via explicit control operations.

### Control Operations

```text
POST /api/v1/agents/[id]/halt
POST /api/v1/agents/[id]/suspend
POST /api/v1/agents/[id]/resume
```

Each creates an `AgentControlRecord`:

```ts
{
  agentId: string
  op: "halt" | "suspend" | "resume"
  trigger: "ruleViolation" | "safetySignal" | "humanOverride" | "evaluationFailure"
  reason: string
  triggeredBy: { actorId: string, orgId: string }
  timestamp: string
}
```

### Control Semantics

- `halt`: kill job immediately
- `suspend`: pause until human review
- `resume`: restart after review

If the latest control record for an agent is `halt` or `suspend`, the agent is stopped until a `resume` is recorded.

Control records are queryable via:

```text
GET /api/v1/gov/control
```

---

## Action Authorization Check

Build or external systems can pre-check whether an action is allowed for an agent without running it.

```text
POST /api/v1/agents/authorize
```

Request body:

```ts
{
  agentId: string
  action: string
}
```

Response:

```ts
{
  allowed: boolean
  reason: string | null
}
```

---

## Memory Interaction

Agents interact with memory through structured operations during and after execution.

| Operation | API |
| --- | --- |
| Read hot memory | `GET /api/v1/brain/recall` |
| Write brain | `POST /api/v1/brain/put` |
| Supersede brain entry | `POST /api/v1/brain/supersede` |
| Promote to ledger | `POST /api/v1/ledger/promote` |

Memory scopes:

- `working`: project-level shared (default)
- `core`: persistent cross-project
- `team`: team-scoped
- `personal`: agent-specific, requires `agentId`

Full architecture is in `MEMORY_ARCHITECTURE.md`.

---

## Agent Orchestration

Core supports multi-agent sessions through meeting runs.

```text
POST /api/v1/agents/run/meeting
```

Supported routing modes:

- `completion_time`: all agents run in parallel, replies sorted by completion time
- `round_robin`: agents run sequentially
- `role_priority`: agents run in `agentOrder` sequence, others appended after

Conversation history is stored per `meetingId` when provided.

Turn count is tracked and subject to cost guardrails.

Full execution model is in `EXECUTION_MODEL.md`.

---

## Runtime Principles

- Agents never directly mutate system state.
- All actions pass through the governance gate.
- Memory is layered and bounded.
- Ledger entries require explicit Promote.
- Execution traces are recorded for every run.
- Control operations are logged with actor attribution.

---

## Related Documents

- `EXECUTION_MODEL.md`
- `GOVERNANCE_ARCHITECTURE.md`
- `MEMORY_ARCHITECTURE.md`
- `LEDGER_INTEGRATION.md`
- `DATA_SCHEMA_AND_API_MAP.md`
