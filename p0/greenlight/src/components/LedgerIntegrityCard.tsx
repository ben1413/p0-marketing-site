"use client";

import { useState } from "react";
import { clsx } from "clsx";
import {
  LockClosedIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentCheckIcon,
  ShieldCheckIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/20/solid";

/**
 * LedgerIntegrityCard
 *
 * Answers the CTO's direct question:
 * "Is this just your database with a rule, or something stronger?"
 *
 * The honest answer: it's a combination of:
 *   1. Append-only enforcement (server-side, no update/delete path)
 *   2. Authority attribution on every write (who/what + mode)
 *   3. KMS-signed Artifact 5 bundles (cryptographic, offline-verifiable)
 *   4. Export API (you can take your records and verify independently)
 *
 * We do not claim blockchain. We claim a clear, documented, auditable model.
 */
export function LedgerIntegrityCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="gl-card space-y-0 p-0 overflow-hidden">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800/40 transition-colors text-left"
      >
        <LockClosedIcon className="w-4 h-4 text-purple-400 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-zinc-300">How the Ledger enforces immutability</p>
          <p className="text-xs text-zinc-500 mt-0.5">
            Append-only architecture · Authority-attributed writes · KMS-signed bundles · Export API
          </p>
        </div>
        {expanded
          ? <ChevronDownIcon className="w-4 h-4 text-zinc-500 shrink-0" />
          : <ChevronRightIcon className="w-4 h-4 text-zinc-500 shrink-0" />}
      </button>

      {expanded && (
        <div className="px-4 pb-5 pt-3 border-t border-zinc-800 space-y-5">

          {/* The model in plain English */}
          <p className="text-xs text-zinc-400 leading-relaxed">
            The Ledger is not a feature toggle on top of a normal database.
            Immutability is enforced at three independent layers, each of which
            has to fail simultaneously for a record to be altered.
          </p>

          {/* The three layers */}
          <div className="space-y-4">

            {/* Layer 1 */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-xs font-bold text-purple-300 shrink-0 mt-0.5">
                1
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-200">Append-only API enforcement</p>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  The Core API has no <code className="font-mono bg-zinc-800 px-1 rounded">PATCH</code>,
                  {" "}<code className="font-mono bg-zinc-800 px-1 rounded">PUT</code>, or
                  {" "}<code className="font-mono bg-zinc-800 px-1 rounded">DELETE</code> paths for Ledger items.
                  Server-side: every write is a new document with an auto-generated ID and a creation timestamp.
                  Existing records are never updated — a new record is created if context changes, with a
                  {" "}<code className="font-mono bg-zinc-800 px-1 rounded">supersededBy</code> pointer.
                  Negative history is preserved, not pruned.
                </p>
                <p className="text-xs text-zinc-600 mt-1 italic">
                  What this prevents: anyone with database access accidentally (or deliberately) editing a record
                  after the fact through normal API paths.
                </p>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-xs font-bold text-purple-300 shrink-0 mt-0.5">
                2
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-200">Authority attribution on every write</p>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  Every Ledger write requires a declared <code className="font-mono bg-zinc-800 px-1 rounded">authorityMode</code>:
                  {" "}<code className="font-mono bg-zinc-800 px-1 rounded">human_led</code>,
                  {" "}<code className="font-mono bg-zinc-800 px-1 rounded">human_in_the_loop</code>, or
                  {" "}<code className="font-mono bg-zinc-800 px-1 rounded">agent_autonomous</code>,
                  plus the identity of the actor (user ID or agent ID). Missing authority fails validation at the schema level —
                  you cannot write to the Ledger without declaring who made the decision and under what authority.
                </p>
                <p className="text-xs text-zinc-600 mt-1 italic">
                  What this prevents: anonymous writes, retroactive authority assignment, and the "we don&apos;t
                  know who approved this" situation that kills audit trails.
                </p>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-xs font-bold text-purple-300 shrink-0 mt-0.5">
                3
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-200">KMS-signed Artifact 5 bundles</p>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  At key decision points (approval, deploy, rollback), the system generates an
                  Artifact 5 bundle — a signed JSON payload containing the full decision chain,
                  simulation result, authority declarations, and outcome. Signed via{" "}
                  <span className="text-zinc-300">Google Cloud KMS asymmetric signing</span>.
                  The public key is exportable. Anyone with the artifact and the public key can
                  verify the bundle offline — without ever connecting to Core.
                </p>
                <p className="text-xs text-zinc-600 mt-1 italic">
                  What this enables: a publisher, regulator, or auditor can verify the record
                  was sealed at a specific time and has not been altered — without trusting
                  Greenlight&apos;s servers.
                </p>
              </div>
            </div>
          </div>

          {/* Chain of custody — when artifacts are created */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
              Chain of custody — when artifacts are generated
            </p>
            <div className="space-y-2">
              {[
                { trigger: "POST /gaming/execution/deploy", event: "deploy", note: "Deploy authorized — simulation hash verified, authority declared" },
                { trigger: "POST /gaming/outcomes (outcome evaluated)", event: "outcome_recorded", note: "Outcome drift detected — predicted vs. actual delta sealed" },
                { trigger: "Rollback proposal approved + deployed", event: "rollback_opened", note: "Rollback attributed — original deploy, reason, and authority all included" },
              ].map(({ trigger, event, note }) => (
                <div key={event} className="flex items-start gap-2.5 p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-medium text-zinc-300 font-mono">{event}</p>
                    <p className="text-[10px] text-zinc-600 font-mono mt-0.5">Trigger: {trigger}</p>
                    <p className="text-xs text-zinc-500 mt-1">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What prevents skipping */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
              What prevents skipping artifact generation
            </p>
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-500 space-y-1.5 leading-relaxed">
              <p>Artifact generation is tied to the Promote API — the same path that writes to the Ledger.
                There is no deploy path that bypasses it: the deploy route calls{" "}
                <code className="font-mono bg-zinc-800 px-1 rounded">promoteSealedEvaluation</code>,
                which creates the Ledger record and triggers artifact generation atomically.
              </p>
              <p>
                A skipped artifact is visible: the Ledger record exists but has no{" "}
                <code className="font-mono bg-zinc-800 px-1 rounded">artifactId</code> field.
                The audit export surfaces this as an incomplete decision record — it does not
                silently pass as complete.
              </p>
            </div>
          </div>

          {/* Key ownership */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
              KMS key ownership model
            </p>
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-xs font-mono text-zinc-500 w-32 shrink-0">Current model:</span>
                <p className="text-xs text-zinc-400">Greenlight-managed KMS key in Google Cloud. Public key fingerprint is exportable and included in every artifact bundle.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xs font-mono text-zinc-500 w-32 shrink-0">Roadmap:</span>
                <p className="text-xs text-zinc-400">Customer-controlled KMS key (BYOK) — your key ring, your signing authority. Verification is fully independent of Greenlight infrastructure.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xs font-mono text-zinc-500 w-32 shrink-0">Current verification:</span>
                <p className="text-xs font-mono text-zinc-400">
                  openssl dgst -sha256 -verify public_key.pem -signature sig.bin bundle.json
                </p>
              </div>
            </div>
          </div>

          {/* The honest statement */}
          <div className="p-3 bg-zinc-800/40 border border-zinc-700/50 rounded-xl">
            <p className="text-xs font-semibold text-zinc-400 mb-1.5">What we don&apos;t claim</p>
            <ul className="space-y-1 text-xs text-zinc-500">
              <li>✗ Not blockchain — no distributed consensus, no token economics</li>
              <li>✗ Not write-once hardware — a database admin with direct Firestore access could
                  theoretically modify raw documents. Artifact 5 signing is the defense against that.</li>
              <li>✗ Not a substitute for your retention policy — you control how long records persist</li>
            </ul>
          </div>

          {/* The verification story */}
          <div
            className={clsx(
              "flex items-start gap-2.5 p-3",
              "bg-purple-950/20 border border-purple-800/30 rounded-xl"
            )}
          >
            <ShieldCheckIcon className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-purple-300">Independent verification</p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                The audit export API returns Ledger items with their Artifact 5 signature and
                the public key fingerprint. Your legal or compliance team can run verification
                against the exported bundle independently. This is the answer to
                "can your team alter it" — the signed artifact exists outside Core.
              </p>
              <button className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors">
                <DocumentCheckIcon className="w-3.5 h-3.5" />
                View sample Artifact 5 bundle
                <ArrowTopRightOnSquareIcon className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
