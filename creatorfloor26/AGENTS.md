# CreatorFloor — agent instructions

## Read first (product truth)

Before implementing features, refactoring, or choosing abstractions, read **`CREATORFLOOR_DIRECTION.md`**. That file is the company direction, north star, shipping phases, boundaries (what not to build), and how CreatorFloor relates to **P0 Core**. Technical work in this repo should trace back to something defined there.

CreatorFloor is **not** ProjectBuild: it is a separate surface on Core, aimed at hyper-casual creators (Roblox/UEFN first), with its own community and UX depth gated by tier.

## Stack note (Next.js)

<!-- BEGIN:nextjs-agent-rules -->
This is NOT the Next.js you know — this version has breaking changes. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
