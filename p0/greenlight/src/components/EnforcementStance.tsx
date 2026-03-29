"use client";

import { clsx } from "clsx";
import {
  EyeIcon,
  BoltIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";

/**
 * EnforcementStance
 *
 * Answers the CTO's fork question: "Are you advisory or a control plane?"
 *
 * The honest answer: both — with a clear boundary between them.
 * Hard gates are on simulation and governance tiers.
 * Everything else is advisory with a sealed record.
 *
 * This clarity prevents the stall: "what exactly does this enforce?"
 */

type StanceItem = {
  action: string;
  enforced: boolean;
  detail: string;
};

const STANCES: StanceItem[] = [
  { action: "Deploy without simulation (hard gate ON)",    enforced: true,  detail: "When GAMING_SIMULATION_GATE_ENFORCED=1 — deploy is blocked at the API level. Not advisory." },
  { action: "Deploy with stale simulation (> type threshold)", enforced: true, detail: "Simulation older than its type-based threshold (e.g. matchmaking 30m) — blocked at deploy, not just warned." },
  { action: "Deploy with mismatched simulation hash",      enforced: true,  detail: "If the proposal changed after simulation, the hash won't match — deploy blocked until re-simulated." },
  { action: "Propose with risk score > 0.80",              enforced: true,  detail: "Guardrail on propose — returns 400 before the record is created. No exceptions." },
  { action: "Agent-autonomous propose on critical tier",   enforced: true,  detail: "agent_autonomous + critical tier = rejected at propose. Requires human_led or human_in_the_loop." },
  { action: "Write to Ledger without authority declaration", enforced: true, detail: "Schema-level validation — missing authorityMode fails the request. Cannot be bypassed via API." },
  { action: "Approve a proposal",                          enforced: false, detail: "Advisory — the system surfaces simulation state, risk score, and governance tier. Approval is a human action." },
  { action: "Rollback an underperforming deployment",      enforced: false, detail: "Advisory — Greenlight detects drift and alerts. Rollback is opened as a governed proposal. No silent auto-revert." },
  { action: "Outcome evaluation",                          enforced: false, detail: "Advisory — Greenlight measures and surfaces discrepancies. It does not automatically deploy compensating actions." },
  { action: "Agent trust score thresholds",                enforced: false, detail: "Advisory in v1 — trust scores are surfaced, not used to block agent actions. Enforcement is a Phase B decision." },
];

export function EnforcementStance() {
  const enforced = STANCES.filter((s) => s.enforced);
  const advisory = STANCES.filter((s) => !s.enforced);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold text-zinc-200">System enforcement model</h2>
        <p className="text-xs text-zinc-500 mt-1 leading-relaxed max-w-2xl">
          Greenlight enforces decision safety constraints, not business outcomes.
        </p>
        <p className="text-xs text-zinc-600 mt-2 leading-relaxed max-w-2xl">
          Here is the exact boundary: what the system will hard-block vs. what it surfaces and records
          but leaves to humans. This boundary is intentional and documented.
        </p>
      </div>

      {/* Hard gates */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <LockClosedIcon className="w-3.5 h-3.5 text-red-400" />
          <p className="text-xs font-semibold text-red-300 uppercase tracking-wide">
            Hard gates — system blocks these
          </p>
        </div>
        <div className="space-y-2">
          {enforced.map((s) => (
            <div
              key={s.action}
              className="flex items-start gap-3 p-3 bg-red-950/10 border border-red-800/30 rounded-xl"
            >
              <BoltIcon className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-zinc-200">{s.action}</p>
                <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advisory */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <EyeIcon className="w-3.5 h-3.5 text-zinc-400" />
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
            Advisory — system records and surfaces, human decides
          </p>
        </div>
        <div className="space-y-2">
          {advisory.map((s) => (
            <div
              key={s.action}
              className="flex items-start gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-xl"
            >
              <EyeIcon className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-zinc-300">{s.action}</p>
                <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The honest statement about the fork */}
      <div className={clsx(
        "flex items-start gap-3 p-4",
        "bg-zinc-900 border border-zinc-700 rounded-xl"
      )}>
        <ExclamationTriangleIcon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-2">
          <p className="text-xs font-semibold text-zinc-300">The enforcement roadmap</p>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Phase B will move agent trust score thresholds from advisory to enforced — blocking
            agent_autonomous proposals from agents below a configurable trust floor.
            Automatic rollback triggers (outcome drift beyond a threshold → open rollback proposal)
            are also Phase B. These are not in scope until governance data from real deployments
            calibrates the thresholds. Shipping enforcement without real data is how you create
            incidents you can&apos;t explain.
          </p>
        </div>
      </div>
    </section>
  );
}
