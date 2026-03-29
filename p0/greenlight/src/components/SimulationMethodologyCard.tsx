"use client";

import { useState } from "react";
import { clsx } from "clsx";
import {
  InformationCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  LockClosedIcon,
  CheckBadgeIcon,
} from "@heroicons/react/20/solid";

/**
 * SimulationMethodologyCard
 *
 * Answers the buyer's question: "Why should I trust your simulation?"
 *
 * Key framing: this is NOT an ML black box.
 * It's governance-enforced risk scoring with auditable thresholds.
 * The criteria are configured by the operator, not trained by the vendor.
 */
export function SimulationMethodologyCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="gl-card space-y-0 p-0 overflow-hidden">
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800/40 transition-colors text-left"
      >
        <InformationCircleIcon className="w-4 h-4 text-zinc-500 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-zinc-300">How simulation works</p>
          <p className="text-xs text-zinc-500 mt-0.5">
            Not ML. Governance-enforced risk scoring with auditable thresholds.
          </p>
        </div>
        {expanded
          ? <ChevronDownIcon className="w-4 h-4 text-zinc-500 shrink-0" />
          : <ChevronRightIcon className="w-4 h-4 text-zinc-500 shrink-0" />}
      </button>

      {/* Expanded methodology */}
      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t border-zinc-800 space-y-4">
          <p className="text-xs text-zinc-400 leading-relaxed">
            Greenlight simulation is a <span className="text-zinc-200 font-medium">governance gate</span>,
            not a prediction engine. It evaluates whether a proposal satisfies your configured constraints
            before it can be deployed — regardless of who proposed it.
          </p>

          {/* What it checks */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-2">What it checks</p>
            <div className="space-y-2">
              {[
                {
                  label: "Risk score threshold",
                  detail: "Proposals with risk > 0.80 are blocked automatically. You set this threshold.",
                  icon: "🚫",
                },
                {
                  label: "Revenue / retention / confidence ranges",
                  detail: "Scores outside documented valid ranges are rejected. Composite is computed from mapped-to-[0,1] terms.",
                  icon: "📊",
                },
                {
                  label: "Decision fingerprint (hash)",
                  detail: "If the proposal changed after simulation ran, the hash won't match. Deploy is blocked until re-simulated.",
                  icon: "🔒",
                },
                {
                  label: "Freshness threshold (type-based)",
                  detail: "Matchmaking: 30 min. Moderation: 5 min. Economy: 24h. Default: 6h. Stale simulations block deploy.",
                  icon: "⏱",
                },
                {
                  label: "Governance tier constraints",
                  detail: "Critical tier proposals require above-threshold confidence. Agent-autonomous proposals require score + rationale.",
                  icon: "⚖️",
                },
              ].map(({ label, detail, icon }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <span className="text-base leading-none mt-0.5 shrink-0">{icon}</span>
                  <div>
                    <p className="text-xs font-medium text-zinc-300">{label}</p>
                    <p className="text-xs text-zinc-500 leading-relaxed mt-0.5">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What it does NOT do */}
          <div className="p-3 bg-zinc-800/40 border border-zinc-700/50 rounded-xl">
            <p className="text-xs font-semibold text-zinc-400 mb-1.5">What simulation is NOT</p>
            <ul className="space-y-1 text-xs text-zinc-500">
              <li>✗ Not an ML model — no training data, no learned weights</li>
              <li>✗ Not a game-world Monte Carlo — we do not simulate your game engine</li>
              <li>✗ Not a black box — every constraint is operator-configured and auditable</li>
              <li>✗ Not a guarantee — a passed simulation does not guarantee a good outcome</li>
            </ul>
          </div>

          {/* Auditability */}
          <div className={clsx(
            "flex items-start gap-2.5 p-3",
            "bg-purple-950/20 border border-purple-800/30 rounded-xl"
          )}>
            <LockClosedIcon className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-purple-300">Every simulation is auditable</p>
              <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
                Simulation results, scores, pass/fail reasoning, and the decision hash are permanently sealed
                to the Ledger alongside the proposal. You can reconstruct exactly why a deployment was allowed
                or blocked at any point in the past.
              </p>
            </div>
          </div>

          {/* The honest caveat */}
          <div className="flex items-start gap-2">
            <CheckBadgeIcon className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-500 leading-relaxed italic">
              Greenlight measures predicted vs actual outcomes after deploy. When a simulation
              is consistently over- or under-predicting, calibration data accumulates and adjusts
              future score estimates automatically.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
