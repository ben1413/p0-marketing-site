# OBJECT_MODEL

This document defines the canonical objects of the system.

Every feature should reference these.

## ProjectBuild Object Model

Build owns collaboration and workspace state.

Core owns execution, policy, memory, and system truth.

## Build Objects

### Workspace

The top-level environment containing projects and collaborators.

Fields

- `id`
- `name`
- `owner`
- `createdAt`

### Project

A bounded initiative or system being worked on by humans and agents.

Fields

- `id`
- `workspaceId`
- `name`
- `description`
- `createdAt`
- `createdBy`

### Room

The shared collaboration environment for a project.

The room represents the live activity stream for the project.

Fields

- `id`
- `projectId`
- `createdAt`

### Track

A focused workstream inside a project.

Tracks separate parallel thinking threads and agent activity.

Fields

- `id`
- `projectId`
- `name`
- `description`
- `createdAt`

### Thread

A conversation stream inside a track.

Threads contain human messages, agent replies, and artifact references.

Fields

- `id`
- `trackId`
- `createdAt`

### Board

The operational progress view for a project.

Fields

- `id`
- `projectId`

### Task

Work item tracked on the board.

Fields

- `id`
- `projectId`
- `title`
- `description`
- `status`
- `createdBy`
- `assignedTo`
- `createdAt`

### Decision

A proposed or finalized system decision.

Fields

- `id`
- `projectId`
- `summary`
- `status`
- `createdBy`

### Risk

Potential problem or blocker associated with the project.

Fields

- `id`
- `projectId`
- `description`
- `severity`

## Core Objects Referenced By Build

- `Agent`
- `Run`
- `Meeting`
- `Memory`
- `Evaluation`
- `LedgerItem`
- `Artifact`
- `Rule`
- `Delegation`

Build should reference these objects via Core APIs rather than duplicating them.
