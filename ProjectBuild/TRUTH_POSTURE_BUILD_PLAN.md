# TRUTH_POSTURE_BUILD_PLAN

## Status: Phase 1 Shipped

Phase 1 was implemented by the Core team. This document is preserved as a record of the design decisions and for Phase 2 planning.

See `docs/TRUTH_POSTURE.md` in the Core repo for the authoritative implementation report and API contract.

---

## What Shipped (Phase 1)

**Files changed in Core:**

- `src/core/contracts/truthPosture.ts` — `TruthPosture` type and `isTruthPosture()` guard
- `src/core/agents/runAgent.ts` — system prompt marker instruction, parser, `truthPosture` on `ExecuteAgentRunSuccess` and HTTP response
- `src/app/api/v1/agents/run/simple/route.ts` — `truthPosture` in response
- `src/app/api/v1/agents/run/route.ts` — `truthPosture` in response
- `src/app/api/v1/agents/run/meeting/route.ts` — `truthPosture` per entry in `replies[]`
- `AgentRunRecord.output` — `truthPosture` stored alongside `reply`
- `docs/openapi.yaml` — `truthPosture` documented on run/simple and run/meeting responses

**Marker format (actual):**

The model appends one of these on the last line of its reply:

```
[P0_TRUTH_POSTURE: known]
[P0_TRUTH_POSTURE: inferred]
[P0_TRUTH_POSTURE: unknown]
```

Core strips the marker before returning. If missing or invalid, defaults to `inferred`.

**What was not included in Phase 1:**

- Promote-level gate (blocking `agent_autonomous` promote on `unknown`) — deferred, see below
- `memoryRefs` array on the response — not implemented; posture is a classification only

---

## What Build Needs to Do

Read `truthPosture` from the existing run and meeting responses. No new endpoint.

```ts
// Single-turn
const { reply, truthPosture } = response

// Meeting — per message
for (const entry of response.replies) {
  const { reply, truthPosture, agentId } = entry
}
```

Forward `truthPosture` into the Promote API body so it gets stored on the Ledger item.

Render the posture indicator on agent message bubbles per `SCREEN_SPECS.md` and `TRUTH_POSTURE.md`.

---

## Phase 2 — Deferred Work

### Promote gate for `unknown` + `agent_autonomous` — SHIPPED

This gate was implemented in Phase 1 alongside the classification. See `TRUTH_POSTURE.md` for the full spec.

**What shipped:**
- `src/core/schemas/promote.ts` — optional `truthPosture` field on promote body
- `src/app/api/v1/ledger/promote/route.ts` — 400 rejection when `agent_autonomous` + `unknown`
- `docs/openapi.yaml` — `truthPosture` documented on promote request body and 400 response

### Structured JSON output (still deferred)

Replace the suffix-marker approach with OpenAI structured output (`response_format: { type: "json_object" }`), returning:

```json
{
  "reply": "...",
  "truthPosture": "known"
}
```

More reliable across model versions. Requires testing JSON output behavior before shipping.

---

## Related Files

- `src/core/contracts/truthPosture.ts`
- `src/core/agents/runAgent.ts`
- `docs/TRUTH_POSTURE.md` (Core repo — authoritative)
- `/Users/benwilliams1413/Projects/ProjectBuild/TRUTH_POSTURE.md` (ProjectBuild product spec)
- `/Users/benwilliams1413/Projects/ProjectBuild/SCREEN_SPECS.md`

## Summary

Add structured truth posture classification to every agent run response. This enables ProjectBuild to display a `KNOWN / INFERRED / UNKNOWN` indicator on agent message bubbles and carry posture through the Promote flow into the Ledger.

This is a two-phase build. Phase 1 is a prompt-based approach — low risk, no new infrastructure, buildable in one session. Phase 2 moves to structured JSON output from the model for higher reliability.

---

## Phase 1 — Prompt-Based Classification

### What changes

Four files need to change in Core:

1. `src/core/agents/runAgent.ts`
2. `src/core/schemas/promote.ts`
3. `src/core/contracts/agentRun.ts`
4. `src/app/api/v1/ledger/promote/route.ts` (minor)

---

### Change 1 — `runAgent.ts`: system prompt addition

In `buildSystemPromptFromBundle`, add the following instruction block at the end of the returned prompt string:

```ts
"Before your reply, output exactly one of these posture lines on its own line:",
"[POSTURE:known memRefs:id1,id2]   <- use when grounded in specific memory records",
"[POSTURE:inferred]                <- use when reasoning from context, not a specific record",
"[POSTURE:unknown]                 <- use when you lack the information to answer reliably",
"Then continue with your reply on the next line.",
"If posture is unknown, say so in your reply text as well.",
```

---

### Change 2 — `runAgent.ts`: parse posture out of reply

Add a `parseTruthPosture` function after `normalizeActions`:

```ts
type TruthPosture = "known" | "inferred" | "unknown";

type PostureResult = {
  posture: TruthPosture;
  memoryRefs: string[];
  cleanReply: string;
};

function parseTruthPosture(raw: string): PostureResult {
  const lines = raw.split("\n");
  const postureLine = lines[0]?.trim() ?? "";
  const postureMatch = postureLine.match(/^\[POSTURE:(known|inferred|unknown)(?:\s+memRefs:([^\]]*))?\]$/);

  if (!postureMatch) {
    // Model didn't follow format — default to inferred, keep full reply
    return { posture: "inferred", memoryRefs: [], cleanReply: raw.trim() };
  }

  const posture = postureMatch[1] as TruthPosture;
  const memoryRefs = postureMatch[2]
    ? postureMatch[2].split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const cleanReply = lines.slice(1).join("\n").trim();

  return { posture, memoryRefs, cleanReply };
}
```

In `executeAgentRun`, after `const reply = llmResult.text;`, add:

```ts
const { posture: truthPosture, memoryRefs: truthMemoryRefs, cleanReply } = parseTruthPosture(reply);
```

Use `cleanReply` everywhere `reply` is used in the response object (so the posture marker never reaches the UI).

---

### Change 3 — `runAgent.ts`: add posture to return type and response

Add to `ExecuteAgentRunSuccess`:

```ts
truthPosture: "known" | "inferred" | "unknown";
truthMemoryRefs: string[];
```

Add to the `return` object at the bottom of `executeAgentRun`:

```ts
reply: cleanReply,
truthPosture,
truthMemoryRefs,
```

Add to the `ok(...)` response in `runAgent`:

```ts
truthPosture: result.truthPosture,
truthMemoryRefs: result.truthMemoryRefs,
```

Add to the `trace` object:

```ts
truthPosture,
truthMemoryRefs,
```

---

### Change 4 — `runAgent.ts`: governance gate — block agent_autonomous promote on unknown

In the governance gate evaluation, add a posture-based rule check before executing any `promote_ledger` action request:

```ts
if (action.type === "promote_ledger" && truthPosture === "unknown") {
  actionResults.push({
    type: action.type,
    ok: false,
    reason: "Agent-autonomous promote blocked: truth posture is unknown.",
  });
  await govDecisions.create({
    projectId: params.auth.projectId,
    agentId: agent.id,
    jobId: agent.jobId ?? null,
    action: "promote_ledger",
    outcome: "blocked",
    reason: "truth_posture_unknown",
    runId: params.runId ?? null,
  });
  continue;
}
```

Note: this only blocks `promote_ledger` action requests initiated autonomously by the agent. Human-initiated Promote flows via the UI are handled at the API level (see Change 6 below).

---

### Change 5 — `src/core/schemas/promote.ts`: add truthPosture field

Add `truthPosture` as an optional field to the promote body schema:

```ts
truthPosture: z.enum(["known", "inferred", "unknown"]).optional(),
truthMemoryRefs: z.array(z.string()).optional(),
```

This allows the Build surface to forward the posture from the agent response into the Promote payload, so it gets stored on the Ledger item.

---

### Change 6 — `src/app/api/v1/ledger/promote/route.ts`: block autonomous promote on unknown

In the promote route handler, after validating the body, add:

```ts
if (
  body.authorityMode === "agent_autonomous" &&
  body.truthPosture === "unknown"
) {
  return NextResponse.json(
    { error: "agent_autonomous promote is not permitted when truth posture is unknown." },
    { status: 422 }
  );
}
```

This is the server-side enforcement of the double-verify rule. Even if a client attempts to bypass the UI, the API will reject it.

---

### Change 7 — `src/core/contracts/agentRun.ts`: persist posture in run record

Add to `AgentRunRecord` and `AgentRunCreateInput`:

```ts
truthPosture?: "known" | "inferred" | "unknown" | null;
truthMemoryRefs?: string[] | null;
```

Update `persistAgentRunIfEnabled` in `runAgent.ts` to pass these fields when creating the run record.

---

## What Build Needs to Do

No Core API changes are required on the Build side beyond reading new fields that will now appear in the agent run response.

Build reads:

```ts
response.truthPosture   // "known" | "inferred" | "unknown"
response.truthMemoryRefs  // string[] of memory record IDs
```

Build forwards these into the Promote confirmation panel pre-fill and into the Promote API call body:

```ts
POST /api/v1/ledger/promote
{
  ...existingFields,
  truthPosture: "inferred",
  truthMemoryRefs: []
}
```

Build renders the posture indicator on the message bubble as specified in `SCREEN_SPECS.md` and `TRUTH_POSTURE.md`.

---

## Phase 2 — Structured JSON Output (future)

In Phase 2, replace the prefix-marker approach with a proper structured output call.

The model returns:

```json
{
  "reply": "Here is what I found...",
  "truthPosture": "known",
  "memoryRefs": ["brain_doc_id_1", "ledger_item_id_2"]
}
```

This requires:
- Changing `callOpenAI` to use `response_format: { type: "json_object" }` (or the structured outputs API)
- Removing `parseTruthPosture` and replacing with direct JSON field extraction
- Validating the response shape with Zod before using it

Phase 2 is more reliable but requires testing model JSON output behavior across model versions. Phase 1 is safe to ship first.

---

## Rollback / Feature Flag

Wrap the posture parsing in a feature flag:

```ts
const TRUTH_POSTURE_ENABLED = process.env.P0_TRUTH_POSTURE_ENABLED === "true";
```

If disabled: `parseTruthPosture` returns `{ posture: "inferred", memoryRefs: [], cleanReply: raw.trim() }` for all responses. The field is still present in the response but always `inferred`. No UI change needed — the indicator just always shows amber.

---

## Testing Checklist

- [ ] Agent response with `[POSTURE:known memRefs:abc,def]` prefix parses correctly
- [ ] Agent response with `[POSTURE:inferred]` prefix parses correctly
- [ ] Agent response with `[POSTURE:unknown]` prefix parses correctly
- [ ] Agent response with missing/malformed posture line defaults to `inferred`
- [ ] `cleanReply` never contains the posture marker line
- [ ] `agent_autonomous` promote with `truthPosture: "unknown"` returns 422
- [ ] `human_led` promote with `truthPosture: "unknown"` proceeds normally
- [ ] `truthPosture` and `truthMemoryRefs` appear in the run trace
- [ ] `truthPosture` stored on the Ledger item after promote
- [ ] Feature flag off: posture always `inferred`, no other behavior change

---

## Related Files

- `src/core/agents/runAgent.ts` — primary change file
- `src/core/schemas/promote.ts` — promote schema addition
- `src/core/contracts/agentRun.ts` — run record contract addition
- `src/app/api/v1/ledger/promote/route.ts` — gate on autonomous promote
- `docs/AGENT_COWORKER_LAYER.md` — origin of the Known/Inferred/Unknown model
- `docs/DOCTRINE_AGENTS_AS_COWORKERS.md` — philosophical grounding

## ProjectBuild Reference

- `/Users/benwilliams1413/Projects/ProjectBuild/TRUTH_POSTURE.md` — product spec
- `/Users/benwilliams1413/Projects/ProjectBuild/SCREEN_SPECS.md` — UI component spec
