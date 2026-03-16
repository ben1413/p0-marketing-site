# CURRENT TASKS

*Last updated: March 2026*

This is the live task list for ProjectBuild. Update it as items are completed.
Check items with `[x]` when done. Add new items at the bottom of the relevant section.

---

## IMMEDIATE — Unblocks the app

These are blocking real usage right now. Do these first.

- [ ] **Deploy Core's stream endpoint**
  Core's `/api/v1/agents/run/simple/stream` needs to exist on your Core instance.
  The proxy route in ProjectBuild (`app/api/v1/agents/run/stream/route.ts`) is built
  and correct. Until Core deploys this endpoint, every agent message in Builder Mode
  returns a 502. This is a Core-side task.

- [ ] **Create the missing Firestore index**
  The `pb_tracks` query requires a composite index. Open the app, trigger the error,
  and click the Firebase Console link in the error message. Takes ~60 seconds to build.
  One-time action.

- [ ] **Confirm `P0_CORE_API_KEY` is set in `.env.local`**
  Must be a managed Core API key created via `POST /api/v1/keys` with
  `role: "agent_runner"`. Without this every agent call from ProjectBuild to Core
  returns 401. Key is already in `.env.local` — confirm it has the right role.

---

## SHORT TERM — Wire up real auth

- [ ] **Replace `userId: "local"` with real Firebase Auth**
  Both `BuilderPromoteModal` and `DesignerPromoteModal` hardcode `userId: "local"`.
  When Firebase Auth is wired in, swap for the signed-in user's `uid`.
  Also affects `pb_builder_checkpoints` key — right now all promotes from the same
  project share one checkpoint doc regardless of who did it.

---

## SHORT TERM — End-to-end smoke tests

- [ ] **Test Builder Mode end to end**
  1. Start Companion: `cd companion && COMPANION_ROOT=/path/to/project node server.js`
  2. Open a project → click BUILDER
  3. Confirm file tree loads from Companion
  4. Confirm CodeMirror opens a file on click
  5. Confirm agent bar submits and stream connects (or 502 until Core deploys)
  6. Confirm promote flow writes to the correct Firestore collections
     (`pb_builder_personal`, `pb_builder_team`, `pb_builder_checkpoints`)

- [ ] **Test Designer Mode end to end**
  1. Open a project → click DESIGNER
  2. Confirm Konva canvas loads (dark grid, no SSR errors)
  3. Confirm tool panel responds — draw a rect, place a text element
  4. Confirm sidebar rail hover/click peek panels work
  5. Confirm agent bar submits (stream connects or 502 gracefully)
  6. Confirm "Apply to canvas?" overlay appears if agent returns canvas_update
  7. Confirm promote modal opens, scope picker works, Firestore write succeeds

- [ ] **Designer smoke: Canvas human-agent loop**
  Draw a rect manually. Then type a prompt asking the agent to modify it. Does the
  agent receive the canvas JSON and return a modified state? That's the core
  human-agent interaction loop. If that works everything else is detail.

- [ ] **Designer smoke: Annotations**
  Place a note tool dot. Does it collapse to just the numbered dot? Does clicking
  it expand the bubble? Does dismiss close it cleanly?

- [ ] **Designer smoke: Promote**
  Open the layers panel from the rail. Hit promote to team. Does it fire and does
  the bubble get marked as queued? Same flow as Builder Mode — if the promote
  wiring is clean you're good.

---

## MEDIUM TERM — Complete the vision

- [ ] **Prototype mode — frame linking (Designer)**
  Mode toggle is built and state is tracked. When `mode === "prototype"`, clicking
  the arrow tool between two frames should create a named flow connection and allow
  click-through preview navigation. Currently a stub.

- [ ] **Render mode (Designer)**
  `render` mode is stubbed. Intended behavior: agent receives the wireframe canvas
  JSON and returns a high-fidelity rendered description. The canvas update preview
  overlay is already built — just needs Core to support generating rendered UI from
  a wireframe prompt.

- [ ] **`canvasSnapshot` in promote schema (Designer)**
  `DesignerPromoteModal` passes `canvasSnapshot` (base64 PNG from `toDataURL()`)
  to the promote API. Confirm the Zod schema in `lib/builder/builderPromoteSchema.ts`
  accepts it, or add `canvasSnapshot: z.string().optional()` explicitly.
  The Firestore write should store it on the promote artifact doc.

- [ ] **Terminal / process panel in Builder Mode**
  The original Builder Mode vision includes a visible dev server / terminal running
  next to the editor. Not yet built. Requires a Companion `exec` endpoint that runs
  a command and streams stdout/stderr back via SSE, and a terminal panel component
  in BuilderShell. Medium-complexity addition.

- [ ] **Fix pre-existing TypeScript errors in ProjectRoom.tsx**
  Two pre-existing errors unrelated to Builder/Designer work:
  - Line 39: `rate` does not exist in `UseTTSOptions`
  - Line 106: Property `type` does not exist on type `never`
  These don't break the build (Next.js still compiles) but should be cleaned up.

---

## BACKLOG — Platform features

- [ ] **Track routes**
  `/tracks/new` and `/tracks/[id]` screens don't exist. Tracks are the workstream
  layer between Room and individual tasks. Called out in the team summary as a gap.
  Screen spec is in `SCREEN_SPECS.md`.

- [ ] **Agent Directory**
  `/agents` screen — browse, inspect, and configure agents available in a project.
  Agents are currently only visible via the dropdown in agent bars.
  Screen spec is in `SCREEN_SPECS.md`.

- [ ] **Personal Workspace**
  The "personal workspace" from the day-in-the-life flow isn't built. It's the space
  between the board and Builder Mode — where you plan your day, jam with agents
  informally, and figure out what you're going to build. The Room currently serves
  this purpose loosely. Needs its own screen and model.

- [ ] **Branch picker UX in Builder Mode**
  Builder Mode reads the current branch from Companion and injects it as context.
  No UI to switch branches, create a new branch, or enforce "never main."
  Requires a new Companion endpoint (`POST /api/git/checkout`) and a branch picker
  component in BuilderShell's header.

- [ ] **Real-time multi-user canvas (Designer)**
  Two engineers on the same Designer session sharing a live canvas. Requires
  Firestore real-time sync on `canvasElements` — each element update fires a write,
  other clients receive via `onSnapshot` and reconcile. Medium-to-high complexity.

- [ ] **Figma import (Designer)**
  The import button and modal UI are built and stubbed. Implementation:
  1. Parse file key from the Figma URL
  2. `GET https://api.figma.com/v1/files/:fileKey` with `Authorization: Bearer :token`
  3. Walk `response.document.children` recursively
  4. Map Figma nodes to `CanvasElement[]` and populate the canvas
  The TODO comment with this exact spec is already in `FigmaImportModal.tsx`.

---

## OPEN QUESTIONS — Need team decisions before building

| # | Question | Why it matters |
|---|---|---|
| 1 | Where does the finished-work queue live — Firestore (Build) or Core? | Determines how team approval at "next meeting" is implemented |
| 2 | How is "next meeting" defined — calendar integration or manual trigger? | Gates the promote → ledger step |
| 3 | Can a user promote directly to ledger from Builder, skipping the queue? | Affects scope picker behavior and authority model |
| 4 | Branch picker default naming — timestamp, task ID, or human-named? | Version control UX |
| 5 | Firebase Auth — are we using it, or staying on service key only? | Unblocks `userId` everywhere and enables per-user checkpoints |

---

## COMPLETED

- [x] Git initial commit + push to `github.com/ben1413/project_build`
- [x] `BUILDER_MODE.md` — full vision doc
- [x] `PROJECTBUILD_TEAM_SUMMARY.md` — presentation-ready overview
- [x] Companion server (`companion/server.js`) on port 3001
- [x] `GET /api/git/branch` endpoint on Companion
- [x] `lib/companion.ts` client helpers
- [x] `useCompanionStatus` hook + `CompanionStatus` component
- [x] `BuilderShell` — floating container, resizable file tree, drag handle
- [x] `BuilderButtonAndShell` — lazy runId creation
- [x] `FileTree` — recursive from Companion
- [x] `CodeEditor` + `CodeEditorInner` — CodeMirror 6, SSR:false, lazy load, autosave
- [x] `BuilderBubble` — role-gated PROMOTE, hover reveal
- [x] `BuilderAgentChat` — Firestore messages + streaming bubble
- [x] `BuilderAgentBar` — agent selector, send, Enter key
- [x] `BuilderPromoteModal` — 3 scopes (personal / team / ledger)
- [x] `lib/firebase/admin.ts` — Firebase Admin SDK setup
- [x] `builderPromoteSchema` — Zod validation with cross-field rules
- [x] `app/api/v1/builder/promote/route.ts` — promote route handler
- [x] `lib/builder/firestoreSchema.ts` — collection constants + types
- [x] `pb_builder_checkpoints` composite key — `projectId|userId|branch`
- [x] `useCognitivePreload` — branch + root injected into first agent message
- [x] Structured block system — `TextBlock`, `TodoListBlock`, `FileExploredBlock`, `DiffBlock`, `BlockRenderer`
- [x] `useBuilderStream` — SSE consumer + real-time block assembly
- [x] `app/api/v1/agents/run/stream/route.ts` — SSE proxy to Core
- [x] `coreClient` — `runAgentStream` + `builderMode: true` param
- [x] `FIREBASE_SERVICE_ACCOUNT_JSON` set in `.env.local`
- [x] BUILDER button wired into Room, Board, Ledger nav
- [x] `BUILDER_MODE_IMPLEMENTATION.md` — full implementation record
- [x] Designer Mode — `DesignerShell`, `DesignerButtonAndShell`
- [x] Designer Mode — `ToolPanel` (7 tools, amber active state)
- [x] Designer Mode — `DesignerCanvas` + `DesignerCanvasInner` (Konva, SSR:false)
- [x] Designer Mode — `SidebarRail` + peek panel system (layers/tracks/board/ledger)
- [x] Designer Mode — `DesignerAgentBar`, `DesignerAgentChat`, `DesignerBubble`
- [x] Designer Mode — `DesignerPromoteModal` (3 scopes, canvas attribution)
- [x] Designer Mode — `FigmaImportModal` stub
- [x] Designer Mode — `useDesignerStream` + `useDesignerCognitivePreload`
- [x] `canvas_update` block type + `CanvasElement` type added to `types/index.ts`
- [x] DESIGNER button wired into Room, Board, Ledger nav
- [x] `CURRENT_TASKS.md` — this file
