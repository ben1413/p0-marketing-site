# BOARD_MODEL

Defines how the project board works.

## Board Model

The board represents operational progress inside a project.

Each project has one board.

## Columns

### Tasks

Active work items.

### Decisions

Proposed or pending project decisions.

### Risks

Potential problems or blockers.

### Done

Completed tasks and finalized outcomes.

## Board Items

### Task

Fields

- `id`
- `title`
- `description`
- `status`
- `assignedTo`
- `createdBy`
- `createdAt`

### Decision

Fields

- `id`
- `summary`
- `status`
- `createdBy`
- `createdAt`

### Risk

Fields

- `id`
- `description`
- `severity`
- `createdAt`

## Agent Interaction

Agents may propose board actions.

Examples:

- `create_board_task`
- `move_board_task`
- `flag_risk`
- `draft_decision`

Build applies these actions after receiving approval from Core governance gates.

Board state is owned by Build.
