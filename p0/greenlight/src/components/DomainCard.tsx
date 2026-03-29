"use client";

import { clsx } from "clsx";
import { useEffect, useState } from "react";
import type { DomainHealth, GovernanceHealth } from "@/lib/types";
import { useDemoEvents } from "@/lib/demoEmitter";

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
  Economy:     "\u{1F4B0}",
  Matchmaking: "\u2694\uFE0F",
  Content:     "\u{1F3AE}",
  Moderation:  "\u{1F6E1}\uFE0F",
};

const DOMAIN_MAP: Record<string, string> = {
  Economy: "economy",
  Matchmaking: "matchmaking",
  Content: "content",
  Moderation: "moderation",
};

type Props = {
  domains: DomainHealth[];
};

function useDomainPulse(domain: string): boolean {
  const { domainActivity } = useDemoEvents();
  const [pulsing, setPulsing] = useState(false);
  const key = DOMAIN_MAP[domain] ?? domain.toLowerCase();
  const lastActivity = domainActivity[key];

  useEffect(() => {
    if (!lastActivity) return;
    setPulsing(true);
    const timer = setTimeout(() => setPulsing(false), 3000);
    return () => clearTimeout(timer);
  }, [lastActivity]);

  return pulsing;
}

function DomainCardItem({ d }: { d: DomainHealth }) {
  const pulsing = useDomainPulse(d.domain);

  return (
    <div
      className={clsx(
        "gl-card flex items-start gap-3 transition-all duration-500",
        CARD_STYLES[d.health],
        pulsing && "animate-domain-pulse border-gl-700/40"
      )}
    >
      <span className="text-xl shrink-0">{DOMAIN_ICONS[d.domain] ?? "\u{1F4E6}"}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              "w-2 h-2 rounded-full shrink-0 transition-colors duration-500",
              HEALTH_STYLES[d.health],
              pulsing && "bg-gl-400"
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
  );
}

export function DomainCard({ domains }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {domains.map((d) => (
        <DomainCardItem key={d.domain} d={d} />
      ))}
    </div>
  );
}
