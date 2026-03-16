# AGENT_CONFIGURATION_POLICY

## Purpose

Define the rules for how agents are configured, tuned, and customized inside ProjectBuild.

This policy governs what project owners can control, what users can see, what stays locked, and how custom agents are handled. It applies to both platform-provided agents and fully custom agents.

---

## Two Agent Types

ProjectBuild supports two agent types.

| Type | Description |
| --- | --- |
| Platform agent | Pre-built by Project0. Validated behavior, tested eval baseline. |
| Custom agent | Wired by the customer. Fully configurable within platform physics. |

Both types are governed by the same governance gate. Both are evaluated from day one.

---

## Platform Agents — Configuration Policy

### What project owners can control

Project owners can set one project-level configuration per agent per project:

**Personality type**

A discrete behavioral mode that shifts how the agent communicates without altering its core identity, restrictions, or allowed actions.

| Type | Behavior |
| --- | --- |
| `direct` | Concise, action-oriented, minimal explanation |
| `collaborative` | Invites input, builds consensus, asks questions |
| `analytical` | Structured output, data-first, explicit reasoning |
| `advisory` | Considered tone, surfaces trade-offs, experienced register |

Project owners select one personality type per agent per project.

The selection is project-scoped. All users in the project get the same personality type for that agent. Individual users cannot override it.

### What users can see

Users can see the active personality type as a badge on the agent card and in the agent popup.

Users cannot change personality type from any user-facing screen. It is read-only everywhere except the Agent Profile page for project owners.

### What stays locked

The following are always locked regardless of project owner status:

- Agent core identity and persona
- Non-negotiables and restrictions
- Allowed actions list
- Authority mode
- Governance gate logic
- Eval scoring methodology
- Ledger immutability

### Why personality types instead of custom fields

Free-form custom fields introduce unbounded behavioral variation. Two project owners configuring the same agent differently produces agents that cannot be meaningfully compared in evaluations.

Personality types are pre-validated discrete values. The agent's behavior space is bounded. Every run tagged with `personalityType: "direct"` is comparable to every other run with the same tag. Evals remain clean. Ledger records remain meaningful.

---

## Custom Agents — Configuration Policy

### What customers can wire

A customer building a custom agent controls:

- Agent name and persona description
- Job responsibilities (the JD)
- Personality type (selected from the platform-validated set)
- Allowed actions (selected from the platform's action library)
- Focus area or domain context (one field)

### What customers cannot control

Regardless of how a custom agent is configured, the following always belong to Core:

- Governance gate logic
- Eval scoring methodology
- Ledger immutability
- Authority mode (set by workspace admin, not agent wirer)
- Core runtime behavior

Custom means fully configurable within platform physics. The platform's physics are non-negotiable.

### Eval starts at first run

The moment a custom agent executes its first run, the evaluation record begins.

Every governance gate decision is logged. Every action requested is traced. Every run contributes to the eval score.

There is no configuration period before accountability starts. Day one is day one.

### Each configuration change creates a new eval segment

When a project owner modifies a custom agent — updates restrictions, changes allowed actions, shifts personality type — that change is versioned and a new eval segment begins.

The ledger can show the full configuration history:

```text
Custom Agent: "Runway PM"
──────────────────────────────────────────────
Config v1  |  Runs 1–47    |  Score: 91%  |  Blocked: 2
Config v2  |  Runs 48–103  |  Score: 87%  |  Blocked: 6  <- tweak applied here
Config v3  |  Runs 104+    |  Score: ...  |  Blocked: ...
```

This makes the consequence of every wiring decision visible. If a modification causes blocked actions to spike or eval score to drop, the record surfaces it immediately.

### Versioned config snapshots at promote time

When a Promote occurs, the active project-level agent configuration is snapshotted alongside the ledger item.

This ensures every ledger entry can be reconstructed with full context:
- What the agent's personality type was at the time
- Which allowed actions were in scope
- Which config version was active

---

## Brownfield Agent Import

Organizations that already have agents deployed from other providers can import those agents into ProjectBuild as custom agents.

### What import means

Importing a third-party or legacy agent means:

- The agent's identity, JD, and behavioral description are mapped into the custom agent fields
- The agent is assigned a new `agentId` in Core
- The original agent's external runtime is not ported — Core becomes the runtime going forward
- Governance gate enforcement begins immediately
- Eval scoring begins from the first run under Core

The imported agent is treated as a new custom agent at config v1. There is no historical eval data carried over from the previous provider.

### What customers provide during import

```text
Agent name
Job description / responsibilities
Behavioral description (persona)
Known restrictions or constraints
Intended allowed actions
Original system prompt (optional — used to inform persona mapping)
```

### What the import gives the customer

```text
- Immediate governance gate coverage
- Eval scoring from run 1
- Ledger traceability from day one
- Personality type assignment
- Full agent profile page in ProjectBuild
- Side-by-side comparison with other agents in the workspace
```

### What import does not give

- Historical run data from the previous provider
- Pre-existing eval scores
- Compatibility guarantees with the original agent's behavior

The customer starts with a clean governance and eval record. That is a feature, not a limitation — it is the moment the agent enters an accountable system.

### Import API

```text
POST /api/v1/agents/register
```

With fields populated from the import mapping. The same endpoint used to register any custom agent. No special import route required.

---

## Configuration Propagation Rules

| Level | Who controls | Scope | Overridable by |
| --- | --- | --- | --- |
| Core agent defaults | Project0 | Platform-wide | Nobody |
| Personality type | Project owner | Project-scoped | Project owner only |
| Authority mode | Workspace admin | Project-scoped | Workspace admin only |
| Governance rules | Workspace admin | Workspace-wide | Workspace admin only |
| User preference | Nobody | N/A | Not available |

Users have no configuration authority over any agent in v1.

---

## Summary

Platform agents are tuned at the project level via personality type selection. Custom agents are fully wired by customers within platform physics. Both are governed by the same gate. Both are evaluated from the first run. Every configuration change is versioned. Every promote snapshots the active config.

The rule: you can shape how an agent behaves, but you cannot change what the system records or how it enforces policy.
