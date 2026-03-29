# Project0 Spines

Deployable architecture stacks for Project0. Spines automate infrastructure setup so builders can launch a complete system in 10–15 minutes.

**See:** [SPINE_DEPLOYMENT_MODEL](../p0/core/docs/SPINE_DEPLOYMENT_MODEL.md) | [ENGINEERING_SPEC_SPINE_INSTALLER](../p0/core/docs/ENGINEERING_SPEC_SPINE_INSTALLER.md)

## Available Spines

| Spine | Description |
|-------|-------------|
| **starter** | Next.js + Firebase + Vercel + Stripe + Project0 Core |

## Install via CLI

```bash
p0 spine list
p0 spine install starter
```

## Manual Setup (Starter)

```bash
cd starter/app
cp .env.example .env.local
# Edit .env.local — set P0_CORE_BASE_URL to your Core instance
npm install
npm run dev
```

## Structure

```
spines/
└── starter/
    ├── config/       # spine.json manifest
    ├── infrastructure/  # Provisioning scripts (BYOA)
    └── app/          # Next.js application template
```
