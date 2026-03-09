# ProjectCore Website Docs Page

Use this as the **website-ready developer docs landing page** for `project0.io/docs/core` or the equivalent ProjectCore docs route.

This page is intentionally shorter and more polished than the full integration guide. Its job is to:

- convert curiosity into trust
- explain what Core is
- show the first integration path
- answer the top developer questions quickly
- route readers into the full guide and OpenAPI

---

## Recommended URL

- `project0.io/docs/core`

Supporting links:

- `project0.io/docs/core/guide`
- `project0.io/docs/core/openapi`

---

## Page Copy

### Eyebrow

`PROJECTCORE · DEVELOPER DOCS`

### Hero Headline

`The control plane for human-and-agent systems.`

### Hero Subhead

`ProjectCore gives developers the runtime, governance, memory, evaluation, ledger, and artifact rails required to build trustworthy AI systems in production.`

### Hero Body

`Use ProjectCore when your product needs more than model output. Run agents with governed context, open bounded evaluation windows, promote only what should become part of the permanent record, delegate authority explicitly, halt unsafe behavior, and generate sealed artifacts over real decision history.`

### Hero CTA Row

Primary CTA:

`READ THE INTEGRATION GUIDE`

Secondary CTA:

`VIEW OPENAPI`

Tertiary CTA:

`CONTACT US`

---

## Section 1

### Eyebrow

`WHAT IT IS`

### Heading

`ProjectCore is the API-first control plane behind governed AI.`

### Body

`It is not a model provider, not a prompt wrapper, and not a chatbot product. ProjectCore is the backend layer that lets surfaces like ProjectBuild, ProjectLedger, and customer-owned apps run on shared rails for agent execution, memory, governance, evaluation, and immutable decision recording.`

`The point is not just to generate output. The point is to make output attributable, reviewable, correctable, and durable.`

---

## Section 2

### Eyebrow

`THE PRIMITIVES`

### Heading

`Five primitives define the first integration surface.`

### Intro

`Most teams start with five core methods:`

### Primitive Grid

#### `run()`

`Execute one agent with governed context. Returns a reply, truth posture, and runtime metadata.`

#### `promote()`

`Commit a decision or note to the append-only ledger inside an open evaluation.`

#### `evaluate()`

`Open a bounded decision window so promote activity happens inside explicit scope.`

#### `delegate()`

`Create explicit authority delegation for bounded autonomous action.`

#### `halt()`

`Stop future runs for an agent when a rule, human override, or safety event requires it.`

### Primitive Footer

`These are not abstract concepts. They are live API primitives documented in the integration guide and OpenAPI spec.`

---

## Section 3

### Eyebrow

`FIRST INTEGRATION PATH`

### Heading

`The fastest working path is five calls.`

### Body

`For most teams, the cleanest first integration is:`

1. `create_evaluation()`
2. `run()`
3. `promote()`
4. `close_evaluation()`
5. `generate_artifact()`

`That gives you a full governed lifecycle from agent output to bounded decision window to immutable record to sealed Artifact 5 bundle.`

### Inline Example

```text
POST /api/v1/evaluations
POST /api/v1/agents/run/simple
POST /api/v1/ledger/promote
POST /api/v1/evaluations/:id/close
POST /api/v1/artifacts/generate
```

### CTA

`SEE THE FULL LIFECYCLE`

---

## Section 4

### Eyebrow

`WHAT DEVELOPERS NEED FIRST`

### Heading

`The docs answer the questions engineers ask immediately.`

### Checklist Copy

- `How do I authenticate?`
- `What parameters do I send?`
- `What does the response look like?`
- `What does an error look like?`
- `What is required for autonomous action?`
- `How does Artifact 5 sealing work?`
- `Is there an SDK?`

### Body

`ProjectCore ships a full integration guide and machine-readable OpenAPI spec. The guide covers auth, request shapes, truth posture, authority delegation, evaluation lifecycle, promote constraints, artifact generation, and the Ledger UI payloads surfaces use to render governance and assessment views.`

---

## Section 5

### Eyebrow

`TRUST MODEL`

### Heading

`Trust is enforced through runtime boundaries, not implied after the fact.`

### Trust Grid

#### `Truth posture`

`Agent replies are classified as known, inferred, or unknown so downstream systems can distinguish grounded answers from uncertain ones.`

#### `Authority`

`Human-led, human-in-the-loop, and agent-autonomous are declared explicitly at the moment of commitment.`

#### `Evaluation`

`Promote happens inside bounded decision windows. Closed evaluations reject further ledger writes.`

#### `Artifact 5`

`Closed evaluations can be sealed into deterministic artifact bundles with manifest hash, bundle hash, and signature metadata.`

### Trust Footer

`ProjectCore does not claim that model output is always correct. It provides the rails to make AI systems governable, attributable, inspectable, and durable.`

---

## Section 6

### Eyebrow

`TENANCY`

### Heading

`Shared control plane. Isolated tenant boundaries.`

### Body

`ProjectCore currently provides logical tenant isolation at the project boundary. Tenant scope is derived server-side from authenticated context, all reads and writes are project-scoped, and cross-project access is rejected by default.`

`For standard deployments, this should be described as logical tenant isolation on shared infrastructure. For customers that require dedicated runtime or stronger deployment isolation, that should be offered as a higher-isolation deployment posture rather than implied as the default shared-service model.`

---

## Section 7

### Eyebrow

`AUTH`

### Heading

`Bearer auth first. Roles enforced per route.`

### Body

`ProjectCore supports bearer authentication using managed API keys, legacy bearer token flows where supported, and Firebase JWTs. Route-level roles determine who can run agents, create keys, create delegations, or access ops-only paths.`

`For localhost development, a dev bypass can exist in development-only environments. It is not part of the production integration contract.`

---

## Section 8

### Eyebrow

`SDK + REFERENCE`

### Heading

`Use the docs landing page first. Use OpenAPI when you are implementing.`

### Body

`ProjectCore currently provides:`

- `Full Integration Guide`
- `OpenAPI spec`
- `Minimal TypeScript helper in-repo`

`ProjectCore does not yet claim a full generated public SDK.`

### CTA Row

Primary:

`OPEN THE GUIDE`

Secondary:

`VIEW OPENAPI`

---

## Closing Section

### Heading

`Build on governed rails before the workflow is too important to rebuild.`

### Body

`If your team is moving from prompt experiments into production systems, ProjectCore gives you the backend primitives most teams eventually discover they need: runtime, memory, governance, evaluation, ledger, artifact sealing, and audit trails.`

`If you want to build your own surface on top of Core, start with the guide. If you want help structuring the integration, talk to us.`

### Final CTA Row

Primary CTA:

`READ THE INTEGRATION GUIDE`

Secondary CTA:

`VIEW OPENAPI`

Tertiary CTA:

`TALK TO US`

---

## Recommended Supporting Links

Use these links directly on the page:

- `Integration Guide`
- `OpenAPI Spec`
- `Auth and Tenant Model`
- `Artifact 5`
- `Ledger UI`
- `ProjectBuild Integration`

Recommended repo-backed sources:

- `docs/DEVELOPER_INTEGRATION_GUIDE.md`
- `docs/openapi.yaml`
- `docs/LEDGER_UI_SCHEMA.md`
- `docs/PROJECTBUILD_CORE_ENV.md`
- `docs/SAFE_TO_MARKET_NOW.md`

---

## Notes For Site Build

This page should feel like a **developer landing page**, not a PDF pasted into a webpage.

Recommended UX:

- short hero
- clean primitive cards
- one visible first-integration path
- trust section with four small cards
- direct links into guide and OpenAPI

Avoid:

- giant walls of implementation detail on the landing page
- overclaiming physical isolation by default
- promising public generated SDKs
- claiming that every environment is configured identically

The full integration guide should remain the deeper document behind this page.
