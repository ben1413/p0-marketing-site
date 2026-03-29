"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import type { Decision } from "@/lib/types";
import { useDemoEvents } from "@/lib/demoEmitter";
import { VelocitySparkline } from "@/components/VelocitySparkline";

type Props = {
  decisions: Decision[];
};

function computeMetrics(decisions: Decision[], liveEventCount: number) {
  const total = decisions.length;
  const deployed = decisions.filter((d) => d.status === "deployed");
  const blocked = decisions.filter((d) => d.status === "blocked");
  const simulated = decisions.filter(
    (d) => d.simulationStatus === "passed" || d.simulationStatus === "stale"
  );

  const passRate =
    simulated.length > 0
      ? decisions.filter((d) => d.simulationStatus === "passed").length /
        simulated.length
      : 0;

  const blockedRate = total > 0 ? blocked.length / total : 0;

  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  const recentProposals = decisions.filter(
    (d) => now - new Date(d.createdAt).getTime() < sevenDays
  );
  const velocity = recentProposals.length + liveEventCount;

  let avgApprovalLag = 0;
  const approved = decisions.filter(
    (d) => d.status === "approved" || d.status === "deployed"
  );
  if (approved.length > 0) {
    const lags = approved
      .map((d) => {
        const proposedEvent = d.trail.find((e) => e.type === "proposed");
        const approvedEvent = d.trail.find((e) => e.type === "approved");
        if (proposedEvent && approvedEvent) {
          return (
            new Date(approvedEvent.timestamp).getTime() -
            new Date(proposedEvent.timestamp).getTime()
          );
        }
        return 0;
      })
      .filter((l) => l > 0);
    if (lags.length > 0) {
      avgApprovalLag = lags.reduce((a, b) => a + b, 0) / lags.length;
    }
  }

  const lagHours = Math.round(avgApprovalLag / (1000 * 60 * 60));

  return {
    velocity,
    passRate: Math.round(passRate * 100),
    blockedRate: Math.round(blockedRate * 100),
    avgLagHours: lagHours,
    deployedCount: deployed.length,
    totalCount: total + liveEventCount,
  };
}

type MetricCellProps = {
  label: string;
  value: string;
  sub?: string;
  accent?: "emerald" | "amber" | "red" | "zinc";
};

function MetricCell({ label, value, sub, accent = "zinc" }: MetricCellProps) {
  const [flash, setFlash] = useState(false);
  const [prev, setPrev] = useState(value);

  useEffect(() => {
    if (value !== prev) {
      setPrev(value);
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 600);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  const valColor = {
    emerald: "text-emerald-300",
    amber: "text-amber-300",
    red: "text-red-300",
    zinc: "text-zinc-200",
  }[accent];

  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-0.5 p-3 bg-zinc-900 border border-zinc-800 rounded-lg min-w-[90px] transition-all duration-300",
        flash && "border-gl-600/50 bg-gl-950/20"
      )}
    >
      <span className="text-xs text-zinc-500">{label}</span>
      <span
        className={clsx(
          "text-lg font-semibold transition-colors duration-300",
          flash ? "text-gl-400" : valColor
        )}
      >
        {value}
      </span>
      {sub && <span className="text-xs text-zinc-600">{sub}</span>}
    </div>
  );
}

export function GovernanceMetricsCard({ decisions }: Props) {
  const { events: liveEvents } = useDemoEvents();
  const liveProposed = liveEvents.filter((e) => e.type === "proposed").length;
  const m = computeMetrics(decisions, liveProposed);

  return (
    <div className="gl-card space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
          Governance health
        </h3>
        <span className="text-xs text-zinc-600">Last 7 days</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        <div className="flex flex-col items-center gap-0.5 p-3 bg-zinc-900 border border-zinc-800 rounded-lg min-w-[90px]">
          <span className="text-xs text-zinc-500">Velocity</span>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-semibold text-zinc-200">{m.velocity}</span>
            <VelocitySparkline baseCount={m.velocity} />
          </div>
          <span className="text-xs text-zinc-600">proposals / 7d</span>
        </div>
        <MetricCell
          label="Sim pass rate"
          value={`${m.passRate}%`}
          accent={
            m.passRate >= 70 ? "emerald" : m.passRate >= 50 ? "amber" : "red"
          }
        />
        <MetricCell
          label="Blocked rate"
          value={`${m.blockedRate}%`}
          accent={
            m.blockedRate <= 15
              ? "emerald"
              : m.blockedRate <= 30
                ? "amber"
                : "red"
          }
        />
        <MetricCell
          label="Approval lag"
          value={m.avgLagHours > 0 ? `${m.avgLagHours}h` : "< 1h"}
          accent={
            m.avgLagHours <= 4
              ? "emerald"
              : m.avgLagHours <= 12
                ? "amber"
                : "red"
          }
        />
        <MetricCell
          label="Deployed"
          value={`${m.deployedCount}`}
          sub={`of ${m.totalCount}`}
          accent="zinc"
        />
      </div>
    </div>
  );
}
