# Starter Spine — Infrastructure

Provisioning scripts for BYOA (Bring Your Own Accounts).

**Flow (per SPINE_DEPLOYMENT_MODEL.md):**

1. User connects Stripe, GCP, Vercel
2. Scripts call provider APIs to provision resources
3. Secrets stored in Secret Manager
4. Env injected into deployment

**Planned modules:**

- `stripe.ts` — Create product, webhook
- `gcp.ts` — Firebase project, Firestore, KMS, OAuth client
- `vercel.ts` — Project, env vars, deploy

**Status:** Placeholder. Connectors (Stripe, GCP, Vercel) will be built in p0-cli.
