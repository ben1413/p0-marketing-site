# Greenlight

**Governed live ops for games.** Propose, simulate, approve, and deploy changes to live games with a permanent audit record. Every change is attributed, reversible, and defensible.

---

## What it is

Greenlight is a governed operations layer for live games. It replaces the gap between "we decided to change the economy" and "we can prove what we deployed, who approved it, and whether it worked."

**The pipeline:**

```
Propose → Simulate → Approve → Deploy → Measure → Rollback if needed
```

Every step that writes to a live game produces a sealed Ledger record — attributed, hash-anchored, not editable. Publishers, platform partners, and regulators can verify the full chain without access to your systems.

---

## What's included

```
greenlight/
  src/
    app/                    ← Next.js operator console
      (operator)/
        dashboard/          ← Main ops view
        proposals/new/      ← New proposal form
      api/gaming/[...path]/ ← BFF proxy → Core gaming APIs
    components/             ← Sidebar, ProposalsFeed, GovernanceHealth, etc.
    lib/core.ts             ← Server-side Core client (keys never in browser)
  mcp/                      ← Greenlight MCP (for AI agents in Cursor / Claude)
```

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variables

```bash
cp .env.local.example .env.local
# Fill in CORE_URL, GREENLIGHT_CORE_API_KEY, GREENLIGHT_GAME_ID
```

### 3. Run the operator console

```bash
npm run dev
# Open http://localhost:3001
```

### 4. (Optional) Run the MCP server for AI agents

```bash
cd mcp && npm install && npm run build
```

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "greenlight": {
      "command": "node",
      "args": ["/path/to/greenlight/mcp/dist/index.js"],
      "env": {
        "P0_API_KEY": "your_admin_key",
        "P0_CORE_URL": "https://your-core-instance.vercel.app"
      }
    }
  }
}
```

---

## MCP tools (12)

| Tool | What it does |
|------|-------------|
| `conclave_set_game` | Set active game + authority mode |
| `conclave_status` | Session snapshot — zero API calls |
| `conclave_propose` | Submit a governed change proposal |
| `conclave_simulate` | Run trust scoring — score + pass/fail |
| `conclave_approve` | Approve (admin required) |
| `conclave_reject` | Reject with reason |
| `conclave_deploy` | One-call deploy authorize + sealed Ledger record |
| `conclave_rollback` | Roll back — sealed to Ledger permanently |
| `conclave_outcomes` | Predicted vs actual for any deployment |
| `conclave_incident` | Create / update / resolve incidents |
| `conclave_moderation` | Moderate players (actions seal to Ledger) |
| `conclave_experiment` | A/B experiments: create, start, stop, results |

---

## Architecture

Greenlight is a **surface on Core**. It does not store governed data — that lives in [Project0 Core](https://project0.ai). The operator console is a Next.js app with a BFF pattern: the browser calls `/api/gaming/*` routes, which forward to Core with a server-held API key. Core keys are never in the browser.

```
Browser → Greenlight BFF (Next.js /api/gaming/[...path]) → Core gaming APIs
```

**What this means for buyers:**

If you acquire Greenlight, you can:
- Keep using Project0 Core as the backend (pay for Core infrastructure)
- Port to your own Core deployment (Core is API-based, not locked to a specific host)
- The operator console and MCP work against any Core-compatible API

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CORE_URL` | Yes | Project0 Core base URL |
| `GREENLIGHT_CORE_API_KEY` | Yes | Admin API key — server-side only, never in browser |
| `GREENLIGHT_GAME_ID` | Yes | The game this instance manages |

---

## Roadmap

- [ ] Firebase Auth for operator sign-in (per-user roles)
- [ ] Proposal detail page (simulate, approve, deploy from UI)
- [ ] Experiments dashboard
- [ ] Incidents board
- [ ] Moderation queue
- [ ] Multi-game selector (switch between gameIds in sidebar)
- [ ] Outcome charts (predicted vs actual visualization)
- [ ] Audit export (compliance download)

---

## License

MIT — use it, sell it, build on it.
