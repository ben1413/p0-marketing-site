import {
  GitPullRequest,
  Rocket,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import type { DashboardData } from "@/lib/core";

const stats = (data: DashboardData | null) => [
  {
    label: "Open Proposals",
    value: data?.stats.openProposals ?? "—",
    icon: GitPullRequest,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    label: "Deploys This Week",
    value: data?.stats.deploysThisWeek ?? "—",
    icon: Rocket,
    color: "text-gl-400",
    bg: "bg-gl-500/10",
  },
  {
    label: "Simulation Pass Rate",
    value: data?.stats.simPassRate ? `${data.stats.simPassRate}%` : "—",
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Active Incidents",
    value: data?.stats.activeIncidents ?? "—",
    icon: AlertTriangle,
    color:
      (data?.stats.activeIncidents ?? 0) > 0
        ? "text-red-400"
        : "text-zinc-500",
    bg:
      (data?.stats.activeIncidents ?? 0) > 0
        ? "bg-red-500/10"
        : "bg-zinc-800",
  },
];

export function StatsBar({ data }: { data: DashboardData | null }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats(data).map((s) => (
        <div key={s.label} className="gl-card p-4 flex items-center gap-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.bg}`}>
            <s.icon className={`w-5 h-5 ${s.color}`} />
          </div>
          <div>
            <p className="text-2xl font-semibold text-white">{s.value}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
