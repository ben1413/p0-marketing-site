# ProjectBuild — Team Summary

*A presentation-ready overview of what we've designed and built. Use this to bring the team up to speed.*

---

## What Is ProjectBuild?

ProjectBuild is the human collaboration surface for Project0. It sits on top of **Core** (the runtime, memory, governance, ledger) and gives humans and agents a place to work together inside structured projects.

**The five things v1 proves:**

1. Humans can organize work in projects
2. Humans and agents can collaborate in a shared room
3. Workstreams can be separated into tracks
4. Agents can execute work through Core
5. Important outcomes can be promoted to the ledger

---

## What Exists Today

### Documentation (32 docs in `/ProjectBuild`)

- **Architecture** — Core vs Build split, trust boundary, execution model, system lifecycle
- **Workspace model** — Projects, Room, Tracks, Board, Ledger
- **Agent interaction** — How humans and agents work together, governance, truth posture
- **Data & API** — Firestore schema, API map, promote flows
- **Screens & flows** — Six v1 screens, user flows, screen specs
- **Builder mode** — Full vision doc (see below)

### Working App (`projectbuild-app`)

- **Workspace Home** — Project list, create project
- **Project Room** — Chat, agent runs, tracks sidebar
- **Board** — Tasks, decisions, risks
- **Ledger Viewer** — Sealed items, truth posture display
- **Truth Posture** — Message bubbles, promote panel, ledger integration
- **Promote flow** — truthPosture passed to API, agent_autonomous blocked when unknown

### What's Next (not yet built)

- Track routes (`/tracks/new`, `/tracks/[id]`)
- Agent Directory (`/agents`)
- Builder mode (the full vision below)

---

## Builder Mode — The Big Picture

Builder mode is a **Cursor-light IDE embedded inside ProjectBuild**. One click flips the chat surface into a coding surface. Same real estate, different mode.

### Two Modes

| Chat Mode | Builder Mode |
|-----------|--------------|
| Talk with agents, plan, reason | Code, pair with agents, run processes |
| Create tasks, decisions, risks | File tree, editor, terminal, diff view |
| Promote to ledger (when ready) | Promote to team bucket or finished-work queue |
| Some people live here (PMs, systems thinkers) | Everyone can use it when they need to code |

### Design Philosophy

- **Intuitive, not alien** — Familiar workflows, not reinventing the wheel
- **Fast** — Infra (git, branches, PRs) fades into the background
- **Stay creative, stay building** — Flow over plumbing
- **Side by side** — Human and agent work on the same feature, same branch. Agent is like a mid/junior dev pair-programming with you.

### What's In Builder Mode

- **File tree** — Bound to local folder via Companion
- **Code editor** — Humans code directly (not just reviewing agent output)
- **Process/terminal panel** — Dev server, build, test running visibly next to the editor
- **Agent chat strip** — Same agent/LLM picker, in code context
- **Diff view** — Accept/reject agent proposals; human edits visible to agent

### Version Control Rule

**Never main.** Every time you open builder mode, you're on a branch — previous or new. Main/production is protected. Version control should feel invisible when it works and impossible to bypass when it matters.

### Two Promote Paths

1. **Team Promote bucket** — Ideas, drafts, "not ready but I want visibility." Low commitment. Team can reject. Just shared for now.
2. **Finished-work queue** — What you completed. Goes to queue. Next meeting: present, team approves or rejects. If approved → ledger → production.

---

## Day-in-the-Life Flow

*Assume: project running, 5 humans, 20 agents (4 per human), board with tasks.*

### Morning — Board

- Team meets on the board
- Tasks assigned for the day
- Everyone goes to their **personal workspace**

### Personal Workspace

- Your space with your agents
- Jamming, planning, "what does my day look like?"
- Different roles: PM, systems thinker, product builder — not everyone codes all day
- Builder mode always available when you need it

### Builder Mode — Actual Work

- Launch when you start work on assigned tasks
- Code, pair with agents, run processes
- Promote ideas to team bucket, finished work to queue

### End of Day — Promote

- **Team Promote** — Ideas for visibility
- **Finished work** — Branch work → queue

### Next Morning — Review

- Meet again (scrum, standup)
- Present what you worked on
- Team approves → ledger → production
- Or rejects → back to builder

---

## The Loop (Visual)

```text
Morning: Board (assign tasks)
    ↓
Personal Workspace (jam, plan)
    ↓
Builder Mode (code, pair with agents)
    ↓
End of day: Promote
    ├── Team Promote bucket (ideas)
    └── Finished-work queue (ready for review)
    ↓
Next morning: Present, approve/reject
    ↓
Ledger → production (or back to builder)
```

---

## Why This Matters

- **MCPs are expensive.** Embedded IDE + Companion is a better path.
- **Teams stay in flow.** Infra fades; creativity stays.
- **Governance built in.** Promote → queue → team approval. No bypassing.
- **Mixed teams.** PMs, systems thinkers, coders — all in the same system. Builder mode when you need it.

---

## Key Docs for Deep Dives

| Doc | What It Covers |
|-----|----------------|
| `BUILDER_MODE.md` | Full builder vision, day-in-the-life, version control, promote paths |
| `PROJECTBUILD_V1_WHAT_ACTUALLY_GETS_BUILT.md` | v1 scope, six screens, first milestone |
| `P0_PLATFORM_PACKAGING.md` | Core vs Companion vs Surface, builder architecture |
| `FULL_STACK_FOR_PROJECTBUILD.md` | Core integration, API, Firestore |
| `SCREEN_SPECS.md` | Every component, state, interaction |

---

## Open Questions (for the team)

- Where does the queue live — Firestore (Build) or Core?
- How is "next meeting" defined — calendar or manual?
- Branch picker UX? Default naming?
- Can you promote directly to ledger from builder (skip queue) in some cases?
