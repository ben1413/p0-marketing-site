# ProjectCore Website Handoff

Use this with:

- `docs/PROJECTCORE_WEBSITE_DOCS_PAGE.md`
- `docs/DEVELOPER_INTEGRATION_GUIDE.md`
- `docs/openapi.yaml`

This file is the fast handoff for publishing `ProjectCore` docs on the website.

---

## Recommended URL Structure

- `project0.io/docs/core`
- `project0.io/docs/core/guide`
- `project0.io/docs/core/openapi`

Optional support pages:

- `project0.io/docs/core/auth`
- `project0.io/docs/core/artifact-5`

---

## What Goes Where

### `project0.io/docs/core`

Use:

- `docs/PROJECTCORE_WEBSITE_DOCS_PAGE.md`

Purpose:

- first-click developer landing page
- polished
- short
- trust-building
- routes developers into the deeper docs

### `project0.io/docs/core/guide`

Use:

- `docs/DEVELOPER_INTEGRATION_GUIDE.md`

Purpose:

- full technical integration guide
- request/response examples
- truth posture
- promote/delegation/evaluation/halt
- artifact details
- integration behavior

### `project0.io/docs/core/openapi`

Use:

- `docs/openapi.yaml`

Purpose:

- machine-readable API contract
- codegen/reference
- implementation support

---

## Recommended Nav Labels

Top nav:

- `Platform`
- `Primitives`
- `ProjectBuild`
- `ProjectCore`
- `ProjectLedger`

Docs nav / subnav:

- `Overview`
- `Integration Guide`
- `OpenAPI`
- `Auth`
- `Artifact 5`

Homepage / product-page links into docs:

- `VIEW THE API`
- `SEE THE DOCS`
- `READ THE GUIDE`

---

## Recommended CTA Labels

Primary:

- `READ THE INTEGRATION GUIDE`

Secondary:

- `VIEW OPENAPI`

Tertiary:

- `CONTACT US`

Alternative shorter variants:

- `READ THE GUIDE`
- `VIEW API SPEC`
- `TALK TO US`

---

## Recommended SEO / Metadata

### Title

`ProjectCore Developer Docs | Project0`

### Meta Description

`ProjectCore is the API-first control plane for human-and-agent systems. Read the integration guide, view the OpenAPI spec, and learn how to build on governed runtime, memory, evaluation, ledger, and artifact rails.`

### Social Description

`Developer docs for ProjectCore: runtime, governance, memory, evaluation, ledger, Artifact 5, and OpenAPI.`

---

## Section Order For Website

1. Hero
2. What ProjectCore is
3. The 5 primitives
4. First integration path
5. What developers need first
6. Trust model
7. Tenancy
8. Auth
9. SDK + reference
10. Closing CTA

This matches `docs/PROJECTCORE_WEBSITE_DOCS_PAGE.md`.

---

## Required Link Targets On The Page

These should all be visible somewhere on `project0.io/docs/core`:

- `Integration Guide`
- `OpenAPI Spec`
- `Artifact 5`
- `Auth and Tenant Model`
- `ProjectBuild Integration`

Backed by repo docs:

- `docs/DEVELOPER_INTEGRATION_GUIDE.md`
- `docs/openapi.yaml`
- `docs/LEDGER_UI_SCHEMA.md`
- `docs/PROJECTBUILD_CORE_ENV.md`
- `docs/SAFE_TO_MARKET_NOW.md`

---

## Trust-Safe Language

Use:

- `logical tenant isolation at the project boundary`
- `server-derived tenant scope`
- `shared control plane with isolated tenant data boundaries`
- `managed API keys, route-level roles, and audit logging`
- `deterministic Artifact 5 sealing with KMS-backed asymmetric signature metadata`

Avoid:

- `physically isolated database per customer`
- `single-tenant by default`
- `dedicated infrastructure for every customer`
- `full generated public SDK`
- `all environments are identical`

---

## Tenancy Language To Reuse

Use this paragraph directly if needed:

`ProjectCore currently provides logical tenant isolation at the project boundary. Tenant scope is derived server-side from authenticated context, all reads and writes are project-scoped, and cross-project access is rejected by default. For standard deployments, this should be described as logical tenant isolation on shared infrastructure. For customers that require dedicated runtime or stronger deployment isolation, that should be offered as a higher-isolation deployment posture rather than implied as the default shared-service model.`

---

## Publish Checklist

- [ ] Publish `project0.io/docs/core` using `docs/PROJECTCORE_WEBSITE_DOCS_PAGE.md`
- [ ] Link `READ THE INTEGRATION GUIDE` to the full guide page
- [ ] Link `VIEW OPENAPI` to the OpenAPI page
- [ ] Ensure homepage `VIEW THE API` points to `project0.io/docs/core`
- [ ] Remove any old copy that claims physical isolation by default
- [ ] Remove any old copy that claims public generated SDKs
- [ ] Ensure Artifact 5 language matches current KMS-backed posture
- [ ] Ensure tenancy language says `logical tenant isolation`

---

## Fastest Shipping Path

If you need this live as fast as possible:

1. Publish `project0.io/docs/core` from `docs/PROJECTCORE_WEBSITE_DOCS_PAGE.md`
2. Publish the existing `docs/DEVELOPER_INTEGRATION_GUIDE.md` as the full guide
3. Publish `docs/openapi.yaml` behind the OpenAPI link

That is enough for the marketing site to link developers into real docs immediately.
