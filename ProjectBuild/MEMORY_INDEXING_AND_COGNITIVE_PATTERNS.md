# MEMORY_INDEXING_AND_COGNITIVE_PATTERNS

## Purpose

Break down how memory is indexed and recalled when a run is prompted, and explain how that design follows human cognitive patterns.

## The Three Memory Types

Think of the system as having three layers of memory that mirror human cognition.

| Layer | Human Analogy | System Implementation |
| --- | --- | --- |
| Ephemeral | Working RAM during a thought | LLM context window during a run |
| Brain | Working notes / evolving understanding | Mutable Firestore `brainDocs` |
| Ledger | Institutional memory | Immutable `ledgerItems` |

The two durable stores are Brain and Ledger.

Ephemeral memory disappears after the run.

## The Memory Recall Flow

When a human or agent triggers a run, the system does not search everything.

Instead it reconstructs a cognitive context bundle.

Flow:

```text
User prompt
  ->
assembleCognitiveContextBundle()
  ->
retrieveMemory()
  ->
Hot memory (Brain)
Warm memory (Ledger summaries)
  ->
Build system prompt
  ->
LLM run
```

Cold memory is never loaded automatically.

## Hot Memory

Hot memory corresponds to human short-term working memory.

Human analogy:

What just happened in the last few minutes?

System behavior:

```text
brain.list(projectId, limit=20)
```

These are the most recent brain documents.

Characteristics:

- Mutable
- Recent
- Truncated summaries, around 500 characters
- Loaded into the prompt automatically

This mirrors how humans remember recent conversation and notes.

## Warm Memory

Warm memory corresponds to human indexed recall.

Humans do not scan their entire memory when thinking. They recall summary cues.

Human analogy:

What did we decide about the sponsor deal?

System equivalent:

```text
memorySummaries.listByProject(limit=10)
```

Each entry contains:

- `summary`
- `tags`
- `decisionType`
- `ledgerRef`
- `source`

Important:

Warm memory is not the ledger itself.

It is the index to the ledger.

## Cold Memory

Cold memory is the complete historical record.

Humans access this when they intentionally dig deeper.

Human analogy:

Pull the contract we signed last month.

System behavior:

```text
getLedgerItem(ledgerRef)
```

Cold memory is loaded only:

- When explicitly requested
- When an agent needs evidence
- During investigations or audits

Never during preload.

## Why This Architecture Works

This matches three fundamental cognitive behaviors.

### 1. Humans Orient Themselves First

Before solving a problem, humans recall:

- Who they are
- What role they are playing
- What the goal is
- What just happened

System equivalent:

- Agent identity
- Persona
- Team map
- Mission
- Hot memory
- Warm memory

This is the cognitive preload bundle.

### 2. Humans Recall Summaries, Not Full History

Humans remember summaries and cues, not raw transcripts.

Example:

We already rejected Vendor X because of pricing.

System equivalent:

Warm memory summaries.

The system reads summaries first.

### 3. Humans Retrieve Detail Only When Necessary

Full historical detail is expensive cognitively.

Human analogy:

Pull the contract document.

System equivalent:

Cold retrieval:

```text
getLedgerItem(id)
```

## Why Indexing Happens At Promote Time

Indexing happens when the memory is created, not when it is recalled.

Promote flow:

```text
POST /api/v1/ledger/promote
  ->
append ledger item
  ->
create memory summary
```

Example:

```text
memorySummaries.create({
  summary,
  tags,
  ledgerRef,
  decisionType
})
```

This means later recall only needs to query the index, not the entire ledger.

This keeps recall extremely fast.

## The Cognitive Memory Stack

Putting it together:

- Ephemeral: LLM context window
- Hot: recent brain docs
- Warm: ledger summary index
- Cold: full ledger records

Recall behavior:

- Hot + Warm -> preload
- Cold -> on-demand retrieval

## Example Prompt Walkthrough

User prompt:

```text
What vendors did we shortlist for catering?
```

### Step 1 - Preload Memory

System loads:

- Recent brain notes
- Ledger summaries

Example warm entry:

```text
Summary: Catering vendor shortlist created
Tags: [catering, vendors]
ledgerRef: abc123
```

### Step 2 - LLM Sees The Summary

Agent response:

```text
We shortlisted three vendors last week.
```

### Step 3 - If The User Asks For Details

System calls:

```text
getLedgerItem(abc123)
```

Cold retrieval returns the full record.

## Why This Matters For Scale

Without this system, LLM memory systems usually fail because they:

- Scan entire databases
- Overload the prompt window
- Mix working and historical memory

This architecture avoids that.

The system stays:

- Bounded
- Indexed
- Summary-driven
- Cognitively aligned

## Optional Future Enhancement

Warm memory currently uses summaries and tags.

Later, the platform may add a semantic vector index alongside the summary index.

Example:

- `summary_index`
- `vector_embedding`

Even if vectors are added, summary-first retrieval should remain the primary path.

Vectors should support recall, not replace the memory model.

## Key Rule

Memory recall is summary-first and index-driven.

The system never scans the full ledger during prompt execution.

That rule keeps the architecture efficient and cognitively aligned.
