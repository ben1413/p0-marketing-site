# Conclave (governed live ops)

- **UI:** `/conclave` — Demo / Live Core toggle; browser simulation harness; Firebase sign-in for Live.
- **BFF:** `/api/conclave/gaming/*` → proxies to **`{P0_CORE_BASE_URL}/api/v1/gaming/*`** with forwarded `Authorization`, cookies, and `x-dev-bypass*`.

## Env

- **`P0_CORE_BASE_URL`** — Core API origin (no trailing slash), e.g. `https://your-core.vercel.app` or `http://localhost:3001`.
- **`NEXT_PUBLIC_FIREBASE_*`** — Optional; required for Live mode email/password sign-in on Conclave (same web SDK vars as Firebase Console).

## Local dev

- Core on **3001** (or your usual port), Build on **5000** (`npm run dev`).
- Set `P0_CORE_BASE_URL=http://localhost:3001` in `.env.local`.

Source of truth for product copy also lives in **p0-core** repo: `docs/CONCLAVE_LIVE_OPS_WORKING_DOC.md`.
