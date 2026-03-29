"use client";

import Link from "next/link";
import { clsx } from "clsx";
import {
  ExclamationTriangleIcon,
  ArrowRightIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";

type LiveRiskAlertProps = {
  proposalId: string;
  proposalTitle: string;
  domain: string;
  deployed: string;
  /** The thing that went wrong in plain language */
  finding: string;
  /** Delta that surfaced the issue — e.g. "-8% retention vs +5% predicted" */
  delta: string;
  /** Optional: what is recommended */
  recommendation?: string;
};

/**
 * LiveRiskAlert — the "we are currently exposed" banner.
 *
 * Shown at the top of the dashboard when a deployed change is performing
 * worse than predicted. This is the moment that moves Greenlight from
 * "impressive tool" to "we can't operate without this."
 *
 * The key sentence: a human would not have caught this without Greenlight
 * continuously comparing predicted vs actual and surfacing it.
 */
export function LiveRiskAlert({
  proposalId,
  proposalTitle,
  domain,
  deployed,
  finding,
  delta,
  recommendation,
}: LiveRiskAlertProps) {
  return (
    <div className="rounded-xl border border-red-700/60 bg-red-950/20 overflow-hidden animate-risk-breathe">
      {/* Header stripe */}
      <div className="flex items-center gap-2.5 px-4 py-2.5 bg-red-950/40 border-b border-red-800/40">
        <span className="flex items-center gap-1.5">
          {/* Pulsing dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
          </span>
          <span className="text-xs font-semibold text-red-300 uppercase tracking-wider">
            Live risk detected
          </span>
        </span>
        <span className="text-xs text-red-600 ml-auto">
          {domain} · Deployed {deployed}
        </span>
      </div>

      {/* Body */}
      <div className="px-4 py-4 space-y-3">
        <div>
          <p className="text-sm font-medium text-red-200 leading-snug">
            {proposalTitle}
          </p>
          <p className="text-xs text-red-300/80 mt-1 leading-relaxed">
            {finding}
          </p>
        </div>

        {/* Delta callout */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-950/40 border border-red-800/40 rounded-lg">
          <ExclamationTriangleIcon className="w-3.5 h-3.5 text-red-400 shrink-0" />
          <span className="text-xs font-mono text-red-300">{delta}</span>
        </div>

        {/* Ledger note — this is the moat */}
        <div className="flex items-start gap-2 text-xs text-zinc-500">
          <LockClosedIcon className="w-3.5 h-3.5 shrink-0 mt-0.5 text-zinc-600" />
          <span>
            The original decision, simulation, approval, and this outcome discrepancy are all{" "}
            <span className="text-zinc-400 font-medium">permanently sealed to the Ledger</span>.
            {" "}No one can edit or delete what happened.
          </span>
        </div>

        {recommendation && (
          <p className="text-xs text-zinc-400 italic border-l-2 border-red-800/60 pl-3">
            {recommendation}
          </p>
        )}
      </div>

      {/* Footer CTA */}
      <div
        className={clsx(
          "flex items-center justify-between px-4 py-2.5",
          "border-t border-red-800/30 bg-red-950/20"
        )}
      >
        <span className="text-xs text-zinc-500">
          Greenlight detected this before a human escalation was raised.
        </span>
        <Link
          href={`/proposals/${proposalId}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-900/60 hover:bg-red-900 border border-red-700 rounded-lg text-xs text-red-200 font-medium transition-colors"
        >
          Review + open rollback
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
