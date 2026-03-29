"use client";

import { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import {
  LockClosedIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  ClockIcon,
  BoltIcon,
  DocumentCheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/20/solid";

/**
 * ProofStory — "The Moderation Incident"
 *
 * This is the answer to: "Show me one concrete, replayable scenario."
 *
 * The story: a moderation auto-mute threshold change passed simulation,
 * was approved and deployed — but within 47 minutes, player frustration
 * signals showed retention moving the wrong direction. Greenlight surfaced
 * the discrepancy before a single support ticket was filed or a human noticed.
 *
 * Format: a step-by-step timeline with exact timing, showing what the system
 * saw at each moment and — crucially — what would have happened without it.
 */

type Beat = {
  time: string;
  elapsed: string;
  label: string;
  detail: string;
  actor: string;
  type: "normal" | "warning" | "detection" | "sealed" | "action";
  withoutGreenlight?: string;
};

const STORY_BEATS: Beat[] = [
  {
    time:    "Mar 6 · 09:14",
    elapsed: "T+0",
    label:   "Proposal submitted",
    detail:  "Kai (Operator Agent) proposes lowering auto-mute confidence threshold from 0.85 → 0.75 to catch more borderline toxic language. Based on 3-week spike in player moderation reports.",
    actor:   "Kai (agent_autonomous → routed to human_in_the_loop)",
    type:    "normal",
    withoutGreenlight: "Proposal would exist as a Jira ticket or Slack message with no structured risk assessment.",
  },
  {
    time:    "Mar 6 · 09:41",
    elapsed: "T+27min",
    label:   "Simulation run",
    detail:  "Governance simulation evaluates the proposal. Risk score: 0.31. Composite: 0.61. Confidence: 0.69 (moderate — flagged). Decision hash locked: a4f2b8c1. Freshness clock starts.",
    actor:   "Simulation runner (external)",
    type:    "normal",
    withoutGreenlight: "No formal pre-deploy check. Team would rely on engineer judgment or a spreadsheet model.",
  },
  {
    time:    "Mar 6 · 10:02",
    elapsed: "T+48min",
    label:   "Approved — with note",
    detail:  "Priya Mehta (Live Ops Director) reviews simulation, notes confidence is moderate, approves with explicit note: \"Monitor false positive rate closely — this threshold change will affect borderline cases.\" Sealed to Ledger.",
    actor:   "Priya Mehta · human_led",
    type:    "sealed",
    withoutGreenlight: "Approval would be a Slack reaction or email. No structured capture of the condition attached to approval.",
  },
  {
    time:    "Mar 6 · 10:19",
    elapsed: "T+65min",
    label:   "Deployed",
    detail:  "Deploy authorized. DeploymentId: deploy-006-xyz. Simulation hash verified (a4f2b8c1 ✓), freshness within threshold. Pending outcome record created — predicted retention: +5%, revenue: neutral. Everything sealed.",
    actor:   "Dev Patel · human_led",
    type:    "sealed",
    withoutGreenlight: "Deploy happens. No pending measurement. No baseline recorded. Clock doesn't start.",
  },
  {
    time:    "Mar 6 · 11:06",
    elapsed: "T+1h 52min",
    label:   "Outcome measurement begins",
    detail:  "System begins comparing live signals to the predicted outcome recorded at deploy. Tracking: session length, mute rate, re-report rate, retention signals. Early indicators within variance.",
    actor:   "Measurement system (continuous)",
    type:    "normal",
    withoutGreenlight: "No measurement baseline exists. Team would have to manually pull analytics 1–2 days later, if anyone remembered to check.",
  },
  {
    time:    "Mar 6 · 11:41",
    elapsed: "T+2h 27min · 47min after outcome window opens",
    label:   "⚡ Greenlight detects drift",
    detail:  "Retention signal drops -3% against predicted +5%. False positive mute rate: 18% above baseline (predicted: ~5%). Outcome status flips to worse_than_expected. LiveRiskAlert fires on operator dashboard. No support ticket has been filed. No human has noticed.",
    actor:   "Greenlight outcome measurement",
    type:    "detection",
    withoutGreenlight: "Detection would happen when: (1) players file support tickets — typically 4–24h lag, (2) a live ops analyst manually pulls retention data — typically end of day or next morning, (3) someone notices in a community Discord. Average time-to-awareness: 6–18 hours.",
  },
  {
    time:    "Mar 6 · 11:43",
    elapsed: "T+2h 29min",
    label:   "Operator opens full trail",
    detail:  "Live ops director sees the alert, clicks into the proposal. Full trail visible: who proposed it, what simulation said, the approval note (\"monitor false positives\"), the deploy record, and now the outcome. The approval note — captured at the time — turns out to be exactly the right warning.",
    actor:   "Priya Mehta (reviewing)",
    type:    "normal",
    withoutGreenlight: "No trail. Team must reconstruct manually: find the original Jira, find who approved in Slack, find the old analytics baseline. Takes 2–4 hours if all artifacts still exist.",
  },
  {
    time:    "Mar 6 · 11:51",
    elapsed: "T+2h 37min",
    label:   "Rollback proposal opened",
    detail:  "Priya opens a rollback proposal — attributed, governed, with the outcome record attached as evidence. The rollback itself requires the same approval path as the original deploy. Authority is explicit: human_led. Rollback is not a silent revert.",
    actor:   "Priya Mehta · human_led",
    type:    "action",
    withoutGreenlight: "Rollback would be an engineer running a config change in production. No attribution. No audit trail. If something goes wrong in the rollback, there's no record of who made the call.",
  },
  {
    time:    "Mar 6 · 12:14",
    elapsed: "T+3h · 33min after detection",
    label:   "Rollback deployed — sealed to Ledger",
    detail:  "Rollback authorized and deployed. DeploymentId: rollback-006-abc. The entire incident — proposal, simulation, approval note, deploy, outcome drift, rollback decision, rollback deploy — is a single unbroken sealed chain. Any regulator, publisher, or auditor can replay it.",
    actor:   "Dev Patel · human_led",
    type:    "sealed",
    withoutGreenlight: "Rollback happens but with no chain. If a publisher or regulator later asks \"what happened and why?\" — the answer is: go search Slack, Jira, and hope the engineer remembers.",
  },
];

const BEAT_STYLES: Record<Beat["type"], { border: string; bg: string; dot: string }> = {
  normal:    { border: "border-zinc-800",        bg: "",                        dot: "bg-zinc-500" },
  warning:   { border: "border-amber-800/50",    bg: "bg-amber-950/10",         dot: "bg-amber-400" },
  detection: { border: "border-red-700/60",      bg: "bg-red-950/20",           dot: "bg-red-400" },
  sealed:    { border: "border-purple-800/40",   bg: "bg-purple-950/10",        dot: "bg-purple-400" },
  action:    { border: "border-gl-700/50",       bg: "bg-gl-950/20",            dot: "bg-gl-400" },
};

const BEAT_ICONS: Record<Beat["type"], React.ReactNode> = {
  normal:    <ClockIcon className="w-4 h-4 text-zinc-400" />,
  warning:   <ExclamationTriangleIcon className="w-4 h-4 text-amber-400" />,
  detection: <BoltIcon className="w-4 h-4 text-red-400" />,
  sealed:    <LockClosedIcon className="w-4 h-4 text-purple-400" />,
  action:    <ArrowPathIcon className="w-4 h-4 text-gl-400" />,
};

// ---------------------------------------------------------------------------
// Replay mode — step-through sub-component
// ---------------------------------------------------------------------------

const ARTIFACT_5_SAMPLE = {
  version: "5.0",
  bundleId: "artifact-5-006-xyz",
  decisionId: "dec-006",
  deploymentId: "deploy-006-xyz",
  gameId: "nexus-online-demo",
  sealedAt: "2026-03-06T10:19:00.000Z",
  authorityMode: "human_led",
  approvedBy: "priya.mehta@nexusonline.com",
  simulationHash: "a4f2b8c1",
  simulationPassed: true,
  predictedOutcome: { retention: 0.05, revenue: 0.0 },
  actualOutcome: { retention: -0.03, revenue: 0.0 },
  outcomeDrift: "worse_than_expected",
  outcomeDetectedAt: "2026-03-06T11:41:00.000Z",
  kmsKeyId: "projects/greenlight-prod/locations/us-east1/keyRings/ledger/cryptoKeyVersions/1",
  signature: "MEUCIQDx4vK2...Yp9wA==",
  publicKeyFingerprint: "SHA256:4a:f2:b8:c1:9e:3d:7a:11:...",
};

function ReplayMode({ beats }: { beats: Beat[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [showArtifact, setShowArtifact] = useState(false);

  const current = active !== null ? beats[active] : null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">
            Replay incident
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Step through each event. Click any beat to inspect it.
          </p>
        </div>
        <button
          onClick={() => setShowArtifact((s) => !s)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-950 border border-purple-700 rounded-lg text-xs text-purple-300 hover:bg-purple-900 transition-colors"
        >
          <LockClosedIcon className="w-3 h-3" />
          {showArtifact ? "Hide" : "Download"} signed artifact
        </button>
      </div>

      {/* Artifact panel */}
      {showArtifact && (
        <div className="p-4 bg-zinc-900 border border-purple-800/40 rounded-xl space-y-3">
          <div className="flex items-center gap-2">
            <LockClosedIcon className="w-4 h-4 text-purple-400" />
            <p className="text-xs font-semibold text-purple-300">Artifact 5 Bundle — KMS signed</p>
            <span className="ml-auto text-xs text-zinc-600">deploy-006-xyz</span>
          </div>
          <pre className="text-[10px] font-mono text-zinc-400 bg-zinc-950 border border-zinc-800 rounded-lg p-3 overflow-x-auto leading-relaxed whitespace-pre">
{JSON.stringify(ARTIFACT_5_SAMPLE, null, 2)}
          </pre>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Verify offline:{" "}
            <code className="font-mono bg-zinc-800 px-1 rounded">
              openssl dgst -sha256 -verify public_key.pem -signature sig.bin bundle.json
            </code>
          </p>
        </div>
      )}

      {/* Beat scrubber */}
      <div className="flex gap-1.5 flex-wrap">
        {beats.map((beat, i) => {
          const style = BEAT_STYLES[beat.type];
          const isActive = active === i;
          return (
            <button
              key={i}
              onClick={() => setActive(isActive ? null : i)}
              className={clsx(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all",
                isActive
                  ? `${style.border} text-zinc-100 bg-zinc-800`
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
              )}
            >
              <span className={clsx("w-2 h-2 rounded-full shrink-0", style.dot)} />
              {beat.elapsed.replace("T+", "")}
            </button>
          );
        })}
      </div>

      {/* Active beat detail */}
      {current && (
        <div className={clsx("border rounded-xl overflow-hidden", BEAT_STYLES[current.type].border, BEAT_STYLES[current.type].bg)}>
          <div className="px-4 py-3 flex items-start gap-3">
            {BEAT_ICONS[current.type]}
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-zinc-200">{current.label}</span>
                {current.type === "sealed" && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-950 text-purple-400 border border-purple-800/60">
                    <LockClosedIcon className="w-2.5 h-2.5" />
                    Immutable · Ledger sealed
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">{current.time} · <span className="font-mono">{current.elapsed}</span></p>
            </div>
          </div>
          <div className="px-4 pb-3 space-y-2">
            <p className={clsx("text-xs leading-relaxed", current.type === "detection" ? "text-red-300/90" : "text-zinc-400")}>
              {current.detail}
            </p>
            <p className="text-xs text-zinc-600">
              Actor: <span className="text-zinc-500">{current.actor}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function ProofStory() {
  const [showWithout, setShowWithout] = useState(false);
  const detectionBeat = STORY_BEATS.find((b) => b.type === "detection")!;

  return (
    <div className="max-w-3xl space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 uppercase tracking-widest">Proof scenario</span>
          <span className="text-zinc-700">·</span>
          <span className="text-xs text-zinc-500">Nexus Online · Demo</span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-100">The Moderation Incident</h1>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
          A governed decision that was correctly approved, deployed — and then correctly caught when it went wrong.
          This is the scenario that makes Greenlight inescapable: not a failure of governance, but a proof that
          the system keeps working after deploy.
        </p>
      </div>

      {/* The key stat */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Time from deploy to detection",  value: "47 min",   sub: "Greenlight" },
          { label: "Typical time without this layer", value: "6–18 hrs", sub: "Industry baseline" },
          { label: "Full sealed chain",               value: "9 events", sub: "Proposal → rollback" },
        ].map(({ label, value, sub }) => (
          <div key={label} className="gl-card text-center space-y-1">
            <p className="text-2xl font-bold text-zinc-100">{value}</p>
            <p className="text-xs text-zinc-400">{label}</p>
            <p className="text-xs text-zinc-600">{sub}</p>
          </div>
        ))}
      </div>

      {/* Toggle */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-zinc-500">Show what would have happened without Greenlight</span>
        <button
          onClick={() => setShowWithout((s) => !s)}
          className={clsx(
            "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
            showWithout ? "bg-gl-500" : "bg-zinc-700"
          )}
        >
          <span
            className={clsx(
              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow",
              showWithout ? "translate-x-4" : "translate-x-0.5"
            )}
          />
        </button>
        {showWithout && (
          <span className="text-xs text-amber-400 font-medium">comparison mode on</span>
        )}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-zinc-800" />
        <div className="space-y-4">
          {STORY_BEATS.map((beat, i) => {
            const style = BEAT_STYLES[beat.type];
            const icon = BEAT_ICONS[beat.type];
            const isDetection = beat.type === "detection";

            return (
              <div key={i} className="relative pl-10">
                {/* Timeline dot */}
                <div
                  className={clsx(
                    "absolute left-[11px] top-4 w-4 h-4 rounded-full border-2 border-zinc-950 flex items-center justify-center",
                    style.dot,
                    isDetection && "ring-4 ring-red-500/20"
                  )}
                />

                <div
                  className={clsx(
                    "border rounded-xl overflow-hidden",
                    style.border,
                    style.bg
                  )}
                >
                  {/* Beat header */}
                  <div className="flex items-start gap-3 px-4 py-3">
                    <span className="shrink-0 mt-0.5">{icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={clsx(
                          "text-sm font-semibold",
                          isDetection ? "text-red-200" : "text-zinc-200"
                        )}>
                          {beat.label}
                        </span>
                        {beat.type === "sealed" && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-950 text-purple-400 border border-purple-800/60">
                            <LockClosedIcon className="w-2.5 h-2.5" />
                            Immutable · Ledger sealed
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-zinc-500">{beat.time}</span>
                        <span className="text-xs text-zinc-700">·</span>
                        <span className={clsx(
                          "text-xs font-mono font-medium",
                          isDetection ? "text-red-400" : "text-zinc-600"
                        )}>
                          {beat.elapsed}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-zinc-600 shrink-0 text-right hidden sm:block max-w-[180px]">
                      {beat.actor}
                    </span>
                  </div>

                  {/* Detail */}
                  <div className={clsx(
                    "px-4 pb-3 text-xs leading-relaxed",
                    isDetection ? "text-red-300/90" : "text-zinc-400"
                  )}>
                    {beat.detail}
                  </div>

                  {/* Without Greenlight comparison */}
                  {showWithout && beat.withoutGreenlight && (
                    <div className="px-4 pb-3 pt-2 border-t border-zinc-800/60">
                      <p className="text-xs text-zinc-600 mb-1 uppercase tracking-wide font-medium">
                        Without Greenlight:
                      </p>
                      <p className="text-xs text-amber-400/80 leading-relaxed italic">
                        {beat.withoutGreenlight}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* REPLAY MODE — step-through */}
      <ReplayMode beats={STORY_BEATS} />

      {/* OPERATIONAL IMPACT — the quantified story */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">
          Operational impact
        </h2>

        {/* Stat grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { metric: "Detection time",       before: "6–18 hrs",    after: "47 min",   pct: "~95% faster" },
            { metric: "Exposure window",      before: "Full session", after: "< 1 hour", pct: "~90% reduced" },
            { metric: "Mean time to rollback",before: "4–8 hrs",     after: "33 min",   pct: "~87% faster" },
            { metric: "Incident audit time",  before: "2–4 hrs",     after: "< 5 min",  pct: "Replay on demand" },
          ].map(({ metric, before, after, pct }) => (
            <div key={metric} className="gl-card space-y-2">
              <p className="text-xs text-zinc-500">{metric}</p>
              <div className="space-y-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-bold text-emerald-300">{after}</span>
                  <span className="text-xs text-emerald-500 font-medium">{pct}</span>
                </div>
                <p className="text-xs text-zinc-600 line-through">{before}</p>
              </div>
            </div>
          ))}
        </div>

        {/* The non-linear exposure insight */}
        <div className="p-4 bg-zinc-900 border border-zinc-700 rounded-xl">
          <p className="text-xs text-zinc-300 leading-relaxed">
            <span className="font-semibold text-zinc-100">In live ops, exposure scales non-linearly.</span>{" "}
            Catching an issue 5–10× earlier is often the difference between a minor correction and a
            player-facing incident. The moderation change affected active sessions — every 30 minutes of
            delayed detection meant more players hit false-positive mutes and more support tickets queued.
            By the time a human analyst would have flagged it (end-of-day analytics review), the frustration
            had already compounded across thousands of sessions.
          </p>
        </div>
      </div>

      {/* ECONOMIC FRAMING — what happens without this */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">
          What happens without this layer
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              title: "Longer exposure windows",
              detail: "A live change that underperforms sits live until a human notices — hours to days. Players experience the impact. Support queue grows. Reversing it becomes harder as player state diverges.",
              icon: "⏱",
            },
            {
              title: "Unattributed decisions",
              detail: "Without authority attribution on every write, rollbacks surface the question: \"who approved this?\" Reconstructing from Slack and Jira takes hours. Sometimes the approval trail simply doesn't exist.",
              icon: "❓",
            },
            {
              title: "Slower incident response",
              detail: "Without a baseline captured at deploy time, there is no automated comparison. Detection depends on someone checking analytics. Mean time to detection is bounded by human review cycles, not system measurement.",
              icon: "🔥",
            },
            {
              title: "No defensible audit trail",
              detail: "When a publisher, regulator, or platform partner asks \"what happened and why?\" — the answer is manual reconstruction. Best case: 2–4 hours. Worst case: the approval record no longer exists.",
              icon: "📋",
            },
          ].map(({ title, detail, icon }) => (
            <div key={title} className="flex items-start gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-xl">
              <span className="text-lg shrink-0">{icon}</span>
              <div>
                <p className="text-xs font-semibold text-zinc-300">{title}</p>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-zinc-900 border-l-2 border-red-600 pl-4 rounded-r-xl">
          <p className="text-xs text-zinc-400 leading-relaxed italic">
            More player impact, higher rollback cost, and increased operational risk —
            with no clear record of why it happened or who made the call.
          </p>
        </div>
      </div>
      <div className="gl-card border-zinc-700 space-y-4">
        <div className="flex items-center gap-2">
          <DocumentCheckIcon className="w-4 h-4 text-zinc-400" />
          <p className="text-sm font-semibold text-zinc-200">What this proves</p>
        </div>
        <div className="space-y-3 text-xs text-zinc-400 leading-relaxed">
          <p>
            <span className="text-zinc-200 font-medium">This was not a failure of governance.</span>{" "}
            The decision was correctly proposed, correctly simulated, and correctly approved — with an
            explicit human note flagging the exact risk that materialized. Governance worked.
          </p>
          <p>
            <span className="text-zinc-200 font-medium">The value is in what happened after deploy.</span>{" "}
            Most systems stop at "approved and deployed." Greenlight kept the measurement baseline alive,
            compared it continuously, and surfaced the discrepancy in 47 minutes — before any human noticed,
            before any support ticket, before end-of-day analytics.
          </p>
          <p>
            <span className="text-zinc-200 font-medium">The entire chain is one sealed record.</span>{" "}
            A publisher, regulator, or auditor can replay the full incident — proposal intent, simulation
            rationale, approval condition, deploy authorization, outcome drift, rollback decision — in a single
            view, from a tamper-evident source. No reconstruction required.
          </p>
        </div>

        {/* The honest statement */}
        <div className="p-3 bg-zinc-800/40 border border-zinc-700 rounded-xl">
          <p className="text-xs text-zinc-300 font-medium mb-1">What Greenlight doesn&apos;t claim</p>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Greenlight did not prevent this deployment — governance approved it, correctly.
            It did not predict the false positive rate — that requires game-world modeling Greenlight
            doesn&apos;t do. What it did: set the baseline at deploy time, measured continuously,
            and surfaced the gap with a full sealed chain. That&apos;s the boundary. It&apos;s a real one.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <Link
            href="/proposals/dec-006"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-zinc-300 hover:border-zinc-500 transition-colors"
          >
            View full proposal trail
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/activity"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-zinc-300 hover:border-zinc-500 transition-colors"
          >
            Export governance audit
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
