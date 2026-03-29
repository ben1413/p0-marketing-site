"use client";

import { useState } from "react";
import { clsx } from "clsx";
import Link from "next/link";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  LockClosedIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/20/solid";
import type { Decision } from "@/lib/types";
import { SimulationChip } from "./SimulationChip";
import { TrailEventList } from "./TrailEventList";
import {
  DECISION_STATUS_LABELS,
  DECISION_TYPE_LABELS,
  describeAuthorityMode,
  describeGovernanceTier,
  describeDeployBlockReason,
} from "@/lib/plainLanguage";

const STATUS_STYLES: Record<string, string> = {
  proposed:  "text-blue-300   bg-blue-950  border-blue-800",
  approved:  "text-emerald-300 bg-emerald-950 border-emerald-800",
  deployed:  "text-gl-300     bg-gl-950    border-gl-700",
  blocked:   "text-amber-300  bg-amber-950 border-amber-700",
  rejected:  "text-red-300    bg-red-950   border-red-800",
  pending:   "text-zinc-300   bg-zinc-800  border-zinc-700",
};

const STATUS_ICON: Record<string, React.ReactNode> = {
  approved:  <CheckCircleIcon className="w-3.5 h-3.5" />,
  deployed:  <CheckCircleIcon className="w-3.5 h-3.5" />,
  rejected:  <XCircleIcon className="w-3.5 h-3.5" />,
  blocked:   <LockClosedIcon className="w-3.5 h-3.5" />,
  proposed:  <ClockIcon className="w-3.5 h-3.5" />,
  pending:   <ClockIcon className="w-3.5 h-3.5" />,
};

type Props = {
  decision: Decision;
};

export function DecisionCard({ decision }: Props) {
  const [expanded, setExpanded] = useState(false);
  const isBlocked = decision.status === "blocked";
  const hasOutcomeWarning = decision.outcome?.status === "worse_than_expected";

  return (
    <div
      className={clsx(
        "gl-card transition-colors",
        isBlocked && "border-amber-800/60 bg-amber-950/10",
        hasOutcomeWarning && "border-orange-800/60 bg-orange-950/10"
      )}
    >
      {/* Header row */}
      <div className="flex items-start gap-3">
        {/* Expand toggle */}
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-0.5 text-zinc-500 hover:text-zinc-300 shrink-0"
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          {expanded
            ? <ChevronDownIcon className="w-4 h-4" />
            : <ChevronRightIcon className="w-4 h-4" />}
        </button>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap">
            {/* Status badge */}
            <span
              className={clsx(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
                STATUS_STYLES[decision.status] ?? STATUS_STYLES.pending
              )}
            >
              {STATUS_ICON[decision.status]}
              {DECISION_STATUS_LABELS[decision.status] ?? decision.status}
            </span>

            {/* Type badge */}
            <span className="gl-badge">
              {DECISION_TYPE_LABELS[decision.type] ?? decision.type}
            </span>

            {/* Governance tier */}
            {decision.governanceTier === "critical" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-950 text-red-300 border border-red-800">
                Critical
              </span>
            )}

            {/* Ledger link */}
            {decision.ledgerItemId && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-950 text-purple-300 border border-purple-800">
                <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                Sealed
              </span>
            )}

            {/* Outcome warning */}
            {hasOutcomeWarning && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-950 text-orange-300 border border-orange-800">
                ⚠ Worse than predicted
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="mt-1.5 text-sm font-medium text-zinc-100 leading-snug">
            {decision.title}
          </h3>

          {/* Intent */}
          <p className="mt-0.5 text-xs text-zinc-400">{decision.intent}</p>

          {/* Meta row */}
          <div className="mt-2 flex items-center gap-3 flex-wrap">
            <SimulationChip
              status={decision.simulationStatus}
              age={decision.simulationAge}
            />
            {decision.authorityMode && (
              <span className="text-xs text-zinc-500">
                {describeAuthorityMode(decision.authorityMode)}
              </span>
            )}
            <span className="text-xs text-zinc-600">
              {new Date(decision.createdAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Block reason */}
          {isBlocked && decision.blockReason && (
            <div className="mt-2 flex items-start gap-2 p-2 bg-amber-950/30 border border-amber-800/40 rounded-lg">
              <LockClosedIcon className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-300 leading-relaxed">
                {describeDeployBlockReason(decision.blockReason)}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/proposals/${decision.id}`}
            className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            View →
          </Link>
        </div>
      </div>

      {/* Expanded trail */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-zinc-800/60">
          <p className="text-xs font-medium text-zinc-400 mb-3 uppercase tracking-wide">
            Accountability trail
          </p>
          <TrailEventList events={decision.trail} />
        </div>
      )}
    </div>
  );
}
