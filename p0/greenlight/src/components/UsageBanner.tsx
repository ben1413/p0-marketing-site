"use client";

import { useEffect, useMemo, useState } from "react";
import type { CoreUsageSummary, QuotaUsageEntry } from "@/lib/core";
import { XMarkIcon } from "@heroicons/react/20/solid";

const PRICING_URL = "https://project0.com/pricing";

function isAlertStatus(s: string): boolean {
  return s === "warning" || s === "critical" || s === "exceeded";
}

function severityRank(s: string): number {
  if (s === "exceeded") return 3;
  if (s === "critical") return 2;
  if (s === "warning") return 1;
  return 0;
}

function buildMessage(period: string, propose: QuotaUsageEntry | undefined, deploy: QuotaUsageEntry | undefined): string {
  const parts: string[] = [];
  if (propose && isAlertStatus(propose.status) && propose.limit > 0) {
    parts.push(
      `decision proposals at ${propose.pct ?? Math.round((propose.used / propose.limit) * 100)}%`
    );
  }
  if (deploy && isAlertStatus(deploy.status) && deploy.limit > 0) {
    parts.push(`deploys at ${deploy.pct ?? Math.round((deploy.used / deploy.limit) * 100)}%`);
  }
  if (parts.length === 0) return "";
  return `You're at high usage on ${parts.join(" and ")} of your monthly quota (${period}). Upgrade to keep shipping.`;
}

export function UsageBanner({ usage }: { usage: CoreUsageSummary | null }) {
  const [dismissed, setDismissed] = useState(false);

  const storageKey = usage?.period ? `greenlight_usage_dismiss_${usage.period}` : null;

  useEffect(() => {
    if (!storageKey || typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(storageKey) === "1") setDismissed(true);
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  const { show, level, message } = useMemo(() => {
    if (!usage?.ok) return { show: false as const, level: "warning" as const, message: "" };
    const propose = usage.usage["gaming.propose"];
    const deploy = usage.usage["gaming.deploy"];
    const pAlert = propose && isAlertStatus(propose.status);
    const dAlert = deploy && isAlertStatus(deploy.status);
    if (!pAlert && !dAlert) return { show: false as const, level: "warning" as const, message: "" };
    const msg = buildMessage(usage.period, propose, deploy);
    const rank = Math.max(
      propose && isAlertStatus(propose.status) ? severityRank(propose.status) : 0,
      deploy && isAlertStatus(deploy.status) ? severityRank(deploy.status) : 0
    );
    const level = rank >= 3 ? ("exceeded" as const) : rank >= 2 ? ("critical" as const) : ("warning" as const);
    return { show: true as const, level, message: msg };
  }, [usage]);

  if (!show || dismissed || !message) return null;

  const bg =
    level === "exceeded" || level === "critical"
      ? "border-red-900/60 bg-red-950/50 text-red-100"
      : "border-amber-900/50 bg-amber-950/40 text-amber-100";

  function dismiss() {
    if (storageKey && typeof window !== "undefined") {
      try {
        sessionStorage.setItem(storageKey, "1");
      } catch {
        /* ignore */
      }
    }
    setDismissed(true);
  }

  return (
    <div
      className={`mx-4 mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm ${bg}`}
      role="status"
    >
      <p className="min-w-0 flex-1 leading-snug">{message}</p>
      <div className="flex shrink-0 items-center gap-2">
        <a
          href={PRICING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/15 transition-colors"
        >
          View plans
        </a>
        <button
          type="button"
          onClick={dismiss}
          className="rounded p-1 text-current/70 hover:text-current hover:bg-white/10"
          aria-label="Dismiss"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
