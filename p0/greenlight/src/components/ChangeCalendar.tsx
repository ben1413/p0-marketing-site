"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import type { Decision } from "@/lib/types";
import { timeAgo, DECISION_TYPE_LABELS } from "@/lib/plainLanguage";

type Lane = { label: string; accent: string; dotColor: string; decisions: Decision[] };

function buildLanes(decisions: Decision[]): Lane[] {
  const landed = decisions.filter((d) => d.status === "deployed");
  const live = decisions.filter((d) => d.status === "approved");
  const upcoming = decisions.filter(
    (d) => d.status === "proposed" || d.status === "blocked"
  );

  return [
    { label: "Landed", accent: "text-emerald-300", dotColor: "bg-emerald-400", decisions: landed },
    { label: "Live / Approved", accent: "text-gl-300", dotColor: "bg-gl-400", decisions: live },
    { label: "Upcoming", accent: "text-blue-300", dotColor: "bg-blue-400", decisions: upcoming },
  ];
}

type Props = {
  decisions: Decision[];
};

function NowMarker() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);
  const label = time.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  return (
    <div className="col-span-full flex items-center gap-3 py-1">
      <div className="flex items-center gap-2 shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gl-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gl-500" />
        </span>
        <span className="text-[10px] font-semibold text-gl-400 uppercase tracking-wider">Now {label}</span>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-gl-500/60 to-transparent" />
    </div>
  );
}

export function ChangeCalendar({ decisions }: Props) {
  const lanes = buildLanes(decisions);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {lanes.map((lane, i) => (
        <React.Fragment key={lane.label}>
          {i === 2 && <NowMarker />}
          <div className="gl-card space-y-3">
          <div className="flex items-center gap-2">
            <span className={clsx("w-2 h-2 rounded-full", lane.dotColor)} />
            <h3 className={clsx("text-xs font-semibold uppercase tracking-widest", lane.accent)}>
              {lane.label}
            </h3>
            <span className="text-xs text-zinc-600 ml-auto">{lane.decisions.length}</span>
          </div>

          {lane.decisions.length === 0 ? (
            <p className="text-xs text-zinc-600 py-2">Nothing here right now.</p>
          ) : (
            <div className="space-y-2">
              {lane.decisions.map((d) => (
                <Link
                  key={d.id}
                  href={`/proposals/${d.id}`}
                  className="block p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg hover:border-zinc-600 transition-colors"
                >
                  <p className="text-xs font-medium text-zinc-200 leading-snug">{d.title}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="gl-badge text-[10px]">
                      {DECISION_TYPE_LABELS[d.type] ?? d.type}
                    </span>
                    <span className="text-xs text-zinc-600" title={new Date(d.updatedAt).toLocaleString()}>
                      {timeAgo(d.updatedAt)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        </React.Fragment>
      ))}
    </div>
  );
}
