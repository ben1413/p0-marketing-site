"use client";

import { useEffect, useRef, useState } from "react";
import { useDemoEvents, type LiveEvent } from "@/lib/demoEmitter";
import { TRAIL_EVENT_LABELS } from "@/lib/plainLanguage";
import { clsx } from "clsx";

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

function TickerItem({ event, isNew }: { event: LiveEvent; isNew: boolean }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 px-3 whitespace-nowrap transition-opacity duration-500",
        isNew ? "animate-ticker-in" : "opacity-100"
      )}
    >
      <span className={clsx("w-1.5 h-1.5 rounded-full shrink-0", DOT_COLOR[event.type] ?? "bg-zinc-500")} />
      <span className="text-zinc-500 font-medium">
        {TRAIL_EVENT_LABELS[event.type] ?? event.type}
      </span>
      <span className="text-zinc-400">
        {event.description.length > 60 ? event.description.slice(0, 60) + "..." : event.description}
      </span>
    </span>
  );
}

export function LiveTicker() {
  const { events } = useDemoEvents();
  const [displayEvents, setDisplayEvents] = useState<LiveEvent[]>([]);
  const [newestId, setNewestId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (events.length === 0) return;
    const latest = events[0];
    if (latest && latest.id !== newestId) {
      setNewestId(latest.id);
      setDisplayEvents((prev) => [latest, ...prev].slice(0, 20));
    }
  }, [events, newestId]);

  // Auto-scroll the ticker to the left (newest) on new events
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [displayEvents]);

  if (displayEvents.length === 0) {
    return (
      <div className="h-8 flex items-center px-4 border-b border-zinc-800/50 bg-zinc-950/80">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gl-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gl-500" />
          </span>
          <span className="text-[11px] text-zinc-600">System active — waiting for events...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-8 flex items-center border-b border-zinc-800/50 bg-zinc-950/80 overflow-hidden">
      <div className="flex items-center gap-1 shrink-0 px-3 border-r border-zinc-800/50">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gl-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gl-500" />
        </span>
        <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Live</span>
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto scrollbar-none flex items-center gap-4 text-[11px]"
        style={{ scrollbarWidth: "none" }}
      >
        {displayEvents.map((ev) => (
          <TickerItem key={ev.id} event={ev} isNew={ev.id === newestId} />
        ))}
      </div>
    </div>
  );
}
