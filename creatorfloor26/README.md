# CreatorFloor (creatorfloor26)

End-to-end surface for **hyper-casual** creators: **Build**, **Design**, **Board**, **Live Ops**, **Ledger**, **GDD**, wired to **P0 Core** (agents, brain, ledger, gaming APIs). See **`CREATORFLOOR_DIRECTION.md`** for product truth.

## Run

1. Start **P0 Core** (`~/Projects/p0/core`): `npm run dev` — note the port.
2. Copy `.env.example` to `.env.local` and set `P0_CORE_BASE_URL`, `DEV_BYPASS_SECRET`, `P0_CORE_PROJECT_ID` to match Core.
3. **Optional:** set `NEXT_PUBLIC_FIREBASE_*` + Admin credentials so Auth + Firestore work; without them the app still runs with dev bypass and local registry.
4. From this repo: `npm run dev` (e.g. `npm run dev -- -p 7000`).

### Local Companion (Rojo / disk projects)

```bash
npm run companion
# default http://127.0.0.1:3002 — POST /api/scope with { "path": "/absolute/path/to/rojo/project" }
```

## Auth

- **Firebase** (recommended): Sign in at `/auth`. The **Firebase ID token** is sent as `Authorization: Bearer` to Core proxies.
- **Legacy**: paste JWT in **Settings** (session storage) or `P0_CORE_BEARER_TOKEN` on the server for bootstrap.
- **Dev**: `DEV_BYPASS_SECRET` + `P0_CORE_PROJECT_ID` when no Bearer is present.

## Routes

| Path | Purpose |
|------|---------|
| `/platform/home` | Projects (Firestore + local registry merge) |
| `/platform/projects/new` | CreatorKit + bootstrap on Core |
| `/platform/projects/[id]` | Overview + sub-nav |
| `.../build` | Three-panel Builder (Companion + CodeMirror + agent) |
| `.../design` | Designer canvas + promote |
| `.../board` | Kanban + Core gaming proposals strip |
| `.../live` | Live Ops metrics (Core gaming APIs) |
| `.../ledger` | Ledger UI (Core) |
| `.../settings` | `gameId`, Rojo notes, Open Cloud, **GDD editor** |

## API proxies (BFF → Core)

- `/api/v1/gaming/*`, `/api/v1/ledger/*`, `/api/v1/brain/*`, `/api/v1/evaluations/*`
- `/api/v1/builder/promote` — personal/team (Firestore `cf_*`), ledger + gaming → Core
- `/api/v1/agents/run/stream` — SSE to Core
- `/api/v1/telemetry/ingest` — in-experience telemetry
- `/api/v1/webhooks/roblox` — stub webhook receiver
- `/api/roblox/universe/[id]` — Open Cloud stub when `ROBLOX_API_KEY` is set

## Firestore rules (sketch)

Secure `cf_projects`, `cf_boards`, `cf_builder_*` so `request.auth.uid == resource.data.userId` (adjust per collection). Deploy in Firebase Console.

## Luau SDK

`public/sdk/CreatorFloorTelemetry.lua` — point `ingestUrl` at your deployed origin + `/api/v1/telemetry/ingest`.

## Kit definitions

`src/lib/init/` — platform context (Roblox / UEFN) and CreatorKits.
