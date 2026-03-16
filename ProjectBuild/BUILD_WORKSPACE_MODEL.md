# BUILD_WORKSPACE_MODEL

ProjectBuild is the primary collaboration environment built on top of Project0 Core.

Build provides the human interface for interacting with agents, organizing work, and reviewing system outcomes.

Build does not replicate Core functionality. Instead it presents Core capabilities in a collaborative workspace designed for human teams.

## Workspace Model

The workspace model is organized into four layers.

### Workspace

The workspace represents the organizational environment containing multiple projects.

### Projects

A project represents a bounded system or initiative. Projects contain rooms, tracks, and boards where collaboration occurs.

### Room

The room is the shared live environment for a project. Humans and agents can participate in conversations, meetings, and operational activity within the room.

### Tracks

Tracks represent focused workstreams inside a project. Tracks allow parallel conversations and artifact creation without mixing contexts.

### Board

The board represents operational progress. Tasks, decisions, risks, and outcomes are tracked here.

### Ledger

The ledger represents the immutable record of finalized decisions and artifacts. Items must be explicitly promoted to the ledger.

Promote is the only path into the ledger.

This structure enables a workflow where exploration occurs in tracks, collaboration happens in rooms, and final outcomes are sealed in the ledger.

Promotion may begin in the Build UI or occur directly through Core APIs, depending on authority mode and granted permissions.

## Workspace Layout

The workspace layout reflects this model:

- Left Panel: Project navigation
- Center Panel: Room or track workspace
- Right Panel: Tracks, artifacts, and ledger actions

## What To Build First

Implement in this order:

1. Workspace + Projects
2. Project Room chat
3. Track threads
4. Agent run integration
5. Board actions
6. Ledger promotion

That gives you the first real AI-native collaboration environment.
