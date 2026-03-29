"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Decision } from "@/lib/gaming/conclaveTypes";
import {
  attachOutcomesToDecisions,
  deployDecisionViaConclave,
  fetchConclaveDecisions,
  fetchGovernanceMetrics,
  runSimulationHarnessForProposal,
  stubEvaluationsFromDecisions,
  type GovernanceMetricsSnapshot,
} from "@/lib/gaming/fetchConclaveLive";
import {
  applyDemoHarnessDeploy,
  applyDemoHarnessSimulation,
} from "@/lib/gaming/generateSimulationResult";
import { getNexusOnlineDemo } from "@/lib/gaming/conclaveSeed";
import {
  decisionStatusLabel,
  describeAgentPressure,
  describeAuthorityMode,
  describeEvaluationChip,
  describeGovernanceHealth,
  describeGovernanceSummary,
  describeSimulationStatus,
  formatSimulationDeployFailure,
  narrateAgentStrip,
  narrateDecisionOutcome,
  narrateDomainStrip,
  narrateGovernanceMetrics,
  narrateSystemState,
  narrateTimelineSection,
} from "@/lib/gaming/plainLanguage";
import {
  conclaveSignInWithEmailPassword,
  conclaveSignOut,
  getConclaveFirebaseIdToken,
  subscribeConclaveAuth,
} from "@/lib/firebase/conclaveFirebaseClient";
import { isConclaveFirebaseWebConfigured } from "@/lib/firebase/conclaveWebConfig";
import { setConclaveFirebaseIdTokenProvider } from "@/lib/gaming/conclaveAuthBridge";

const DEMO_GUIDE_HIDDEN_KEY = "conclave-demo-guide-hidden";

const DEMO_STEPS: { anchorId: string; label: string; hint: string }[] = [
  {
    anchorId: "conclave-anchor-narrative",
    label: "Narrative",
    hint: "What the system says now",
  },
  {
    anchorId: "conclave-anchor-deploy",
    label: "Blocked deploy",
    hint: "Simulation gate in plain language",
  },
  {
    anchorId: "conclave-anchor-health",
    label: "System health",
    hint: "Domains + pending work",
  },
  {
    anchorId: "conclave-anchor-timeline",
    label: "Timeline",
    hint: "Accountability trail",
  },
  {
    anchorId: "conclave-governance-audit",
    label: "Audit + PDF",
    hint: "Export for reviewers",
  },
];

function scrollToDemoAnchor(anchorId: string) {
  document.getElementById(anchorId)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function needsSimulationHarnessCta(d: Decision): boolean {
  if (d.status === "deployed" && !d.lastDeployBlock) return false;
  const sub = d.lastDeployBlock?.subcode;
  if (sub === "SIMULATION_STALE" || sub === "SIMULATION_MISMATCH") return true;
  const s = d.simulationStatus;
  return (
    s === "stale" ||
    s === "failed" ||
    s === "none" ||
    s === "unavailable" ||
    s === "pending"
  );
}

function canDeployHarnessCta(d: Decision): boolean {
  if (d.status === "deployed") return false;
  if (d.simulationStatus !== "passed") return false;
  if (d.lastDeployBlock) return false;
  return d.status === "blocked" || d.status === "approved" || d.status === "pending";
}

function DeployBlockBanner({ decision }: { decision: Decision }) {
  const block = decision.lastDeployBlock;
  if (!block) return null;
  const msg = formatSimulationDeployFailure({
    code: block.code,
    errorText: block.rawMessage,
    details: block.details,
  });
  return (
    <div
      id="conclave-anchor-deploy"
      className="scroll-mt-24 rounded-2xl border border-amber-700/60 bg-amber-950/40 px-5 py-4"
      role="alert"
    >
      <div className="text-xs font-semibold uppercase tracking-wider text-amber-200/90">
        Deploy blocked
      </div>
      <h2 className="mt-1 text-lg font-semibold text-amber-50">{msg.headline}</h2>
      <p className="mt-2 text-sm text-amber-100/90">{msg.detail}</p>
      {msg.subcode ? (
        <p className="mt-2 font-mono text-xs text-amber-200/70">
          Code: {msg.subcode}
          {decision.id ? ` · decision ${decision.id}` : ""}
        </p>
      ) : null}
      <p className="mt-3 text-sm text-amber-100/80">
        Next step: on that proposal card, click <strong>Run simulation</strong> (harness), then{" "}
        <strong>Deploy</strong> when it appears — no terminal required.
      </p>
    </div>
  );
}

function TrailCard({
  decision,
  expanded,
  onToggle,
  simBusy,
  deployBusy,
  actionError,
  onRunSimulation,
  onDeploy,
  dataSourceLabel,
}: {
  decision: Decision;
  expanded: boolean;
  onToggle: () => void;
  simBusy: boolean;
  deployBusy: boolean;
  actionError?: string;
  onRunSimulation: () => void;
  onDeploy: () => void;
  dataSourceLabel: string;
}) {
  const blocked = decision.status === "blocked" || decision.lastDeployBlock;
  const showSim = needsSimulationHarnessCta(decision);
  const showDeploy = canDeployHarnessCta(decision);
  return (
    <article
      className={`rounded-2xl border p-5 transition-colors ${
        blocked
          ? "border-amber-800/80 bg-amber-950/20"
          : "border-neutral-800 bg-neutral-900/40"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full flex-col text-left"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-neutral-800 px-2 py-0.5 text-xs text-neutral-300">
            {decision.type}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              blocked
                ? "bg-amber-900/60 text-amber-100"
                : "bg-neutral-800 text-neutral-200"
            }`}
          >
            {decisionStatusLabel(decision.status)}
          </span>
          {decision.simulationStatus === "stale" || decision.lastDeployBlock ? (
            <span className="rounded-full bg-amber-900/40 px-2 py-0.5 text-xs text-amber-200">
              Simulation attention
            </span>
          ) : null}
          {decision.simulationStatus === "passed" && !decision.lastDeployBlock ? (
            <span className="rounded-full bg-emerald-900/40 px-2 py-0.5 text-xs text-emerald-200">
              Simulation OK
            </span>
          ) : null}
        </div>
        <h3 className="mt-2 text-base font-semibold text-neutral-50">{decision.title}</h3>
        <p className="mt-1 text-sm text-neutral-300">{decision.intent}</p>
        <p className="mt-2 text-xs text-neutral-500">
          {describeSimulationStatus(decision.simulationStatus)} ·{" "}
          {describeAuthorityMode(decision.authorityMode)}
        </p>
      </button>

      {(showSim || showDeploy) && (
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-neutral-800/80 pt-3 print:hidden">
          {showSim ? (
            <button
              type="button"
              disabled={simBusy || deployBusy}
              onClick={(e) => {
                e.stopPropagation();
                onRunSimulation();
              }}
              className="rounded-lg bg-violet-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-600 disabled:opacity-40"
            >
              {simBusy ? "Running…" : "Run simulation"}
            </button>
          ) : null}
          {showDeploy ? (
            <button
              type="button"
              disabled={simBusy || deployBusy}
              onClick={(e) => {
                e.stopPropagation();
                onDeploy();
              }}
              className="rounded-lg border border-emerald-700/60 bg-emerald-950/50 px-3 py-1.5 text-xs font-medium text-emerald-100 hover:bg-emerald-900/40 disabled:opacity-40"
            >
              {deployBusy ? "Deploying…" : "Deploy"}
            </button>
          ) : null}
          <span className="text-[10px] text-neutral-500">{dataSourceLabel}</span>
        </div>
      )}

      {actionError ? (
        <p className="mt-2 text-xs text-rose-300 print:hidden" role="alert">
          {actionError}
        </p>
      ) : null}

      {expanded ? (
        <div className="mt-4 border-t border-neutral-800 pt-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Accountability trail
          </div>
          <ol className="mt-3 space-y-3">
            {decision.trail.map((ev) => (
              <li key={ev.id} className="flex gap-3 text-sm">
                <div className="w-28 shrink-0 font-mono text-xs text-neutral-500">
                  {new Date(ev.timestamp).toLocaleString()}
                </div>
                <div>
                  <div className="font-medium text-neutral-200">{ev.type}</div>
                  <div className="text-neutral-400">{ev.actor}</div>
                  <div className="text-neutral-300">{ev.description}</div>
                </div>
              </li>
            ))}
          </ol>
          {decision.outcome ? (
            <p className="mt-4 rounded-lg bg-neutral-950/80 p-3 text-sm text-neutral-200">
              {narrateDecisionOutcome(decision.outcome)}
            </p>
          ) : null}
          {decision.governanceSummary ? (
            <p className="mt-2 text-sm text-neutral-400">
              {describeGovernanceSummary(decision.governanceSummary)}
            </p>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

export function ConclaveLiveOps() {
  const demo = useMemo(() => getNexusOnlineDemo(), []);
  const liveAuthConfigured = useMemo(() => isConclaveFirebaseWebConfigured(), []);
  const [source, setSource] = useState<"demo" | "live">("demo");
  const [gameIdFilter, setGameIdFilter] = useState("");
  const [liveDecisions, setLiveDecisions] = useState<Decision[]>([]);
  const [liveLoading, setLiveLoading] = useState(false);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [govMetrics, setGovMetrics] = useState<GovernanceMetricsSnapshot | null>(null);
  const [openId, setOpenId] = useState<string | null>(demo.decisions[0]?.id ?? null);
  const [demoGuideOpen, setDemoGuideOpen] = useState(true);
  const [demoDecisions, setDemoDecisions] = useState<Decision[]>(() =>
    structuredClone(demo.decisions)
  );
  const [simBusyIds, setSimBusyIds] = useState<Record<string, boolean>>({});
  const [deployBusyIds, setDeployBusyIds] = useState<Record<string, boolean>>({});
  const [actionErrorById, setActionErrorById] = useState<Record<string, string>>({});
  const [firebaseUserLabel, setFirebaseUserLabel] = useState<string | null>(null);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInBusy, setSignInBusy] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);

  const decisions = source === "demo" ? demoDecisions : liveDecisions;
  const evaluations = stubEvaluationsFromDecisions(decisions);

  useEffect(() => {
    setActionErrorById({});
    setSimBusyIds({});
    setDeployBusyIds({});
    if (source === "demo") {
      setDemoDecisions(structuredClone(demo.decisions));
    }
  }, [source, demo]);

  useEffect(() => {
    setConclaveFirebaseIdTokenProvider(getConclaveFirebaseIdToken);
  }, []);

  useEffect(() => {
    if (!liveAuthConfigured) return;
    return subscribeConclaveAuth((u) => {
      setFirebaseUserLabel(u?.email?.trim() || u?.uid || null);
    });
  }, [liveAuthConfigured]);

  const loadLive = useCallback(async () => {
    setLiveLoading(true);
    setLiveError(null);
    const gid = gameIdFilter.trim() || undefined;
    const [dRes, gRes] = await Promise.all([
      fetchConclaveDecisions(gid),
      fetchGovernanceMetrics({ gameId: gid }),
    ]);
    setLiveLoading(false);
    if (!dRes.ok) {
      setLiveError(dRes.message ?? "Failed to load decisions");
      setLiveDecisions([]);
    } else {
      const withOutcomes = await attachOutcomesToDecisions(dRes.decisions);
      setLiveDecisions(withOutcomes);
    }
    if (gRes.ok && gRes.metrics) setGovMetrics(gRes.metrics);
    else setGovMetrics(null);
  }, [gameIdFilter]);

  const handleRunSimulation = useCallback(
    async (d: Decision) => {
      setActionErrorById((m) => ({ ...m, [d.id]: "" }));
      setSimBusyIds((m) => ({ ...m, [d.id]: true }));
      try {
        if (source === "demo") {
          setDemoDecisions((prev) =>
            prev.map((x) => (x.id === d.id ? applyDemoHarnessSimulation(x) : x))
          );
        } else {
          const r = await runSimulationHarnessForProposal({
            proposalId: d.id,
            gameId: d.gameId,
            type: d.type,
            proposedActions: d.proposedActions,
          });
          if (!r.ok) {
            setActionErrorById((m) => ({ ...m, [d.id]: r.message ?? "Simulation failed." }));
            return;
          }
          await loadLive();
        }
      } finally {
        setSimBusyIds((m) => ({ ...m, [d.id]: false }));
      }
    },
    [source, loadLive]
  );

  const handleDeploy = useCallback(
    async (d: Decision) => {
      setActionErrorById((m) => ({ ...m, [d.id]: "" }));
      setDeployBusyIds((m) => ({ ...m, [d.id]: true }));
      try {
        if (source === "demo") {
          setDemoDecisions((prev) =>
            prev.map((x) => (x.id === d.id ? applyDemoHarnessDeploy(x) : x))
          );
        } else {
          const r = await deployDecisionViaConclave({
            gameId: d.gameId,
            decisionProposalId: d.id,
            summary: `Conclave: ${d.title}`,
          });
          if (!r.ok) {
            setActionErrorById((m) => ({ ...m, [d.id]: r.message ?? "Deploy failed." }));
            return;
          }
          await loadLive();
        }
      } finally {
        setDeployBusyIds((m) => ({ ...m, [d.id]: false }));
      }
    },
    [source, loadLive]
  );

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && localStorage.getItem(DEMO_GUIDE_HIDDEN_KEY) === "1") {
        setDemoGuideOpen(false);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (openId !== null && !decisions.some((d) => d.id === openId)) {
      setOpenId(decisions[0]?.id ?? null);
    }
  }, [decisions, openId]);

  const blockedDecision = useMemo(
    () => decisions.find((d) => d.lastDeployBlock) ?? null,
    [decisions]
  );

  const deployedWithTrail = useMemo(
    () => decisions.find((d) => d.status === "deployed" && d.trail.length > 1) ?? null,
    [decisions]
  );

  const hideDemoGuide = () => {
    try {
      localStorage.setItem(DEMO_GUIDE_HIDDEN_KEY, "1");
    } catch {
      /* ignore */
    }
    setDemoGuideOpen(false);
  };

  const showDemoGuide = () => {
    try {
      localStorage.removeItem(DEMO_GUIDE_HIDDEN_KEY);
    } catch {
      /* ignore */
    }
    setDemoGuideOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 print:bg-white print:text-neutral-900">
      {demoGuideOpen ? (
        <div className="sticky top-0 z-30 border-b border-violet-900/40 bg-neutral-950/95 px-4 py-3 shadow-lg shadow-black/20 backdrop-blur-md print:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-violet-300/90">
                Guided demo (synthetic)
              </div>
              <p className="text-xs text-neutral-400">
                Nexus Online — follow the steps in order (matches{" "}
                <span className="text-neutral-300">docs/CONCLAVE_DEMO_SCRIPT.md</span>).
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {DEMO_STEPS.map((s) => (
                <button
                  key={s.anchorId}
                  type="button"
                  title={s.hint}
                  onClick={() => scrollToDemoAnchor(s.anchorId)}
                  className="rounded-lg border border-violet-800/60 bg-violet-950/40 px-2.5 py-1 text-xs font-medium text-violet-100 hover:bg-violet-900/50"
                >
                  {s.label}
                </button>
              ))}
              <button
                type="button"
                onClick={hideDemoGuide}
                className="rounded-lg border border-neutral-700 px-2.5 py-1 text-xs text-neutral-400 hover:bg-neutral-900"
              >
                Hide guide
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="sticky top-0 z-30 border-b border-neutral-800 bg-neutral-950/90 px-4 py-2 print:hidden">
          <div className="mx-auto flex max-w-6xl justify-end">
            <button
              type="button"
              onClick={showDemoGuide}
              className="text-xs text-violet-400 underline-offset-2 hover:underline"
            >
              Show demo guide
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl flex flex-col gap-8 px-6 py-10 print:py-6">
        <header
          id="conclave-anchor-narrative"
          className="scroll-mt-24 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 print:border-neutral-300"
        >
          <div className="text-xs uppercase tracking-widest text-violet-300/90">Conclave</div>
          <h1 className="mt-2 text-2xl font-semibold text-white print:text-neutral-900">
            Live ops — governed decisions
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-neutral-300 print:text-neutral-700">
            {source === "demo" ? (
              narrateSystemState(demo.systemState)
            ) : (
              <>
                {liveLoading ? <span>Loading live proposals… </span> : null}
                {liveError ? (
                  <span className="text-rose-300">
                    Could not load decisions: {liveError}.{" "}
                    {liveAuthConfigured ? (
                      <>
                        Sign in below with an account that has a Core project mapping, then tap Refresh.
                      </>
                    ) : (
                      <>
                        Use Demo for unauthenticated previews. For Live, set{" "}
                        <code className="text-neutral-300">NEXT_PUBLIC_FIREBASE_*</code> and sign in, or send{" "}
                        <code className="text-neutral-300">Authorization: Bearer …</code> via a proxy — Conclave
                        calls <code className="text-neutral-300">/api/conclave/gaming/*</code> which forwards to
                        Core.
                      </>
                    )}
                  </span>
                ) : null}
                {!liveLoading && !liveError ? (
                  <span>
                    {liveDecisions.length} proposal(s) from Core
                    {gameIdFilter.trim() ? ` (gameId filter: ${gameIdFilter.trim()})` : ""}. Live data may
                    be incomplete or briefly delayed while systems sync — that is normal, not a broken demo.
                  </span>
                ) : null}
                {govMetrics ? (
                  <span className="mt-2 block text-neutral-400">
                    {narrateGovernanceMetrics(govMetrics)}
                  </span>
                ) : null}
                <span className="mt-2 block rounded-lg border border-amber-800/50 bg-amber-950/30 px-3 py-2 text-amber-100/95">
                  <strong className="font-semibold">What is real vs simulated:</strong> decision timeline and outcome
                  rows are from Core. <strong>System health</strong> (domains, agents, risk list) is still the{" "}
                  <strong>Nexus Online</strong> demo scaffold for clarity — not live telemetry.
                </span>
              </>
            )}
          </p>
          <p className="mt-3 inline-block rounded-lg border border-violet-800/60 bg-violet-950/30 px-3 py-1 text-xs text-violet-200 print:border-violet-300 print:bg-violet-50 print:text-violet-900">
            {source === "demo"
              ? demo.label
              : "Live — Core API (decisions + outcomes per proposal; see banner for what is still simulated)"}
          </p>

          <div className="mt-4 flex flex-wrap items-end gap-2 print:hidden">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">Data source</span>
            <div className="flex rounded-lg border border-neutral-700 p-0.5">
              <button
                type="button"
                onClick={() => setSource("demo")}
                className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                  source === "demo"
                    ? "bg-violet-900/50 text-violet-100"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                Demo
              </button>
              <button
                type="button"
                onClick={() => {
                  setSource("live");
                  void loadLive();
                }}
                className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                  source === "live"
                    ? "bg-violet-900/50 text-violet-100"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                Live Core
              </button>
            </div>
            <label className="flex flex-col gap-0.5 text-xs text-neutral-500">
              <span>Optional gameId</span>
              <input
                value={gameIdFilter}
                onChange={(e) => setGameIdFilter(e.target.value)}
                placeholder="e.g. nexus-online-demo"
                className="w-48 rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-sm text-neutral-200 placeholder:text-neutral-600"
                disabled={source === "demo"}
              />
            </label>
            <button
              type="button"
              disabled={source !== "live" || liveLoading}
              onClick={() => void loadLive()}
              className="rounded-lg border border-neutral-600 bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-100 hover:bg-neutral-700 disabled:opacity-40"
            >
              Refresh
            </button>
          </div>

          {liveAuthConfigured && source === "live" ? (
            <div className="mt-4 rounded-xl border border-neutral-700 bg-neutral-950/60 px-4 py-3 print:hidden">
              <div className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                Operator sign-in (Firebase)
              </div>
              {firebaseUserLabel ? (
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-neutral-200">
                  <span>
                    Signed in as <span className="font-medium text-white">{firebaseUserLabel}</span>
                  </span>
                  <button
                    type="button"
                    className="rounded-md border border-neutral-600 px-2.5 py-1 text-xs text-neutral-300 hover:bg-neutral-800"
                    onClick={() => {
                      void (async () => {
                        await conclaveSignOut();
                        setSignInError(null);
                        void loadLive();
                      })();
                    }}
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <form
                  className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-end"
                  onSubmit={(e) => {
                    e.preventDefault();
                    void (async () => {
                      setSignInError(null);
                      setSignInBusy(true);
                      try {
                        const r = await conclaveSignInWithEmailPassword(signInEmail, signInPassword);
                        if (!r.ok) {
                          setSignInError(r.message);
                          return;
                        }
                        setSignInPassword("");
                        void loadLive();
                      } finally {
                        setSignInBusy(false);
                      }
                    })();
                  }}
                >
                  <label className="flex min-w-[10rem] flex-1 flex-col gap-0.5 text-xs text-neutral-500">
                    Email
                    <input
                      type="email"
                      autoComplete="email"
                      value={signInEmail}
                      onChange={(ev) => setSignInEmail(ev.target.value)}
                      className="rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-sm text-neutral-200"
                    />
                  </label>
                  <label className="flex min-w-[10rem] flex-1 flex-col gap-0.5 text-xs text-neutral-500">
                    Password
                    <input
                      type="password"
                      autoComplete="current-password"
                      value={signInPassword}
                      onChange={(ev) => setSignInPassword(ev.target.value)}
                      className="rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-sm text-neutral-200"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={signInBusy}
                    className="rounded-lg border border-violet-700 bg-violet-950/50 px-3 py-2 text-xs font-medium text-violet-100 hover:bg-violet-900/50 disabled:opacity-40"
                  >
                    {signInBusy ? "Signing in…" : "Sign in"}
                  </button>
                </form>
              )}
              {signInError ? <p className="mt-2 text-sm text-rose-300">{signInError}</p> : null}
              <p className="mt-2 text-xs text-neutral-500">
                Token is sent as <code className="text-neutral-400">Authorization: Bearer</code> on Conclave
                gaming requests. Your user must have <code className="text-neutral-400">user_profiles</code>{" "}
                → project mapping in Core.
              </p>
            </div>
          ) : null}
        </header>

        {blockedDecision ? (
          <DeployBlockBanner decision={blockedDecision} />
        ) : (
          <div
            id="conclave-anchor-deploy"
            className="scroll-mt-24 rounded-2xl border border-dashed border-neutral-700 bg-neutral-900/20 px-5 py-4 text-sm text-neutral-500"
          >
            No deploy block in this snapshot — when enforcement blocks a linked decision, plain-language
            copy appears here.
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2 print:grid-cols-1">
          <section
            id="conclave-anchor-timeline"
            className="scroll-mt-24 flex flex-col gap-4"
          >
            <div>
              <h2 className="text-lg font-semibold text-white print:text-neutral-900">
                Decision timeline
              </h2>
              <p className="text-sm text-neutral-400 print:text-neutral-600">
                {narrateTimelineSection(decisions)}{" "}
                {deployedWithTrail
                  ? ` Shipped example: “${deployedWithTrail.title}”.`
                  : ""}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {decisions.length === 0 && source === "live" && !liveLoading && !liveError ? (
                <p className="rounded-2xl border border-dashed border-neutral-700 bg-neutral-900/30 px-4 py-6 text-sm text-neutral-400">
                  No proposals returned for this project / filter. Seed data is unchanged in Demo mode.
                </p>
              ) : null}
              {decisions.map((d) => (
                <TrailCard
                  key={d.id}
                  decision={d}
                  expanded={openId === d.id}
                  onToggle={() => setOpenId((id) => (id === d.id ? null : d.id))}
                  simBusy={!!simBusyIds[d.id]}
                  deployBusy={!!deployBusyIds[d.id]}
                  actionError={actionErrorById[d.id]}
                  onRunSimulation={() => void handleRunSimulation(d)}
                  onDeploy={() => void handleDeploy(d)}
                  dataSourceLabel={
                    source === "demo"
                      ? "Demo: harness updates this browser state only."
                      : "Live: POST /gaming/simulations + deploy via BFF."
                  }
                />
              ))}
            </div>
          </section>

          <section
            id="conclave-anchor-health"
            className="scroll-mt-24 flex flex-col gap-4"
          >
            {source === "live" ? (
              <div
                className="rounded-xl border border-sky-800/60 bg-sky-950/40 px-4 py-3 text-sm text-sky-100/95 print:border-sky-300 print:bg-sky-50 print:text-sky-950"
                role="status"
              >
                <strong className="font-semibold">Simulated panel:</strong> domains, agents, and active risks below
                are <strong>not</strong> live — they stay on the Nexus Online demo so the layout stays readable.
                <span className="block pt-1 text-sky-200/90 print:text-sky-900">
                  Decisions in the left column and the audit table are from Core (outcomes merged when a row exists).
                </span>
              </div>
            ) : null}
            <div>
              <h2 className="text-lg font-semibold text-white print:text-neutral-900">
                System health
              </h2>
              <p className="text-sm text-neutral-400 print:text-neutral-600">
                {describeGovernanceHealth(demo.systemState.governanceHealth)} ·{" "}
                {narrateDomainStrip(demo.systemState.domains)} Captured{" "}
                {new Date(demo.systemState.capturedAt).toLocaleString()}.
              </p>
            </div>

            <div
              id="conclave-anchor-domains"
              className="scroll-mt-24 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 print:border-neutral-300"
            >
              <div className="text-xs font-semibold uppercase text-neutral-500">Domains</div>
              <ul className="mt-3 space-y-3">
                {demo.systemState.domains.map((dom) => (
                  <li
                    key={dom.id}
                    className={`rounded-xl border px-4 py-3 ${
                      dom.atRisk
                        ? "border-rose-800/70 bg-rose-950/30"
                        : "border-neutral-800 bg-neutral-950/40"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-medium text-neutral-100 print:text-neutral-900">
                        {dom.name}
                      </span>
                      {dom.atRisk ? (
                        <span className="text-xs font-medium text-rose-200">At risk</span>
                      ) : null}
                      <span className="text-xs text-neutral-500">
                        {dom.pendingProposals} pending
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-neutral-300 print:text-neutral-700">
                      {dom.headline}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div
              id="conclave-anchor-agents"
              className="scroll-mt-24 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 print:border-neutral-300"
            >
              <div className="text-xs font-semibold uppercase text-neutral-500">Agents</div>
              <p className="mt-1 text-sm text-neutral-400 print:text-neutral-600">
                {narrateAgentStrip(demo.systemState.agents)}
              </p>
              <ul className="mt-3 space-y-3">
                {demo.systemState.agents.map((a) => (
                  <li
                    key={a.id}
                    title={describeAgentPressure(a)}
                    className="rounded-xl border border-neutral-800 bg-neutral-950/50 px-3 py-2 text-xs print:border-neutral-300"
                  >
                    <div className="font-medium text-neutral-200 print:text-neutral-900">
                      {a.name}
                      <span className="font-normal text-neutral-500"> · {a.domain}</span>
                    </div>
                    {a.currentTask ? (
                      <div className="mt-1 text-neutral-300 print:text-neutral-700">
                        <span className="text-neutral-500">Now: </span>
                        {a.currentTask}
                      </div>
                    ) : null}
                    <div className="mt-1 text-neutral-500 print:text-neutral-600">
                      {a.behavioralSummary}
                    </div>
                    <div className="mt-0.5 text-[10px] text-neutral-600">
                      Last action {new Date(a.lastActionAt).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 print:border-neutral-300">
              <div className="text-xs font-semibold uppercase text-neutral-500">Active risks</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-300 print:text-neutral-700">
                {demo.systemState.activeRisks.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <section
          id="conclave-governance-audit"
          className="scroll-mt-24 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 print:border-neutral-300"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white print:text-neutral-900">
                Governance audit
              </h2>
              <p className="text-sm text-neutral-400 print:text-neutral-600">
                Evaluation chips are plain-language labels for audit export.
                {source === "live"
                  ? " Live mode: chips combine proposal fields with merged outcome rows (404 = no outcome yet)."
                  : null}
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-xl border border-neutral-600 bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-100 hover:bg-neutral-700 print:hidden"
            >
              Export PDF (print)
            </button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-700 text-xs uppercase tracking-wider text-neutral-500">
                  <th className="py-2 pr-4">When</th>
                  <th className="py-2 pr-4">Proposal</th>
                  <th className="py-2 pr-4">Governance</th>
                  <th className="py-2 pr-4">Simulation</th>
                  <th className="py-2 pr-4">Outcome</th>
                  <th className="py-2 pr-4">Constraints</th>
                </tr>
              </thead>
              <tbody>
                {evaluations.map((row) => (
                  <tr key={row.id} className="border-b border-neutral-800/80">
                    <td className="py-3 pr-4 font-mono text-xs text-neutral-400">
                      {new Date(row.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 pr-4 text-neutral-200 print:text-neutral-800">
                      {row.proposalId}
                      {row.deploymentId ? (
                        <div className="text-xs text-neutral-500">dep {row.deploymentId}</div>
                      ) : null}
                    </td>
                    <td className="py-3 pr-4">{describeEvaluationChip(row.governanceChip)}</td>
                    <td className="py-3 pr-4">{describeEvaluationChip(row.simulationChip)}</td>
                    <td className="py-3 pr-4">{describeEvaluationChip(row.outcomeChip)}</td>
                    <td className="py-3 pr-4 text-neutral-300 print:text-neutral-700">
                      {row.constraintsEvaluated}
                      {row.escalationViolation ? " · escalation" : ""}
                      {row.notes ? <div className="text-xs text-neutral-500">{row.notes}</div> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
