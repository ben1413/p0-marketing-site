# AGENT_INTERACTION_MODEL

This is the human <-> agent interaction contract.

## Agent Interaction Model

Agents are system participants capable of executing tasks within defined governance constraints.

Agents are registered and executed through Project0 Core.

Build provides the interaction surface.

## Interaction Flow

### Human Command

A user enters a message in a room or track.

Example:

```text
Research catering vendors.
```

Build sends a request to Core.

```text
POST /api/v1/agents/run/simple
```

Payload includes:

- `agentId`
- `projectId`
- `message`
- Optional thread context

### Core Execution

Core assembles runtime context including:

- Agent identity
- Persona
- Job role
- Team map
- Relevant memory
- System prompt

Core performs LLM execution and returns:

- `reply`
- `trace`
- `memoryUsed`
- `actionsRequested`

### Action Requests

Agents may request structured actions.

Examples:

- `create_board_task`
- `move_board_task`
- `assign_board_task`
- `create_risk`
- `draft_decision`

Core evaluates whether actions are allowed through governance gates.

If approved, the actions are returned to Build.

### Build Execution

Build applies the actions to its workspace objects.

Example:

```text
create_board_task -> new Task object
```

### Ledger Promotion

When an outcome should be sealed:

```text
POST /api/v1/ledger/promote
```

Core stores the immutable decision record.

Promote is the only path into the ledger.

Promotion behavior depends on authority mode and permissions:

- `human_led`: a human initiates the Promote action.
- `human_in_the_loop`: an agent proposes Promote and a human approves it.
- `agent_autonomous`: an authorized agent may Promote directly through the API.

This means some decisions may be committed directly through Core APIs without ever being displayed in a Build approval UI.

## Principles

- Agents never mutate workspace state directly.
- Agents request actions.
- Build applies actions after governance validation.
- Core remains the authority for execution and policy.
- Core is the authority for Promote permission checks and commitment rules.
