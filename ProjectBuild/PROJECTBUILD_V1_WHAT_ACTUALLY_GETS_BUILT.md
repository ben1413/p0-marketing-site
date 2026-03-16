# ProjectBuild v1 - What Actually Gets Built

The first version should prove five things:

1. Humans can organize work in projects.
2. Humans and agents can collaborate in a shared room.
3. Workstreams can be separated into tracks.
4. Agents can execute work through Core.
5. Important outcomes can be promoted to the ledger.

If those five things work, the system is already valuable.

## v1 Feature Surface

Everything else can wait. The v1 feature surface is:

- Workspace
- Projects
- Room (live collaboration)
- Tracks (focused thinking threads)
- Board (tasks / decisions / risks)
- Agent interaction
- Ledger promotion

## Core vs Build Responsibilities

### Core already owns

- Agent runtime
- Memory
- Governance
- Ledger
- Evaluations
- Meetings
- Voice
- Auth / projects
- Run traces

### Build will own

- Workspace UX
- Project navigation
- Room UI
- Track / thread organization
- Board UI and state
- Chat display
- Agent command interface
- Ledger review / promote UX

That boundary must stay clean.

## ProjectBuild v1 Screens

You only need six screens.

### 1. Workspace Home

Purpose: entry point for the organization.

Shows:

- List of projects
- Recent activity
- Agents available
- Quick create project

Conceptually:

```text
Workspace
 ├ Projects
 ├ Agents
 └ Activity
```

### 2. Project Room

This is the default landing page of a project.

It is the shared live collaboration space.

Layout:

- Left: Projects
- Center: Room chat + activity
- Right: Tracks, artifacts, ledger preview

The room contains:

- Human chat
- Agent participation
- Board updates
- System events

Agents appear like team members.

Example participants:

- Ben
- Research Agent
- Legal Agent
- Finance Agent

### 3. Track Workspace

Tracks are focused thinking lanes.

Example tracks:

- Sponsorships
- Catering
- Contracts
- Launch Plan

Selecting a track shifts the center workspace to that thread.

Layout:

- Left: Projects
- Center: Conversation + artifacts
- Right: Track tools, ledger actions

Tracks allow:

- Focused conversation
- Agent runs
- Artifact uploads
- Decision drafting

### 4. Board

The operational view.

Columns:

- Tasks
- Decisions
- Risks
- Done

Agents can propose actions like:

- Create task
- Flag risk
- Suggest decision

Core authorizes actions.

Build mutates board state.

### 5. Agent Directory

Shows all available agents.

Each agent card includes:

- Name
- Persona
- Job
- Authority mode
- Status
- Model

Actions:

- Edit agent
- Pause agent
- Resume agent
- View runs

This page is powered by Core's agent registry.

### 6. Ledger Viewer

Shows sealed decisions.

Columns can include:

- Decision
- Artifact
- Code
- Task Outcome
- Policy

Each ledger item shows:

- Who promoted it
- Which agent was involved
- Evaluation context
- Timestamp

This page reads directly from Core.

## ProjectBuild v1 Object Model

### Build owns

- Workspace
- Project
- Room
- Track
- Board
- Task
- Decision
- Risk
- Thread

### Core owns

- Agent
- Run
- Meeting
- Memory
- LedgerItem
- Evaluation
- Artifact
- Rule
- Delegation

The models intersect but remain separate.

## ProjectBuild v1 Interaction Flow

Human writes:

```text
Research catering vendors
```

Build sends:

```text
POST /agents/run/simple
```

Core executes the agent.

Core returns:

- `reply`
- `actionsRequested`
- `trace`

Example action:

```text
create_board_task
```

Build updates the board.

Human reviews.

If the outcome is important:

```text
Promote -> Ledger
```

Build calls:

```text
POST /ledger/promote
```

Core seals the decision.

## The First Milestone

The first working system should support this scenario:

1. Create project.
2. Create track.
3. Chat with agents.
4. Agents create board tasks.
5. Humans move tasks.
6. Important results are promoted to the ledger.

That alone demonstrates the full platform loop.
