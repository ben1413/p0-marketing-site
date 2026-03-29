"use client";

import Link from "next/link";
import { useDemoEvents } from "@/lib/demoEmitter";
import { DEMO_DECISIONS } from "@/lib/seed";

export function P0CoreStrip() {
  const { events: liveEvents } = useDemoEvents();

  const sealedFromSeed = DEMO_DECISIONS.reduce(
    (acc, d) => acc + d.trail.filter((e) => e.commitmentHash).length,
    0
  );
  const sealedFromLive = liveEvents.filter(
    (e) => e.type === "deployed" || e.type === "approved" || e.type === "outcome_recorded"
  ).length;
  const totalSealed = sealedFromSeed + sealedFromLive;

  const authorityModes = new Set(
    DEMO_DECISIONS.flatMap((d) =>
      d.trail.filter((e) => e.authorityMode).map((e) => e.authorityMode!)
    )
  ).size;

  return (
    <Link
      href="/ledger"
      className="flex items-center justify-between px-4 py-2.5 border border-purple-900/30 bg-purple-950/10 rounded-xl hover:border-purple-800/40 hover:bg-purple-950/20 transition-all group"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center shrink-0">
          <span className="text-[8px] font-bold text-purple-400">P0</span>
        </div>
        <span className="text-[11px] text-zinc-500 group-hover:text-zinc-400 transition-colors">
          Powered by <span className="text-purple-400/80 font-medium">Project0 Core</span>
        </span>
      </div>
      <div className="flex items-center gap-4 text-[10px] text-zinc-600">
        <span>
          <span className="text-purple-300 font-semibold">{totalSealed}</span> sealed entries
        </span>
        <span>
          <span className="text-purple-300 font-semibold">3</span>-layer integrity
        </span>
        <span>
          <span className="text-purple-300 font-semibold">{authorityModes}</span> authority modes
        </span>
        <span className="text-zinc-700 group-hover:text-zinc-500 transition-colors">
          View ledger →
        </span>
      </div>
    </Link>
  );
}
