"use client";

import { useCompanionStatus } from "@/lib/hooks/useCompanionStatus";

export function CompanionStatus() {
  const { connected, checked } = useCompanionStatus();
  if (!checked) {
    return (
      <span className="text-[10px] uppercase tracking-wider text-zinc-400">
        Companion…
      </span>
    );
  }
  return (
    <span
      className={`text-[10px] font-mono uppercase tracking-wider ${
        connected ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
      }`}
      title="Local Companion (port 3002) — scope your Rojo / project folder"
    >
      {connected ? "● Companion" : "○ Companion offline"}
    </span>
  );
}
