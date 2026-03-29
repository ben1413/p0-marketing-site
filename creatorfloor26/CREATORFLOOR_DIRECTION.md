# CreatorFloor: Company Direction and North Star

**For Cursor:** Read this before building anything. This is the product vision, the sequencing, and the boundaries. Every technical decision should trace back to something in this document.

---

## What CreatorFloor Is

CreatorFloor is the end-to-end platform for hyper-casual game development. Build, ship, operate, and port. One home for everything.

The hyper-casual market has no cohesive tooling. AAA studios have Unity, Unreal, custom engines, and a mature ecosystem of middleware. Indie studios have Steam, Itch, and a patchwork of tools they duct-tape together. But the creators building for Roblox, UEFN, Netflix Games, mobile app stores, web portals, and Minecraft's marketplace have nothing that ties their workflow together. They use the platform's native editor to build, a spreadsheet to track, Discord to coordinate, and guesswork to operate. When they want to ship the same game on a second platform, they rebuild from scratch.

CreatorFloor fills that gap. One platform where a solo creator or a 200-person team can: design, build, test, ship, monitor, and port hyper-casual games across every major casual gaming surface.

---

## Who It Serves

- **Solo creators (1 person):** teenager building their first Roblox experience, hobbyist shipping a web game, mobile developer with a side project. They need speed, guidance, and an agent that fills the roles they can't hire for.

- **Small teams (2-15 people):** Roblox studios earning revenue, mobile hyper-casual publishers, UEFN creators building for Fortnite. They need coordination, governance, and live ops visibility.

- **Mid-size teams (15-200 people):** professional hyper-casual studios, Netflix Games partners, cross-platform publishers. They need enterprise governance, team management, full live ops, and the ability to ship one game to multiple platforms efficiently.

**One product.** Core handles the gating. Solo creator sees a simple view. 200-person studio sees the full surface. Same system underneath, different depth exposed based on team size, plan tier, and project complexity.

---

## The Platform Map (Shipping Order)

### Phase 1: Roblox + UEFN (the base layer)

**Why first:** largest creator economy in gaming. 4.7 million active Roblox developers. UEFN is growing fast with Epic's investment. Both platforms have massive audiences, real revenue for creators, and zero cohesive external tooling. The creator who builds here today is the studio that builds everywhere tomorrow.

**What CF delivers for Roblox/UEFN:**

- **Builder:** browser-based IDE with Luau support (Roblox) and Verse support (UEFN). Agent companion lane that understands platform-specific APIs, patterns, and best practices. Cloud mode connects via Git (Rojo for Roblox, source control for UEFN). Local companion mode connects to the project directory on disk. Agent helps write game logic, UI code, economy systems, and data store patterns.

- **Designer:** canvas-based design tool for game UI mockups. Agent understands Roblox's ScreenGui/Frame/TextLabel system and UEFN's UI patterns. Wireframe to render mode. Promoted designs become reference artifacts for implementation.

- **Board:** Kanban project management with agent chat. Meeting system. Decision tracking. Experiment cards. Task breakdown from specs. Sprint reporting. Works for solo (simple task list) and scales to teams (full sprint workflow with governance).

- **Live Ops:** control room for live experiences. Player health (CCU, session metrics, churn signals). Economy health (currency flows, purchase metrics, DevEx tracking for Roblox). Moderation (report queue, ban decisions, appeal workflow, all sealed). Content and events (live event status, feature flags, deployment verification). Incidents, runbooks, deploy gates, shift handoffs. Wallboard mode for studio TVs.

- **Governance:** every decision flows through Core. Promote, Authority, Brain, Ledger. Governance tiers (logged/promoted/critical) configurable per project. Sealed records for moderation, economy changes, content deploys. Artifact 5 on demand.

**Integration points:**

- Roblox Open Cloud API for publishing, analytics, and experience data
- Rojo for filesystem sync between CF and Roblox Studio
- Roblox MessagingService or HttpService for in-experience telemetry ingestion
- UEFN build pipeline integration for publishing to Fortnite
- Webhook receiver for platform events (player joins, purchases, moderation flags)

### Phase 2: Netflix Games + Mobile

**Why second:** Netflix Games is a growing platform with a curated developer program and guaranteed distribution. Mobile hyper-casual is the largest segment by volume. Both platforms use standard game engines (Unity for Netflix, Unity/native for mobile) or web technologies, which means CF's cross-platform abstraction starts paying off here.

**What CF adds:**

- **Builder** gains support for: C# (Unity projects for Netflix Games), Swift/Kotlin stubs for native mobile, and JavaScript/TypeScript for web-based mobile games. Agent context expands to include Unity API surface, mobile-specific patterns (touch input, screen scaling, battery/performance constraints), and Netflix Games SDK.

- **Live Ops** adds: mobile-specific panels (crash reporting, ANR rates, store review sentiment, install/uninstall velocity, ad mediation metrics if applicable). Netflix-specific panels (engagement metrics, retention curves against Netflix's internal benchmarks if accessible).

- **Distribution management:** a single view showing where your game is published, what version is live on each platform, and whether each platform's submission requirements are met. For mobile: App Store and Google Play submission status. For Netflix: their internal review pipeline.

### Phase 3: Web Gaming

**Why third:** lowest barrier to entry, fastest iteration, but lowest revenue per user. Web is where experimentation happens fastest and where the porting story becomes most compelling (a Roblox game that also runs as a web game doubles its addressable audience).

**What CF adds:**

- **Builder** gains: HTML5/JavaScript game framework support (Phaser, PixiJS, Three.js, PlayCanvas). Agent understands web game patterns, browser performance constraints, and progressive web app packaging.

- **Distribution:** one-click deploy to CF-hosted web URLs, Itch.io integration, CrazyGames/Poki/Newgrounds distribution channels.

- **Web as the porting target:** this is where the cross-platform story completes. A game designed and built in CF for Roblox can have its core game logic (economy rules, progression systems, content structure) extracted and re-implemented for web with agent assistance. Not automatic transpilation. Agent-assisted porting where the game design document, economy parameters, and content structure carry over and the platform-specific implementation gets generated.

---

## The Porting Story (Pragmatic Version)

Full automatic cross-compilation from Luau to Swift to JavaScript is a multi-year engineering problem that companies with hundreds of engineers haven't solved. That's not what CF does.

**What CF does** is make porting dramatically faster by separating what's universal from what's platform-specific.

**Universal (lives in Core, travels with the game):**

- Game design document (structured, not a Google Doc)
- Economy parameters (currency definitions, pricing, drop rates, progression curves)
- Content structure (levels, events, challenges, store items)
- Governance rules (moderation policies, authority boundaries, experiment configurations)
- Player state schema (what you track about a player, regardless of platform)
- Live ops configuration (alert thresholds, runbook definitions, deploy gates)

**Platform-specific (lives in the surface, gets reimplemented per platform):**

- Rendering and UI
- Input handling
- Platform APIs (DataStoreService on Roblox, CloudKit on iOS, localStorage on web)
- Platform-specific monetization (Robux, IAP, Netflix's model)
- Platform-specific publishing and submission

When a creator ports a game from Roblox to mobile, CF carries over the universal layer automatically. The agent then generates platform-specific implementation scaffolding based on the universal definitions. The creator fills in the creative and platform-specific gaps. What would take 3-6 months of rebuilding takes 2-4 weeks of guided implementation.

**The porting flow:**

1. Creator selects source experience (Roblox game, already in CF)
2. Creator selects target platform (mobile)
3. CF extracts universal layer from the source project
4. CF generates a new project for the target platform with: economy parameters pre-configured, content structure mapped, player state schema translated, governance rules carried over, and implementation scaffolding generated by the agent
5. Creator builds the platform-specific parts (rendering, input, UI) with agent assistance
6. Both versions share the same Live Ops dashboard in CF. One control room, two platforms.

That's not magic. That's the game design document becoming a structured, machine-readable artifact instead of a PDF that nobody reads after week one.

---

## The CreatorFloor Game Design Document (GDD)

This is a core concept that makes everything else work. Today, game design documents are Word docs or Notion pages. They're written once, go stale immediately, and have no connection to the actual game code or live operations.

**In CreatorFloor, the GDD is a living, structured, machine-readable document that:**

- Defines the game's economy (currencies, items, pricing, progression)
- Defines the game's content structure (levels, events, modes, challenges)
- Defines the game's player state schema (what you track, what you segment on)
- Defines the game's governance rules (moderation policy, decision authority, experiment guardrails)
- Is **versioned.** Every change is tracked. Significant changes are Promoted and sealed.
- Is **consumed by the agent.** When the creator asks the agent to implement a new currency, the agent reads the GDD's economy definition and produces code that conforms to it.
- Is **consumed by Live Ops.** When the economy panel shows currency flow metrics, it maps to the GDD's currency definitions. When a decision proposal suggests changing a drop rate, it references the GDD's current value.
- Is **the carrier for porting.** When a game moves to a new platform, the GDD is the universal truth that the new implementation is built from.

The GDD is not a document. It's the game's schema. It's what Core stores in Brain as the project's institutional memory. It's what makes agents useful instead of generic. And it's what makes porting possible without starting from zero.

---

## Business Model

- **Free tier:** one project, one live experience, basic agent assistance, basic live ops (CCU + economy overview). Solo creators start here. No credit card required.

- **Pro tier (individual):** unlimited projects, full agent collaboration, full live ops, moderation governance, experiment framework. Price point in the range that a Roblox developer earning $1K-$10K/month from DevEx would pay without hesitation.

- **Team tier:** everything in Pro plus team management, role-based access, shared governance, meeting system, shift handoffs, wallboard mode. Per-seat pricing.

- **Studio tier:** everything in Team plus custom governance policies, priority support, SLA, dedicated agent configurations, porting tools, multi-platform distribution management. Custom pricing.

The revenue curve: free gets creators in. Pro converts when they start earning revenue and need live ops. Team converts when they hire their second person. Studio converts when they want to ship cross-platform.

**Marketplace (future):** creators sell and buy Luau modules, UI kits, economy templates, Spine templates, and agent configurations. CF takes a percentage. This is the flywheel: the more creators build on CF, the more the marketplace grows, the more valuable CF becomes for the next creator.

---

## Competitive Landscape

**Who exists:**

- Roblox Studio: free, powerful, Roblox-only, no live ops, no governance, no cross-platform
- UEFN/Creative: free, growing, Fortnite-only, limited external tooling
- GameAnalytics: analytics only, no creation tools, no governance
- PlayFab (Microsoft): backend services, basic live ops, no IDE, no design tools, no governance records
- AccelByte: backend platform, enterprise focus, not creator-friendly, no sealed records
- Overwolf: modding and creator tools, different market segment

**Who doesn't exist:**

- Nobody offers build + ship + operate + port in one platform for hyper-casual
- Nobody offers governance and sealed decision records for creator-scale games
- Nobody offers agent-assisted game development with persistent memory and authority attribution
- Nobody offers a structured GDD that connects to code, live ops, and cross-platform porting

CreatorFloor's moat is not any single feature. It's the integration. Build, ship, operate, and port in one place with governance underneath. Taking any one of those capabilities and competing with a point solution is a losing fight. Owning the full lifecycle is the defensible position.

---

## Culture and Community

CreatorFloor is not enterprise software with a friendly skin. It's a creator community with enterprise infrastructure underneath.

The tone is: you're building something cool, we're here to help you build it faster and run it better. Not: governance, compliance, audit trails. The governance is invisible until it matters. The creator doesn't think about sealed records until a platform asks them a question they can answer for the first time.

**Community Clubhouse** (already running, already has credibility in gaming) becomes the community arm for CreatorFloor. Events, workshops, showcases. Creators showing what they built. Studios sharing what they learned. The event series you've been running for four years becomes the community engine for CF.

**CtrlShift** becomes the editorial voice. Articles about hyper-casual development, economy design, live ops best practices, platform-specific guides. Thought leadership that drives creators to CF.

---

## What Not to Build

- **Do not build a game engine.** CF is not Unity or Godot. CF targets other people's runtimes. The moment you build a renderer, you're competing with Epic and Unity. Don't.

- **Do not build automatic cross-compilation.** Agent-assisted porting with a structured GDD is achievable and valuable. Automatic Luau-to-Swift transpilation is a research project, not a product.

- **Do not build a social network.** CF has community features (profiles, shared projects, marketplace) but it is not a social platform. The community lives in Discord and at Clubhouse events. CF is where work happens.

- **Do not build platform-specific analytics from scratch.** Ingest analytics from existing providers (Roblox analytics, GameAnalytics, Unity Analytics, custom telemetry). CF's value is aggregation, governance, and actionability, not data collection.

- **Do not compete with the platforms you serve.** CF helps creators build for Roblox. CF does not compete with Roblox. The moment a platform sees CF as a threat, distribution access disappears. CF is infrastructure, not a destination.

---

## Metrics That Matter

- Creators signed up (free tier adoption)
- Projects created (are people using it)
- Experiences connected to live ops (are people staying after ship)
- Promote events per week (is governance being used)
- Porting projects initiated (is the cross-platform story landing)
- Time from project start to first publish (is CF making people faster)
- Creator revenue managed through CF-connected experiences (is CF associated with successful games)
- Marketplace transactions (is the ecosystem growing)

---

## The One-Line Pitch

**CreatorFloor:** build, ship, operate, and port hyper-casual games across every platform. One home. Full governance. Agent-assisted everything.

---

## The North Star

A solo Roblox creator signs up for CreatorFloor. They connect their Roblox account. They build a game with agent help. They ship it. They monitor it in Live Ops. It takes off. They port it to mobile in two weeks instead of four months. They hire two people. They use the team features. They ship to a third platform. They never leave CreatorFloor because everything they need is in one place and their entire decision history, game design, economy configuration, and operational playbook lives there.

**That's the product. Everything else is implementation.**
