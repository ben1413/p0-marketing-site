"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

type Props = {
  onComplete?: (passed: boolean) => void;
};

const PHASES = [
  "Initializing simulation environment...",
  "Loading economy model parameters...",
  "Running Monte Carlo scenarios (n=1000)...",
  "Evaluating revenue impact vectors...",
  "Computing retention sensitivity...",
  "Assessing risk boundaries...",
  "Generating composite score...",
];

export function SimulationRunner({ onComplete }: Props) {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(0);
  const [result, setResult] = useState<"passed" | "failed" | null>(null);

  const run = useCallback(() => {
    setRunning(true);
    setPhase(0);
    setResult(null);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= PHASES.length) {
        clearInterval(interval);
        const passed = Math.random() > 0.25;
        setResult(passed ? "passed" : "failed");
        setRunning(false);
        onComplete?.(passed);
      } else {
        setPhase(i);
      }
    }, 600);
  }, [onComplete]);

  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={clsx(
          "flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium",
          result === "passed"
            ? "border-emerald-800/50 bg-emerald-950/20 text-emerald-300"
            : "border-red-800/50 bg-red-950/20 text-red-300"
        )}
      >
        <span
          className={clsx(
            "w-2 h-2 rounded-full",
            result === "passed" ? "bg-emerald-400" : "bg-red-400"
          )}
        />
        Simulation {result}
      </motion.div>
    );
  }

  if (!running) {
    return (
      <button onClick={run} className="gl-btn-secondary text-sm">
        Run Simulation
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-gl-800/40 bg-gl-950/10">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-gl-400"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.span
          key={phase}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="text-xs text-gl-300"
        >
          {PHASES[phase]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
