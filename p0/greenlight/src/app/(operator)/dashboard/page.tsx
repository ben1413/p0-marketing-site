import type { Metadata } from "next";
import { DEMO_SYSTEM_STATE, DEMO_DECISIONS } from "@/lib/seed";
import { SystemHealth } from "@/components/SystemHealth";
import { DecisionCard } from "@/components/DecisionCard";
import { LiveRiskAlert } from "@/components/LiveRiskAlert";
import { PageHeader } from "@/components/PageHeader";
import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export const metadata: Metadata = { title: "Dashboard — Greenlight" };

export default function DashboardPage() {
  const state = DEMO_SYSTEM_STATE;

  // Surface the most urgent decisions on the dashboard — blocked + recent pending
  const urgent = DEMO_DECISIONS.filter(
    (d) => d.status === "blocked" || d.status === "proposed" || d.status === "approved"
  ).slice(0, 3);

  // Find any deployed decisions with worse-than-expected outcomes
  const liveRisk = DEMO_DECISIONS.find((d) => d.outcome?.status === "worse_than_expected");

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        subtitle={`${state.gameName} · Demo`}
      >
        <Link href="/proposals/new" className="gl-btn-primary">
          <PlusIcon className="w-4 h-4" />
          New Proposal
        </Link>
      </PageHeader>

      {/* Live risk alert — must surface before anything else */}
      {liveRisk && liveRisk.outcome && (
        <LiveRiskAlert
          proposalId={liveRisk.id}
          proposalTitle={liveRisk.title}
          domain={liveRisk.type.charAt(0).toUpperCase() + liveRisk.type.slice(1)}
          deployed={liveRisk.outcome.deployedAt
            ? new Date(liveRisk.outcome.deployedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })
            : "recently"}
          finding={`Outcome measured after deployment. ${liveRisk.simulationSummary ?? "Performing outside predicted range."}`}
          delta={
            liveRisk.outcome.delta?.retention !== undefined
              ? `Retention ${(liveRisk.outcome.delta.retention * 100).toFixed(1)}% vs predicted +${((liveRisk.outcome.predicted?.retention ?? 0) * 100).toFixed(1)}%`
              : "Outcome worse than predicted"
          }
          recommendation="Consider opening a rollback proposal. All evidence — original decision, simulation, approval, and this outcome — is sealed and available for review."
        />
      )}

      {/* System Health — narrative first, always */}
      <SystemHealth state={state} />

      {/* Quick view — urgent decisions */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
            Needs your attention
          </h2>
          <Link href="/proposals" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
            View all proposals →
          </Link>
        </div>
        <div className="space-y-3">
          {urgent.map((d) => (
            <DecisionCard key={d.id} decision={d} />
          ))}
        </div>
      </section>
    </div>
  );
}
