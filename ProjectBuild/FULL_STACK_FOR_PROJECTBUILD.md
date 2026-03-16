# FULL_STACK_FOR_PROJECTBUILD

## Purpose

Give any ProjectBuild engineer or AI agent a complete picture of what Core is, how it is built, what it provides, and how to integrate with it. Everything here is sourced from live Core code and docs.

Feed this document to any agent or engineer before they write integration code.

---

## What Core Is

Core is the runtime engine and control plane for Project0.

It handles agent execution, governance, memory, evaluations, ledger, meetings, voice, auth, and observability.

ProjectBuild does not reimplement any of these capabilities. It calls Core through the API.

---

## Runtime and API

| Property | Value |
| --- | --- |
| Framework | Next.js 16.1.6, App Router, TypeScript 5 |
| API surface | REST under `/api/v1/` — all product endpoints are versioned here |
| API spec | `docs/openapi.yaml` (OpenAPI 3) |
| Auth | Bearer token — Firebase JWT or managed API keys prefixed `p0_` |
| Legacy auth | `PROMOTE_API_KEY` env variable (deprecated) |
| IP allowlist | Optional per-project; configured via Core admin API |
| CORS | Optional — set `P0_CORS_ORIGIN` for browser clients |

All secrets and config come from environment variables. No hardcoded keys anywhere in Core.

---

## Data and Persistence

Primary store is Firebase Firestore.

Firestore collections:

```text
agents
brain
ledger
evaluations
meetings
personas
jobs
api_keys
governance_rules
authority_delegations
model_definitions
eval_cases
projects
memory_summaries
voice_sessions
voice_transcripts
marketplace
artifacts
agent_runs
system_events
ip_allowlists
```

KV / cache: in-memory by default; Upstash Redis when `P0_KV_BACKEND=redis` (multi-instance rate limiting and idempotency in production).

Firestore indexes live in `firestore.indexes.json`. Deploy with:

```bash
firebase deploy --only firestore:indexes
```

---

## External Services

| Service | Purpose | Config |
| --- | --- | --- |
| OpenAI | LLM for agent runs | `OPENAI_API_KEY` |
| OpenAI Whisper | Voice transcription | `OPENAI_API_KEY`, optional `OPENAI_WHISPER_MODEL` |
| Upstash Redis | Rate limits and idempotency in production | `P0_KV_BACKEND=redis` + Upstash env vars |

Voice WebSocket server is an optional separate process for streaming transcription:

```bash
npm run voice-ws
```

---

## Key Dependencies

From `package.json`:

```json
{
  "next": "16.1.6",
  "firebase-admin": "^13.6.1",
  "@upstash/redis": "^1.36.3",
  "zod": "^3.24.1",
  "ws": "^8.18.0",
  "tailwindcss": "^4"
}
```

---

## Core Capabilities

### Agent Runtime

Cognitive preload, model execution, action normalization, governance gate, trace.

Three execution layers:

- `POST /api/v1/agents/run/simple` — single agent, single prompt
- `POST /api/v1/agents/run` — single agent, multi-step with tool calls
- `POST /api/v1/agents/run/meeting` — multi-agent session, with routing modes: `completion_time`, `round_robin`, `role_priority`

### Governance

Every agent action passes through a deterministic governance gate.

The gate checks in order:

1. `disallowedActions` from the job (hard block)
2. `allowedActions` from the job (block if not present)
3. `restrictions` from the persona (block on violation)
4. User-defined governance rules (block / require_human_ack / log)
5. `humanAck` requirement (block until acknowledged)

Gate outcomes: `allow`, `block`, `require_human_ack`, `escalate`.

Every decision is logged as a `GovDecisionRecord`.

Agent control operations — halt, suspend, resume — are recorded with trigger and actor attribution.

Halt triggers: `ruleViolation`, `safetySignal`, `humanOverride`, `evaluationFailure`.

### Memory

Three layers:

| Layer | Store | Persistence |
| --- | --- | --- |
| Ephemeral | LLM context window | Not stored |
| Brain | `brainDocs` (Firestore) | Durable, mutable, supersedable |
| Ledger | `ledgerItems` (Firestore) | Durable, immutable, append-only |

Three recall tiers:

| Tier | Source | Target Latency | Loaded In Preload |
| --- | --- | --- | --- |
| Hot | `brain.list(projectId, limit=20)` | <10ms | Yes |
| Warm | `memorySummaries.listByProject(limit=10)` | <50ms | Yes |
| Cold | `getLedgerItem(id)` | On demand | Never |

Promote-time indexing: every Promote creates a `MemorySummary` record in the warm index. The preload path stays fast because it reads the pre-built index, not the full ledger.

Memory scopes: `working` (default), `core`, `team`, `personal` (requires `agentId`).

### Ledger

Append-only. Promote is the only write path.

```text
POST /api/v1/ledger/promote
```

Required fields: `evaluationId`, `summary` (or `content`), `authorityMode`, `actor`.

Ledger item types: `note`, `decision`, `task`, `artifact`, `code`.

Authority modes: `human_led`, `human_in_the_loop`, `agent_autonomous`.

Promote also accepts: `title`, `tags`, `runId`, `agent`, `opaqueRefs`, `clientCommitmentHash`, `bouncePii`, `payload`.

Every Promote creates two records: a `LedgerItem` (immutable) and a `MemorySummary` (warm index entry).

Evaluations are required before Promote. A Promote after an evaluation is closed is rejected.

### Ledger UI

The Ledger UI endpoint returns all three panel categories in one call:

```text
GET /api/v1/ledger/ui?evaluationId=...&limit=...
```

Returns:

```ts
{
  sealing: {
    evaluations: EvaluationSummary[]
    items: LedgerItemSummary[]
    totalCount: number
  }
  evals: {
    records: EvalRecordSummary[]
    aggregates: { byAgent: {...}[] }
  }
  gov: {
    agents: GovAgentSummary[]
    recentDecisions: GovDecisionSummary[]
  }
  rateLimitUsage?: object
}
```

Use this endpoint to populate the entire Ledger panel. Do not list ledger items directly for the UI.

### Auth and Tenants

Project-scoped authentication.

Roles: `admin`, `agent_runner`, `read_only`.

API keys are hashed on creation. The prefix `p0_` identifies managed keys.

Optional IP allowlist per project via Core admin API.

---

## Deployment

Suited for Vercel or any Node host. Serverless and edge-friendly.

All config is via environment variables — no hardcoded keys.

Voice WebSocket server runs as an optional separate process if streaming voice is needed.

Scripts:

```bash
npm run dev             # local development
npm run build           # production build
npm run ci              # lint + build
npm run voice-ws        # start voice WebSocket server
npm run deploy:indexes  # deploy Firestore indexes
```

---

## Core Invariants

These are non-negotiable. They define the physics of Core.

Read the full list in `docs/INVARIANTS.md`. The most important ones for ProjectBuild:

**Ledger plane**

- Ledger items are immutable — no updates or deletes.
- Promote is rejected after an evaluation is closed.
- Evidence manifests are declared, not inferred.

**Brain plane**

- Brain is mutable through supersession — no silent edits; changes create a new version.
- Brain is not the system of record. The ledger is.

**Governance**

- Every decision-grade action carries actor and authority mode.
- Promote is explicit. It is never an implicit side effect.

**Cost guardrails**

- Agent turns per session are capped.
- Agents run only when invoked (request-scoped). No unbounded background loops.
- Promote is the commitment boundary for autonomous runs.

**Ops**

- Secrets live only in environment variables. Never in code.
- Failures surface. They do not disappear.

---

## Build Discipline Rules

Read the full rules in `docs/BUILD_DISCIPLINE.md`. Key rules for ProjectBuild:

1. **Ledger is constitutional, not app logic.** Treat any code touching Promote, append-only enforcement, or authority attribution as requiring explicit review.

2. **Guard the Brain / Ledger boundary.** No shared utilities that write to both. No convenience functions that promote behind the scenes. Promotion must always feel intentional.

3. **Promote ergonomics: simple by design.** Low ceremony for human-led. Structured and explicit for autonomous. Friction in Promote is a design choice, not a bug.

4. **Protect negative memory.** Do not hide superseded items for cleanliness. Surface them. Dissent erosion is real in institutional memory systems.

5. **No optimizations that eat integrity.** Every optimization must answer: does this preserve the append-only, attribution-first invariant? If not, it waits.

6. **Build like someone will subpoena it.** The system must be able to answer without narrative gymnastics: who made this decision, under what authority, with what evidence, and was it later superseded?

---

## Core Docs Available for Deep Reference

These live in `/Users/benwilliams1413/Projects/p0/core/docs/`:

| Doc | What it covers |
| --- | --- |
| `AGENT_RUNTIME_ARCHITECTURE.md` | Agent execution lifecycle |
| `PROJECT0_SYSTEM_BRIEF.md` | Platform overview: Core, Spines, Project One |
| `ARCHITECTURE_MAP.md` | One-diagram platform orientation |
| `INVARIANTS.md` | Non-negotiable system physics |
| `BUILD_DISCIPLINE.md` | Rules for building safely and accountably |
| `LEDGER_UI_SCHEMA.md` | Three-panel Ledger UI schema: sealing, evals, gov |
| `MEMORY_ARCHITECTURE.md` | Memory layers and recall model |
| `MEMORY_INDEXING_SPEC.md` | Promote-time indexing and hot/warm/cold retrieval spec |
| `COGNITIVE_PRELOAD_SPEC.md` | Context bundle assembly before every run |
| `GOVERNANCE_RULES.md` | Governance gate rules and control operations |
| `AUTH.md` | Auth, API keys, roles, and IP allowlist |
| `DEPLOYMENT.md` | Hosting, environment variables, and deployment modes |
| `RATE_LIMITS.md` | Rate limit config and headers |
| `ERROR_MODEL.md` | Error response shape and codes |
| `openapi.yaml` | Full OpenAPI 3 spec for all `/api/v1/` endpoints |

---

## What Build Owns vs What Core Owns

Build never reimplements Core behavior. Build calls Core through the API.

| Build owns | Core owns |
| --- | --- |
| Workspace UX | Agent runtime |
| Project navigation | Memory (Brain + Ledger) |
| Room UI | Governance |
| Track and thread organization | Evaluations |
| Board UI and state | Ledger |
| Chat display | Meetings |
| Agent command interface | Voice |
| Ledger review and promote UX | Auth and tenants |
| | Run traces |
| | Marketplace registry |

---

## Key Integration Rules for Build Engineers

- Every Promote call requires a valid `evaluationId`. Create an evaluation first if one does not exist.
- `authorityMode` must match exactly: `human_led`, `human_in_the_loop`, or `agent_autonomous`.
- Either `summary` or `content` must be present in a Promote payload.
- Use `GET /api/v1/ledger/ui` to populate the Ledger panel. Do not list ledger items directly for UI rendering.
- Cold retrieval (`GET /api/v1/ledger/[id]`) should only be called when a user explicitly requests full detail.
- Agents never write to Build collections directly. All agent state changes flow through `actionsRequested` returned by Core runs.
- `memoryScope` defaults to `working`. Use `personal` scope for agent-specific memory and include `agentId`.
- Do not scan full ledger in any preload or real-time path. Use the warm index (`memory_summaries`) for recall.
- Halt and suspend operations require `admin` role. Build should surface control status from `GET /api/v1/gov/control`.
