"use client";

import { clsx } from "clsx";

const TIERS = [
  {
    label: "Ephemeral",
    sub: "Working RAM",
    description: "LLM-style context. Lives in the active session. Fades when the window rolls. If no one promotes it, it expires.",
    accent: "text-zinc-400 border-zinc-700 bg-zinc-900/40",
    arrow: "Promote \u2192 Brain",
    arrowColor: "text-blue-400",
    status: "Live",
    statusColor: "text-emerald-400",
  },
  {
    label: "Brain",
    sub: "Mutable, operational",
    description: "Where agents and humans collaborate. Ideas evolve, corrections happen, strategy is refined. Supersession allowed \u2014 silent edits are not.",
    accent: "text-blue-300 border-blue-800/40 bg-blue-950/10",
    arrow: "Promote \u2192 Ledger",
    arrowColor: "text-purple-400",
    status: "Coming Q3 2026",
    statusColor: "text-blue-400",
  },
  {
    label: "Ledger",
    sub: "Immutable, constitutional",
    description: "The system of record. Append-only. Authority-attributed. Tamper-evident. Decision 100 is better than decision 10 because the sealed history informs what the system proposes next.",
    accent: "text-purple-300 border-purple-800/40 bg-purple-950/10",
    arrow: null,
    arrowColor: null,
    status: "Live",
    statusColor: "text-emerald-400",
  },
];

export function BrainArchitectureCard() {
  return (
    <div className="gl-card space-y-4">
      <div>
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
          Memory architecture
        </h3>
        <p className="text-xs text-zinc-600 mt-0.5">
          Three tiers. Three promote scopes. The difference between &ldquo;AI that remembers stuff&rdquo; and &ldquo;AI that commits decisions with accountability physics.&rdquo;
        </p>
      </div>

      <div className="space-y-0">
        {TIERS.map((tier, i) => (
          <div key={tier.label}>
            <div className={clsx("p-3 rounded-lg border", tier.accent)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{tier.label}</span>
                  <span className="text-[10px] text-zinc-500">{tier.sub}</span>
                </div>
                <span className={clsx("text-[10px] font-medium", tier.statusColor)}>
                  {tier.status}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{tier.description}</p>
            </div>

            {tier.arrow && (
              <div className="flex items-center justify-center py-1.5">
                <span className={clsx("text-[10px] font-mono font-medium", tier.arrowColor)}>
                  {tier.arrow}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-3 bg-zinc-800/40 border border-zinc-700/50 rounded-lg">
        <p className="text-xs text-zinc-500 leading-relaxed">
          <span className="text-zinc-400 font-medium">What this means for your team:</span>{" "}
          Every decision, simulation, approval, and outcome is sealed with authority attribution and a commitment hash.
          Rejected proposals and failed simulations are preserved as negative memory &mdash; the system learns from what didn&apos;t work,
          not just what did. Over time, the sealed Ledger becomes institutional knowledge that informs better proposals automatically.
        </p>
      </div>
    </div>
  );
}
