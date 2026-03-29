"use client";

import { clsx } from "clsx";
import Link from "next/link";
import type { DomainHealth, GovernanceHealth } from "@/lib/types";

const HEALTH_STYLES: Record<GovernanceHealth, string> = {
  healthy:  "bg-emerald-400",
  warning:  "bg-amber-400",
  critical: "bg-red-400",
};

const CARD_STYLES: Record<GovernanceHealth, string> = {
  healthy:  "border-zinc-800",
  warning:  "border-amber-800/50 bg-amber-950/10",
  critical: "border-red-800/50 bg-red-950/10",
};

const DOMAIN_ICONS: Record<string, string> = {
  Economy:     "💰",
  Matchmaking: "⚔️",
  Content:     "🎮",
  Moderation:  "🛡️",
};

type Props = {
  domains: DomainHealth[];
};

export function DomainCard({ domains }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {domains.map((d) => (
        <div
          key={d.domain}
          className={clsx(
            "gl-card flex items-start gap-3",
            CARD_STYLES[d.health]
          )}
        >
          <span className="text-xl shrink-0">{DOMAIN_ICONS[d.domain] ?? "📦"}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={clsx(
                  "w-2 h-2 rounded-full shrink-0",
                  HEALTH_STYLES[d.health]
                )}
              />
              <span className="text-sm font-medium text-zinc-200">{d.domain}</span>
              {d.pendingProposals > 0 && (
                <span className="text-xs text-zinc-500">
                  {d.pendingProposals} pending
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-zinc-400 leading-relaxed">{d.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
