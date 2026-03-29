"use client";

import { clsx } from "clsx";
import type { TrailEvent } from "@/lib/types";
import { TRAIL_EVENT_LABELS, timeAgo } from "@/lib/plainLanguage";
import { LockClosedIcon } from "@heroicons/react/20/solid";

const EVENT_DOT: Record<string, string> = {
  proposed:          "bg-blue-400",
  simulated:         "bg-indigo-400",
  approved:          "bg-emerald-400",
  rejected:          "bg-red-400",
  blocked:           "bg-amber-400",
  deployed:          "bg-gl-500",
  outcome_recorded:  "bg-purple-400",
  rollback_opened:   "bg-orange-400",
  incident_resolved: "bg-teal-400",
  superseded:        "bg-zinc-400",
};

// Events that are permanently sealed to the Ledger — immutable, tamper-evident
const SEALED_EVENTS = new Set([
  "approved",
  "deployed",
  "outcome_recorded",
  "rollback_opened",
]);

type Props = {
  events: TrailEvent[];
};

export function TrailEventList({ events }: Props) {
  if (events.length === 0) {
    return (
      <p className="text-sm text-zinc-500 py-4">No trail events recorded yet.</p>
    );
  }

  return (
    <ol className="relative border-l border-zinc-800 space-y-0 ml-2">
      {events.map((event, i) => {
        const dot = EVENT_DOT[event.type] ?? "bg-zinc-400";
        const isLast = i === events.length - 1;
        const isSealed = SEALED_EVENTS.has(event.type);
        return (
          <li key={event.id} className={clsx("ml-6", isLast ? "pb-0" : "pb-5")}>
            {/* Dot */}
            <span
              className={clsx(
                "absolute -left-[9px] flex items-center justify-center w-4 h-4 rounded-full",
                dot,
                "ring-4 ring-zinc-950"
              )}
            />
            {/* Content */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-zinc-200">
                  {TRAIL_EVENT_LABELS[event.type] ?? event.type}
                </span>
                <span className="text-xs text-zinc-500">·</span>
                <span className="text-xs text-zinc-500" title={new Date(event.timestamp).toLocaleString()}>
                  {timeAgo(event.timestamp)}
                </span>
                {/* Sealed badge — this is the moat */}
                {isSealed && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-950 text-purple-400 border border-purple-800/60">
                    <LockClosedIcon className="w-2.5 h-2.5" />
                    Immutable · Ledger sealed
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400">{event.actor}</p>
              <p className="text-xs text-zinc-300 leading-relaxed mt-0.5">
                {event.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
