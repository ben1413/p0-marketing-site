"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { clsx } from "clsx";
import type { Proposal } from "@/lib/core";

const TYPE_LABELS: Record<string, string> = {
  economy: "Economy",
  content: "Content",
  matchmaking: "Matchmaking",
  moderation: "Moderation",
  experiment: "Experiment",
  emergency: "Emergency",
};

const STATUS_STYLES: Record<
  string,
  { dot: string; text: string; label: string }
> = {
  pending:   { dot: "bg-yellow-400", text: "text-yellow-400", label: "Pending" },
  approved:  { dot: "bg-gl-400",     text: "text-gl-400",     label: "Approved" },
  rejected:  { dot: "bg-red-400",    text: "text-red-400",    label: "Rejected" },
  executed:  { dot: "bg-blue-400",   text: "text-blue-400",   label: "Deployed" },
  rolled_back: { dot: "bg-zinc-400", text: "text-zinc-400",   label: "Rolled Back" },
};

const TIER_STYLES: Record<string, string> = {
  promoted: "bg-zinc-800 text-zinc-400",
  critical: "bg-red-900/40 text-red-400 border border-red-800/50",
};

export function ProposalsFeed({ proposals }: { proposals: Proposal[] }) {
  return (
    <div className="gl-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
        <h2 className="text-sm font-semibold text-white">Proposals</h2>
        <Link
          href="/proposals"
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          View all →
        </Link>
      </div>

      {proposals.length === 0 ? (
        <div className="py-16 flex flex-col items-center gap-3 text-center px-8">
          <p className="text-zinc-400 text-sm font-medium">No proposals yet</p>
          <p className="text-zinc-600 text-xs">
            Create a proposal to start the governed change pipeline.
          </p>
          <Link href="/proposals/new" className="gl-btn-primary mt-2">
            New Proposal
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-zinc-800/60">
          {proposals.map((p) => {
            const status = STATUS_STYLES[p.status] ?? STATUS_STYLES.pending;
            const tierStyle = TIER_STYLES[p.governanceTier ?? "promoted"] ?? TIER_STYLES.promoted;

            return (
              <li key={p.id}>
                <Link
                  href={`/proposals/${p.id}`}
                  className="flex items-start gap-4 px-5 py-4 hover:bg-zinc-800/30 transition-colors group"
                >
                  {/* Status dot */}
                  <div className="mt-1.5 w-2 h-2 rounded-full shrink-0 flex items-center justify-center">
                    <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-zinc-100 group-hover:text-white truncate">
                        {p.title}
                      </span>
                      <span className={clsx("gl-badge", tierStyle)}>
                        {p.governanceTier === "critical" ? "Critical" : null}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-zinc-500">
                        {TYPE_LABELS[p.type] ?? p.type}
                      </span>
                      <span className="text-zinc-700">·</span>
                      <span className={clsx("text-xs font-medium", status.text)}>
                        {status.label}
                      </span>
                      {p.simulation?.passed !== undefined && (
                        <>
                          <span className="text-zinc-700">·</span>
                          <span
                            className={clsx(
                              "text-xs",
                              p.simulation.passed
                                ? "text-gl-400"
                                : "text-red-400"
                            )}
                          >
                            Sim {p.simulation.passed ? "passed" : "failed"}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <time className="text-xs text-zinc-600 shrink-0 mt-0.5">
                    {formatDistanceToNow(new Date(p.createdAt), {
                      addSuffix: true,
                    })}
                  </time>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
