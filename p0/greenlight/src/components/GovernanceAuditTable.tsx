"use client";

import { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import type { EvaluationRecord } from "@/lib/types";
import {
  DECISION_TYPE_LABELS,
  describeAuthorityMode,
  describeGovernanceTier,
} from "@/lib/plainLanguage";
import { PrinterIcon, FunnelIcon } from "@heroicons/react/20/solid";

const SIM_RESULT_STYLES: Record<string, string> = {
  passed:  "bg-emerald-950 text-emerald-300 border-emerald-800",
  failed:  "bg-red-950 text-red-300 border-red-800",
  skipped: "bg-amber-950 text-amber-300 border-amber-700",
  "n/a":   "bg-zinc-800 text-zinc-400 border-zinc-700",
};

const OUTCOME_STYLES: Record<string, string> = {
  evaluated:          "bg-emerald-950 text-emerald-300 border-emerald-800",
  worse_than_expected:"bg-orange-950 text-orange-300 border-orange-700",
  pending:            "bg-zinc-800 text-zinc-400 border-zinc-700",
};

type Props = {
  records: EvaluationRecord[];
};

export function GovernanceAuditTable({ records }: Props) {
  const [filter, setFilter] = useState<"all" | "deployed" | "failed" | "worse">("all");

  const filtered = records.filter((r) => {
    if (filter === "deployed")  return !!r.deploymentId;
    if (filter === "failed")    return r.simulationResult === "failed";
    if (filter === "worse")     return r.outcomeStatus === "worse_than_expected";
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap no-print">
        <div className="flex items-center gap-1.5">
          <FunnelIcon className="w-3.5 h-3.5 text-zinc-500" />
          <span className="text-xs text-zinc-500">Filter:</span>
        </div>
        {(["all", "deployed", "failed", "worse"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={clsx(
              "px-2.5 py-1 rounded-full text-xs font-medium transition-colors border",
              filter === f
                ? "bg-gl-950 border-gl-600 text-gl-300"
                : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500"
            )}
          >
            {f === "all" ? "All" : f === "deployed" ? "Deployed" : f === "failed" ? "Sim failed" : "Worse than expected"}
          </button>
        ))}
        <span className="text-xs text-zinc-600 ml-auto">
          {filtered.length} record{filtered.length !== 1 ? "s" : ""}
        </span>
        <button
          onClick={() => window.print()}
          className="no-print inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-zinc-300 hover:border-zinc-500 transition-colors"
        >
          <PrinterIcon className="w-3.5 h-3.5" />
          Export PDF
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/50">
              <th className="text-left px-4 py-3 text-zinc-400 font-medium">Proposal</th>
              <th className="text-left px-4 py-3 text-zinc-400 font-medium">Type</th>
              <th className="text-left px-4 py-3 text-zinc-400 font-medium">Authority</th>
              <th className="text-left px-4 py-3 text-zinc-400 font-medium">Tier</th>
              <th className="text-left px-4 py-3 text-zinc-400 font-medium">Simulation</th>
              <th className="text-left px-4 py-3 text-zinc-400 font-medium">Outcome</th>
              <th className="text-left px-4 py-3 text-zinc-400 font-medium">Date</th>
              <th className="text-left px-4 py-3 text-zinc-400 font-medium no-print">Ledger</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr
                key={r.id}
                className={clsx(
                  "border-b border-zinc-800/50 transition-colors",
                  i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900/30",
                  r.outcomeStatus === "worse_than_expected" && "border-orange-900/30",
                  r.simulationResult === "failed" && "border-red-900/30"
                )}
              >
                <td className="px-4 py-3">
                  <Link href={`/proposals/${r.proposalId}`} className="text-zinc-200 hover:text-white transition-colors line-clamp-1 no-print">
                    {r.proposalTitle}
                  </Link>
                  <span className="print-only text-zinc-200">{r.proposalTitle}</span>
                </td>
                <td className="px-4 py-3 text-zinc-400">
                  {DECISION_TYPE_LABELS[r.type] ?? r.type}
                </td>
                <td className="px-4 py-3 text-zinc-400">
                  {describeAuthorityMode(r.authorityMode)}
                </td>
                <td className="px-4 py-3 text-zinc-400">
                  {describeGovernanceTier(r.governanceTier)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={clsx(
                      "inline-flex items-center px-2 py-0.5 rounded-full border capitalize font-medium",
                      SIM_RESULT_STYLES[r.simulationResult]
                    )}
                  >
                    {r.simulationResult}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {r.outcomeStatus ? (
                    <span
                      className={clsx(
                        "inline-flex items-center px-2 py-0.5 rounded-full border font-medium",
                        OUTCOME_STYLES[r.outcomeStatus]
                      )}
                    >
                      {r.outcomeStatus === "worse_than_expected" ? "⚠ Worse" : r.outcomeStatus === "evaluated" ? "Evaluated" : "Pending"}
                    </span>
                  ) : (
                    <span className="text-zinc-600">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-zinc-500">
                  {new Date(r.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3 no-print">
                  {r.ledgerItemId ? (
                    <span className="text-purple-400 text-xs font-mono">{r.ledgerItemId}</span>
                  ) : (
                    <span className="text-zinc-600">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-zinc-500 text-sm">
            No records match this filter.
          </div>
        )}
      </div>
    </div>
  );
}
