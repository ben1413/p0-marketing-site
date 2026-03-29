"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import { LockClosedIcon, ArrowPathIcon } from "@heroicons/react/20/solid";
import { describeDeployBlockReason } from "@/lib/plainLanguage";

type Props = {
  /** The raw error string from Core — e.g. "[SIMULATION_STALE] ..." */
  errorString: string;
  details?: {
    reason?: string;
    simulationSummary?: string;
    simulationAge?: string;
    decisionId?: string;
  };
  onReSimulate?: () => void;
  isSimulating?: boolean;
  className?: string;
};

export function DeployGateBar({
  errorString,
  details,
  onReSimulate,
  isSimulating,
  className,
}: Props) {
  const isStale    = errorString.includes("[SIMULATION_STALE]");
  const isMismatch = errorString.includes("[SIMULATION_MISMATCH]");
  const isFailed   = errorString.includes("[SIMULATION_FAILED]");
  const needsResim = isStale || isMismatch;

  const plainMessage = describeDeployBlockReason(errorString, details);

  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0, originX: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        "flex items-start gap-3 p-4 border rounded-xl",
        isFailed
          ? "border-red-800/50 bg-red-950/20"
          : "border-amber-800/50 bg-amber-950/20",
        className
      )}
    >
      <motion.div
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.3, ease: "easeOut" }}
      >
        <LockClosedIcon
          className={clsx(
            "w-4 h-4 shrink-0 mt-0.5",
            isFailed ? "text-red-400" : "text-amber-400"
          )}
        />
      </motion.div>

      <div className="flex-1 min-w-0">
        <p
          className={clsx(
            "text-sm font-medium",
            isFailed ? "text-red-300" : "text-amber-300"
          )}
        >
          Deploy blocked
        </p>
        <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{plainMessage}</p>

        {details?.simulationSummary && (
          <p className="text-xs text-zinc-500 mt-1 italic">
            Last simulation: {details.simulationSummary.slice(0, 200)}
            {details.simulationSummary.length > 200 ? "…" : ""}
          </p>
        )}
      </div>

      {needsResim && onReSimulate && (
        <button
          onClick={onReSimulate}
          disabled={isSimulating}
          className={clsx(
            "shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
            isSimulating
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              : "bg-amber-900 text-amber-200 hover:bg-amber-800 border border-amber-700"
          )}
        >
          <ArrowPathIcon className={clsx("w-3.5 h-3.5", isSimulating && "animate-spin")} />
          {isSimulating ? "Running…" : "Re-run Simulation"}
        </button>
      )}
    </motion.div>
  );
}
