"use client";

import Link from "next/link";
import { clsx } from "clsx";
import type { Decision, TrailEvent } from "@/lib/types";
import { TRAIL_EVENT_LABELS, timeAgo } from "@/lib/plainLanguage";
import { useDemoEvents, type LiveEvent } from "@/lib/demoEmitter";

const DOT_COLOR: Record<string, string> = {
  proposed:          "bg-blue-400",
  simulated:         "bg-zinc-400",
  approved:          "bg-emerald-400",
  rejected:          "bg-red-400",
  blocked:           "bg-amber-400",
  deployed:          "bg-purple-400",
  outcome_recorded:  "bg-teal-400",
  rollback_opened:   "bg-orange-400",
  incident_resolved: "bg-teal-400",
  superseded:        "bg-zinc-500",
};

type FlatEvent = TrailEvent & { decisionId?: string; decisionTitle?: string; isLive?: boolean };

function flatten(decisions: Decision[]): FlatEvent[] {
  const all: FlatEvent[] = [];
  for (const d of decisions) {
    for (const ev of d.trail) {
      all.push({ ...ev, decisionId: d.id, decisionTitle: d.title });
    }
  }
  all.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return all;
}

function liveToFlat(ev: LiveEvent): FlatEvent {
  return { ...ev, isLive: true };
}

type Props = {
  decisions: Decision[];
  limit?: number;
};

export function ActivityFeed({ decisions, limit = 12 }: Props) {
  const { events: liveEvents } = useDemoEvents();

  const seedEvents = flatten(decisions);
  const live: FlatEvent[] = liveEvents.map(liveToFlat);
  const merged = [...live, ...seedEvents].slice(0, limit);

  if (merged.length === 0) {
    return <p className="text-sm text-zinc-500 py-4">No recent activity.</p>;
  }

  return (
    <div className="space-y-0">
      {merged.map((ev) => {
        const href = ev.decisionId ? `/proposals/${ev.decisionId}` : "#";
        const title = ev.decisionTitle ?? ev.description.slice(0, 50);
        return (
          <Link
            key={ev.id}
            href={href}
            className={clsx(
              "flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-900/60 transition-all duration-300 group",
              ev.isLive && "animate-ticker-in"
            )}
          >
            <span
              className={clsx(
                "mt-1.5 w-2 h-2 rounded-full shrink-0",
                DOT_COLOR[ev.type] ?? "bg-zinc-500"
              )}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-zinc-300 leading-snug">
                <span className="font-medium text-zinc-200">
                  {TRAIL_EVENT_LABELS[ev.type] ?? ev.type}
                </span>
                {" — "}
                <span className="text-zinc-400">{title}</span>
              </p>
              <p className="text-xs text-zinc-500 mt-0.5 truncate">{ev.actor}</p>
            </div>
            <span
              className="text-xs text-zinc-600 shrink-0 mt-0.5"
              title={new Date(ev.timestamp).toLocaleString()}
            >
              {timeAgo(ev.timestamp)}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
