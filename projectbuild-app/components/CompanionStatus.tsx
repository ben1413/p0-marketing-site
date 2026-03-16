"use client";

import { useCompanionStatus } from "@/lib/hooks/useCompanionStatus";

export function CompanionStatus() {
  const { connected, allowed, root } = useCompanionStatus();

  if (!connected) {
    return (
      <span
        className="text-[10px] text-white/50"
        title="Run the ProjectBuild Companion (npm run companion) to enable local file access"
      >
        companion · off
      </span>
    );
  }

  if (!allowed) {
    return (
      <span
        className="text-[10px] text-amber-400/90"
        title="Companion running; set a folder scope (POST /api/scope or COMPANION_ROOT)"
      >
        companion · no folder
      </span>
    );
  }

  const shortRoot = root && root.length > 30 ? `…${root.slice(-28)}` : root;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400/90"
      title={root ?? undefined}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      companion · localhost:3001
    </span>
  );
}
