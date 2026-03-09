# P0 Core Developer Integration Guide

Use this as the developer-facing entry point for P0 Core. It is written to be linkable from a homepage primitives section and to answer the first questions a developer will ask:

- How do I authenticate?
- Which endpoint do I call?
- What parameters do I send?
- What comes back?
- What does an error look like?
- Is there an SDK?

This guide is grounded in the current codebase and links to the more detailed source docs in this repo.

---

## What P0 Core is

P0 Core is the API-first control plane for human-and-agent systems. It provides shared backend primitives that multiple surfaces can consume:

- agent runtime
- governance
- evaluations
- append-only ledger promote
- artifact sealing
- audit export
- memory rails
- voice rails

If you are building a surface on top of P0, this is the backend you integrate with.

The public integration contract is:

- authenticated API routes
- project-scoped access derived server-side
- documented request and response shapes
- deterministic evaluation, ledger, and artifact behavior

Deployment topology can vary by environment. Integrators should rely on the API contract, not on any specific internal database layout.

---

## Start here

If you only need the fastest path to a working integration, start with these:

1. Read this guide.
2. Read the OpenAPI spec: `docs/openapi.yaml`
3. Use the auth model below.
4. Start with one of the core primitives:
   - `run/simple`
   - `ledger/promote`
   - `evaluations`
   - `authority/delegations`
   - `agent-evaluations`
   - `agents/:id/halt`

Related docs:

- `docs/openapi.yaml`
- `docs/INTEGRATION_SOLO_CORE.md`
- `docs/PROJECTBUILD_CORE_ENV.md`
- `docs/LEDGER_UI_SCHEMA.md`
- `docs/SAFE_TO_MARKET_NOW.md`

---

## Authentication

Core supports these auth modes today:

### 1. Bearer API key

Send:

```http
Authorization: Bearer <token>
```

Supported token types:

- managed ProjectCore API keys
- legacy `PROMOTE_API_KEY`
- Firebase JWTs

Token format may vary by deployment. The stable contract is `Authorization: Bearer <token>`.

### 2. Dev bypass

For localhost development only:

```http
x-dev-bypass: <DEV_BYPASS_SECRET>
```

This is only accepted when:

- `NODE_ENV === "development"`
- request host is localhost
- `DEV_BYPASS_SECRET` matches

### 3. Ops token

Some ops/admin routes use:

```http
x-ops-token: <P0_OPS_TOKEN>
```

Examples:

- `/api/v1/projects` create/list-all
- `/api/v1/metrics/system`

---

## SDK Status

There is a minimal TypeScript helper in the repo:

- `src/sdk/p0Client.ts`

It currently exposes:

- `runAgentSimple(config, input)`

This is **not** a full public SDK yet.

Safe statement:

- P0 Core has a machine-readable OpenAPI spec today.
- A minimal TypeScript client helper exists in-repo.
- A generated/public SDK is not yet shipped.

---

## Core Primitives

These are the primitives most likely to be linked from a homepage primitives section.

### `run()`

Primary route:

- `POST /api/v1/agents/run`

Simpler surface-focused route:

- `POST /api/v1/agents/run/simple`

Required fields for `run/simple`:

- `agentId`
- `message`
- `memoryScope`

Success returns:

- `reply`
- `truthPosture`
- `agentId`
- optional trace/action metadata

See:

- `docs/openapi.yaml`
- `docs/INTEGRATION_SOLO_CORE.md`

### `promote()`

Primary route:

- `POST /api/v1/ledger/promote`

Required fields:

- `evaluationId`
- `summary`
- `authorityMode`

Common optional fields:

- `type`
- `title`
- `tags`
- `agent`
- `actor`
- `truthPosture`
- `clientTimestamp`
- `clientCommitmentHash`
- `opaqueRefs`

Retry safety:

- optional `Idempotency-Key` header for safe retries
- prefer the header-based contract rather than a body field

Important gates:

- evaluation must be open
- `agent_autonomous` + `truthPosture=unknown` is rejected
- autonomous promote requires an active delegation for the actor+agent pair

### `delegate()`

Primary route:

- `POST /api/v1/authority/delegations`

Required fields:

- `agentId`

Optional fields:

- `actorId`
- `authorityMode`
- `scope`
- `expiresAt`

Current permission model:

- delegation creation is admin-scoped in current Core

### `evaluate()`

There are two evaluation systems:

1. Decision sealing evaluations
   - `POST /api/v1/evaluations`
   - `GET /api/v1/evaluations`
   - `GET /api/v1/evaluations/:id`
   - `POST /api/v1/evaluations/:id/close`

2. Agent evaluations
   - `POST /api/v1/agent-evaluations`
   - `GET /api/v1/agent-evaluations`
   - `GET /api/v1/agent-evaluations/:id`
   - `POST /api/v1/agent-evaluations/:id/results`
   - `GET /api/v1/agent-evaluations/:id/results`
   - `GET /api/v1/agent-evaluations/results`

### `halt()`

Primary route:

- `POST /api/v1/agents/:id/halt`

Related:

- `POST /api/v1/agents/:id/suspend`
- `POST /api/v1/agents/:id/resume`
- `GET /api/v1/gov/control`

Required fields:

- `trigger`
- `reason`

Allowed triggers:

- `ruleViolation`
- `safetySignal`
- `humanOverride`
- `evaluationFailure`

---

## Tenant Scope

Project and tenant scope are derived server-side from the authenticated context and are not trusted from client-supplied input.

What clients can rely on:

- requests are project-scoped by auth
- cross-project access is rejected
- key material is hashed at rest for managed-key flows

What clients should not rely on:

- any specific internal Firestore database naming scheme
- any specific system-database layout

Those are deployment details, not the public integration contract.

---

## Quick Reference Table

| Primitive | Route | Purpose |
|-----------|-------|---------|
| `run()` | `POST /api/v1/agents/run/simple` | Run one agent for one turn |
| `promote()` | `POST /api/v1/ledger/promote` | Commit to the ledger |
| `create_evaluation()` | `POST /api/v1/evaluations` | Open a bounded decision window |
| `close_evaluation()` | `POST /api/v1/evaluations/:id/close` | Close the decision window |
| `generate_artifact()` | `POST /api/v1/artifacts/generate` | Seal a closed evaluation into Artifact 5 |
| `delegate()` | `POST /api/v1/authority/delegations` | Create an authority delegation record |
| `evaluate_agent()` | `POST /api/v1/agent-evaluations` | Create an agent evaluation |
| `submit_result()` | `POST /api/v1/agent-evaluations/:id/results` | Submit an agent evaluation result |
| `halt()` | `POST /api/v1/agents/:id/halt` | Halt future runs for an agent |
| `suspend()` | `POST /api/v1/agents/:id/suspend` | Suspend future runs for an agent |
| `resume()` | `POST /api/v1/agents/:id/resume` | Re-enable runs for an agent |

---

## Response Shape

Core commonly uses:

### Success

```json
{
  "ok": true
}
```

or:

```json
{
  "ok": true,
  "...": "operation-specific fields"
}
```

### Error

```json
{
  "ok": false,
  "error": "Human-readable message",
  "code": "MACHINE_CODE",
  "requestId": "req_..."
}
```

Not every route returns every field on every error, but this is the dominant pattern across the API.

Common error codes:

- `BAD_REQUEST`
- `UNAUTHORIZED`
- `FORBIDDEN`
- `NOT_FOUND`
- `CONFLICT`
- `RATE_LIMITED`

---

## First Integration Path

For most teams, the cleanest first integration is:

1. Create an evaluation
2. Run one or more agent turns
3. Promote one or more decisions/notes
4. Close the evaluation
5. Generate the artifact

That gives you a full end-to-end trust loop with minimal surface area.

Important distinction:

- `run()` produces governed output and may be stored in run records when recording is enabled
- `promote()` is what places an item into the immutable ledger and permanent decision record

### Example lifecycle

1. `POST /api/v1/evaluations`
2. `POST /api/v1/agents/run/simple`
3. `POST /api/v1/ledger/promote`
4. `POST /api/v1/evaluations/:id/close`
5. `POST /api/v1/artifacts/generate`

---

## Artifact 5

Artifact 5 is the sealed bundle produced after an evaluation is closed.

Generation request:

- `POST /api/v1/artifacts/generate`
- JSON body: `{ "evaluationId": "..." }`

Current bundle properties include:

- `schemaVersion`
- `generatedAt`
- `generatedBy`
- `identity`
- `evaluation`
- `policySnapshot`
- `ledger.entries`
- `seal.manifestRootHash`
- `seal.bundleHash`
- `seal.signature`

Seal behavior:

- the manifest hash is computed deterministically from canonicalized manifest data
- the bundle includes both `manifestRootHash` and `bundleHash`
- when KMS-backed signing is configured, the seal includes asymmetric signature metadata such as:
  - `signature.scheme`
  - `signature.keyId`
  - `signature.keyName`
  - `signature.algorithm`
  - `signature.signedAt`

Verification model:

1. Rebuild the manifest input from the artifact payload according to the documented contract.
2. Apply deterministic canonicalization.
3. Recompute the SHA-256 manifest hash.
4. Compare it to `seal.manifestRootHash`.
5. Verify the signature according to `seal.signature.scheme`.

For technical integrations, treat the in-repo Artifact 5 schema and implementation as the source of truth rather than simplified marketing examples.

---

## Ledger + Governance + Evals

If you are building a surface similar to ProjectLedger or ProjectBuild, the main UI payloads are already available:

- `GET /api/v1/ledger/ui`
- `GET /api/v1/ledger/ui/behavior`
- `GET /api/v1/ledger/ui/assessments`

Those give you:

- decision sealing
- governance behavior
- control records
- assessment results
- truth-posture aggregates
- rate-limit usage

See:

- `docs/LEDGER_UI_SCHEMA.md`
- `docs/p0-ledger/README.md`

---

## What Is Publicly Documentable Today

If you need a docs URL today, the most realistic link targets in this repo are:

- this guide: `docs/DEVELOPER_INTEGRATION_GUIDE.md`
- OpenAPI: `docs/openapi.yaml`
- surface-specific integration docs such as:
  - `docs/INTEGRATION_SOLO_CORE.md`
  - `docs/PROJECTBUILD_CORE_ENV.md`
  - `docs/p0-ledger/README.md`

This is enough to support a homepage primitives section without creating a documentation dead end.

---

## What Is Not Yet Shipped

Do not promise these as available developer docs features yet:

- generated public SDKs from OpenAPI
- a hosted docs portal
- webhook push delivery
- marketplace moderation workflow

---

## Recommended Public Docs Stack

If you want a minimal public docs motion quickly, the fastest package is:

1. Publish this guide
2. Publish `docs/openapi.yaml`
3. Publish one short auth page
4. Publish one quickstart lifecycle page

That is enough for a developer to click through from `promote()` or `run()` on the homepage and find real implementation guidance.
