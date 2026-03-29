import { ConclaveLiveOps } from "../../components/conclave/ConclaveLiveOps";

export const dynamic = "force-dynamic";

/**
 * Operator UI: governed live ops demo. Ships on **Project Build**; Core remains API-only.
 * When this folder is the Next.js `app/` root, open `/conclave` with `P0_CORE_BASE_URL` set to Core.
 */
export default function ConclavePage() {
  return <ConclaveLiveOps />;
}
