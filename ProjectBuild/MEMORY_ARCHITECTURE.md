# MEMORY_ARCHITECTURE

## Purpose

Define how memory is structured, stored, indexed, and recalled in the Project0 platform.

The system uses a layered memory architecture inspired by human cognitive patterns.

The architecture separates:

- Ephemeral context
- Working memory
- Institutional memory

This separation allows the system to remain efficient, explainable, and scalable.

## Memory Layers

Project0 uses three types of memory.

| Memory Type | Description | Persistence |
| --- | --- | --- |
| Ephemeral | Short-term context used during an execution | Not stored |
| Brain | Mutable working memory used by agents and humans | Durable |
| Ledger | Immutable institutional memory | Durable |

## Ephemeral Memory

Ephemeral memory exists only during an agent run.

Examples include:

- Prompt context
- Intermediate reasoning
- Temporary tool outputs
- Partial results

Characteristics:

- Not persisted
- Lives only in the LLM context window
- Discarded after the run completes

Human analogy:

Working RAM while solving a problem.

## Brain Memory

Brain memory is the working memory of the system.

Brain contains collaborative knowledge that can evolve over time.

Examples:

- Notes
- Summaries
- Hypotheses
- Temporary conclusions
- Evolving plans

Storage:

`Firestore brainDocs`

Characteristics:

- Durable
- Mutable
- Supersedable
- Collaborative

Updates occur through explicit actions such as:

- `write_brain`
- `supersede_brain`

Human analogy:

Shared working notes.

## Ledger Memory

Ledger memory is the permanent system record.

The ledger contains:

- Decisions
- Artifacts
- Task outcomes
- Policy changes
- Code commits

Storage:

`Firestore ledgerItems`

Characteristics:

- Append-only
- Authority-attributed
- Tamper-evident
- Immutable

Ledger entries can only be created through:

`Promote`

## Promote As The Commitment Primitive

Promote converts mutable system state into immutable history.

Promote represents an intentional commitment event.

Example API:

```text
POST /api/v1/ledger/promote
```

Promotion records include:

- `summary`
- `actor`
- `authorityMode`
- `evaluationId`
- `tags`
- `artifactReferences`

Authority modes:

- `human_led`
- `human_in_the_loop`
- `agent_autonomous`

Golden rule:

Nothing enters the ledger except through Promote.

## Memory Retrieval Model

When a run is triggered the system constructs a cognitive context bundle.

Memory is recalled using a layered model:

- Hot
- Warm
- Cold

## Hot Memory

Hot memory represents recent working context.

Source:

`brainDocs`

Retrieval example:

```text
brain.list(projectId, limit=20)
```

Hot memory contains:

- Recent notes
- Recent conclusions
- Active thread summaries

Characteristics:

- Recent
- Mutable
- Truncated summaries

Human analogy:

Recent conversation and working thoughts.

## Warm Memory

Warm memory represents indexed recall.

Warm memory is built from ledger summaries created at Promote time.

Storage:

`memorySummaries`

Example record:

- `summary`
- `tags`
- `decisionType`
- `ledgerRef`
- `source`

Retrieval example:

```text
memorySummaries.listByProject(limit=10)
```

Warm memory does not contain full records.

Instead it contains cues that allow the system to retrieve the full ledger entry if needed.

Human analogy:

Remembering something through an index card.

## Cold Memory

Cold memory represents full historical detail.

Cold retrieval occurs only when explicitly required.

Example API:

```text
getLedgerItem(ledgerRef)
```

Cold memory contains:

- Full decision context
- Evidence
- Artifacts
- Evaluation metadata

Human analogy:

Pulling a full record from an archive.

## Memory Indexing

Memory indexing occurs at Promote time, not at recall time.

Promote flow:

```text
POST /api/v1/ledger/promote
```

System performs two operations:

1. Append ledger item.
2. Create memory summary index.

Example summary creation:

```text
memorySummaries.create({
  decisionType,
  summary,
  tags,
  ledgerRef,
  source: "ledger"
})
```

This design ensures:

- Fast recall
- Bounded prompt size
- Deterministic indexing

## Cognitive Context Assembly

Before every run the system assembles a context bundle.

Example flow:

`assembleCognitiveContextBundle`

Steps:

1. Retrieve agent identity.
2. Retrieve role definition.
3. Retrieve team map.
4. Retrieve mission context.
5. Retrieve hot memory.
6. Retrieve warm memory.
7. Build system prompt.

Hot and warm memory are injected into the system prompt.

Cold memory is only retrieved if requested.

## Cognitive Pattern Alignment

The architecture mirrors human cognition.

| Human Behavior | System Equivalent |
| --- | --- |
| Orientation before thinking | Cognitive preload |
| Working memory | Hot memory |
| Indexed recall | Warm memory |
| Archive retrieval | Cold memory |

The system never scans the full ledger during prompt execution.

Instead it relies on summary-first recall.

## Key Design Principles

- Memory is layered
- Indexing happens at write time
- Recall is summary-first
- Cold retrieval is explicit
- Ledger is immutable
- Brain is mutable

This design keeps the system explainable and scalable.

## Retrieval Boundaries

Prompt preload includes:

- Agent identity
- Team map
- Mission context
- Hot memory
- Warm memory

Prompt preload never includes:

- Full ledger scans
- Large artifact bodies
- Entire memory history

Cold retrieval must always be explicit.

## Summary

Project0 memory architecture is built around three layers:

- Ephemeral
- Brain
- Ledger

And three recall levels:

- Hot
- Warm
- Cold

The system indexes memory at Promote time and recalls it through a summary-first model that mirrors human cognitive behavior.

This architecture enables fast retrieval, explainable reasoning, and durable institutional memory.

## Recommended Related Documents

- `CORE_ARCHITECTURE.md`
- `LEDGER_INTEGRATION.md`
- `BUILD_WORKSPACE_MODEL.md`
- `AGENT_INTERACTION_MODEL.md`

Together these documents define how the platform thinks, acts, and remembers.
