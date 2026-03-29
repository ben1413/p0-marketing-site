"use client";

import { clsx } from "clsx";
import type { SimulationStatus } from "@/lib/types";
import { simulationStatusLabel } from "@/lib/plainLanguage";

type Props = {
  status: SimulationStatus;
  age?: string;
  size?: "sm" | "md";
};

const STATUS_STYLES: Record<SimulationStatus, string> = {
  none:      "bg-zinc-800 text-zinc-400 border border-zinc-700",
  pending:   "bg-blue-950 text-blue-300 border border-blue-800",
  passed:    "bg-emerald-950 text-emerald-300 border border-emerald-800",
  failed:    "bg-red-950 text-red-300 border border-red-800",
  stale:     "bg-amber-950 text-amber-300 border border-amber-700",
  mismatch:  "bg-orange-950 text-orange-300 border border-orange-700",
};

const STATUS_DOT: Record<SimulationStatus, string> = {
  none:      "bg-zinc-500",
  pending:   "bg-blue-400 animate-pulse",
  passed:    "bg-emerald-400",
  failed:    "bg-red-400",
  stale:     "bg-amber-400",
  mismatch:  "bg-orange-400",
};

export function SimulationChip({ status, age, size = "md" }: Props) {
  const label = simulationStatusLabel(status);
  const dot = STATUS_DOT[status];
  const chip = STATUS_STYLES[status];

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        chip,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs"
      )}
    >
      <span className={clsx("rounded-full shrink-0", dot, size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2")} />
      {label}
      {age && status === "stale" && (
        <span className="opacity-70">· {age}</span>
      )}
    </span>
  );
}
