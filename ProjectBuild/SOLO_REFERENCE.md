# SOLO_REFERENCE

## Purpose

ProjectBuild is built on the same stack as ProjectSolo. This document captures every reusable pattern, component design, type, Firestore schema, API integration, and CSS convention from Solo so ProjectBuild engineers do not have to reverse-engineer them.

Solo lives at: `/Users/benwilliams1413/Projects/project_solo`

Build what makes sense for your context. Ignore voice and transcription — Core handles that.

---

## Stack

```json
{
  "next": "16.1.4",
  "react": "19",
  "tailwindcss": "^4",
  "firebase": "client SDK + firebase-admin",
  "typescript": "^5"
}
```

No Redux, no Zustand. Firestore is the state bus. Subscriptions via `onSnapshot`. All UI is permanently dark — no `dark:` variants needed.

---

## CSS Variables and Theme

Defined in `src/app/globals.css`. Copy these directly into ProjectBuild.

```css
:root {
  --background: #0b0f14;
  --foreground: #c8d1e0;
  --panel: #0f141b;
  --panel-border: rgba(255,255,255,0.12);
  --muted: #8a95a8;
  --text-blue: #d0d9e8;
  --text-bright: #f0f4f8;
  --accent: #f2f2f2;
}

body {
  background:
    radial-gradient(1200px 600px at 15% 10%, rgba(54,66,87,0.35), transparent 55%),
    radial-gradient(900px 520px at 80% 0%, rgba(45,33,22,0.45), transparent 60%),
    linear-gradient(180deg, #090c11 0%, #0b0f14 100%);
}

.platform-theme   { color: var(--foreground); }
.platform-panel   { background: rgba(16,22,30,0.9); border: 1px solid var(--panel-border); backdrop-filter: blur(18px); }
.glass-strong     { background: rgba(16,22,30,0.94); border: 1px solid rgba(255,255,255,0.14); backdrop-filter: blur(22px); }
.soft-elevate     { box-shadow: 0 18px 50px -30px rgba(11,15,20,0.9), 0 0 0 1px rgba(255,255,255,0.04); }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #283245; border-radius: 10px; }
```

Theme color: `#0b0f14`. Set as `themeColor` in viewport and PWA manifest.

---

## Recurring Tailwind Patterns

There are no extracted shared UI component files in Solo. All styling is inline Tailwind. These patterns are used consistently across the codebase.

### Buttons

```tsx
// Primary (white fill)
"rounded-full bg-white px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-black"

// Secondary (glass border)
"rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors"

// Danger
"rounded-full border border-red-500/50 bg-red-500/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-red-400 hover:bg-red-500/20"

// Pill badge
"rounded-full bg-black/20 border border-white/10 px-3 py-1.5 text-[10px] text-[var(--text-blue)]"
```

### Cards and Panels

```tsx
// Standard panel card
"rounded-2xl border border-white/10 bg-black/20 p-5"

// Modal / overlay panel
"rounded-[32px] border border-white/10 bg-[var(--panel)] shadow-2xl backdrop-blur-xl"

// List item (hover variant)
"rounded-lg bg-[var(--panel)] border border-white/10 p-4 hover:border-white/20 transition-colors"
```

### Typography Scale

```text
Section headers:  text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-blue)]/70
Body:             text-sm or text-[15px] leading-relaxed
Labels/badges:    text-[9px]–text-[11px] font-bold uppercase tracking-[0.2em]
Meta/timestamps:  text-xs text-[var(--text-blue)]/60
```

### Expand / Collapse Pill (used in AgentDirective and Meeting Bar)

```tsx
className={`rounded-[2rem] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden ${expanded ? 'h-[360px]' : 'h-[56px]'}`}
```

---

## Layout Shell

Solo uses a three-panel layout locked to `h-screen`. ProjectBuild should use the same structure.

```tsx
// Root layout: h-screen flex flex-col
// Header: h-24, grid-cols-[18rem_1fr_auto]
// Body: flex flex-1 overflow-hidden
//   Left panel:   w-72 fixed height
//   Center:       flex-1 flex flex-col overflow-hidden
//   Right panel:  w-72 fixed height
// Bottom: AgentDirective bar below center
```

In Solo, left = `<Sidebar>` (topic list), right = `<ChapterList>`.

In ProjectBuild, left = project list, right = tracks + ledger preview + board preview.

---

## Firestore Schema (Solo)

Solo uses a single root path `projectSolo/default/`. ProjectBuild should parameterize this by workspaceId.

| Collection | Path | Key Fields |
| --- | --- | --- |
| Topics (Projects) | `projectSolo/default/topics/{topicId}` | `title`, `order`, `archived`, `isSystem`, `openChapterId`, `lastTouchedAt` |
| Chapters (Tracks) | `.../topics/{t}/chapters/{chapterId}` | `title`, `status`, `createdAt`, `closedAt` |
| Runs | `.../topics/{t}/chapters/{c}/runs/{runId}` | `topicId`, `chapterId`, `title`, `createdAt`, `closedAt` |
| PM Board | `.../topics/{t}/pmBoard/board` | `{ items: PMBoardItem[], updatedAt }` |
| Promoted Meetings | `.../topics/{t}/promotedMeetings/{id}` | `title`, `endedAt`, `messages[]` |
| Messages | `messages/{messageId}` (**root-level flat**) | `topicId`, `runId`, `text`, `authorType`, `authorName`, `engine`, `createdAt` |
| Memory | `projectSolo/default/memory/{id}` | `topicId`, `runId`, `sourceMessageId`, `text`, `tags[]`, `promotedByPersona`, `createdAt` |

**Important note on messages**: Messages live at the root level, not nested. They carry `topicId` and `runId` as fields. Queries use `where("topicId", "==", ...)` without `orderBy` to avoid composite index requirements — sort client-side by `createdAt`.

**ProjectBuild equivalents**:

| Solo concept | ProjectBuild concept |
| --- | --- |
| Topic | Project |
| Chapter | Track |
| Run | Run (same, maps to Core run) |
| PM Board doc | Board (Tasks, Decisions, Risks) |
| Promoted Meeting | LedgerItem (type: `decision`) |
| Message | Thread message |
| Memory | Brain / LedgerItem via Core |
| `isCore` topic | CORE badge project |

---

## Key Type Definitions

Adapt these for ProjectBuild. Replace `topicId` with `projectId`, `chapterId` with `trackId`.

```typescript
// Message
interface Message {
  id: string
  text: string
  authorType: 'human' | 'agent'
  authorName?: string
  engine?: string
  createdAt?: { seconds: number; nanoseconds: number }
  topicId: string
  runId: string
}

// Board item
type PMBoardItem = {
  id: string
  title: string
  summary?: string
  columnId: 'tasks' | 'decisions' | 'risks' | 'done'
}

// Board document
type PMBoardDoc = {
  items: PMBoardItem[]
  updatedAt?: unknown
}

// Promoted meeting message
type PromotedMeetingMessage = {
  text: string
  authorType: 'human' | 'agent'
  createdAt: Timestamp | { seconds: number; nanoseconds: number }
  agentLabel?: string   // "Name / Role" — display as "Name · Role"
}

// Promoted meeting
type PromotedMeeting = {
  id: string
  title: string
  endedAt: Date
  messages: PromotedMeetingMessage[]
}

// Run
type Run = {
  id: string
  topicId: string
  chapterId: string
  title: string | null
  createdAt: unknown
  closedAt: unknown | null
}

// Persona (Solo's agent abstraction — maps to Core agent in ProjectBuild)
type Persona = {
  id: string
  name: string
  jobTitle: string
  retrievalBias: 'critical' | 'architectural' | 'educational'
  principles: {
    identity: string
    promise: string
    nonNegotiables: string
    notes: string
  }
}

// LLM engines
const LLM_ENGINES = ['gpt-5.2', 'claude-3.5', 'gemini-1.5'] as const
type LLMEngine = typeof LLM_ENGINES[number]
```

---

## Core API Client Patterns

Solo's `src/lib/p0/` contains thin client wrappers for Core. Copy and adapt these for ProjectBuild.

### Auth header pattern (same for all Core requests)

```typescript
// src/lib/p0/coreClient.ts pattern
const baseUrl = process.env.P0_CORE_BASE_URL
const apiKey  = process.env.P0_CORE_API_KEY
const jwt     = process.env.P0_CORE_JWT
const devBypass = process.env.DEV_BYPASS_SECRET

const headers: Record<string, string> = {
  'Content-Type': 'application/json',
  'x-request-id': crypto.randomUUID(),
}
if (apiKey || jwt) {
  headers['Authorization'] = `Bearer ${apiKey || jwt}`
} else if (devBypass) {
  headers['x-dev-bypass'] = devBypass
}
```

### Run simple

```typescript
// src/lib/p0/coreClient.ts
async function runAgentSimple(input: RunSimpleInput) {
  const res = await fetch(`${baseUrl}/api/v1/agents/run/simple`, {
    method: 'POST',
    headers,
    body: JSON.stringify(input),
  })
  return res.json()
}

type RunSimpleInput = {
  agentId?: string
  message: string
  memoryScope: 'working' | 'core'
  runId?: string
  allowActions?: string[]
  writeMemory?: boolean
  writeMemoryTags?: string[]
  writeMemoryPersona?: string
  writeMemoryJobTitle?: string
  humanAck?: boolean
}
```

### Meeting flow

```typescript
// src/lib/p0/coreMeetingClient.ts
async function createMeeting(participantAgentIds: string[], name?: string, projectId?: string) {
  const res = await fetch(`${baseUrl}/api/v1/meetings`, {
    method: 'POST', headers,
    body: JSON.stringify({ participantAgentIds, name, projectId }),
  })
  return res.json() // { meeting: { id, ... } }
}

async function runMeetingTurn(input: RunMeetingInput) {
  const res = await fetch(`${baseUrl}/api/v1/agents/run/meeting`, {
    method: 'POST', headers,
    body: JSON.stringify(input),
  })
  return res.json() // { replies: MeetingReply[] }
}

async function closeMeeting(meetingId: string) {
  return fetch(`${baseUrl}/api/v1/meetings/${meetingId}/close`, { method: 'POST', headers })
}

type RunMeetingInput = {
  meetingId: string
  message: string
  routing?: 'completion_time' | 'round_robin' | 'role_priority'
  memoryScope?: string
  humanAck?: boolean
}

type MeetingReply = {
  agentId: string
  reply: string
  completedAt?: string
  actions?: unknown[]
  trace?: unknown
}
```

### Ledger UI

```typescript
// src/lib/p0/coreLedgerClient.ts
async function getLedgerUi(params?: { evaluationId?: string; limit?: number }) {
  const url = new URL(`${baseUrl}/api/v1/ledger/ui`)
  if (params?.evaluationId) url.searchParams.set('evaluationId', params.evaluationId)
  if (params?.limit) url.searchParams.set('limit', String(params.limit))
  const res = await fetch(url.toString(), { headers })
  return res.json() as Promise<LedgerUiPayload>
}
```

### Env vars required

```bash
P0_CORE_BASE_URL=http://localhost:PORT
P0_CORE_API_KEY=...                  # or P0_CORE_JWT
P0_CORE_AGENT_ID=...                 # default agent
P0_CORE_AGENT_TONI=...               # per-persona agent IDs
P0_CORE_AGENT_IZZI=...
P0_CORE_AGENT_CINDI=...
DEV_BYPASS_SECRET=...                # dev-only
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...
GOOGLE_AI_API_KEY=...
```

In ProjectBuild each agent is registered in Core and has its own `agentId`. Map agent IDs to your ProjectBuild agents via env vars using the same pattern.

---

## Component Patterns to Reuse

### Message Feed (`MessageList.tsx`)

- Firestore `onSnapshot` subscription via `useMessages(topicId, runId)`
- Human messages: right-aligned, `bg-white/10 rounded-tr-none`
- Agent messages: left-aligned, `bg-[var(--panel)] rounded-tl-none`
- Role label above agent bubble in `text-[10px] uppercase tracking-widest`
- `PROMOTE` label beneath every bubble — one tap, no navigation
- Last agent message gets `<StreamingText isNew={true}>` (15ms character animation)
- Auto-scroll to bottom on new messages; reset on context switch
- Queries: `where("topicId","==",...)` + `where("runId","==",...)` — no `orderBy`, sort client-side

### Bottom Input Bar (`AgentDirective.tsx` + `MessageComposer.tsx`)

Two separate components that form the input zone:

**AgentDirective** (bottom pill, expands for principles):
- Two `<select>` dropdowns: persona (agent) and engine (model)
- Rendered as `{name} / {jobTitle}` format in options
- `PRINCIPLES` expand button: `h-[56px]` collapsed → `h-[360px]` expanded
- Expanded shows `INTERNAL IDENTITY` and `NON-NEGOTIABLES` sections
- Transition: `duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]`

**MessageComposer** (text input):
- Textarea + submit on Enter or click
- Placeholder reflects context
- Voice mic icon and transcribe icon on right side (skip these — Core handles voice)
- On send: write human message to Firestore immediately, then call Core, then write agent reply

### Sidebar (`Sidebar.tsx`)

Simple topic list. Active = `bg-white/10`. `isCore` topics get a badge. Single-click selection. No sub-navigation.

### Board (`PMConsole.tsx` board section)

- `grid-cols-4` for four columns
- Each column is `flex flex-col` with header label + count badge + `<TaskPill>` list + add button
- `<TaskPill>` is draggable — drag between columns updates `columnId`
- `applyBoardCommandsFromMessage()`: regex parses `"add task X"` / `"move X to done"` from agent replies and human input
- Board state persisted to `pmBoard/board` document via `usePMBoard`
- Board is inside `PMConsole` which is a `fixed inset-0 z-50` overlay in Solo — in ProjectBuild it is a first-class screen

### Ledger Strip

Shown below the board in PMConsole.

```tsx
// Pill badges row
"Sealing: {n}   Evals: {n}   Gov: {n} agents, {n} decisions"
// Open Ledger link
```

Calls `GET /api/v1/ledger/ui?limit=1` (counts only — not full items).

### Meeting flow (`PMConsole.tsx` meeting section)

Start Meeting modal:
```tsx
// Checkbox list of agents
// Optional meeting name input
// Start button disabled until 1+ agents checked
// On Start: POST /api/v1/meetings → stores coreMeetingId
```

Meeting bar (active state):
```tsx
// Red dot + recording timer
// "Meeting with [agent names]"
// END MEETING button → opens Promote Meeting modal
// COLLAPSE button
```

Promote Meeting modal:
```tsx
// "Promote this Meeting?" heading
// Optional name input
// Yes → savePromotedMeeting() → writes to Firestore promotedMeetings
// No  → closeMeeting() + no write
```

`savePromotedMeeting()` currently writes to Firestore `promotedMeetings` collection. In ProjectBuild this should also call `POST /api/v1/ledger/promote` to seal into Core ledger.

### Natural Language Board Commands

```typescript
// applyBoardCommandsFromMessage() pattern from PMConsole
function applyBoardCommandsFromMessage(text: string, currentItems: PMBoardItem[]): PMBoardItem[] {
  const addMatch = text.match(/add task[:\s]+(.+)/i)
  if (addMatch) {
    currentItems.push({ id: crypto.randomUUID(), title: addMatch[1].trim(), columnId: 'tasks' })
  }
  const moveMatch = text.match(/move (.+) to done/i)
  if (moveMatch) {
    const target = currentItems.find(i => i.title.toLowerCase().includes(moveMatch[1].toLowerCase()))
    if (target) target.columnId = 'done'
  }
  return [...currentItems]
}
```

Apply to both agent replies and human input. Optimistic update: mutate client state immediately, persist to Firestore after.

---

## Firestore Hooks Pattern

### useMessages

```typescript
// src/hooks/useMessages.ts pattern
function useMessages(topicId: string, runId: string) {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    if (!topicId || !runId) return
    const q = query(
      collection(db, 'messages'),
      where('topicId', '==', topicId),
      where('runId', '==', runId)
    )
    return onSnapshot(q, (snap) => {
      const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() } as Message))
      msgs.sort((a, b) => (a.createdAt?.seconds ?? 0) - (b.createdAt?.seconds ?? 0))
      setMessages(msgs)
    })
  }, [topicId, runId])

  return messages
}
```

### usePMBoard

```typescript
// src/lib/pmBoard/usePMBoard.ts pattern
function usePMBoard(topicId: string) {
  const [items, setItemsState] = useState<PMBoardItem[]>([])

  useEffect(() => {
    if (!topicId) return
    const ref = doc(db, 'projectSolo', 'default', 'topics', topicId, 'pmBoard', 'board')
    return onSnapshot(ref, (snap) => {
      const data = snap.data() as PMBoardDoc | undefined
      setItemsState(data?.items ?? [])
    })
  }, [topicId])

  async function setItems(newItems: PMBoardItem[]) {
    const ref = doc(db, 'projectSolo', 'default', 'topics', topicId, 'pmBoard', 'board')
    await setDoc(ref, { items: newItems, updatedAt: serverTimestamp() })
  }

  return { items, setItems }
}
```

### appendMessage

```typescript
// src/lib/messages/appendMessage.ts pattern
async function appendMessage(msg: Omit<Message, 'id'>) {
  await addDoc(collection(db, 'messages'), {
    ...msg,
    createdAt: serverTimestamp(),
  })
}
```

---

## ensureRun Pattern

A `run` is the unit of conversation. One run per chapter (track). `ensureRun` finds the open run or creates one.

```typescript
// src/lib/runs/ensureRun.ts pattern
async function ensureRun(topicId: string, chapterId: string): Promise<string> {
  const runsRef = collection(db, 'projectSolo', 'default', 'topics', topicId, 'chapters', chapterId, 'runs')
  const q = query(runsRef, where('closedAt', '==', null))
  const snap = await getDocs(q)
  if (!snap.empty) return snap.docs[0].id
  const newRun = await addDoc(runsRef, {
    topicId, chapterId, title: null,
    createdAt: serverTimestamp(), closedAt: null,
  })
  return newRun.id
}
```

In ProjectBuild: replace `topicId/chapterId` with `projectId/trackId`.

---

## Key Architectural Rules from Solo

1. **Firestore is the state bus.** No Redux, no Zustand. Everything is `onSnapshot` subscriptions. Components subscribe directly to the collections they need.

2. **Messages live at root level, not nested.** The `messages` collection is flat at the top level. Queries filter by `topicId` + `runId`. This avoids deep nesting and composite index requirements.

3. **One board doc per topic/project.** `pmBoard/board` is a single document with an `items` array. Mutations replace the full array. Simple and fast for v1 board sizes.

4. **API routes are thin proxies.** Each `src/app/api/*/route.ts` validates input, calls the Core client function, returns JSON. No business logic in the route — all logic is in `src/lib/p0/`.

5. **Persona → Core agent ID via env.** `P0_CORE_AGENT_TONI`, `P0_CORE_AGENT_IZZI`, etc. One env var per agent. Same pattern works for ProjectBuild agents.

6. **Optimistic board updates.** Apply board command changes to client state immediately. Persist to Firestore after. Do not wait for the write to re-render.

7. **`PROJECT_ID = "default"` in Solo.** For ProjectBuild this must be parameterized by `workspaceId` or `projectId` at every Firestore path.

8. **Authority profile in state/localStorage.** The governance mode per capability (`human | hitl | agent`) is stored in component state and `localStorage`. In ProjectBuild this should be persisted to Firestore and reflect real Core delegation records.

9. **No auth in Solo dev mode.** Firestore rules are `allow read, write: if true`. ProjectBuild must implement proper Firebase auth from the start.

---

## Files Most Worth Reading in Solo

These are the highest-signal files. Read them before writing ProjectBuild equivalents.

| File | Why |
| --- | --- |
| `src/app/page.tsx` | Full app shell — three-panel layout, all state, all wiring |
| `src/components/pm/PMConsole.tsx` | Board, meeting, ledger strip, promote modal — all in one |
| `src/components/messages/MessageList.tsx` | Message feed, inline promote, streaming text |
| `src/components/messages/MessageComposer.tsx` | Input bar, message send, Firestore write pattern |
| `src/components/agents/AgentDirective.tsx` | Agent/model selectors, principles panel expand |
| `src/components/layout/Sidebar.tsx` | Left panel project list with CORE badge |
| `src/lib/p0/coreClient.ts` | Core API auth + run/simple |
| `src/lib/p0/coreMeetingClient.ts` | Meeting create/run/close |
| `src/lib/p0/coreLedgerClient.ts` | Ledger UI fetch |
| `src/lib/pmBoard/usePMBoard.ts` | Board Firestore hook |
| `src/app/globals.css` | All CSS variables and theme classes |
| `src/data/personas.ts` | Persona + engine type definitions |
