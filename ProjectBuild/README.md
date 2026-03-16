# ProjectBuild

ProjectBuild is the human collaboration surface for Project0.

It sits on top of `Core`, which remains the system of record for agent execution, governance, memory, evaluations, and the ledger. `Build` is where humans and agents work together inside structured projects.

This folder is the starting point for defining what ProjectBuild v1 is, what it is not, and what future human and AI builders should implement first.

## Quick Orientation

ProjectBuild v1 is designed to prove five things:

1. Humans can organize work in projects.
2. Humans and agents can collaborate in a shared room.
3. Workstreams can be separated into tracks.
4. Agents can execute work through Core.
5. Important outcomes can be promoted to the ledger.

If those five things work, the system is already valuable.

## Read This First

Review the docs in this order:

1. `FULL_STACK_FOR_PROJECTBUILD.md`
2. `ARCHITECTURE_OVERVIEW.md`
3. `P0_PLATFORM_PACKAGING.md`
4. `PROJECTBUILD_V1_WHAT_ACTUALLY_GETS_BUILT.md`
5. `PLATFORM_THESIS.md`
6. `CORE_ARCHITECTURE.md`
7. `EXECUTION_MODEL.md`
8. `SYSTEM_LIFECYCLE.md`
9. `TRUST_BOUNDARY.md`
10. `BUILD_WORKSPACE_MODEL.md`
11. `OBJECT_MODEL.md`
12. `AGENT_INTERACTION_MODEL.md`
13. `BOARD_MODEL.md`
14. `LEDGER_INTEGRATION.md`
15. `COLLABORATION_MODEL.md`
16. `PRESENCE_MODEL.md`
17. `UI_SURFACE_SPEC.md`
18. `MARKETPLACE_MODEL.md`
19. `MEMORY_ARCHITECTURE.md`
20. `MEMORY_INDEXING_AND_COGNITIVE_PATTERNS.md`
21. `DATA_SCHEMA_AND_API_MAP.md`
22. `AGENT_RUNTIME_ARCHITECTURE.md`
23. `GOVERNANCE_ARCHITECTURE.md`
24. `USER_FLOWS.md`
25. `SCREEN_SPECS.md`
26. `AGENT_CONFIGURATION_POLICY.md`
27. `EVAL_SCORE_METHODOLOGY.md`
28. `TRUTH_POSTURE.md`
29. `SOLO_REFERENCE.md`

## What Exists In This Folder

### `FULL_STACK_FOR_PROJECTBUILD.md`

The integration reference for any engineer or AI agent building on top of Core. Covers the runtime stack, Firestore collections, external services, key dependencies, invariants, build discipline rules, and the complete list of Core docs for deep reference.

### `ARCHITECTURE_OVERVIEW.md`

Defines the top-level relationship between users, Build, Core APIs, and the runtime subsystems.

### `P0_PLATFORM_PACKAGING.md`

Defines what should be deployable by P0 vs what remains surface-specific. Covers `P0 Core`, shared contracts, SDKs, reusable surface patterns, the builder stack, the local companion, and the recommended package and repository structure for supporting multiple P0 surfaces without rebuilding the same integration pattern.

### `PROJECTBUILD_V1_WHAT_ACTUALLY_GETS_BUILT.md`

Defines the v1 feature surface, screen model, object model, interaction flow, and first milestone.

### `PLATFORM_THESIS.md`

Explains the broader Project0 thesis and why governed AI-native infrastructure matters.

### `CORE_ARCHITECTURE.md`

Defines what Core owns and why it must remain the runtime and control plane.

### `EXECUTION_MODEL.md`

Defines the three execution layers: agent execution, run orchestration, and agent orchestration.

### `SYSTEM_LIFECYCLE.md`

Defines the platform lifecycle from intent through run, evaluate, promote, and ledger.

### `TRUST_BOUNDARY.md`

Defines the separation between Build as the surface layer and Core as the system of record.

### `BUILD_WORKSPACE_MODEL.md`

Defines the collaboration model for Build, including workspace, projects, room, tracks, board, and ledger.

### `OBJECT_MODEL.md`

Defines the canonical objects used across Build and the Core objects Build references.

### `AGENT_INTERACTION_MODEL.md`

Defines how humans, agents, Core execution, actions, and Promote flows interact.

### `BOARD_MODEL.md`

Defines project board structure, board items, and agent-proposed board actions.

### `LEDGER_INTEGRATION.md`

Defines Promote, authority modes, and how immutable ledger records are created and surfaced.

### `COLLABORATION_MODEL.md`

Defines participants, rooms, tracks, presence, and meeting behavior.

### `PRESENCE_MODEL.md`

Defines how humans, agents, and external systems appear as participants in collaboration spaces.

### `UI_SURFACE_SPEC.md`

Defines the three-panel UI layout and major interaction surfaces.

### `MARKETPLACE_MODEL.md`

Defines the future component distribution and install model.

### `MEMORY_ARCHITECTURE.md`

Defines the three memory layers, hot and warm and cold recall, and Promote-time indexing.

### `MEMORY_INDEXING_AND_COGNITIVE_PATTERNS.md`

Explains memory recall flow in operational terms and maps it to human cognitive behavior.

## Core Product Boundary

Keep this boundary clean.

### Core owns

- Agent runtime
- Memory
- Governance
- Ledger
- Evaluations
- Meetings
- Voice
- Auth / projects
- Run traces

### Build owns

- Workspace UX
- Project navigation
- Room UI
- Track / thread organization
- Board UI and state
- Chat display
- Agent command interface
- Ledger review / promote UX

Build should never reimplement Core runtime behavior.

## v1 Feature Surface

The first version should stay narrow:

- Workspace
- Projects
- Room
- Tracks
- Board
- Agent interaction
- Ledger promotion

Everything else can wait until the platform loop works end to end.

## Recommended Build Order

Implement in this order:

1. Workspace + Projects
2. Project Room chat
3. Track threads
4. Agent run integration
5. Board actions
6. Ledger promotion

That sequence gives builders the shortest path to a working system.

## First Milestone

The first milestone is complete when the system supports this scenario:

1. Create a project.
2. Create a track.
3. Chat with agents.
4. Let agents create board tasks.
5. Let humans move tasks.
6. Promote important outcomes to the ledger.

That demonstrates the full platform loop.

## Guidance For Future Human And AI Builders

- Optimize for clarity over completeness.
- Keep Build focused on collaboration UX and state transitions.
- Treat Core as the authority for execution, governance, and sealing outcomes.
- Keep the execution layers distinct: execution, run orchestration, and agent orchestration.
- Governance is deterministic. Every gate decision is logged.
- Restrictions are persona-level and cannot be overridden by job configuration.
- Delegation is always explicit, scoped, and time-boundable.
- Prefer explicit object boundaries between Build models and Core models.
- Keep memory layered: Ephemeral for runs, Brain for working memory, Ledger for committed memory.
- Use summary-first retrieval and never scan the full ledger during prompt execution.
- Do not expand v1 scope until the first milestone works reliably.

### `DATA_SCHEMA_AND_API_MAP.md`

Every Core API endpoint Build needs, with real request and response shapes sourced from Core's live Zod schemas and route handlers.

### `AGENT_RUNTIME_ARCHITECTURE.md`

Defines the full agent execution lifecycle: context assembly, model invocation, action handling, governance enforcement, trace recording, and control operations. Sourced from live Core code.

### `GOVERNANCE_ARCHITECTURE.md`

Defines the governance gate, governance rules, authority delegation, persona and job authority levels, agent control operations, and evaluation-triggered governance. Sourced from live Core contracts.

### `USER_FLOWS.md`

Traces every major user scenario end to end — create project, chat with agents, multi-agent meeting runs, promote to ledger, halt agents, view ledger history. Maps exactly what Build writes vs what Core writes per flow.

### `SCREEN_SPECS.md`

Component-level specs for all seven v1 screens: Workspace Home, Project Room, Track Workspace, Board, Agent Directory, Ledger Viewer, and Agent Profile. Includes layout, component list, API calls, state shape, and shared components including the Agent Popup and Agent Principles Panel.

### `SOLO_REFERENCE.md`

The complete reference to the Solo codebase that ProjectBuild is built alongside. Contains all CSS variables, Tailwind patterns, Firestore schema, type definitions, Core API client code, Firestore hook patterns, and the key architectural rules. Read this before writing any UI or integration code.

### `AGENT_CONFIGURATION_POLICY.md`

Defines the two agent types (platform and custom), the personality type model for project-level behavioral tuning, the custom agent wiring model, versioned eval segments per config change, and the brownfield agent import process. Covers what project owners can control, what is locked, and why per-user fine-tuning is not supported.

### `EVAL_SCORE_METHODOLOGY.md`

Defines the six data points that make up the agent eval score (governance pass rate, promote rate, task completion rate, action quality rate, memory write quality, behavioral consistency), their weights, the tier labels, how scores are segmented per config version, and how scores surface in the product.

### `TRUTH_POSTURE.md`

Defines the `known / inferred / unknown` classification that every agent response carries at runtime. Covers the product problem it solves, how it surfaces in the UI (subtle indicator on agent message bubbles), how it flows into the Promote panel and Ledger items, and its relationship to the co-worker doctrine.

## Suggested Next Docs

As the project grows, useful follow-on docs may include:

- `ROADMAP.md`
