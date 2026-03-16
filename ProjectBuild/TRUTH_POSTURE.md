# TRUTH_POSTURE

## The Problem This Solves

Most AI tools present every output with the same visual weight. A confident hallucination looks identical to a fact grounded in durable institutional memory.

This creates a trust problem that compounds over time. Users either over-trust outputs (and downstream decisions are built on shaky foundations) or they stop trusting the system entirely and route around it.

Project0 solves this by requiring agents to classify the epistemic basis of every response — not as a UI gimmick, but as a runtime discipline.

---

## The Three States

Every agent response carries a truth posture classification.

| State | Meaning | Source |
| --- | --- | --- |
| `known` | Backed by durable Core Memory (Brain or Ledger) | A specific ledger item, brain doc, or memory reference |
| `inferred` | Reasoned from known facts, but not directly stored | The agent's reasoning over available context |
| `unknown` | The agent lacks the information needed to answer reliably | No relevant memory, no grounded context |

`unknown` is a valid and required outcome. An agent that cannot say "I don't know" is not finished.

---

## Why This Is Non-Negotiable

The co-worker doctrine is clear: agents are not allowed to be unknowable.

A human colleague who is wrong is correctable. A human colleague who cannot tell you the basis for their reasoning is dangerous.

Truth posture is the mechanism that keeps agents correctable. Without it, the system produces confident noise indistinguishable from grounded conclusions.

The Ledger only becomes valuable over time if the decisions sealed in it were made with an accurate understanding of what was known versus guessed. If agents routinely present inferences as facts, the Ledger becomes polluted institutional memory rather than a reliable record.

---

## How It Works at the Runtime Level

The agent runtime is responsible for attaching a truth posture to every response before it is returned.

This occurs in the Result Packaging step of the agent execution lifecycle (Step 7 in `AGENT_RUNTIME_ARCHITECTURE.md`).

The system prompt instructs the model to append exactly one of the following markers on the last line of its reply:

```
[P0_TRUTH_POSTURE: known]
[P0_TRUTH_POSTURE: inferred]
[P0_TRUTH_POSTURE: unknown]
```

Core strips the marker before returning the reply to clients. The `reply` field that reaches Build is always clean — the marker never appears in the UI.

If the model omits or malforms the marker, Core defaults to `inferred`.

The response object includes:

```ts
{
  reply: string              // clean reply, marker stripped
  truthPosture: "known" | "inferred" | "unknown"
  trace: RunTrace
  actionsRequested?: Action[]
}
```

The type contract lives in `src/core/contracts/truthPosture.ts`:

```ts
export type TruthPosture = "known" | "inferred" | "unknown";
export function isTruthPosture(s: unknown): s is TruthPosture
```

When `truthPosture` is `unknown`, the agent is also expected to say so in the reply text — not just in the metadata.

### Meeting runs

For meeting runs (`POST /api/v1/agents/run/meeting`), every entry in the `replies` array includes its own `truthPosture`. Each agent message in a multi-agent session is classified independently.

---

## How Build Should Surface It

Truth posture should be visible but unobtrusive. It is ambient context, not an alarm.

### Agent message bubble

A small indicator beside the agent's role label.

```text
RESEARCH AGENT   ● KNOWN
[reply text]
PROMOTE
```

Three visual states:

| Posture | Indicator | Style |
| --- | --- | --- |
| `known` | `● KNOWN` or grounded icon | Muted green |
| `inferred` | `◐ INFERRED` or lightbulb icon | Muted amber |
| `unknown` | `○ UNKNOWN` or question mark | Muted grey, slightly different bubble border |

The indicator is not alarming. It is informational.

`unknown` must never be styled or presented in a way that resembles `known`. Users should not be able to mistake uncertain output for grounded fact.

### Hover / expand behavior

On hover or tap of the indicator, show a tooltip:

- `known`: "Grounded in Core Memory"
- `inferred`: "Reasoned from context"
- `unknown`: "Explicitly uncertain — agent does not have the information needed to answer reliably"

### Accessibility

Expose posture via `aria-label` or a live region so screen readers announce it. The `unknown` state in particular should be announced clearly.

### Promote behavior

Truth posture is visible in the Promote confirmation panel when a user promotes an agent message.

An `INFERRED` or `UNKNOWN` response is still promotable — the human makes the final call. The posture is shown read-only so the decision is made with full context.

The promoted Ledger item stores `truthPosture` alongside `authorityMode` and `actor`.

Build always forwards `truthPosture` from the run response into the Promote API call body.

---

## Promote Gate: agent_autonomous + unknown

`agent_autonomous` promote is blocked when `truthPosture === "unknown"`. This is enforced at two layers.

### Core enforcement (live)

`POST /api/v1/ledger/promote` accepts an optional `truthPosture` field on the request body:

```ts
truthPosture?: "known" | "inferred" | "unknown"
```

If `authorityMode === "agent_autonomous"` and `truthPosture === "unknown"`, Core rejects the request with HTTP 400:

```
"agent_autonomous is not allowed when the source reply has truthPosture unknown.
Use human_led or human_in_the_loop, or correct the reply first."
```

### Build enforcement (client-side, defense in depth)

In the Promote confirmation panel, when the source reply has `truthPosture === "unknown"`:

- Do not render `agent_autonomous` as a selectable authority mode option
- Only offer `human_led` and `human_in_the_loop`

This means the user cannot accidentally select an authority mode that Core would reject. The UX prevents the error before the API call is made.

Both layers enforce the rule. Core is the authoritative gate. Build removes the option from the UI so users are never surprised by a 400.

### Why this rule exists

An `agent_autonomous` promote means the agent is committing an outcome to the permanent record without human review. Doing that when the agent itself has declared uncertainty would seal an acknowledged gap as institutional memory. That is the worst possible outcome for ledger integrity.

`unknown` + `agent_autonomous` is not a valid combination. The agent must either find the information (changing posture to `known` or `inferred`) or a human must own the commit.

### Trace toggle

The trace toggle on agent message bubbles exposes `truthPosture` alongside token count and latency for developers and power users.

### What Build reads from the API

```ts
// Single-turn run
const { reply, truthPosture } = await POST("/api/v1/agents/run/simple", body)

// Meeting run — per-agent, per-message
for (const entry of response.replies) {
  const { reply, truthPosture, agentId } = entry
}
```

`truthPosture` is always present on successful responses. No additional API call or endpoint needed.

---

## What This Changes in the UX Contract

Without truth posture: every agent reply looks like an assertion.

With truth posture: the user knows, at a glance, whether they are reading a grounded fact, a reasoned inference, or an acknowledged gap.

This shifts the relationship from "trust the output" to "understand the basis."

That is the co-worker contract. A co-worker is allowed to be wrong. A co-worker is not allowed to be unknowable.

---

## Interaction With Promote

Truth posture and Promote are complementary primitives.

Promote says: "this outcome should enter the permanent record."

Truth posture says: "here is the epistemic basis of this outcome."

Together they ensure that what gets sealed in the Ledger is not just attributable (who promoted it, under what authority) but also legible (was this grounded knowledge or an inference?).

A Ledger of known decisions with documented epistemic basis is qualitatively different from a Ledger of confident outputs with no basis classification.

---

## What Gets Stored in the Ledger Item

When an agent-sourced item is promoted, the Ledger item includes:

```ts
{
  summary: string
  authorityMode: "human_led" | "human_in_the_loop" | "agent_autonomous"
  actor: ActorRef
  truthPosture: "known" | "inferred" | "unknown"
  // ...other fields
}
```

Build passes `truthPosture` from the run response into the Promote API call body. This is a forward from the agent's own classification — the human is not asked to re-classify it.

Over time, the Ledger viewer can surface aggregate stats per agent:

- What percentage of promoted decisions were `known` vs `inferred`?
- How many promoted items came from an `unknown` posture?

This feeds directly into the Eval Score methodology (see `EVAL_SCORE_METHODOLOGY.md`).

---

## Recommended Related Documents

- `AGENT_COWORKER_LAYER.md` (Core docs) — the origin of this model
- `DOCTRINE_AGENTS_AS_COWORKERS.md` (Core docs) — the philosophical grounding
- `AGENT_RUNTIME_ARCHITECTURE.md` — where truth posture is attached during execution
- `SCREEN_SPECS.md` — agent message bubble and Promote panel components
- `LEDGER_INTEGRATION.md` — what gets stored at promote time
- `EVAL_SCORE_METHODOLOGY.md` — how truth posture data feeds eval scoring
