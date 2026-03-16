# GOVERNANCE_ARCHITECTURE

## Purpose

Define how Project0 Core enforces policy over agent actions.

Governance is the control layer that sits between agent intent and actual execution.

Every requested action passes through governance before it can proceed.

Governance is deterministic, logged, and audit-traceable.

---

## Why Governance Exists

AI agents can request actions with real consequences — creating tasks, sealing decisions, writing memory, generating artifacts.

Without a policy layer, agents would have unconstrained execution authority.

Governance ensures that:

- Agents only act within their defined scope
- Human oversight can be required at any step
- Every decision (allow or block) is recorded
- Safety signals can halt agents immediately
- Authority can be explicitly delegated and revoked

---

## Governance Components

The governance system in Core has four interacting parts.

| Component | What it does |
| --- | --- |
| Governance Gate | Evaluates each action at runtime |
| Governance Rules | User-defined policies that extend the gate |
| Authority Delegation | Explicit grants of autonomy from human to agent |
| Agent Control | Halt, suspend, and resume operations |

---

## The Governance Gate

The gate is the deterministic runtime check that runs against every agent action request.

### Gate Input

```ts
{
  action: string
  allowedActions: string[]       // from AgentJob
  restrictions: string[]         // from AgentPersona
  disallowedActions?: string[]   // from AgentJob, exact match blocks
  humanAckRequired: boolean
  humanAckReceived: boolean
  rules?: GovernanceRule[]       // from user-defined rule registry
  agentId?: string
}
```

### Gate Logic

The gate evaluates in order:

1. Is the action in `disallowedActions`? Block.
2. Is the action not in `allowedActions`? Block.
3. Does the action violate a persona `restriction`? Block.
4. Does a matching governance rule require `block`? Block.
5. Does a matching governance rule require `require_human_ack`? Pause for acknowledgment.
6. Does a matching governance rule require `escalate`? Escalate.
7. Is `humanAckRequired` true and `humanAckReceived` false? Block until ack.
8. Otherwise: allow.

### Gate Result

```ts
{
  allow: boolean
  reason?: string
}
```

Every gate evaluation produces a `GovDecisionRecord`.

```ts
{
  agentId: string
  action: string
  outcome: "allowed" | "blocked"
  reason?: string
  timestamp: string
  runId?: string
  jobId?: string
}
```

Decisions are queryable via:

```text
GET /api/v1/gov/decisions?agentId=...&since=...&limit=...
```

---

## Governance Rules

Governance rules are user-defined policies that extend the gate beyond the default `allowedActions` and `restrictions` checks.

### Rule Schema

```ts
{
  id: string
  projectId: string
  type: "block" | "require_ack" | "escalate"
  condition: {
    action?: string    // match by action name
    agentId?: string   // match by agent
    keyword?: string   // match by keyword in message
  }
  action: "block" | "require_human_ack" | "log"
  reason: string       // explains why the rule exists
  enabled: boolean
}
```

### Rule Types

| Type | Meaning |
| --- | --- |
| `block` | Prevent the action entirely |
| `require_ack` | Pause and require explicit human acknowledgment |
| `escalate` | Flag for elevated review |

### Rule Actions

| Action | Behavior |
| --- | --- |
| `block` | Action is rejected |
| `require_human_ack` | Execution pauses until human acknowledges |
| `log` | Action is allowed but the event is recorded |

### Rule API

Requires `admin` role.

```text
GET  /api/v1/governance-rules
POST /api/v1/governance-rules
GET  /api/v1/governance-rules/[id]
PUT  /api/v1/governance-rules/[id]
DELETE /api/v1/governance-rules/[id]
```

Create request body:

```ts
{
  type: "block" | "require_ack" | "escalate"
  condition: {
    action?: string
    agentId?: string
    keyword?: string
  }
  action: "block" | "require_human_ack" | "log"
  reason: string      // required
  enabled?: boolean   // default: true
}
```

---

## Authority Delegation

Delegation is the explicit grant of autonomy from a human to an agent.

By default, agents operate under the authority level defined in their Persona and Job.

Delegation allows a human actor to extend `agent_autonomous` authority to a specific agent, scoped and time-limited.

### Delegation Schema

```ts
{
  id: string
  projectId: string
  actorId: string                                         // the human granting authority
  agentId: string                                         // the agent receiving it
  authorityMode: "human_in_the_loop" | "agent_autonomous"
  scope?: string                                          // optional scope constraint
  expiresAt?: string                                      // optional ISO date expiry
  createdAt: string
}
```

### Delegation API

Requires `admin` role.

```text
POST /api/v1/authority/delegations
GET  /api/v1/authority/delegations
GET  /api/v1/authority/delegations/[id]
DELETE /api/v1/authority/delegations/[id]
```

Create request body:

```ts
{
  agentId: string                                         // required
  authorityMode: "human_in_the_loop" | "agent_autonomous"
  actorId?: string                                        // defaults to authenticated user
  scope?: string
  expiresAt?: string
}
```

List query params:

```text
agentId     string    (filter by agent)
activeOnly  boolean   (filter to non-expired delegations)
```

### Authority Mode Semantics in Delegation

Delegation modes are a subset of the full authority mode set:

| Delegation Mode | Meaning |
| --- | --- |
| `human_in_the_loop` | Agent proposes. Human must approve. |
| `agent_autonomous` | Agent may act and Promote directly without human approval. |

`human_led` is not a delegation mode. It is the default state and requires no delegation record.

---

## Persona and Job Authority

Governance constraints are defined at two levels.

### Persona Level (Identity)

`AgentPersona` defines who the agent is.

```ts
{
  capabilities: string[]
  restrictions: string[]
  defaultAuthority: "human-led" | "human-in-the-loop" | "agent-autonomous"
}
```

`restrictions` are long-lived behavioral constraints. They never expire with a job.

### Job Level (Mission)

`AgentJob` defines what the agent is doing right now.

```ts
{
  allowedActions: string[]
  disallowedActions: string[]
  authorityLevel: "human-led" | "human-in-the-loop" | "agent-autonomous"
}
```

`allowedActions` defines the permitted action surface for this specific mission.

`disallowedActions` explicitly block actions even if they would otherwise be allowed.

Both are evaluated by the governance gate on every run.

---

## Agent Control

Agent control allows operators to immediately change the execution state of an agent.

### Control Operations

```text
POST /api/v1/agents/[id]/halt
POST /api/v1/agents/[id]/suspend
POST /api/v1/agents/[id]/resume
```

### Control Semantics

| Operation | Meaning |
| --- | --- |
| `halt` | Kill the agent's job immediately |
| `suspend` | Pause the agent until human review |
| `resume` | Restart the agent after review |

If the latest `AgentControlRecord` for an agent is `halt` or `suspend`, the agent cannot execute until a `resume` is recorded.

### Control Triggers

Each control operation requires a trigger:

| Trigger | Meaning |
| --- | --- |
| `ruleViolation` | A governance rule was violated |
| `safetySignal` | A safety concern was detected |
| `humanOverride` | A human operator manually intervened |
| `evaluationFailure` | An evaluation pipeline identified a failure |

### Control Record Schema

```ts
{
  agentId: string
  op: "halt" | "suspend" | "resume"
  trigger: "ruleViolation" | "safetySignal" | "humanOverride" | "evaluationFailure"
  reason: string
  triggeredBy: { actorId: string, orgId: string }
  timestamp: string
  projectId: string
}
```

Control records are queryable via:

```text
GET /api/v1/gov/control
```

Requires `admin` role.

---

## Evaluation-Triggered Governance

Evaluation results can inform governance decisions.

An `EvaluationSignal` carries:

```ts
{
  evaluationId: string
  targetAgentId: string
  recommendation: string
  severity: "low" | "medium" | "high" | "critical"
  evaluatedAt: string
}
```

In v1, evaluation signals do not automatically trigger governance changes. Humans review evaluation results and decide to adjust rules, delegations, or issue control operations.

This is intentional. Automatic governance mutation based on model evaluation is a v2+ capability.

---

## Governance in the Ledger UI

The Ledger UI surface (`GET /api/v1/ledger/ui`) includes a governance panel.

It returns:

```ts
gov: {
  agents: GovAgentSummary[]         // active agents with their allowed actions
  recentDecisions: GovDecisionSummary[]  // recent allow/block records
}
```

This gives Build a live view of:

- Which agents are active and what they are permitted to do
- Recent governance gate outcomes
- Blocked actions with reasons

Build should surface this in the Agent Directory and Ledger Viewer.

---

## Governance Principles

- The gate is deterministic. The same input always produces the same output.
- Every gate decision is recorded, whether allow or block.
- Restrictions are persona-level and cannot be overridden by job configuration.
- `disallowedActions` block at the job level regardless of `allowedActions`.
- Human acknowledgment can be required before any action executes.
- Agents can be halted, suspended, or resumed with a logged reason and actor attribution.
- Delegation is always explicit, scoped, and time-boundable.
- Governance rules require a `reason` field — every policy must be explainable.

---

## Related Documents

- `AGENT_RUNTIME_ARCHITECTURE.md`
- `EXECUTION_MODEL.md`
- `TRUST_BOUNDARY.md`
- `LEDGER_INTEGRATION.md`
- `DATA_SCHEMA_AND_API_MAP.md`
