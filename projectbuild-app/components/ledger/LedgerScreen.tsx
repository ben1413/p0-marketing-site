"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ProjectSurfaceShell } from "@/components/layout/ProjectSurfaceShell";
import { BuilderButtonAndShell } from "@/components/builder/BuilderButtonAndShell";
import { DesignerButtonAndShell } from "@/components/designer/DesignerButtonAndShell";

// ─── Types ───────────────────────────────────────────────────────────────────

type LedgerItemType = "decision" | "artifact" | "task" | "note" | "code";
type AuthorityMode = "human_led" | "human_in_the_loop" | "agent_autonomous";
type TruthPosture = "known" | "inferred" | "unknown";

type LedgerItem = {
  id: string;
  evaluationId: string;
  type: LedgerItemType;
  title?: string;
  summary?: string;
  content?: string;
  createdAt: string;
  authorityMode: AuthorityMode;
  actor?: { type?: string; id?: string };
  agent?: string;
  runId?: string;
  tags?: string[];
  truthPosture?: TruthPosture;
};

type LedgerUiPayload = {
  sealing: { totalCount: number; evaluations: unknown[]; items: LedgerItem[] };
  evals: {
    records: { id: string; agentId?: string; score?: number; createdAt?: string }[];
    aggregates: { byAgent: { agentId: string; attemptCount: number; blockedCount: number }[] };
  };
  gov: {
    agents: { agentId: string; status?: string }[];
    recentDecisions: { id: string; action?: string; outcome?: string; createdAt?: string }[];
  };
};

type Tab = "decisions" | "promotes" | "stats";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const TYPE_COLORS: Record<LedgerItemType, string> = {
  decision: "text-blue-400/80 border-blue-400/20 bg-blue-400/5",
  artifact: "text-purple-400/80 border-purple-400/20 bg-purple-400/5",
  task:     "text-amber-400/80 border-amber-400/20 bg-amber-400/5",
  note:     "text-slate-400/80 border-slate-400/20 bg-slate-400/5",
  code:     "text-emerald-400/80 border-emerald-400/20 bg-emerald-400/5",
};

const AUTHORITY_LABELS: Record<AuthorityMode, string> = {
  human_led:           "Human led",
  human_in_the_loop:   "HITL",
  agent_autonomous:    "Agent autonomous",
};

const POSTURE_CONFIG = {
  known:    { symbol: "●", color: "text-emerald-400/70" },
  inferred: { symbol: "◐", color: "text-amber-400/70" },
  unknown:  { symbol: "○", color: "text-white/30" },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

// Group items by date string for the indexed view
function groupByDate(items: LedgerItem[]): { date: string; items: LedgerItem[] }[] {
  const map = new Map<string, LedgerItem[]>();
  for (const item of items) {
    const key = formatDate(item.createdAt);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(item);
  }
  return Array.from(map.entries()).map(([date, items]) => ({ date, items }));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypeBadge({ type }: { type: LedgerItemType }) {
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${TYPE_COLORS[type] ?? TYPE_COLORS.note}`}>
      {type}
    </span>
  );
}

function AuthorityBadge({ mode }: { mode: AuthorityMode }) {
  return (
    <span className="text-[9px] text-[var(--muted)]/60 font-medium">
      {AUTHORITY_LABELS[mode] ?? mode}
    </span>
  );
}

function ItemRow({ item, onClick }: { item: LedgerItem; onClick: () => void }) {
  const posture = item.truthPosture ? POSTURE_CONFIG[item.truthPosture] : null;
  return (
    <button
      onClick={onClick}
      className="w-full text-left group px-5 py-3.5 rounded-xl border border-white/10 bg-black/10 hover:border-white/20 hover:bg-white/5 transition-all flex items-start gap-4"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <TypeBadge type={item.type} />
          {item.tags?.slice(0, 3).map((t) => (
            <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[var(--muted)]/70">
              {t}
            </span>
          ))}
          {posture && (
            <span className={`text-[9px] font-bold ${posture.color}`} title={item.truthPosture}>
              {posture.symbol}
            </span>
          )}
        </div>
        <p className="text-[13px] text-[var(--text-blue)] leading-snug truncate">
          {item.title || item.summary || "Untitled"}
        </p>
        <div className="flex items-center gap-3 mt-1">
          <AuthorityBadge mode={item.authorityMode} />
          {item.agent && (
            <span className="text-[9px] text-[var(--muted)]/50">via {item.agent}</span>
          )}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-[10px] text-[var(--muted)]/60">{formatTime(item.createdAt)}</p>
        <p className="text-[9px] text-[var(--muted)]/40 mt-0.5 group-hover:text-[var(--muted)]/60 transition-colors">
          View →
        </p>
      </div>
    </button>
  );
}

function DetailDrawer({ item, onClose }: { item: LedgerItem; onClose: () => void }) {
  const [full, setFull] = useState<LedgerItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/ledger/item/${item.id}`)
      .then((r) => r.json())
      .then((d: { item?: LedgerItem }) => setFull(d.item ?? item))
      .catch(() => setFull(item))
      .finally(() => setLoading(false));
  }, [item]);

  const display = full ?? item;
  const posture = display.truthPosture ? POSTURE_CONFIG[display.truthPosture] : null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg h-full bg-[var(--panel)] border-l border-white/10 flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-7 pt-7 pb-5 border-b border-white/10 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <TypeBadge type={display.type} />
              {posture && (
                <span className={`text-[10px] font-bold ${posture.color}`}>
                  {posture.symbol} {display.truthPosture?.toUpperCase()}
                </span>
              )}
            </div>
            <button onClick={onClose} className="text-[var(--muted)] hover:text-[var(--text-blue)] transition-colors shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <h2 className="text-[17px] font-semibold text-[var(--text-bright)] mt-3 leading-snug">
            {display.title || display.summary || "Untitled"}
          </h2>
          <p className="text-[11px] text-[var(--muted)]/60 mt-1">
            {formatDate(display.createdAt)} · {formatTime(display.createdAt)}
          </p>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-7 py-6 space-y-6">
          {loading ? (
            <p className="text-[12px] text-[var(--muted)]">Loading full record…</p>
          ) : (
            <>
              {/* Summary / content */}
              {(display.summary || display.content) && (
                <div>
                  <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--text-blue)]/40 mb-2">
                    Content
                  </p>
                  <p className="text-[14px] text-[var(--text-blue)] leading-relaxed whitespace-pre-wrap">
                    {display.content || display.summary}
                  </p>
                </div>
              )}

              {/* Metadata grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--text-blue)]/40 mb-1">Authority</p>
                  <p className="text-[12px] text-[var(--text-blue)]">{AUTHORITY_LABELS[display.authorityMode] ?? display.authorityMode}</p>
                </div>
                {display.actor && (
                  <div>
                    <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--text-blue)]/40 mb-1">Promoted by</p>
                    <p className="text-[12px] text-[var(--text-blue)]">{display.actor.id ?? display.actor.type ?? "—"}</p>
                  </div>
                )}
                {display.agent && (
                  <div>
                    <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--text-blue)]/40 mb-1">Agent</p>
                    <p className="text-[12px] text-[var(--text-blue)]">{display.agent}</p>
                  </div>
                )}
                {display.runId && (
                  <div>
                    <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--text-blue)]/40 mb-1">Run ID</p>
                    <p className="text-[11px] text-[var(--muted)] font-mono truncate">{display.runId}</p>
                  </div>
                )}
                <div>
                  <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--text-blue)]/40 mb-1">Ledger ID</p>
                  <p className="text-[11px] text-[var(--muted)] font-mono truncate">{display.id}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--text-blue)]/40 mb-1">Eval ID</p>
                  <p className="text-[11px] text-[var(--muted)] font-mono truncate">{display.evaluationId}</p>
                </div>
              </div>

              {/* Tags */}
              {display.tags && display.tags.length > 0 && (
                <div>
                  <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--text-blue)]/40 mb-2">Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {display.tags.map((t) => (
                      <span key={t} className="text-[10px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--muted)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Decisions ───────────────────────────────────────────────────────────

function DecisionsTab({ projectId }: { projectId: string }) {
  const [items, setItems] = useState<LedgerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<LedgerItemType | "all">("all");
  const [filterTag, setFilterTag] = useState("");
  const [selected, setSelected] = useState<LedgerItem | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({ projectId, limit: "200" });
    if (filterType !== "all") params.set("type", filterType);
    fetch(`/api/ledger/items?${params}`)
      .then((r) => r.json())
      .then((d: { items?: LedgerItem[] }) => setItems(d.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [projectId, filterType]);

  useEffect(() => { load(); }, [load]);

  const allTags = Array.from(new Set(items.flatMap((i) => i.tags ?? [])));
  const filtered = items.filter((i) => {
    if (filterType !== "all" && i.type !== filterType) return false;
    if (filterTag && !(i.tags ?? []).includes(filterTag)) return false;
    return true;
  });

  const grouped = groupByDate(filtered);

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Filter bar */}
      <div className="flex items-center gap-2 px-8 py-3 border-b border-white/10 shrink-0 flex-wrap">
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--text-blue)]/40 mr-1">Filter</span>
        {(["all", "decision", "artifact", "task", "note", "code"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-widest transition-colors ${
              filterType === t
                ? "border-white/30 bg-white/10 text-[var(--text-bright)]"
                : "border-white/10 bg-transparent text-[var(--muted)]/60 hover:text-[var(--text-blue)]"
            }`}
          >
            {t}
          </button>
        ))}
        {allTags.length > 0 && (
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="ml-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-[var(--text-blue)] focus:outline-none"
          >
            <option value="">All tags</option>
            {allTags.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        )}
        <div className="flex-1" />
        <span className="text-[10px] text-[var(--muted)]/50 tabular-nums">{filtered.length} records</span>
      </div>

      {/* Indexed list */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-8 py-6 space-y-8">
        {loading ? (
          <p className="text-[13px] text-[var(--muted)]">Loading…</p>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[240px] gap-3 text-center">
            <p className="text-[13px] text-[var(--text-blue)]/50">No records yet</p>
            <p className="text-[11px] text-[var(--muted)]/50 max-w-[240px]">
              Promote a message from the Room to seal your first record.
            </p>
          </div>
        ) : (
          grouped.map(({ date, items }) => (
            <div key={date}>
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/40 mb-3">{date}</p>
              <div className="space-y-2">
                {items.map((item) => (
                  <ItemRow key={item.id} item={item} onClick={() => setSelected(item)} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {selected && <DetailDrawer item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

// ─── Tab: Promotes ────────────────────────────────────────────────────────────

function PromotesTab({ projectId }: { projectId: string }) {
  const [items, setItems] = useState<LedgerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<LedgerItem | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/ledger/items?projectId=${projectId}&limit=100`)
      .then((r) => r.json())
      .then((d: { items?: LedgerItem[] }) => {
        // Show most recent first, all authority modes
        setItems((d.items ?? []).slice().reverse());
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [projectId]);

  const byAuthority = {
    human_led: items.filter((i) => i.authorityMode === "human_led"),
    human_in_the_loop: items.filter((i) => i.authorityMode === "human_in_the_loop"),
    agent_autonomous: items.filter((i) => i.authorityMode === "agent_autonomous"),
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 overflow-y-auto custom-scrollbar px-8 py-6 space-y-8">
        {loading ? (
          <p className="text-[13px] text-[var(--muted)]">Loading…</p>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[240px] gap-3 text-center">
            <p className="text-[13px] text-[var(--text-blue)]/50">No promotes yet</p>
            <p className="text-[11px] text-[var(--muted)]/50 max-w-[240px]">
              Every PROMOTE action from the Room or Board appears here.
            </p>
          </div>
        ) : (
          (Object.entries(byAuthority) as [AuthorityMode, LedgerItem[]][]).map(([mode, modeItems]) => {
            if (modeItems.length === 0) return null;
            return (
              <div key={mode}>
                <div className="flex items-center gap-3 mb-3">
                  <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/40">
                    {AUTHORITY_LABELS[mode]}
                  </p>
                  <span className="text-[9px] text-[var(--muted)]/40 tabular-nums">{modeItems.length}</span>
                </div>
                <div className="space-y-2">
                  {modeItems.map((item) => (
                    <ItemRow key={item.id} item={item} onClick={() => setSelected(item)} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
      {selected && <DetailDrawer item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

// ─── Tab: Stats ───────────────────────────────────────────────────────────────

function StatsTab({ projectId }: { projectId: string }) {
  const [payload, setPayload] = useState<LedgerUiPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/ledger/ui?projectId=${projectId}&limit=200`)
      .then((r) => r.json())
      .then((d: { ok?: boolean; payload?: LedgerUiPayload }) => setPayload(d.payload ?? null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [projectId]);

  const sealing = payload?.sealing;
  const evals = payload?.evals;
  const gov = payload?.gov;

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar px-8 py-6">
      {loading ? (
        <p className="text-[13px] text-[var(--muted)]">Loading…</p>
      ) : !payload ? (
        <p className="text-[13px] text-[var(--muted)]/60">Stats unavailable — connect Core to see eval and governance data.</p>
      ) : (
        <div className="space-y-8 max-w-2xl">
          {/* Summary row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Sealed records", value: sealing?.totalCount ?? 0 },
              { label: "Eval records", value: evals?.records?.length ?? 0 },
              { label: "Agents tracked", value: gov?.agents?.length ?? 0 },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
                <p className="text-[28px] font-semibold text-[var(--text-bright)] tabular-nums">{value}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--muted)]/60 mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* By-agent eval breakdown */}
          {evals?.aggregates?.byAgent && evals.aggregates.byAgent.length > 0 && (
            <div>
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/40 mb-3">
                Eval by agent
              </p>
              <div className="space-y-2">
                {evals.aggregates.byAgent.map((row) => {
                  const passRate = row.attemptCount > 0
                    ? Math.round(((row.attemptCount - row.blockedCount) / row.attemptCount) * 100)
                    : null;
                  return (
                    <div key={row.agentId} className="rounded-xl border border-white/10 bg-black/10 px-4 py-3 flex items-center gap-4">
                      <p className="text-[12px] text-[var(--text-blue)] flex-1 font-medium truncate">{row.agentId}</p>
                      <div className="flex items-center gap-4 text-right">
                        <div>
                          <p className="text-[10px] text-[var(--muted)]/50 mb-0.5">Attempts</p>
                          <p className="text-[13px] text-[var(--text-blue)] tabular-nums">{row.attemptCount}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-[var(--muted)]/50 mb-0.5">Blocked</p>
                          <p className="text-[13px] text-red-400/80 tabular-nums">{row.blockedCount}</p>
                        </div>
                        {passRate !== null && (
                          <div>
                            <p className="text-[10px] text-[var(--muted)]/50 mb-0.5">Pass rate</p>
                            <p className={`text-[13px] tabular-nums font-semibold ${passRate >= 80 ? "text-emerald-400/80" : passRate >= 50 ? "text-amber-400/80" : "text-red-400/80"}`}>
                              {passRate}%
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent governance decisions */}
          {gov?.recentDecisions && gov.recentDecisions.length > 0 && (
            <div>
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/40 mb-3">
                Recent governance decisions
              </p>
              <div className="space-y-2">
                {gov.recentDecisions.map((d) => (
                  <div key={d.id} className="rounded-xl border border-white/10 bg-black/10 px-4 py-3 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-[var(--text-blue)] truncate">{d.action ?? d.id}</p>
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${
                      d.outcome === "allowed" ? "text-emerald-400/70" : "text-red-400/70"
                    }`}>
                      {d.outcome ?? "—"}
                    </span>
                    {d.createdAt && (
                      <span className="text-[10px] text-[var(--muted)]/40 shrink-0">{formatDate(d.createdAt)}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main LedgerScreen ────────────────────────────────────────────────────────

interface LedgerScreenProps {
  projectId: string;
}

export function LedgerScreen({ projectId }: LedgerScreenProps) {
  const [tab, setTab] = useState<Tab>("decisions");

  const tabs: { id: Tab; label: string }[] = [
    { id: "decisions", label: "Decisions" },
    { id: "promotes",  label: "Promotes" },
    { id: "stats",     label: "Stats" },
  ];

  return (
    <ProjectSurfaceShell
      projectId={projectId}
      breadcrumb="Ledger"
      headerActions={
        <>
          <BuilderButtonAndShell projectId={projectId} />
          <DesignerButtonAndShell projectId={projectId} />
          <Link
            href={`/projects/${projectId}/board`}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors"
          >
            PM Board
          </Link>
          <Link
            href={`/projects/${projectId}/room`}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors"
          >
            Room
          </Link>
        </>
      }
      center={
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="px-12 pt-4 text-xs uppercase tracking-[0.28em] text-[var(--text-blue)]">
            Ledger / project memory
          </div>
          <div className="px-12 pt-4 shrink-0">
            <div className="flex items-center gap-1">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors ${
                    tab === t.id
                      ? "bg-white/10 text-[var(--text-bright)]"
                      : "text-[var(--muted)]/60 hover:text-[var(--text-blue)] hover:bg-white/5"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden pt-4">
            {tab === "decisions" && <DecisionsTab projectId={projectId} />}
            {tab === "promotes"  && <PromotesTab  projectId={projectId} />}
            {tab === "stats"     && <StatsTab     projectId={projectId} />}
          </div>
        </div>
      }
      right={
        <div className="flex flex-col h-full">
          <div className="px-5 pt-5 pb-3 border-b border-white/10">
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/50">
              Context
            </span>
          </div>

          <div className="px-5 py-4 border-b border-white/10">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--text-blue)]/50 block mb-2">
              Current View
            </span>
            <p className="text-[12px] text-[var(--text-blue)] leading-relaxed">
              {tab === "decisions" && "Browse sealed project records by date, type, and tag."}
              {tab === "promotes" && "Review how outcomes entered memory and which authority mode was used."}
              {tab === "stats" && "Inspect eval, governance, and sealing health for this project."}
            </p>
          </div>

          <div className="px-5 py-4 border-b border-white/10">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--text-blue)]/50 block mb-2">
              Memory Model
            </span>
            <p className="text-[11px] text-[var(--muted)] leading-relaxed">
              Promotes create durable project memory. Open a record to inspect its content, authority, actor, and related run context.
            </p>
          </div>

          <div className="flex-1" />

          <div className="px-5 py-4">
            <Link
              href={`/projects/${projectId}/room`}
              className="text-[11px] text-[var(--muted)] hover:text-[var(--text-blue)] transition-colors"
            >
              Return to room →
            </Link>
          </div>
        </div>
      }
    />
  );
}
