"use client";

import { clsx } from "clsx";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/20/solid";

type Milestone = {
  phase: string;
  timeframe: string;
  what: string[];
  note?: string;
};

const MILESTONES: Milestone[] = [
  {
    phase: "First event ingested",
    timeframe: "< 1 day",
    what: [
      "Get API key from Core dashboard",
      "POST first decision to /api/v1/gaming/decisions/propose",
      "Decision visible in Greenlight UI immediately",
    ],
    note: "No pipeline changes required. Wraps your existing decision point.",
  },
  {
    phase: "Basic decision tracking live",
    timeframe: "2–5 days",
    what: [
      "Proposal → simulate → approve → deploy flow working end-to-end",
      "TrailEvent chain populating for each decision",
      "Outcome baselines captured at deploy time",
      "Audit export working with real data",
    ],
    note: "Existing tooling unchanged. Greenlight attaches to decision points, not to your full pipeline.",
  },
  {
    phase: "Full governance + simulation gates",
    timeframe: "1–2 weeks",
    what: [
      "GAMING_SIMULATION_GATE_ENFORCED=1 flipped in staging",
      "All deploys requiring simulation + hash verification",
      "Agent authority modes declared on all agent actions",
      "LiveRiskAlert firing on outcome drift",
      "KMS-signed Artifact 5 bundles generating on key events",
    ],
    note: "Gate enforcement is off by default. Turn it on when staging exercises pass — not before.",
  },
];

export function TimeToValueCard() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold text-zinc-200">Time to value</h2>
        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
          How quickly Greenlight becomes operational in a real environment.
          No re-architecture required at any phase.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-[19px] top-6 bottom-6 w-px bg-zinc-800" />
        <div className="space-y-4">
          {MILESTONES.map((m, i) => (
            <div key={m.phase} className="relative pl-10">
              <div className="absolute left-[11px] top-4 w-4 h-4 rounded-full bg-gl-500 border-2 border-zinc-950 flex items-center justify-center">
                <span className="text-[9px] font-bold text-white">{i + 1}</span>
              </div>

              <div className="gl-card space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-zinc-200">{m.phase}</p>
                    {m.note && (
                      <p className="text-xs text-zinc-500 mt-0.5 italic">{m.note}</p>
                    )}
                  </div>
                  <span className={clsx(
                    "shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
                    i === 0
                      ? "bg-gl-950 border-gl-700 text-gl-300"
                      : "bg-zinc-800 border-zinc-700 text-zinc-300"
                  )}>
                    {i === 0
                      ? <CheckCircleIcon className="w-3 h-3" />
                      : <ClockIcon className="w-3 h-3" />}
                    {m.timeframe}
                  </span>
                </div>

                {/* Steps */}
                <ul className="space-y-1">
                  {m.what.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-zinc-600 mt-1.5 shrink-0" />
                      <span className="text-xs text-zinc-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The key commitments */}
      <div className="p-3 bg-zinc-900 border border-zinc-700 rounded-xl space-y-1.5">
        <p className="text-xs font-semibold text-zinc-400">What this does NOT require</p>
        {[
          "Does not require replacing existing decision tooling (Jira, Slack, custom)",
          "Does not require re-architecting your game backend",
          "Does not require decisions to go through the Greenlight UI — Greenlight wraps decision points",
          "Gate enforcement is opt-in — you control when hard blocks activate",
        ].map((line) => (
          <p key={line} className="text-xs text-zinc-500 flex items-start gap-1.5">
            <span className="mt-0.5">✗</span>
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
