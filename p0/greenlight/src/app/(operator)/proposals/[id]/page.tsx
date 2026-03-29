import { notFound } from "next/navigation";
import Link from "next/link";
import { DEMO_DECISIONS } from "@/lib/seed";
import { TrailEventList } from "@/components/TrailEventList";
import { SimulationChip } from "@/components/SimulationChip";
import { DeployGateBar } from "@/components/DeployGateBar";
import { OutcomeCard } from "@/components/OutcomeCard";
import { ApprovalChain } from "@/components/ApprovalChain";
import { SimulationMethodologyCard } from "@/components/SimulationMethodologyCard";
import { ProposalActionBar } from "@/components/ProposalActionBar";
import { PageHeader } from "@/components/PageHeader";
import {
  describeAuthorityMode,
  describeGovernanceTier,
  describeRiskLevel,
  DECISION_TYPE_LABELS,
  DECISION_STATUS_LABELS,
  timeAgo,
} from "@/lib/plainLanguage";
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { clsx } from "clsx";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProposalDetailPage({ params }: Props) {
  const { id } = await params;
  const decision = DEMO_DECISIONS.find((d) => d.id === id);
  if (!decision) notFound();

  const canSimulate = decision.status === "proposed" || decision.simulationStatus === "stale" || decision.simulationStatus === "mismatch";
  const canApprove  = decision.status === "proposed" && decision.simulationStatus === "passed";
  const canDeploy   = decision.status === "approved" && decision.simulationStatus === "passed";

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Back */}
      <Link
        href="/proposals"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        <ArrowLeftIcon className="w-3.5 h-3.5" />
        All proposals
      </Link>

      <PageHeader
        title={decision.title}
        subtitle={`${DECISION_TYPE_LABELS[decision.type] ?? decision.type} · ${DECISION_STATUS_LABELS[decision.status] ?? decision.status}`}
      />

      {/* Status row */}
      <div className="flex flex-wrap items-center gap-3">
        <SimulationChip status={decision.simulationStatus} age={decision.simulationAge} size="md" />

        <span className="text-xs text-zinc-500">
          {describeAuthorityMode(decision.authorityMode)}
        </span>
        <span className="text-xs text-zinc-500">·</span>
        <span className="text-xs text-zinc-500">
          {describeGovernanceTier(decision.governanceTier)}
        </span>

        {decision.ledgerItemId && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-950 text-purple-300 border border-purple-800">
            <ArrowTopRightOnSquareIcon className="w-3 h-3" />
            Ledger: {decision.ledgerItemId}
          </span>
        )}
      </div>

      {/* Intent */}
      <div className="gl-card">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Intent</p>
        <p className="text-sm text-zinc-200">{decision.intent}</p>
        {decision.description && (
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{decision.description}</p>
        )}
      </div>

      {/* Deploy gate bar — if blocked */}
      {decision.status === "blocked" && decision.blockReason && (
        <DeployGateBar
          errorString={decision.blockReason}
          details={{
            simulationSummary: decision.simulationSummary,
            simulationAge: decision.simulationAge,
          }}
        />
      )}

      {/* Simulation detail */}
      {decision.simulationScore && (
        <div className="gl-card space-y-3">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Simulation results</p>
          {decision.simulationSummary && (
            <p className="text-xs text-zinc-300">{decision.simulationSummary}</p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {(
              [
                { key: "composite",  label: "Composite" },
                { key: "revenue",    label: "Revenue" },
                { key: "retention",  label: "Retention" },
                { key: "risk",       label: "Risk" },
                { key: "confidence", label: "Confidence" },
              ] as const
            ).map(({ key, label }) => {
              const val = decision.simulationScore?.[key];
              if (val === undefined) return null;
              const isRisk = key === "risk";
              const good = isRisk ? val <= 0.5 : val >= 0.6;
              return (
                <div
                  key={key}
                  className="flex flex-col items-center p-2 bg-zinc-900 border border-zinc-800 rounded-lg"
                >
                  <span className="text-xs text-zinc-500">{label}</span>
                  <span
                    className={clsx(
                      "text-lg font-semibold mt-0.5",
                      good ? "text-emerald-300" : "text-red-300"
                    )}
                  >
                    {(val * 100).toFixed(0)}%
                  </span>
                  {isRisk && (
                    <span className="text-xs text-zinc-500 mt-0.5">
                      {describeRiskLevel(val).split(" (")[0]}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Approval chain */}
      {decision.expectedApprovers && decision.expectedApprovers.length > 0 && (
        <div className="gl-card space-y-3">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
            Approval chain
          </p>
          <ApprovalChain approvers={decision.expectedApprovers} />
        </div>
      )}

      {/* Outcome */}
      {decision.outcome && <OutcomeCard outcome={decision.outcome} />}

      {/* Simulation methodology — answer "why should I trust this?" */}
      {decision.simulationScore && <SimulationMethodologyCard />}

      {/* Action bar */}
      <ProposalActionBar
        canSimulate={canSimulate}
        canApprove={canApprove}
        canDeploy={canDeploy}
        isDeployed={decision.status === "deployed"}
        showNoActions={
          decision.status !== "proposed" &&
          decision.status !== "approved" &&
          decision.status !== "deployed"
        }
      />

      {/* Proposed actions */}
      {decision.proposedActions && Object.keys(decision.proposedActions).length > 0 && (
        <div className="gl-card">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-2">
            Proposed actions
          </p>
          <pre className="text-xs text-zinc-300 bg-zinc-900 rounded-lg p-3 overflow-auto border border-zinc-800 leading-relaxed">
            {JSON.stringify(decision.proposedActions, null, 2)}
          </pre>
        </div>
      )}

      {/* Accountability trail */}
      <div className="gl-card">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-4">
          Accountability trail
        </p>
        <TrailEventList events={decision.trail} />
      </div>

      {/* Meta */}
      <div className="text-xs text-zinc-600 pb-8">
        Created {timeAgo(decision.createdAt)} ·
        Updated {timeAgo(decision.updatedAt)}
        {decision.deploymentId && ` · Deploy ID: ${decision.deploymentId}`}
      </div>
    </div>
  );
}
