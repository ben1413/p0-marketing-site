# P0_PLATFORM_PACKAGING

## Purpose

Define the reusable platform packaging model for P0 so new surfaces do not rebuild the same runtime, promote, voice, governance, builder, and local execution patterns over and over.

This doc answers one question:

**What should be deployable by P0, and what should remain surface-specific?**

---

## Core Principle

Every new surface should be **thin**.

A surface should compose reusable P0 capabilities, not reimplement them.

That means:

- `Core` owns runtime, memory, governance, ledger, evals, voice, and orchestration
- `P0 packages` own contracts, SDKs, reusable surface patterns, and builder integration
- `Surfaces` own workflow, navigation, presentation, and audience-specific UX

The goal is:

```text
new surface = composition
not
new surface = rebuild the platform
```

---

## What Is Deployable By P0

P0 should ship five reusable layers.

### 1. `P0 Core`

This is the deployable backend platform.

It should own:

- agent runtime
- cognitive preload
- brain and ledger recall
- promote
- governance
- evaluations
- truth posture
- meetings and orchestration
- auth and project scoping
- voice transcription and TTS
- events and observability

This is what a customer can host, self-host, or consume as managed infrastructure.

### 2. `P0 Contracts`

This is the shared type and schema layer every surface uses.

It should own:

- request and response contracts
- agent, ledger, eval, governance, meeting, and voice types
- promote payload types
- truth posture types
- action request and action result types
- builder bridge request and response types

This package must stay as the source of truth for integration.

### 3. `P0 Surface SDK`

This is the common programmatic client layer for any UI surface.

It should own:

- typed API client
- auth header handling
- project-scoped request helpers
- React hooks for agent runs, meetings, promotes, ledger, evals, gov, and voice
- event helpers for realtime updates later
- standardized error handling

This package exists so ProjectBuild, ProjectLedger, and future surfaces call Core the same way.

### 4. `P0 Surface Kit`

This is the reusable UI pattern layer.

It should own shared surface primitives such as:

- truth posture badge
- promote panel
- ledger tabs
- eval and gov stat cards
- message feed patterns
- meeting bar
- agent selector
- principles panel
- board ledger strip
- team promote cards
- builder launch controls

This can be headless, lightly styled, or themeable, but it should standardize the interaction model.

### 5. `P0 Builder Stack`

This is the reusable builder layer for local execution.

It should own:

- local companion app/service
- builder bridge protocol
- git operations
- local filesystem access
- local runtime process management
- preview URL detection
- deploy trigger integration
- file editor and diff helpers

This layer should be reusable across any surface that needs local build and deploy capability.

---

## What Surfaces Should Own

A surface should own:

- routing and page structure
- information architecture
- user-facing copy
- visual identity and styling
- audience-specific workflows
- scoped filters and views
- surface-specific object composition

Examples:

### ProjectBuild owns

- room
- track workspace
- PM board
- team promote workflow
- reasoning mode / builder mode orchestration
- local builder launch UX

### ProjectLedger owns

- richer ledger browsing
- audit-heavy views
- evaluation and governance analysis views
- cross-project and workspace-level stats

### Customer-facing product surfaces own

- end-user workflow
- customer-specific UI and domain behavior
- their own application logic

But all of those surfaces should still rely on the same P0 deployable layers underneath.

---

## Recommended Package Structure

Use a monorepo and package the platform explicitly.

```text
/apps
  projectbuild
  projectledger
  customer-surface-x

/packages
  p0-contracts
  p0-sdk-core
  p0-sdk-react
  p0-surface-kit
  p0-builder-kit

/services
  p0-core
  p0-companion
```

If needed later:

```text
/packages
  p0-voice-kit
  p0-promote-kit
  p0-meeting-kit
```

But do not split too early unless surface divergence forces it.

---

## Recommended Responsibility Split

### `p0-core`

System of record and runtime.

### `p0-contracts`

Types, schemas, and shared object shapes.

### `p0-sdk-core`

Framework-agnostic API client and helpers.

### `p0-sdk-react`

React hooks and integration utilities for surfaces.

### `p0-surface-kit`

Reusable interaction patterns and UI primitives.

### `p0-builder-kit`

Reusable local builder bridge and builder-facing helpers.

### `p0-companion`

Local execution agent for files, git, runtime, preview, and deploy.

---

## Builder Architecture

If multiple surfaces will support local code work, the builder pattern must become a platform capability.

### Builder design rule

**Builder Mode is not a ProjectBuild-only feature.**

It should be treated as a reusable P0 capability any surface can mount.

### Builder split

#### Core owns

- agent reasoning
- cognitive preload
- ledger and team memory recall
- governance
- evals
- truth posture
- promote

#### Companion owns

- file read and write
- folder binding
- repo open and clone
- git status, branch, commit, push, PR
- dependency install
- dev server launch and logs
- preview and deploy hooks

#### Surface owns

- builder launch UX
- reasoning mode vs builder mode state
- diff review UI
- accept and reject UI
- team promote and ledger promote entry points

---

## Companion Protocol

Do not let each surface invent its own local bridge.

Define one reusable companion protocol.

Minimum operations:

```text
openProject
bindFolder
readFile
writeFile
listFiles
gitStatus
gitDiff
gitCreateBranch
gitSwitchBranch
gitCommit
gitPush
gitCreatePullRequest
runDevServer
stopDevServer
getLogs
getPreviewUrl
deploy
```

This protocol should be versioned and typed through `p0-contracts`.

---

## Surface Integration Pattern

Every surface should compose the same stack:

```text
Surface
  -> P0 Surface SDK
  -> P0 Core APIs
  -> optional P0 Companion
```

For builder-enabled surfaces:

```text
Surface
  -> P0 Builder Kit
  -> P0 Companion
  -> local repo / git / runtime
```

For collaboration and memory:

```text
Surface
  -> P0 Surface SDK
  -> P0 Core
  -> Brain / Team Promote / Ledger / Evals / Gov
```

---

## Team Promote Placement

Team Promote should be treated as a reusable surface pattern, not a Core ledger primitive.

### Why

- it is project-scoped execution memory
- it is not final institutional memory
- it is ideal for active build coordination
- it should not pollute the full ledger

### Best split

#### Surface layer

Owns the rich Team Promote object and UI.

#### Core layer

Gets a mirrored memory/index representation so agents can preload from it.

This lets surfaces render rich active execution state while Core still reasons over the same information.

---

## Deployment Modes

P0 should support three modes of use.

### 1. Full first-party surface

Use `ProjectBuild + P0 Core + P0 Companion`.

Best for:

- internal teams
- startups building on P0
- teams that want the full workflow out of the box

### 2. Headless / embedded platform

Use `P0 Core` directly inside a customer product.

Best for:

- customers with their own UI
- platform and backend teams
- products embedding agents directly

### 3. Hybrid

Customer product embeds `P0 Core`, but the company also uses first-party surfaces like ProjectBuild and ProjectLedger internally.

Best for:

- enterprise operators
- product and ops teams
- governance-heavy deployments

---

## Implementation Guidance For Core

If Core wants to avoid repeated surface rebuilds, these should become explicit platform deliverables:

1. `p0-contracts`
2. `p0-sdk-core`
3. `p0-sdk-react`
4. `p0-surface-kit`
5. `p0-builder-kit`
6. `p0-companion`

Core should avoid allowing product-critical patterns to live only inside one first-party surface.

If a pattern is expected to appear in more than one surface, it should be pushed into one of the deployable P0 layers.

---

## What To Avoid

Do not:

- let every surface build its own Core client
- let every surface implement promote differently
- let every surface invent its own truth posture rendering
- let every surface wire TTS or voice independently
- let ProjectBuild's local builder become a one-off app-specific bridge
- make builder mode depend on browser-only filesystem tricks if git, local launch, and deploy are day-one requirements

Those choices create product drift and integration debt quickly.

---

## Decision Summary

The platform packaging model should be:

- `P0 Core` = deployable backend platform
- `P0 Contracts` = shared schemas and types
- `P0 Surface SDK` = shared integration layer
- `P0 Surface Kit` = reusable UI and interaction patterns
- `P0 Builder Stack` = reusable local build and deploy capability

Surfaces should stay thin and compose these layers.

That is the scalable way to build several P0 surfaces without rebuilding the same pattern each time.
