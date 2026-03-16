# BUILDER_MODE_IMPLEMENTATION

## Purpose

This document records everything that was actually built for Builder Mode — the
real file-level spec. The design intent lives in `BUILDER_MODE.md`. This is the
implementation record.

---

## What Was Built

Builder Mode is a floating IDE shell embedded in ProjectBuild. It opens over
any project screen (Room, Board, Ledger) via a BUILDER button in the header.
It gives human + agent teams a direct coding environment with version control
awareness, a live file editor, structured agent reasoning, and a promote flow
for sending work through governance.

---

## File Map

### Companion

| File | What it does |
|---|---|
| `companion/server.js` | Standalone Express server on port 3001. Provides folder-scoped file read, write, list, and git branch APIs. Runs on the user's machine. |
| `companion/package.json` | Companion-specific dependencies (express only). Run `npm install` from the `companion/` folder before starting. |
| `companion/README.md` | Setup and usage instructions for the Companion. |

**To start the Companion:**
```bash
cd companion
npm install
COMPANION_ROOT=/path/to/your/project node server.js
```

**Companion endpoints:**
- `GET /api/scope` — returns current scoped root
- `POST /api/scope` — set or revoke the scoped root folder
- `GET /api/list?path=` — list directory contents
- `GET /api/read?path=` — read file content
- `POST /api/write` — write file content `{ path, content }`
- `GET /api/git/branch` — returns current git branch via `git rev-parse --abbrev-ref HEAD`

---

### Client Helpers

| File | What it does |
|---|---|
| `lib/companion.ts` | Client-side fetch wrappers: `companionList`, `companionRead`, `companionWrite`, `companionBranch`, `companionSetScope`. All target `localhost:3001`. |
| `lib/hooks/useCompanionStatus.ts` | React hook. Polls `GET /api/scope` once on mount. Returns `{ connected, allowed, root, error }`. Exports `COMPANION_BASE`. |
| `components/CompanionStatus.tsx` | Visual indicator in shell headers. Shows green dot + "companion · localhost:3001" when connected and scoped. Shows "off" state otherwise. |

---

### Builder Shell Components

| File | What it does |
|---|---|
| `components/builder/BuilderButtonAndShell.tsx` | Toggle button + open/close state. Lazy runId creation — runId is only created when Builder is actually opened, not on page load. Renders backdrop + BuilderShell when open. |
| `components/builder/BuilderShell.tsx` | Main floating shell container. Owns: activeFilePath state, promoteTarget state, cognitive preload, streaming state. Layout: header / file tree (resizable) / drag handle / code editor / agent chat + agent bar. File tree width persisted to `pb_builder_filetree_width` in localStorage. |
| `components/builder/FileTree.tsx` | Recursive file/folder list from Companion. Calls `companionList`. Click to select a file, sets `activeFilePath` in BuilderShell. |
| `components/builder/CodeEditor.tsx` | Public entry point. Dynamic import of `CodeEditorInner` with `ssr: false`. Shows graceful degradation when Companion is not running. |
| `components/builder/CodeEditorInner.tsx` | Actual CodeMirror 6 implementation. Lazy file load — only fetches when `filePath` changes. Debounced autosave (800ms) via `companionWrite`. Language detection: `.ts/.tsx/.js/.jsx` → JS extension with flags; `.css` → CSS; `.json` → JSON. |
| `components/builder/BuilderAgentBar.tsx` | Send input at the bottom of the right panel. Agent selector dropdown (loads from `/api/agents/list`). Textarea + send button. Enter key sends. Disabled + pulsing during stream. |
| `components/builder/BuilderAgentChat.tsx` | Message history strip. Two layers: completed messages from Firestore (`useMessages`), and in-progress streaming bubble (`streamingMsg` prop). Auto-scrolls to bottom. |
| `components/builder/BuilderBubble.tsx` | Single message bubble. PROMOTE is role-gated — only renders on `authorType === 'agent'`. Fades in on hover. Renders `BlockRenderer` for structured blocks; falls back to plain `message.text`. PROMOTE suppressed while `isStreaming`. |

---

### Structured Block System

Block rendering introduced in the agent chat to support the structured reasoning
trail (todo lists, file exploration, diffs, text).

| File | What it does |
|---|---|
| `components/builder/blocks/BlockRenderer.tsx` | Renders an array of `MessageBlock[]` in canonical order: `file_explored → todo_list → text → diff`. |
| `components/builder/blocks/TextBlock.tsx` | Plain prose. Shows blinking `▋` cursor when `isStreaming` is true. |
| `components/builder/blocks/TodoListBlock.tsx` | Checklist. Status icons: empty circle (pending), pulsing amber dot (in_progress), amber `✓` (done). Done items are strikethrough. |
| `components/builder/blocks/FileExploredBlock.tsx` | Collapsed by default. Click `▸` to expand file paths. Shows count label ("Explored N files"). Monospace paths. |
| `components/builder/blocks/DiffBlock.tsx` | Before/after code view. Toggle between "After" (green) and "Before" (muted). Max height 48, scrollable. |

---

### Streaming

| File | What it does |
|---|---|
| `app/api/v1/agents/run/stream/route.ts` | SSE proxy route. Receives POST from browser, calls `runAgentStream` in coreClient, pipes Core's SSE body straight through. `X-Accel-Buffering: no` header prevents nginx buffering in prod. |
| `lib/builder/useBuilderStream.ts` | SSE consumer and block assembler. Manages `streamingMsg` state. On each event: appends text, merges file_explored, patches todo_update, replaces todo_list, appends diff. On `[DONE]`: writes complete message to Firestore (`pb_messages`) with both `text` and `blocks` fields, then clears streaming state. Uses `blocksRef` to avoid stale closures in the async reader. |

**Block assembly rules:**
- `text` events → append to single text block (streaming LLM chunks)
- `file_explored` → merge all files into one block, update label
- `todo_list` → replace wholesale
- `todo_update` → patch specific task status in place
- `diff` → append new diff block

---

### Cognitive Preload

| File | What it does |
|---|---|
| `lib/builder/useCognitivePreload.ts` | Fires once on BuilderShell mount. Fetches branch and scope root from Companion in parallel. Returns `buildPreamble(filePath)` — prepends `[Builder Context]` block to the first agent message only (gated by `usedRef`). Subsequent messages are not prefixed. |

**Preamble format injected into first message:**
```
[Builder Context]
Project: {projectId}
Branch: {branch}
Root: {root}
Open file: {filePath}
---
```

---

### Promote Flow

| File | What it does |
|---|---|
| `lib/builder/builderPromoteSchema.ts` | Zod schema for the promote payload. Cross-field validation: `evaluationId` required when scope is `ledger`; `agent` required when scope is `ledger` and authority is `agent-autonomous`. |
| `app/api/v1/builder/promote/route.ts` | Route handler for all three promote scopes. Personal/team → writes to Firestore via Firebase Admin SDK. Ledger → calls Core's `/api/v1/ledger/promote` via coreClient. All scopes write a checkpoint doc. |
| `components/builder/BuilderPromoteModal.tsx` | Three-scope UI: Personal / Team bucket / Finished work. Authority row only shows on ledger scope. Branch fetched from Companion on open. CTA label and color change per scope. |
| `lib/builder/firestoreSchema.ts` | Firestore collection name constants and type definitions. |

**Firestore collections:**
- `pb_builder_personal` — personal promote bucket
- `pb_builder_team` — team promote bucket
- `pb_builder_checkpoints` — last promote checkpoint per `projectId|userId|branch`

**Checkpoint key design:** `${projectId}|${userId}|${branch}` as the Firestore doc ID.
Two engineers on the same project on different branches get independent checkpoint docs.
`merge: true` on `.set()` means repeat promotes update-in-place.

---

### Firebase Admin

| File | What it does |
|---|---|
| `lib/firebase/admin.ts` | Server-side Firebase Admin client. Credential resolution: `FIREBASE_SERVICE_ACCOUNT_JSON` (full JSON as string, preferred) or three individual vars (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`). Used by the promote route for direct Firestore writes. |

**Required env vars:**
```
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
```

---

### Types Extended

All changes are backward-compatible. Existing `text` field preserved on all types.

**Added to `types/index.ts`:**
```typescript
type TodoTask = { id: string; label: string; status: "pending" | "in_progress" | "done" }

type MessageBlock =
  | { type: "text"; content: string }
  | { type: "todo_list"; tasks: TodoTask[] }
  | { type: "file_explored"; files: string[]; label: string }
  | { type: "diff"; before: string; after: string; filePath: string }
```

**`ThreadMessage`** — added `blocks?: MessageBlock[]`
**`RunSimpleResponse`** — added `blocks?: MessageBlock[]`
**`RunInput`** — added `builderMode?: boolean`

---

### Core Client Extended

**Added to `lib/p0/coreClient.ts`:**
- `runAgentSimple` now passes `builderMode: true` when `input.builderMode` is set
- `runAgentStream(input)` — returns raw `Response` for stream proxying

---

### Nav Integration

BUILDER button added to `headerActions` in:
- `components/room/ProjectRoom.tsx`
- `components/board/BoardScreen.tsx`
- `components/ledger/LedgerScreen.tsx`

Pattern: `<BuilderButtonAndShell projectId={projectId} runId={runId} />`
Room passes its own `runId`. Board and Ledger create lazily on open.

---

## Environment Variables Required

```bash
# Core connection
P0_CORE_BASE_URL=http://localhost:3000
P0_CORE_API_KEY=your_p0_managed_key_with_agent_runner_role
P0_CORE_AGENT_ID=your_default_agent_id

# Firebase Admin (for promote route)
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}

# Optional: Companion URL override
NEXT_PUBLIC_COMPANION_URL=http://localhost:3001
```

**Note:** `P0_CORE_API_KEY` must be a managed key created via
`POST /api/v1/keys` with `role: "agent_runner"`. Core enforces this
on the promote route — ProjectBuild does not duplicate the check.

---

## Known Pending Items

| Item | Status |
|---|---|
| Stream 502 on send | Core's `/api/v1/agents/run/simple/stream` needs to be deployed to the target Core instance. The proxy route is built and correct. |
| Firestore index for `pb_tracks` | Create via Firebase Console link in error message. Takes ~60 seconds to build. |
| `userId` hardcoded as `"local"` in promote modal | Replace with real user identity when Firebase Auth is wired up. |
| File tree drag handle width | Persisted to localStorage. Min 140px, max 400px, default 220px. |

---

## Build Order Followed

```
1. Companion (server.js, package.json)
2. useCompanionStatus + CompanionStatus
3. lib/companion.ts client helpers
4. BuilderShell scaffold (empty shell, layout zones)
5. BuilderButtonAndShell (lazy runId)
6. FileTree
7. CodeEditor + CodeEditorInner (CodeMirror 6, SSR:false)
8. BuilderBubble (role-gated PROMOTE)
9. BuilderAgentChat
10. BuilderPromoteModal (3 scopes)
11. lib/firebase/admin.ts
12. builderPromoteSchema (Zod)
13. promote route handler
14. firestoreSchema + checkpoint design
15. useCognitivePreload
16. Structured block components (4 blocks + BlockRenderer)
17. useBuilderStream (SSE consumer)
18. SSE proxy route
19. BuilderAgentBar
20. Wire BuilderShell (stream + bar + chat)
21. Types extended
22. Nav integration (Room, Board, Ledger)
```
