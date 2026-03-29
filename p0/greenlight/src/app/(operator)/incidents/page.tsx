import type { Metadata } from "next";
import Link from "next/link";
import { clsx } from "clsx";
import { DEMO_DECISIONS, DEMO_SYSTEM_STATE } from "@/lib/seed";
import { PageHeader } from "@/components/PageHeader";
import { timeAgo, DECISION_TYPE_LABELS, DECISION_STATUS_LABELS } from "@/lib/plainLanguage";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/20/solid";

export const metadata: Metadata = { title: "Incident Response — Greenlight" };

export default function IncidentsPage() {
  const recentDeploys = DEMO_DECISIONS
    .filter((d) => d.status === "deployed")
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const activeRisks = DEMO_SYSTEM_STATE.activeRisks;

  const driftDecisions = DEMO_DECISIONS.filter(
    (d) => d.outcome?.status === "worse_than_expected"
  );

  const blockedDecisions = DEMO_DECISIONS.filter((d) => d.status === "blocked");

  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title="Incident Response"
        subtitle="What changed recently, what's drifting, what's blocked"
      />

      {/* Active risks */}
      {activeRisks.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
            Active risks
          </h2>
          <div className="space-y-2">
            {activeRisks.map((risk) => (
              <div
                key={risk.id}
                className={clsx(
                  "flex items-start gap-3 p-4 border rounded-xl",
                  risk.severity === "critical" || risk.severity === "high"
                    ? "border-red-800/40 bg-red-950/10"
                    : "border-amber-800/40 bg-amber-950/10"
                )}
              >
                <ExclamationTriangleIcon
                  className={clsx(
                    "w-4 h-4 shrink-0 mt-0.5",
                    risk.severity === "critical" || risk.severity === "high"
                      ? "text-red-400"
                      : "text-amber-400"
                  )}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-zinc-200">{risk.domain}</span>
                    <span className={clsx(
                      "px-1.5 py-0.5 rounded text-[10px] font-medium uppercase",
                      risk.severity === "critical" ? "bg-red-950 text-red-300 border border-red-800" :
                      risk.severity === "high" ? "bg-orange-950 text-orange-300 border border-orange-800" :
                      "bg-amber-950 text-amber-300 border border-amber-700"
                    )}>
                      {risk.severity}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{risk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Outcome drift */}
      {driftDecisions.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
            Outcome drift detected
          </h2>
          <div className="space-y-2">
            {driftDecisions.map((d) => (
              <Link
                key={d.id}
                href={`/proposals/${d.id}`}
                className="flex items-center gap-3 p-4 bg-orange-950/10 border border-orange-800/40 rounded-xl hover:border-orange-600/60 transition-colors group"
              >
                <ShieldExclamationIcon className="w-5 h-5 text-orange-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-200">{d.title}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {DECISION_TYPE_LABELS[d.type] ?? d.type} · Deployed {d.outcome?.deployedAt ? timeAgo(d.outcome.deployedAt) : "recently"}
                    {d.outcome?.delta?.retention !== undefined && (
                      <> · Retention {(d.outcome.delta.retention * 100).toFixed(1)}% vs predicted</>
                    )}
                  </p>
                </div>
                <ArrowRightIcon className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Blocked */}
      {blockedDecisions.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
            Blocked changes
          </h2>
          <div className="space-y-2">
            {blockedDecisions.map((d) => (
              <Link
                key={d.id}
                href={`/proposals/${d.id}`}
                className="flex items-center gap-3 p-4 bg-amber-950/10 border border-amber-800/40 rounded-xl hover:border-amber-600/60 transition-colors group"
              >
                <ExclamationTriangleIcon className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-200">{d.title}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Blocked {timeAgo(d.updatedAt)} · {DECISION_TYPE_LABELS[d.type] ?? d.type}
                  </p>
                </div>
                <ArrowRightIcon className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recent deploys */}
      <section>
        <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
          Recent deploys
        </h2>
        {recentDeploys.length === 0 ? (
          <p className="text-sm text-zinc-500 py-4">No recent deploys.</p>
        ) : (
          <div className="space-y-2">
            {recentDeploys.map((d) => {
              const hasIssue = d.outcome?.status === "worse_than_expected";
              return (
                <Link
                  key={d.id}
                  href={`/proposals/${d.id}`}
                  className={clsx(
                    "flex items-center gap-3 p-4 border rounded-xl hover:border-zinc-600 transition-colors group",
                    hasIssue ? "border-orange-800/30 bg-orange-950/5" : "border-zinc-800 bg-zinc-900/30"
                  )}
                >
                  {hasIssue
                    ? <ExclamationTriangleIcon className="w-4 h-4 text-orange-400 shrink-0" />
                    : <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  }
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-200">{d.title}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {DECISION_TYPE_LABELS[d.type] ?? d.type} ·
                      {" "}{DECISION_STATUS_LABELS[d.status] ?? d.status} ·
                      {" "}{timeAgo(d.updatedAt)}
                    </p>
                  </div>
                  <ArrowRightIcon className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 shrink-0" />
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
