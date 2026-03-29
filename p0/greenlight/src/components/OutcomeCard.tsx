"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import type { OutcomeSummary } from "@/lib/types";
import { narrateDecisionOutcome, timeAgo } from "@/lib/plainLanguage";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from "@heroicons/react/20/solid";

type Props = {
  outcome: OutcomeSummary;
  animated?: boolean;
};

function AnimatedNumber({
  from,
  to,
  duration = 1.2,
  delay = 0,
  className,
}: {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const value = useMotionValue(from);
  const display = useTransform(value, (v) => {
    const pct = v * 100;
    return `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`;
  });
  const [done, setDone] = useState(false);

  useEffect(() => {
    const ctrl = animate(value, to, {
      duration,
      delay,
      ease: "easeOut",
      onComplete: () => setDone(true),
    });
    return ctrl.stop;
  }, [value, to, duration, delay]);

  const positive = to >= 0;

  return (
    <motion.span className={clsx(className, done && (positive ? "text-emerald-300" : "text-red-300"))}>
      {display}
    </motion.span>
  );
}

function DeltaCell({
  label,
  predicted,
  actual,
  delta,
  animated,
}: {
  label: string;
  predicted?: number;
  actual?: number;
  delta?: number;
  animated?: boolean;
}) {
  if (predicted === undefined && actual === undefined) return null;

  const positive = delta !== undefined && delta >= 0;

  return (
    <div className="flex flex-col items-center gap-0.5 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg min-w-[80px]">
      <span className="text-xs text-zinc-500">{label}</span>
      {actual !== undefined && (
        animated && predicted !== undefined ? (
          <AnimatedNumber
            from={predicted}
            to={actual}
            duration={1.4}
            delay={0.6}
            className="text-base font-semibold text-zinc-400"
          />
        ) : (
          <span
            className={clsx(
              "text-base font-semibold",
              positive ? "text-emerald-300" : "text-red-300"
            )}
          >
            {actual >= 0 ? "+" : ""}
            {(actual * 100).toFixed(1)}%
          </span>
        )
      )}
      {predicted !== undefined && (
        <span className="text-xs text-zinc-500">
          predicted {predicted >= 0 ? "+" : ""}
          {(predicted * 100).toFixed(1)}%
        </span>
      )}
      {delta !== undefined && (
        <span
          className={clsx(
            "text-xs font-medium",
            positive ? "text-emerald-400" : "text-red-400"
          )}
        >
          {positive ? "\u2191" : "\u2193"} {Math.abs(delta * 100).toFixed(1)}%
          vs expected
        </span>
      )}
    </div>
  );
}

export function OutcomeCard({ outcome, animated = false }: Props) {
  const narrative = narrateDecisionOutcome(outcome);
  const isPending = outcome.status === "pending";
  const isWorse = outcome.status === "worse_than_expected";

  return (
    <div
      className={clsx(
        "p-4 border rounded-xl space-y-3 transition-all duration-500",
        isPending && "border-zinc-800 bg-zinc-900",
        isWorse && "border-orange-800/50 bg-orange-950/10",
        !isPending && !isWorse && "border-emerald-800/40 bg-emerald-950/10"
      )}
    >
      <div className="flex items-center gap-2">
        {isPending ? (
          <ClockIcon className="w-4 h-4 text-zinc-400" />
        ) : isWorse ? (
          <ExclamationTriangleIcon className="w-4 h-4 text-orange-400" />
        ) : (
          <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
        )}
        <span
          className={clsx(
            "text-sm font-medium",
            isPending
              ? "text-zinc-300"
              : isWorse
                ? "text-orange-300"
                : "text-emerald-300"
          )}
        >
          {isPending
            ? "Measuring outcome\u2026"
            : isWorse
              ? "Outcome: worse than predicted"
              : "Outcome recorded"}
        </span>
      </div>

      <p className="text-xs text-zinc-400 leading-relaxed">{narrative}</p>

      {!isPending && (outcome.actual || outcome.predicted) && (
        <div className="flex gap-2 flex-wrap">
          <DeltaCell
            label="Retention"
            predicted={outcome.predicted?.retention}
            actual={outcome.actual?.retention}
            delta={outcome.delta?.retention}
            animated={animated}
          />
          <DeltaCell
            label="Revenue"
            predicted={outcome.predicted?.revenue}
            actual={outcome.actual?.revenue}
            delta={outcome.delta?.revenue}
            animated={animated}
          />
        </div>
      )}

      {outcome.deployedAt && (
        <p className="text-xs text-zinc-600">
          Deployed {timeAgo(outcome.deployedAt)}
          {outcome.evaluatedAt && (
            <> &middot; Evaluated {timeAgo(outcome.evaluatedAt)}</>
          )}
        </p>
      )}
    </div>
  );
}
