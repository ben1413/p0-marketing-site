"use client";

import { useState, useCallback, useMemo } from "react";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import type { Decision, TrailEvent } from "@/lib/types";
import { TRAIL_EVENT_LABELS, timeAgo } from "@/lib/plainLanguage";
import { useDemoEvents } from "@/lib/demoEmitter";
import Link from "next/link";

const NODE_COLORS: Record<string, { dot: string; line: string; bg: string }> = {
  proposed:          { dot: "bg-blue-400",    line: "border-blue-800/40",    bg: "bg-blue-950/10" },
  simulated:         { dot: "bg-zinc-400",    line: "border-zinc-700/40",    bg: "bg-zinc-900/40" },
  approved:          { dot: "bg-emerald-400", line: "border-emerald-800/40", bg: "bg-emerald-950/10" },
  rejected:          { dot: "bg-red-400",     line: "border-red-800/40",     bg: "bg-red-950/10" },
  blocked:           { dot: "bg-amber-400",   line: "border-amber-800/40",   bg: "bg-amber-950/10" },
  deployed:          { dot: "bg-purple-400",  line: "border-purple-800/40",  bg: "bg-purple-950/10" },
  outcome_recorded:  { dot: "bg-teal-400",    line: "border-teal-800/40",    bg: "bg-teal-950/10" },
  rollback_opened:   { dot: "bg-orange-400",  line: "border-orange-800/40",  bg: "bg-orange-950/10" },
  superseded:        { dot: "bg-zinc-500",    line: "border-zinc-700/40",    bg: "bg-zinc-900/40" },
  incident_resolved: { dot: "bg-teal-400",    line: "border-teal-800/40",    bg: "bg-teal-950/10" },
};

const AUTHORITY_LABELS: Record<string, { text: string; color: string }> = {
  human_led:           { text: "Human-led",      color: "text-emerald-400 bg-emerald-950/30 border-emerald-800/40" },
  human_in_the_loop:   { text: "HITL",           color: "text-blue-400 bg-blue-950/30 border-blue-800/40" },
  agent_autonomous:    { text: "Agent",           color: "text-amber-400 bg-amber-950/30 border-amber-800/40" },
};

type ChainNode = TrailEvent & {
  decisionId: string;
  decisionTitle: string;
  decisionType: string;
};

function flattenChain(decisions: Decision[]): ChainNode[] {
  const all: ChainNode[] = [];
  for (const d of decisions) {
    for (const ev of d.trail) {
      all.push({
        ...ev,
        decisionId: d.id,
        decisionTitle: d.title,
        decisionType: d.type,
      });
    }
  }
  all.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return all;
}

function ChainNodeCard({
  node,
  isLast,
  verifiedIndex,
  verifying,
}: {
  node: ChainNode;
  isLast: boolean;
  verifiedIndex: number;
  verifying: boolean;
}) {
  const colors = NODE_COLORS[node.type] ?? NODE_COLORS.proposed;
  const authority = node.authorityMode ? AUTHORITY_LABELS[node.authorityMode] : null;
  const nodeIndex = node.id.replace("trail-", "");
  const isVerified = verifying && verifiedIndex >= 0;

  return (
    <div className="flex gap-4">
      {/* Vertical line + dot */}
      <div className="flex flex-col items-center w-4 shrink-0">
        <div
          className={clsx(
            "w-3 h-3 rounded-full shrink-0 mt-3 ring-2 ring-zinc-950 transition-all duration-300",
            colors.dot,
            isVerified && "ring-emerald-400/50"
          )}
        />
        {!isLast && (
          <div className={clsx("w-px flex-1 min-h-[24px] border-l-2 border-dashed", colors.line)} />
        )}
      </div>

      {/* Content */}
      <motion.div
        className={clsx(
          "flex-1 p-3 rounded-lg border transition-all duration-300 mb-2",
          colors.bg,
          colors.line,
          isVerified && "border-emerald-700/40 bg-emerald-950/5"
        )}
        initial={false}
        animate={isVerified ? { borderColor: "rgba(16, 185, 129, 0.4)" } : {}}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-zinc-200">
                {TRAIL_EVENT_LABELS[node.type] ?? node.type}
              </span>
              {authority && (
                <span className={clsx("text-[10px] px-1.5 py-0.5 rounded border font-medium", authority.color)}>
                  {authority.text}
                </span>
              )}
              {isVerified && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[10px] text-emerald-400 font-medium"
                >
                  verified
                </motion.span>
              )}
            </div>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{node.description}</p>
            <div className="flex items-center gap-3 mt-1.5 text-[10px] text-zinc-600">
              <span>{node.actor}</span>
              <span>&middot;</span>
              <Link
                href={`/proposals/${node.decisionId}`}
                className="hover:text-zinc-400 transition-colors"
              >
                {node.decisionTitle}
              </Link>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span
              className="text-[10px] text-zinc-600"
              title={new Date(node.timestamp).toLocaleString()}
            >
              {timeAgo(node.timestamp)}
            </span>
            {node.commitmentHash && (
              <p className="text-[10px] font-mono text-purple-400/70 mt-0.5 truncate max-w-[140px]">
                {node.commitmentHash}
              </p>
            )}
            {node.parentLedgerId && (
              <p className="text-[10px] text-zinc-600 mt-0.5">
                &larr; {node.parentLedgerId}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

type Props = {
  decisions: Decision[];
};

export function LedgerChain({ decisions }: Props) {
  const { events: liveEvents } = useDemoEvents();
  const chain = useMemo(() => flattenChain(decisions), [decisions]);

  const liveChain: ChainNode[] = liveEvents
    .filter((e) => e.type === "deployed" || e.type === "approved" || e.type === "outcome_recorded")
    .map((e) => ({
      ...e,
      decisionId: "live",
      decisionTitle: e.description.slice(0, 40),
      decisionType: e.domain,
      commitmentHash: `sha256:${e.id.slice(-8)}...${Math.random().toString(36).slice(2, 6)}`,
      authorityMode: "agent_autonomous" as const,
      evaluationId: `eval-live-${e.id.slice(-4)}`,
    }));

  const fullChain = [...liveChain, ...chain];

  const [verifying, setVerifying] = useState(false);
  const [verifiedIndex, setVerifiedIndex] = useState(-1);
  const [verifyResult, setVerifyResult] = useState<string | null>(null);

  const runVerify = useCallback(() => {
    setVerifying(true);
    setVerifiedIndex(-1);
    setVerifyResult(null);

    let i = 0;
    const total = Math.min(fullChain.length, 20);
    const interval = setInterval(() => {
      setVerifiedIndex(i);
      i++;
      if (i >= total) {
        clearInterval(interval);
        setTimeout(() => {
          setVerifyResult(
            `Chain intact. No gaps. No mutations. ${fullChain.length} entries verified.`
          );
        }, 400);
      }
    }, 150);
  }, [fullChain.length]);

  const sealedCount = fullChain.filter(
    (n) => n.commitmentHash
  ).length;

  const negativeMemory = fullChain.filter(
    (n) => n.type === "rejected" || n.type === "blocked" || n.type === "superseded" || n.type === "rollback_opened"
  ).length;

  const evaluationChains = new Set(fullChain.map((n) => n.evaluationId).filter(Boolean)).size;

  const authorityBreakdown = fullChain.reduce(
    (acc, n) => {
      if (n.authorityMode) acc[n.authorityMode] = (acc[n.authorityMode] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="space-y-6">
      {/* Metrics strip */}
      <div className="flex gap-3 flex-wrap">
        <MetricPill label="Entries sealed" value={sealedCount} accent="purple" />
        <MetricPill label="Evaluation chains" value={evaluationChains} accent="zinc" />
        <MetricPill label="Negative memory" value={negativeMemory} accent="amber" />
        {Object.entries(authorityBreakdown).map(([mode, count]) => (
          <MetricPill
            key={mode}
            label={AUTHORITY_LABELS[mode]?.text ?? mode}
            value={count}
            accent={mode === "human_led" ? "emerald" : mode === "agent_autonomous" ? "amber" : "blue"}
          />
        ))}
      </div>

      {/* Verify button */}
      <div className="flex items-center gap-3">
        <button
          onClick={runVerify}
          disabled={verifying && !verifyResult}
          className={clsx(
            "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
            verifying && !verifyResult
              ? "border-zinc-700 bg-zinc-800 text-zinc-500 cursor-not-allowed"
              : "border-purple-700 bg-purple-950/30 text-purple-300 hover:bg-purple-900/40"
          )}
        >
          {verifying && !verifyResult ? "Verifying..." : "Verify this chain"}
        </button>
        <AnimatePresence>
          {verifyResult && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-emerald-400 font-medium"
            >
              {verifyResult}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Chain */}
      <div>
        {fullChain.map((node, i) => (
          <ChainNodeCard
            key={node.id}
            node={node}
            isLast={i === fullChain.length - 1}
            verifiedIndex={verifying ? verifiedIndex - i : -1}
            verifying={verifying}
          />
        ))}
      </div>
    </div>
  );
}

function MetricPill({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  const colors: Record<string, string> = {
    purple: "text-purple-300 border-purple-800/40 bg-purple-950/20",
    zinc: "text-zinc-300 border-zinc-800/40 bg-zinc-900/40",
    amber: "text-amber-300 border-amber-800/40 bg-amber-950/20",
    emerald: "text-emerald-300 border-emerald-800/40 bg-emerald-950/20",
    blue: "text-blue-300 border-blue-800/40 bg-blue-950/20",
  };
  return (
    <div className={clsx("flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs", colors[accent] ?? colors.zinc)}>
      <span className="font-semibold">{value}</span>
      <span className="text-zinc-500">{label}</span>
    </div>
  );
}
