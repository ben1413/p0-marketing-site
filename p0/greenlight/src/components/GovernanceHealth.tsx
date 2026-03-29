import { ShieldCheck, ShieldAlert, ShieldOff } from "lucide-react";
import { clsx } from "clsx";
import type { DashboardData } from "@/lib/core";

type HealthLevel = "healthy" | "warning" | "critical";

function getHealth(data: DashboardData | null): HealthLevel {
  if (!data) return "healthy";
  if ((data.stats.activeIncidents ?? 0) > 2) return "critical";
  if ((data.stats.activeIncidents ?? 0) > 0) return "warning";
  return "healthy";
}

const HEALTH_CONFIG: Record<
  HealthLevel,
  { icon: React.ReactNode; label: string; color: string; bg: string; bar: string }
> = {
  healthy: {
    icon: <ShieldCheck className="w-5 h-5 text-gl-400" />,
    label: "Governance Healthy",
    color: "text-gl-400",
    bg: "bg-gl-500/10",
    bar: "bg-gl-500",
  },
  warning: {
    icon: <ShieldAlert className="w-5 h-5 text-yellow-400" />,
    label: "Review Needed",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    bar: "bg-yellow-500",
  },
  critical: {
    icon: <ShieldOff className="w-5 h-5 text-red-400" />,
    label: "Critical Incidents Open",
    color: "text-red-400",
    bg: "bg-red-500/10",
    bar: "bg-red-500",
  },
};

export function GovernanceHealth({ data }: { data: DashboardData | null }) {
  const level = getHealth(data);
  const config = HEALTH_CONFIG[level];
  const simPassRate = data?.stats.simPassRate ?? 100;

  return (
    <div className="gl-card p-4 space-y-4">
      <div className="flex items-center gap-3">
        <div className={clsx("w-9 h-9 rounded-lg flex items-center justify-center", config.bg)}>
          {config.icon}
        </div>
        <div>
          <p className={clsx("text-sm font-semibold", config.color)}>
            {config.label}
          </p>
          <p className="text-xs text-zinc-600">Governance posture</p>
        </div>
      </div>

      {/* Sim pass rate bar */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-zinc-500">Simulation pass rate</span>
          <span className="text-xs font-medium text-zinc-300">{simPassRate}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
          <div
            className={clsx("h-full rounded-full transition-all", config.bar)}
            style={{ width: `${simPassRate}%` }}
          />
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <div className="rounded-lg bg-zinc-800/60 px-3 py-2">
          <p className="text-lg font-semibold text-white">
            {data?.stats.openProposals ?? 0}
          </p>
          <p className="text-xs text-zinc-500">Pending review</p>
        </div>
        <div className="rounded-lg bg-zinc-800/60 px-3 py-2">
          <p className="text-lg font-semibold text-white">
            {data?.stats.activeIncidents ?? 0}
          </p>
          <p className="text-xs text-zinc-500">Incidents</p>
        </div>
      </div>
    </div>
  );
}
