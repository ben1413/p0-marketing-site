"use client";

/**
 * DesignerPromoteModal — same 3-scope pattern as BuilderPromoteModal.
 *
 * Three scope paths:
 *   personal  → pb_builder_personal
 *   team      → pb_builder_team
 *   ledger    → formal ledger promote via /api/v1/builder/promote
 *
 * Promote artifact includes:
 *   - Canvas state JSON snapshot (canvasElements)
 *   - Canvas PNG screenshot (canvasSnapshot via toDataURL)
 *   - Agent conversation summary (summary field)
 *   - Promote origin: designer_mode
 *   - createdBy attribution for every element is already in canvasElements
 */

import { useEffect, useState } from "react";
import { companionBranch } from "@/lib/companion";
import type { CanvasElement } from "@/types";

type Scope = "personal" | "team" | "ledger";
type Authority = "human-led" | "hitl" | "agent-autonomous";

interface DesignerPromoteModalProps {
  projectId: string;
  userId: string;
  canvasElements: CanvasElement[];
  canvasSnapshot: string | null;
  runId: string;
  onClose: () => void;
  onQueued: (promoteArtifactId: string, scope: Scope) => void;
}

const SCOPE_LABELS: Record<Scope, { label: string; description: string }> = {
  personal: {
    label: "Personal",
    description: "Save canvas state to your working memory. Not visible to the team.",
  },
  team: {
    label: "Team bucket",
    description: "Share design for visibility. Low commitment — just an idea in the room.",
  },
  ledger: {
    label: "Finished work",
    description: "Queue for team approval at the next meeting. Goes to Ledger when approved.",
  },
};

const AUTHORITY_LABELS: Record<Authority, string> = {
  "human-led": "Human-led",
  hitl: "Human in the loop",
  "agent-autonomous": "Agent autonomous",
};

export function DesignerPromoteModal({
  projectId,
  userId,
  canvasElements,
  canvasSnapshot,
  runId,
  onClose,
  onQueued,
}: DesignerPromoteModalProps) {
  const [scope, setScope] = useState<Scope>("team");
  const [authority, setAuthority] = useState<Authority>("human-led");
  const [summary, setSummary] = useState(
    `Designer canvas — ${canvasElements.length} elements`
  );
  const [branch, setBranch] = useState("unknown");
  const [promoting, setPromoting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    companionBranch().then((b) => { if (b) setBranch(b); });
  }, []);

  useEffect(() => {
    if (scope !== "ledger") setAuthority("human-led");
  }, [scope]);

  async function handlePromote() {
    if (!summary.trim() || promoting) return;
    setPromoting(true);
    setError(null);

    const now = new Date().toISOString();

    try {
      const res = await fetch("/api/v1/builder/promote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          userId,
          branch,
          scope,
          authority,
          summary: summary.trim(),
          filePaths: [],
          preparedByAgent: canvasElements.some((el) => el.createdBy === "agent"),
          checkpointFrom: now,
          checkpointTo: now,
          // Designer-specific fields
          designerMode: true,
          runId,
          canvasElementCount: canvasElements.length,
          canvasSnapshot: canvasSnapshot ?? undefined,
        }),
      });

      const data = (await res.json()) as { ok: boolean; promoteArtifactId?: string; error?: string };
      if (!data.ok) throw new Error(data.error ?? "Promote failed");

      onQueued(data.promoteArtifactId!, scope);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Promote failed");
    } finally {
      setPromoting(false);
    }
  }

  return (
    <div className="absolute inset-0 z-60 flex items-center justify-center bg-black/60 rounded-xl">
      <div
        className="relative w-full max-w-sm mx-4 rounded-2xl border border-white/10 bg-[var(--panel)] shadow-2xl px-6 py-5 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-violet-400/60 font-mono">
            Promote Design
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono text-white/30">
              {canvasElements.length} elements
            </span>
            <span className="text-[9px] font-mono text-white/25">{branch}</span>
          </div>
        </div>

        {/* Canvas element attribution summary */}
        {canvasElements.length > 0 && (
          <div className="flex items-center gap-3 rounded-xl bg-white/3 border border-white/8 px-3 py-2">
            <div className="text-[10px] font-mono text-white/40">
              <span className="text-emerald-400/60">{canvasElements.filter((e) => e.createdBy === "human").length} human</span>
              {" · "}
              <span className="text-amber-400/60">{canvasElements.filter((e) => e.createdBy === "agent").length} agent</span>
            </div>
            {canvasSnapshot && (
              <div className="ml-auto text-[9px] text-white/25 font-mono">screenshot ✓</div>
            )}
          </div>
        )}

        {/* Scope selector */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/40 block font-mono">
            Destination
          </label>
          <div className="flex flex-col gap-2">
            {(["personal", "team", "ledger"] as Scope[]).map((s) => {
              const cfg = SCOPE_LABELS[s];
              const active = scope === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setScope(s)}
                  className={`text-left rounded-xl border px-3 py-2.5 transition-colors ${
                    active
                      ? s === "ledger"
                        ? "border-emerald-500/30 bg-emerald-500/8 text-emerald-300"
                        : s === "team"
                        ? "border-amber-500/30 bg-amber-500/8 text-amber-300"
                        : "border-white/20 bg-white/5 text-white/70"
                      : "border-white/8 text-white/40 hover:border-white/15 hover:text-white/55"
                  }`}
                >
                  <div className="text-[11px] font-bold font-mono">{cfg.label}</div>
                  <div className="text-[10px] text-white/40 mt-0.5">{cfg.description}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Authority — ledger only */}
        {scope === "ledger" && (
          <div>
            <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/40 block mb-1.5 font-mono">
              Authority
            </label>
            <div className="flex gap-2">
              {(["human-led", "hitl", "agent-autonomous"] as Authority[]).map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAuthority(a)}
                  className={`flex-1 rounded-lg border px-2 py-1.5 text-[9px] font-bold tracking-wide uppercase transition-colors font-mono ${
                    authority === a
                      ? "border-white/25 bg-white/8 text-white/80"
                      : "border-white/8 text-white/30 hover:border-white/15"
                  }`}
                >
                  {AUTHORITY_LABELS[a]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        <div>
          <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/40 block mb-1.5 font-mono">
            Summary
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-[12px] font-mono text-white/70 focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>

        {error && <p className="text-[11px] text-red-400/80 font-mono">{error}</p>}

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={handlePromote}
            disabled={promoting || !summary.trim()}
            className={`flex-1 rounded-full px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors disabled:opacity-40 font-mono ${
              scope === "ledger"
                ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30"
                : scope === "team"
                ? "bg-amber-500/20 border border-amber-500/30 text-amber-400 hover:bg-amber-500/30"
                : "bg-white/10 border border-white/15 text-white/60 hover:bg-white/15"
            }`}
          >
            {promoting
              ? "Queuing…"
              : scope === "ledger"
              ? "Queue for approval"
              : scope === "team"
              ? "Share with team"
              : "Save to personal"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:bg-white/10 transition-colors font-mono"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
