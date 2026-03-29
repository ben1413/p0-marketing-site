# Greenlight

**Governed live ops for games.** Propose, simulate, approve, and deploy changes with a permanent, tamper-evident accountability record.

Greenlight is a standalone product built on [Project0 Core](https://github.com/p0/core) — an append-only Ledger and governed agent runtime. It is designed to be acquisition-ready: a buyer can keep the Core infrastructure or migrate to their own.

---

## What it is

A live ops operator console that gives studios:

- **Decision accountability** — every proposal, simulation, approval, and outcome in a single sealed chain
- **Governance gates** — simulation hash enforcement, freshness thresholds, authority attribution on every deploy
- **Outcome tracking** — predicted vs. actual delta, automatic detection when deployments underperform
- **Audit export** — filterable governance table → PDF in one click, with KMS-signed artifact verification
- **Agent identity** — trust scores, violation tracking, and behavioral accountability for AI agents
- **Plain-language narration** — every system state, error, and decision explained in operator language, not API codes

---

## Contents

```
greenlight/
├── src/
│   ├── app/
│   │   ├── (operator)/
│   │   │   ├── dashboard/         # System health + live risk alerts
│   │   │   ├── proposals/         # Decision timeline + detail pages
│   │   │   ├── activity/          # Governance audit + PDF export
│   │   │   ├── story/             # The Moderation Incident (proof scenario)
│   │   │   ├── why-not-build/     # Build vs. buy argument
│   │   │   ├── settings/          # Integration paths + enforcement model
│   │   │   ├── deploys/           # Phase B stub
│   │   │   ├── experiments/       # Phase B stub
│   │   │   ├── incidents/         # Phase B stub
│   │   │   └── moderation/        # Phase B stub
│   │   ├── api/gaming/[...path]/  # BFF proxy → Core gaming APIs
│   │   └── sign-in/               # Firebase Auth operator login
│   ├── components/                # 20+ UI components
│   ├── lib/
│   │   ├── types.ts               # 5 UI data contracts (Decision, TrailEvent, etc.)
│   │   ├── plainLanguage.ts       # Plain-language translation for all system states
│   │   ├── seed.ts                # Nexus Online demo data (30 days, 6 proposals)
│   │   ├── core.ts                # Server-side Core API client
│   │   └── auth.ts                # Firebase Auth (browser-side)
│   └── middleware.ts              # Route protection (demo mode bypass available)
├── mcp/                           # Greenlight MCP server (12 tools, session-aware)
├── docs/
│   ├── BUILD_PLAN.md              # Phase A/B/C build plan
│   └── DEMO_SCRIPT.md             # 20-minute word-for-word demo flow
└── .env.local.example             # All required environment variables
```

---

## Getting started

### 1. Clone and install

```bash
git clone https://github.com/your-org/greenlight
cd greenlight
npm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:

```env
# Core API (required for live mode)
CORE_URL=https://your-core-instance.vercel.app
GREENLIGHT_CORE_API_KEY=your_admin_key_here
GREENLIGHT_GAME_ID=your_game_id_here

# Demo mode — seed data, no Core connection required
GREENLIGHT_DEMO_MODE=true

# Firebase Auth (required for production sign-in)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
```

### 3. Run

```bash
npm run dev
# → http://localhost:3000
```

With `GREENLIGHT_DEMO_MODE=true`, no Core connection or sign-in is required. The Nexus Online seed data is fully interactive.

---

## The five demo moments

| # | Moment | Where |
|---|--------|-------|
| 1 | **"You can prove it"** — full trail, sealed artifacts | `/proposals/[id]` |
| 2 | **"We stopped it"** — simulation gate block, plain language | `/proposals` (blocked card) |
| 3 | **"It knew before you did"** — narrative + live risk alert | `/dashboard` |
| 4 | **"Here's what your AI may do"** — agent identity + trust | Dashboard agent strip |
| 5 | **"Take it"** — governance audit → PDF export | `/activity` |

See [`docs/DEMO_SCRIPT.md`](docs/DEMO_SCRIPT.md) for the full 20-minute word-for-word flow.

---

## MCP server

The Greenlight MCP gives AI agents (Claude, Cursor, etc.) governed access to live ops workflows.

```json
{
  "mcpServers": {
    "greenlight": {
      "command": "node",
      "args": ["mcp/index.js"],
      "env": {
        "P0_API_KEY": "your_admin_key",
        "P0_CORE_URL": "https://your-core-instance.vercel.app",
        "GREENLIGHT_GAME_ID": "your_game_id"
      }
    }
  }
}
```

12 tools: `gl_session_start`, `gl_propose_decision`, `gl_simulate`, `gl_approve`, `gl_deploy`, `gl_check_ledger`, `gl_recall_context`, `gl_log_outcome`, `gl_open_rollback`, `gl_get_system_health`, `gl_get_audit`, `gl_session_end`.

---

## Architecture

```
Browser
  └── Greenlight Next.js app (this repo)
        ├── /app/(operator)/*      — UI (server components + client islands)
        ├── /app/api/gaming/*      — BFF proxy (API key never leaves server)
        └── /src/middleware.ts     — Auth guard
              │
              ▼
        Project0 Core (cloud-hosted)
              ├── /api/v1/gaming/* — Live ops APIs
              ├── /api/v1/ledger/* — Append-only Ledger
              └── /api/v1/brain/*  — Context recall
```

Greenlight does not host the Ledger or governance engine — those live in Core. The UI and BFF are entirely owned by the buyer.

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CORE_URL` | Live mode | Project0 Core base URL |
| `GREENLIGHT_CORE_API_KEY` | Live mode | Admin API key — never exposed to browser |
| `GREENLIGHT_GAME_ID` | Live mode | Game ID to scope all gaming API calls |
| `GREENLIGHT_DEMO_MODE` | Optional | `true` to use seed data, skip auth |
| `NEXT_PUBLIC_FIREBASE_*` | Production | Firebase project config for operator sign-in |
| `P0_API_KEY` | MCP | Same as `GREENLIGHT_CORE_API_KEY` |
| `P0_CORE_URL` | MCP | Same as `CORE_URL` |

---

## Roadmap

**Phase B** (post first customer)
- Multi-party approval workflow (routing + reminders)
- Change calendar / blackout window enforcement
- Incident war-room mode (expedited path, required post-hoc verification)
- Gradual rollout — % ramp, region targeting, staged deploy
- Post-deploy verification (canary/SLO as formal step)
- Automatic rollback triggers (drift threshold → open rollback proposal)

**Phase C** (enterprise / multi-title)
- Portfolio health across games
- Cohort / segment targeting
- Decision → comms bundle (versioned copy, in-game messaging)
- Regional rules DSL (enforceable constraints by region)
- Customer-controlled KMS key (BYOK artifact signing)

---

## Acquisition

Greenlight is a standalone product. It calls Project0 Core for its Ledger, governance engine, and gaming APIs.

A buyer has two options:
1. **Keep Core** — continue paying for Core infrastructure. The Ledger, governance rules, KMS signing, and audit APIs stay intact. No migration.
2. **Port** — migrate the decision storage, simulation gating, and audit export to their own infrastructure. The UI and BFF are self-contained Next.js. The Core dependency is isolated to `src/lib/core.ts` and the BFF proxy.

Either way, the UI, components, plain-language layer, MCP, and demo data are fully owned by the buyer.

---

## License

MIT — see [LICENSE](LICENSE)
