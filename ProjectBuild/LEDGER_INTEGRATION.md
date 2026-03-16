# LEDGER_INTEGRATION

This document defines how Build interacts with the immutable ledger.

## Ledger Integration

The ledger is the immutable system of record for decisions and artifacts.

The ledger is owned by Core.

Build interacts with the ledger through Promote flows.

Promote is the only path into the ledger.

Promote may be initiated from the Build UI or directly through the API, depending on authority mode, permissions, and where the action originates.

## Promote Lifecycle

Work inside ProjectBuild progresses through stages.

### Exploration

Conversations, analysis, drafts.

### Working State

Board tasks, artifacts, agent outputs.

### Commitment

A human or authorized agent chooses to Promote an item.

### Immutable Record

The item becomes a Ledger entry.

The Promote step ensures that only intentional outcomes become part of the permanent system history.

## Promote API

```text
POST /api/v1/ledger/promote
```

### Required Fields

- `evaluationId`
- `summary`
- `authorityMode`
- `actor`

### Optional Fields

- `tags`
- `artifactReferences`
- `modelAttribution`
- `evidenceManifest`
- `inferenceTrace`
- `commitmentHash`

### Authority Modes

- `human_led`
- `human_in_the_loop`
- `agent_autonomous`

### Authority Mode Semantics

- `human_led`: a human initiates and confirms the Promote action.
- `human_in_the_loop`: an agent proposes promotion and a human approves it before commitment.
- `agent_autonomous`: an authorized agent may Promote directly through the API without requiring a UI approval step.

## Promotion

When a result should be sealed, an authorized actor calls the Promote API.

Some promotions will be initiated from the Build UI.

Some promotions may happen directly through the API and never be displayed as an approval flow in the UI.

## Ledger Items

- Decision
- Artifact
- Code
- Policy
- Task outcome

Optional promote types may later formalize these categories further.

## Build Responsibilities

- Provide review interface
- Confirm promotions
- Display ledger history
- Surface promotion status when the flow passes through Build

## Core Responsibilities

- Seal the record
- Attach metadata
- Store immutable history
- Expose query APIs
- Enforce authority mode and permission checks for every Promote request

The ledger must remain append-only.
