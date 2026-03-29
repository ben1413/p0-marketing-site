"use client";

import Link from "next/link";
import { clsx } from "clsx";
import type { SystemState } from "@/lib/types";
import { describeGovernanceHealth, timeAgo } from "@/lib/plainLanguage";
import { DomainCard } from "./DomainCard";
import { AgentStrip } from "./AgentStrip";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  BoltIcon,
  ArrowRightIcon,
} from "@heroicons/react/20/solid";

const HEALTH_BANNER = {
  healthy:  { bg: "bg-emerald-950/30 border-emerald-800/40", icon: <CheckCircleIcon className="w-4 h-4 text-emerald-400" />, text: "text-emerald-300" },
  warning:  { bg: "bg-amber-950/30 border-amber-800/40",     icon: <ExclamationTriangleIcon className="w-4 h-4 text-amber-400" />, text: "text-amber-300" },
  critical: { bg: "bg-red-950/30 border-red-800/40",         icon: <BoltIcon className="w-4 h-4 text-red-400" />, text: "text-red-300" },
};

type Props = {
  state: SystemState;
};

export function SystemHealth({ state }: Props) {
  const banner = HEALTH_BANNER[state.governanceHealth];

  return (
    <div className="space-y-6">
      {/* Narrative banner */}
      <div className={clsx("flex items-start gap-3 p-4 border rounded-xl", banner.bg)}>
        <span className="mt-0.5 shrink-0">{banner.icon}</span>
        <div className="flex-1">
          <p className={clsx("text-sm font-medium", banner.text)}>
            {state.narrative}
          </p>
          <p className="text-xs text-zinc-500 mt-0.5">
            {describeGovernanceHealth(state.governanceHealth)} · Updated {timeAgo(state.capturedAt)}
          </p>
        </div>
      </div>

      {/* Pending actions */}
      {state.pendingActions.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
            Needs attention
          </h3>
          <div className="space-y-2">
            {state.pendingActions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                className="flex items-center gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 transition-colors group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <p className="flex-1 text-xs text-zinc-300">{action.description}</p>
                <ArrowRightIcon className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Domain health */}
      <div>
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
          Domain health
        </h3>
        <DomainCard domains={state.domains} />
      </div>

      {/* Active risks */}
      {state.activeRisks.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
            Active risks
          </h3>
          <div className="space-y-2">
            {state.activeRisks.map((risk) => (
              <div
                key={risk.id}
                className={clsx(
                  "flex items-start gap-2.5 p-3 border rounded-xl",
                  risk.severity === "critical" || risk.severity === "high"
                    ? "border-red-800/40 bg-red-950/10"
                    : "border-amber-800/40 bg-amber-950/10"
                )}
              >
                <ExclamationTriangleIcon
                  className={clsx(
                    "w-4 h-4 shrink-0 mt-0.5",
                    risk.severity === "critical" || risk.severity === "high"
                      ? "text-red-400"
                      : "text-amber-400"
                  )}
                />
                <div>
                  <p className="text-xs font-medium text-zinc-200">{risk.domain}</p>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{risk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Agent strip */}
      <div>
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
          Agent identities
        </h3>
        <AgentStrip agents={state.agents} />
      </div>
    </div>
  );
}
