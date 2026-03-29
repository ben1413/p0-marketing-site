"use client";

import { clsx } from "clsx";
import type { OutcomeSummary } from "@/lib/types";
import { narrateDecisionOutcome } from "@/lib/plainLanguage";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from "@heroicons/react/20/solid";

type Props = {
  outcome: OutcomeSummary;
};

function DeltaCell({
  label,
  predicted,
  actual,
  delta,
}: {
  label: string;
  predicted?: number;
  actual?: number;
  delta?: number;
}) {
  if (predicted === undefined && actual === undefined) return null;

  const positive = delta !== undefined && delta >= 0;

  return (
    <div className="flex flex-col items-center gap-0.5 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg min-w-[80px]">
      <span className="text-xs text-zinc-500">{label}</span>
      {actual !== undefined && (
        <span className={clsx("text-base font-semibold", positive ? "text-emerald-300" : "text-red-300")}>
          {actual >= 0 ? "+" : ""}{(actual * 100).toFixed(1)}%
        </span>
      )}
      {predicted !== undefined && (
        <span className="text-xs text-zinc-500">
          predicted {predicted >= 0 ? "+" : ""}{(predicted * 100).toFixed(1)}%
        </span>
      )}
      {delta !== undefined && (
        <span className={clsx("text-xs font-medium", positive ? "text-emerald-400" : "text-red-400")}>
          {positive ? "↑" : "↓"} {Math.abs(delta * 100).toFixed(1)}% vs expected
        </span>
      )}
    </div>
  );
}

export function OutcomeCard({ outcome }: Props) {
  const narrative = narrateDecisionOutcome(outcome);
  const isPending = outcome.status === "pending";
  const isWorse = outcome.status === "worse_than_expected";

  return (
    <div
      className={clsx(
        "p-4 border rounded-xl space-y-3",
        isPending && "border-zinc-800 bg-zinc-900",
        isWorse && "border-orange-800/50 bg-orange-950/10",
        !isPending && !isWorse && "border-emerald-800/40 bg-emerald-950/10"
      )}
    >
      {/* Status row */}
      <div className="flex items-center gap-2">
        {isPending
          ? <ClockIcon className="w-4 h-4 text-zinc-400" />
          : isWorse
          ? <ExclamationTriangleIcon className="w-4 h-4 text-orange-400" />
          : <CheckCircleIcon className="w-4 h-4 text-emerald-400" />}
        <span
          className={clsx(
            "text-sm font-medium",
            isPending ? "text-zinc-300" : isWorse ? "text-orange-300" : "text-emerald-300"
          )}
        >
          {isPending ? "Measuring outcome…" : isWorse ? "Outcome: worse than predicted" : "Outcome recorded"}
        </span>
      </div>

      {/* Narrative */}
      <p className="text-xs text-zinc-400 leading-relaxed">{narrative}</p>

      {/* Delta cells */}
      {!isPending && (outcome.actual || outcome.predicted) && (
        <div className="flex gap-2 flex-wrap">
          <DeltaCell
            label="Retention"
            predicted={outcome.predicted?.retention}
            actual={outcome.actual?.retention}
            delta={outcome.delta?.retention}
          />
          <DeltaCell
            label="Revenue"
            predicted={outcome.predicted?.revenue}
            actual={outcome.actual?.revenue}
            delta={outcome.delta?.revenue}
          />
        </div>
      )}

      {/* Timestamps */}
      {outcome.deployedAt && (
        <p className="text-xs text-zinc-600">
          Deployed {new Date(outcome.deployedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
          {outcome.evaluatedAt && (
            <> · Evaluated {new Date(outcome.evaluatedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</>
          )}
        </p>
      )}
    </div>
  );
}
