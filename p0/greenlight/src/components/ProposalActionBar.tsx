"use client";

import { SimulationRunner } from "@/components/SimulationRunner";

type Props = {
  canSimulate: boolean;
  canApprove: boolean;
  canDeploy: boolean;
  isDeployed: boolean;
  showNoActions: boolean;
};

export function ProposalActionBar({
  canSimulate,
  canApprove,
  canDeploy,
  isDeployed,
  showNoActions,
}: Props) {
  return (
    <div className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
      <p className="text-xs text-zinc-500 flex-1">Actions</p>
      {canSimulate && <SimulationRunner />}
      {canApprove && (
        <button className="gl-btn-secondary text-sm">Approve</button>
      )}
      {canDeploy && (
        <button className="gl-btn-primary text-sm">Deploy</button>
      )}
      {isDeployed && (
        <button className="px-3 py-1.5 bg-zinc-800 text-zinc-400 border border-zinc-700 rounded-lg text-xs hover:border-zinc-600 transition-colors">
          Open Rollback
        </button>
      )}
      {showNoActions && (
        <span className="text-xs text-zinc-600 italic">
          No actions available for this status.
        </span>
      )}
    </div>
  );
}
