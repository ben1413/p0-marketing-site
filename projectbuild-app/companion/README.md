# ProjectBuild Companion

Local companion for **ProjectBuild**: folder-scoped file read/write via a localhost API. Runs independently on port **3001**. The web app stays hosted; this process runs on your machine. Access is explicit, revocable, and logged.

**Note:** Solo Companion uses port 3847. Both can run simultaneously without conflict.

## Run

```bash
cd companion
npm install
npm run companion
```

Listens on **http://127.0.0.1:3001** (or set `COMPANION_PORT`).

## Scope (allowed folder)

- **Env:** Set `COMPANION_ROOT` to an absolute path (e.g. `COMPANION_ROOT=/Users/you/projects npm run companion`). That folder is the only one readable/writable.
- **API:** Or after start, call `POST http://localhost:3001/api/scope` with body `{ "path": "/absolute/path/to/folder" }` to set the allowed root. Send `{ "path": "" }` or omit path to revoke.

## API (all under `/api`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/scope` | Returns `{ ok, allowed, root? }`. |
| POST | `/api/scope` | Body `{ path: string }`. Set or revoke allowed root. |
| GET | `/api/list?path=...` | List directory (path relative to root). |
| GET | `/api/read?path=...` | Read file (path relative to root). |
| POST | `/api/write` | Body `{ path, content }`. Write file (path relative to root). |
