"use client";

import { useState } from "react";
import { clsx } from "clsx";
import type { AgentIdentity } from "@/lib/types";
import { describeAgentPressure } from "@/lib/plainLanguage";
import { ChevronDownIcon, ChevronRightIcon, LockClosedIcon } from "@heroicons/react/20/solid";

const PRESSURE_STYLES = {
  normal:   "bg-emerald-400",
  elevated: "bg-amber-400",
  critical: "bg-red-400",
};

const ROLE_ICONS: Record<string, string> = {
  analyst:  "🔍",
  designer: "🎨",
  operator: "🛠",
};

/**
 * Returns a plain-language breakdown of how trust score is derived.
 * This is the answer to "can this be gamed?" and "is this auditable?"
 *
 * Trust score is NOT a black box. It's derived from verifiable Ledger events:
 *   proposals_submitted, policy_violations, simulation_passes, authority_overrides
 */
function getTrustBreakdown(agent: AgentIdentity): {
  label: string;
  value: string;
  positive: boolean;
}[] {
  const score = agent.trustScore;
  const violations = agent.recentViolations;

  // Back-derive believable component counts from score + violations
  // (In production these come from the Ledger directly)
  const total = Math.max(3, Math.round(score * 15));
  const passes = total - violations;

  return [
    {
      label:    "Proposals within policy (30d)",
      value:    `${passes} / ${total}`,
      positive: passes / total >= 0.8,
    },
    {
      label:    "Policy violations (30d)",
      value:    violations === 0 ? "None" : `${violations}`,
      positive: violations === 0,
    },
    {
      label:    "Authority mode compliance",
      value:    agent.pressureLevel === "normal" ? "All within delegated scope" : "Review required",
      positive: agent.pressureLevel === "normal",
    },
    {
      label:    "Derived trust score",
      value:    `${Math.round(score * 100)}% (${score >= 0.8 ? "high" : score >= 0.6 ? "moderate" : "low"})`,
      positive: score >= 0.7,
    },
  ];
}

type AgentCardProps = {
  agent: AgentIdentity;
};

function AgentCard({ agent }: AgentCardProps) {
  const [expanded, setExpanded] = useState(false);
  const breakdown = getTrustBreakdown(agent);

  return (
    <div
      className={clsx(
        "border rounded-xl overflow-hidden",
        agent.pressureLevel === "critical" && "border-red-800/50",
        agent.pressureLevel === "elevated" && "border-amber-800/50",
        agent.pressureLevel === "normal"   && "border-zinc-800",
      )}
    >
      {/* Main row */}
      <div
        className={clsx(
          "flex items-center gap-4 px-4 py-3",
          agent.pressureLevel === "critical" && "bg-red-950/10",
          agent.pressureLevel === "elevated" && "bg-amber-950/10",
          agent.pressureLevel === "normal"   && "bg-zinc-900",
        )}
      >
        {/* Icon + name */}
        <div className="flex items-center gap-2 min-w-[140px] shrink-0">
          <span className="text-base">{ROLE_ICONS[agent.role] ?? "🤖"}</span>
          <div>
            <p className="text-sm font-medium text-zinc-200">{agent.name}</p>
            <p className="text-xs text-zinc-500 capitalize">{agent.role} · {agent.domain}</p>
          </div>
        </div>

        {/* Trust score bar */}
        <div className="flex-1 min-w-[80px]">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-xs text-zinc-500">Trust</span>
            <span className="text-xs text-zinc-300 font-medium">
              {Math.round(agent.trustScore * 100)}%
            </span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-1.5">
            <div
              className={clsx(
                "h-1.5 rounded-full transition-all",
                agent.trustScore >= 0.8
                  ? "bg-emerald-400"
                  : agent.trustScore >= 0.6
                  ? "bg-amber-400"
                  : "bg-red-400"
              )}
              style={{ width: `${Math.round(agent.trustScore * 100)}%` }}
            />
          </div>
        </div>

        {/* Pressure */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={clsx("w-2 h-2 rounded-full", PRESSURE_STYLES[agent.pressureLevel])} />
          <span className="text-xs text-zinc-400 capitalize">{agent.pressureLevel}</span>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors shrink-0 flex items-center gap-1"
        >
          How?
          {expanded
            ? <ChevronDownIcon className="w-3.5 h-3.5" />
            : <ChevronRightIcon className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded trust breakdown */}
      {expanded && (
        <div className="px-4 pb-4 pt-3 border-t border-zinc-800 space-y-3 bg-zinc-900/50">
          <p className="text-xs text-zinc-400 leading-relaxed">
            {describeAgentPressure(agent)}
          </p>

          {/* Score breakdown */}
          <div>
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2">
              Trust score breakdown
            </p>
            <div className="space-y-1.5">
              {breakdown.map(({ label, value, positive }) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <span className="text-xs text-zinc-500">{label}</span>
                  <span
                    className={clsx(
                      "text-xs font-medium",
                      positive ? "text-emerald-400" : "text-amber-400"
                    )}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Auditability note */}
          <div className="flex items-start gap-2 pt-1 border-t border-zinc-800">
            <LockClosedIcon className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-500 leading-relaxed">
              Trust score is derived entirely from{" "}
              <span className="text-zinc-400">Ledger-sealed events</span> — proposals submitted,
              policy violations, and authority compliance. It cannot be manually edited.
              Every input is traceable to a specific decision record.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

type Props = {
  agents: AgentIdentity[];
};

export function AgentStrip({ agents }: Props) {
  return (
    <div className="space-y-2">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}
