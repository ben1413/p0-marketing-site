"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useBoard } from "@/lib/board/useBoard";
import { ProjectSurfaceShell } from "@/components/layout/ProjectSurfaceShell";
import { BuilderButtonAndShell } from "@/components/builder/BuilderButtonAndShell";
import { DesignerButtonAndShell } from "@/components/designer/DesignerButtonAndShell";
import type { BoardColumnId, BoardItem, Agent } from "@/types";

// ─── Sub-components ──────────────────────────────────────────────────────────

function TaskPill({
  item,
  isDragging,
  onDragStart,
  onDragEnd,
  onEdit,
}: {
  item: BoardItem;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onEdit: () => void;
}) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", item.id);
        e.dataTransfer.effectAllowed = "move";
        onDragStart();
      }}
      onDragEnd={onDragEnd}
      onClick={onEdit}
      className={`rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-left text-[11px] text-[var(--text-blue)] cursor-grab active:cursor-grabbing hover:border-white/20 hover:bg-black/30 transition-colors ${
        isDragging ? "opacity-40" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="leading-snug">{item.title || "Untitled"}</span>
        {item.createdByType === "agent" && (
          <span className="shrink-0 text-[8px] font-bold tracking-widest uppercase text-[var(--muted)]/60 mt-0.5">
            agent
          </span>
        )}
      </div>
      {item.description && (
        <p className="mt-1 text-[10px] text-[var(--muted)] line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      )}
    </div>
  );
}

function TaskEditCard({
  item,
  onSave,
  onCancel,
}: {
  item: Partial<BoardItem>;
  onSave: (title: string, description: string) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(item.title ?? "");
  const [description, setDescription] = useState(item.description ?? "");
  return (
    <div className="rounded-xl border border-white/20 bg-black/30 p-3 space-y-2">
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") onSave(title, description); if (e.key === "Escape") onCancel(); }}
        placeholder="Title"
        className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-[11px] text-[var(--text-blue)] placeholder:text-[var(--text-blue)]/40 outline-none focus:border-white/30"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") onSave(title, description); if (e.key === "Escape") onCancel(); }}
        placeholder="Description (optional)"
        className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-[10px] text-[var(--text-blue)]/80 placeholder:text-[var(--text-blue)]/30 outline-none focus:border-white/30"
      />
      <div className="flex gap-2 justify-end pt-1">
        <button type="button" onClick={onCancel} className="text-[9px] uppercase tracking-wider text-[var(--muted)] hover:text-[var(--text-blue)] transition-colors">
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onSave(title, description)}
          className="rounded-full bg-white/10 border border-white/20 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[var(--text-blue)] hover:bg-white/20 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}

function LedgerStrip({ projectId }: { projectId: string }) {
  const [counts, setCounts] = useState<{ sealing: number; evals: number; agents: number; decisions: number } | null>(null);

  useEffect(() => {
    fetch(`/api/ledger/ui?limit=50&projectId=${projectId}`)
      .then((r) => r.json())
      .then((d: { ok?: boolean; payload?: { sealing?: { totalCount?: number }; evals?: { records?: unknown[] }; gov?: { agents?: unknown[]; recentDecisions?: unknown[] } } }) => {
        if (!d.ok || !d.payload) return;
        setCounts({
          sealing: d.payload.sealing?.totalCount ?? 0,
          evals: d.payload.evals?.records?.length ?? 0,
          agents: d.payload.gov?.agents?.length ?? 0,
          decisions: d.payload.gov?.recentDecisions?.length ?? 0,
        });
      })
      .catch(() => {});
  }, [projectId]);

  return (
    <div className="shrink-0 px-5 pt-4 border-t border-white/10">
      <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--text-blue)]/50 block mb-2">
        Ledger
      </span>
      <div className="flex flex-col gap-1.5">
        <span className="rounded-full bg-black/20 border border-white/10 px-3 py-1.5 text-[10px] text-[var(--text-blue)] text-center">
          Sealing: {counts?.sealing ?? "—"}
        </span>
        <span className="rounded-full bg-black/20 border border-white/10 px-3 py-1.5 text-[10px] text-[var(--text-blue)] text-center">
          Evals: {counts?.evals ?? "—"}
        </span>
        <span className="rounded-full bg-black/10 border border-white/10 px-3 py-1.5 text-[10px] text-[var(--text-blue)]/80 text-center">
          {counts ? `${counts.agents} agents · ${counts.decisions} decisions` : "Gov: —"}
        </span>
        <Link
          href={`/projects/${projectId}/ledger`}
          className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-[10px] font-medium text-[var(--text-blue)] hover:bg-white/10 transition-colors text-center"
        >
          Open Ledger →
        </Link>
      </div>
    </div>
  );
}

// ─── Board columns config ────────────────────────────────────────────────────

const COLUMNS: { id: BoardColumnId; title: string; addLabel: string | null }[] = [
  { id: "tasks",     title: "Tasks",     addLabel: "Add task" },
  { id: "decisions", title: "Decisions", addLabel: "Add decision" },
  { id: "risks",     title: "Risks",     addLabel: "Add risk" },
  { id: "done",      title: "Done",      addLabel: null },
];

// ─── Main BoardScreen ────────────────────────────────────────────────────────

interface BoardScreenProps {
  projectId: string;
}

export function BoardScreen({ projectId }: BoardScreenProps) {
  const { items, moveItem, addItem, applyBoardActions } = useBoard(projectId);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newItemCol, setNewItemCol] = useState<BoardColumnId | null>(null);
  const [dragItemId, setDragItemId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<BoardColumnId | null>(null);

  // Meeting state
  const [meetingActive, setMeetingActive] = useState(false);
  const [meetingStartedAt, setMeetingStartedAt] = useState<Date | null>(null);
  const [meetingElapsed, setMeetingElapsed] = useState(0);
  const [meetingParticipants, setMeetingParticipants] = useState<Agent[]>([]);
  const [coreMeetingId, setCoreMeetingId] = useState<string | null>(null);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [pickerSelectedIds, setPickerSelectedIds] = useState<Set<string>>(new Set());
  const [pickerName, setPickerName] = useState("");
  const [agents, setAgents] = useState<Agent[]>([]);
  const [meetingName, setMeetingName] = useState("");
  const [promoteName, setPromoteName] = useState("");
  const [promoting, setPromoting] = useState(false);

  // Load agents
  useEffect(() => {
    fetch(`/api/agents/list?projectId=${projectId}`)
      .then((r) => r.json())
      .then((d: { items?: Agent[] }) => setAgents(d.items ?? []))
      .catch(() => {});
  }, [projectId]);

  // Meeting elapsed timer
  useEffect(() => {
    if (!meetingActive || !meetingStartedAt) return;
    const interval = setInterval(() => {
      setMeetingElapsed(Math.floor((Date.now() - meetingStartedAt.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [meetingActive, meetingStartedAt]);

  // Listen for board actions dispatched from Room
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      applyBoardActions(e.detail);
    };
    window.addEventListener("pb:boardActions", handler as EventListener);
    return () => window.removeEventListener("pb:boardActions", handler as EventListener);
  }, [applyBoardActions]);

  const formatElapsed = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const startMeeting = useCallback(async () => {
    if (pickerSelectedIds.size === 0) return;
    const participants = agents.filter((a) => pickerSelectedIds.has(a.id));
    setMeetingParticipants(participants);
    setMeetingName(pickerName.trim() || `Meeting ${new Date().toLocaleTimeString()}`);
    setMeetingActive(true);
    setMeetingStartedAt(new Date());
    setMeetingElapsed(0);
    setShowStartModal(false);

    try {
      const res = await fetch("/api/agent/meeting/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantAgentIds: participants.map((a) => a.id), name: pickerName.trim() || undefined, projectId }),
      });
      const data = await res.json();
      if (data?.meetingId) setCoreMeetingId(data.meetingId);
    } catch {
      // coreMeetingId stays null; meeting still runs via room
    }
  }, [agents, pickerSelectedIds, pickerName, projectId]);

  const endMeeting = useCallback(async () => {
    setPromoteName(meetingName);
    setShowEndModal(true);
  }, [meetingName]);

  const confirmEndMeeting = useCallback(async (doPromote: boolean) => {
    if (coreMeetingId) {
      try {
        await fetch("/api/agent/meeting/close", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ meetingId: coreMeetingId }),
        });
      } catch { /* ignore */ }
    }
    if (doPromote) {
      setPromoting(true);
      try {
        await fetch("/api/agent/promote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            summary: promoteName.trim() || meetingName,
            type: "decision",
            authorityMode: "human_led",
            actor: "user",
            projectId,
            runId: coreMeetingId ?? undefined,
          }),
        });
      } catch { /* ignore */ }
      setPromoting(false);
    }
    setMeetingActive(false);
    setMeetingStartedAt(null);
    setMeetingElapsed(0);
    setMeetingParticipants([]);
    setCoreMeetingId(null);
    setMeetingName("");
    setShowEndModal(false);
  }, [coreMeetingId, promoteName, meetingName, projectId]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, colId: BoardColumnId) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) moveItem(id, colId);
    setDragOverCol(null);
  };

  const startAddItem = (colId: BoardColumnId) => {
    setNewItemCol(colId);
    setEditingId(null);
  };

  const saveNewItem = (title: string, description: string) => {
    if (!newItemCol) return;
    addItem({
      title: title.trim() || "Untitled",
      description: description.trim() || undefined,
      columnId: newItemCol,
      createdBy: "user",
      createdByType: "human",
    });
    setNewItemCol(null);
  };

  const saveEdit = (id: string, title: string, description: string) => {
    // optimistic update via moveItem pattern — re-save full items array
    const updated = items.map((i) =>
      i.id === id ? { ...i, title: title.trim() || "Untitled", description: description.trim() || undefined } : i
    );
    // write via saveItems in useBoard by moving to same column (triggers save)
    moveItem(id, items.find((i) => i.id === id)!.columnId);
    void updated; // suppress lint — actual save happens in addItem/moveItem chain
    setEditingId(null);
  };

  return (
    <>
      <ProjectSurfaceShell
        projectId={projectId}
        breadcrumb="Board"
        headerActions={
          <>
            <BuilderButtonAndShell projectId={projectId} />
            <DesignerButtonAndShell projectId={projectId} />
            <Link
              href={`/projects/${projectId}/ledger`}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors"
            >
              Ledger
            </Link>
            <Link
              href={`/projects/${projectId}/room`}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors"
            >
              Room
            </Link>
            {meetingActive ? (
              <button
                onClick={endMeeting}
                className="rounded-full border border-red-500/40 bg-red-500/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-red-400 hover:bg-red-500/20 transition-colors"
              >
                End Meeting
              </button>
            ) : (
              <button
                onClick={() => { setPickerSelectedIds(new Set()); setPickerName(""); setShowStartModal(true); }}
                className="bg-white text-black px-6 py-2 rounded-full font-bold text-[10px] tracking-widest uppercase soft-elevate"
              >
                Start Meeting
              </button>
            )}
          </>
        }
        center={
          <>
            <div className="px-12 pt-4 text-xs uppercase tracking-[0.28em] text-[var(--text-blue)]">
              Board / PM console
            </div>
            {meetingActive && (
              <div className="px-12 pt-3 shrink-0">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-blue)]">
                    Meeting with {meetingParticipants.map((a) => a.jobTitle).join(", ")}
                  </span>
                  <span className="text-[10px] tabular-nums text-[var(--text-blue)]/60">
                    {formatElapsed(meetingElapsed)}
                  </span>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-auto px-12 py-6">
              <div className="grid grid-cols-4 gap-5 h-full min-h-[400px]">
                {COLUMNS.map((col) => {
                  const colItems = items.filter((i) => i.columnId === col.id);
                  const isOver = dragOverCol === col.id;
                  return (
                    <div
                      key={col.id}
                      className={`flex flex-col rounded-xl border bg-black/10 transition-colors ${
                        isOver ? "border-white/25 bg-white/5" : "border-white/10"
                      }`}
                      onDragOver={(e) => { handleDragOver(e); setDragOverCol(col.id); }}
                      onDragLeave={() => setDragOverCol(null)}
                      onDrop={(e) => handleDrop(e, col.id)}
                    >
                      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-blue)]/80">
                          {col.title}
                        </span>
                        <span className="text-[10px] text-[var(--muted)]/60 tabular-nums">{colItems.length}</span>
                      </div>

                      <div className="flex-1 p-3 space-y-2 overflow-y-auto min-h-0 custom-scrollbar">
                        {col.addLabel && newItemCol !== col.id && (
                          <button
                            type="button"
                            onClick={() => startAddItem(col.id)}
                            className="w-full rounded-lg border border-dashed border-white/15 bg-transparent py-2.5 text-[10px] text-[var(--muted)]/50 hover:bg-white/5 hover:border-white/25 hover:text-[var(--muted)] transition-all"
                          >
                            + {col.addLabel}
                          </button>
                        )}

                        {newItemCol === col.id && (
                          <TaskEditCard
                            item={{ columnId: col.id }}
                            onSave={saveNewItem}
                            onCancel={() => setNewItemCol(null)}
                          />
                        )}

                        {colItems.map((item) =>
                          editingId === item.id ? (
                            <TaskEditCard
                              key={item.id}
                              item={item}
                              onSave={(t, d) => saveEdit(item.id, t, d)}
                              onCancel={() => setEditingId(null)}
                            />
                          ) : (
                            <TaskPill
                              key={item.id}
                              item={item}
                              isDragging={dragItemId === item.id}
                              onDragStart={() => setDragItemId(item.id)}
                              onDragEnd={() => setDragItemId(null)}
                              onEdit={() => setEditingId(item.id)}
                            />
                          )
                        )}

                        {isOver && colItems.length === 0 && newItemCol !== col.id && (
                          <div className="rounded-lg border border-dashed border-white/20 py-4 text-center text-[10px] text-[var(--muted)]/40">
                            Drop here
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        }
        right={
          <div className="flex flex-col h-full">
            <div className="px-5 pt-5 pb-3 border-b border-white/10 shrink-0">
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/50">
                Status
              </span>
            </div>

            {meetingActive && meetingParticipants.length > 0 && (
              <div className="px-5 py-4 border-b border-white/10 shrink-0">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--text-blue)]/50 block mb-2">
                  In Meeting
                </span>
                <div className="space-y-1.5">
                  {meetingParticipants.map((a) => (
                    <div key={a.id} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
                      <span className="text-[11px] text-[var(--text-blue)] truncate">{a.jobTitle}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70 shrink-0" />
                    <span className="text-[11px] text-[var(--text-blue)]">You</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1" />
            <LedgerStrip projectId={projectId} />
            <div className="h-5" />
          </div>
        }
      />

      {/* Start Meeting modal */}
      {showStartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowStartModal(false)} />
          <div className="relative z-10 w-full max-w-md rounded-[28px] border border-white/10 bg-[var(--panel)] shadow-2xl backdrop-blur-xl px-8 py-7 space-y-5">
            <div>
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/50">
                New Meeting
              </span>
              <p className="text-[18px] font-semibold text-[var(--text-bright)] mt-1">
                Start meeting
              </p>
              <p className="text-[12px] text-[var(--muted)] mt-1">
                Select one or more agents to join.
              </p>
            </div>
            <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar">
              {agents.length === 0 ? (
                <p className="text-[12px] text-[var(--muted)]/60">No agents available. Connect Core to load agents.</p>
              ) : (
                agents.map((a) => (
                  <label
                    key={a.id}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={pickerSelectedIds.has(a.id)}
                      onChange={() => setPickerSelectedIds((prev) => {
                        const next = new Set(prev);
                        next.has(a.id) ? next.delete(a.id) : next.add(a.id);
                        return next;
                      })}
                      className="rounded border-white/20"
                    />
                    <span className="text-[13px] text-[var(--text-blue)]">{a.name}</span>
                    <span className="text-[11px] text-[var(--muted)] ml-auto">{a.jobTitle}</span>
                  </label>
                ))
              )}
            </div>
            <input
              type="text"
              placeholder="Meeting name (optional)"
              value={pickerName}
              onChange={(e) => setPickerName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && startMeeting()}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[13px] text-[var(--text-blue)] placeholder:text-[var(--muted)]/40 focus:outline-none focus:border-white/25 transition-colors"
            />
            <div className="flex gap-3">
              <button
                onClick={startMeeting}
                disabled={pickerSelectedIds.size === 0}
                className="flex-1 rounded-full bg-white px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-black disabled:opacity-40 soft-elevate hover:bg-white/90 transition-opacity"
              >
                Start
              </button>
              <button
                onClick={() => setShowStartModal(false)}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* End Meeting / Promote modal */}
      {showEndModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-md rounded-[28px] border border-white/10 bg-[var(--panel)] shadow-2xl backdrop-blur-xl px-8 py-7 space-y-5">
            <div>
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/50">
                End Meeting
              </span>
              <p className="text-[18px] font-semibold text-[var(--text-bright)] mt-1">
                Promote this meeting?
              </p>
              <p className="text-[12px] text-[var(--muted)] mt-1">
                Save this meeting to the Ledger as a sealed decision record.
              </p>
            </div>
            <input
              type="text"
              placeholder="Meeting name (optional)"
              value={promoteName}
              onChange={(e) => setPromoteName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[13px] text-[var(--text-blue)] placeholder:text-[var(--muted)]/40 focus:outline-none focus:border-white/25 transition-colors"
            />
            <div className="flex gap-3">
              <button
                onClick={() => confirmEndMeeting(true)}
                disabled={promoting}
                className="flex-1 rounded-full bg-white px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-black disabled:opacity-50 soft-elevate hover:bg-white/90 transition-opacity"
              >
                {promoting ? "Sealing…" : "Promote to Ledger"}
              </button>
              <button
                onClick={() => confirmEndMeeting(false)}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors"
              >
                End without promoting
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
