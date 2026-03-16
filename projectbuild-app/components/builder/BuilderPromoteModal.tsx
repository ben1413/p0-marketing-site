"use client";

/**
 * BuilderPromoteModal — triggered by PROMOTE on an agent bubble.
 *
 * Three scope paths:
 *   personal  → pb_builder_personal  (your own working memory, no team visibility)
 *   team      → pb_builder_team      (shared visibility bucket, low commitment)
 *   ledger    → formal ledger promote (requires team approval at next meeting)
 *
 * Authority modes available per scope:
 *   personal / team  → human-led only (no ceremony needed)
 *   ledger           → human-led | hitl | agent-autonomous
 *
 * Branch is fetched lazily from the Companion on open.
 * filePaths defaults to the currently open file in the editor (passed as prop).
 */

import { useEffect, useState } from "react";
import { companionBranch } from "@/lib/companion";
import type { ThreadMessage } from "@/types";

type Scope = "personal" | "team" | "ledger";
type Authority = "human-led" | "hitl" | "agent-autonomous";

interface BuilderPromoteModalProps {
  message: ThreadMessage;
  projectId: string;
  userId: string;
  activeFilePath: string | null;
  onClose: () => void;
  onQueued: (promoteArtifactId: string, scope: Scope) => void;
}

const SCOPE_LABELS: Record<Scope, { label: string; description: string; color: string }> = {
  personal: {
    label: "Personal",
    description: "Save to your own working memory. Not visible to the team.",
    color: "border-white/20 text-[var(--text-blue)]/70",
  },
  team: {
    label: "Team bucket",
    description: "Share for visibility. Low commitment — just an idea in the room.",
    color: "border-amber-500/30 text-amber-400/80",
  },
  ledger: {
    label: "Finished work",
    description: "Queue for team approval at the next meeting. Goes to Ledger when approved.",
    color: "border-emerald-500/30 text-emerald-400/80",
  },
};

const AUTHORITY_LABELS: Record<Authority, string> = {
  "human-led": "Human-led",
  hitl: "Human in the loop",
  "agent-autonomous": "Agent autonomous",
};

export function BuilderPromoteModal({
  message,
  projectId,
  userId,
  activeFilePath,
  onClose,
  onQueued,
}: BuilderPromoteModalProps) {
  const [scope, setScope] = useState<Scope>("team");
  const [authority, setAuthority] = useState<Authority>("human-led");
  const [summary, setSummary] = useState(message.text.slice(0, 500));
  const [branch, setBranch] = useState<string>("unknown");
  const [promoting, setPromoting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch current branch from Companion on open
  useEffect(() => {
    companionBranch().then((b) => {
      if (b) setBranch(b);
    });
  }, []);

  // Reset authority to human-led when leaving ledger scope
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
          filePaths: activeFilePath ? [activeFilePath] : [],
          preparedByAgent: message.authorType === "agent",
          checkpointFrom: now,
          checkpointTo: now,
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
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/60">
            Promote
          </span>
          <span className="text-[9px] text-[var(--muted)]/50 font-mono">
            {branch}
          </span>
        </div>

        {/* Scope selector */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-[var(--muted)] block">
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
                      ? `${cfg.color} bg-white/5`
                      : "border-white/8 text-[var(--muted)]/50 hover:border-white/15 hover:text-[var(--muted)]/70"
                  }`}
                >
                  <div className={`text-[11px] font-bold ${active ? "" : ""}`}>
                    {cfg.label}
                  </div>
                  <div className="text-[10px] text-[var(--muted)]/50 mt-0.5">
                    {cfg.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Authority — only for ledger scope */}
        {scope === "ledger" && (
          <div>
            <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-[var(--muted)] block mb-1.5">
              Authority
            </label>
            <div className="flex gap-2">
              {(["human-led", "hitl", "agent-autonomous"] as Authority[]).map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAuthority(a)}
                  className={`flex-1 rounded-lg border px-2 py-1.5 text-[9px] font-bold tracking-wide uppercase transition-colors ${
                    authority === a
                      ? "border-white/25 bg-white/8 text-[var(--text-blue)]"
                      : "border-white/8 text-[var(--muted)]/40 hover:border-white/15"
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
          <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-[var(--muted)] block mb-1.5">
            Summary
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-[12px] text-[var(--text-blue)] focus:outline-none focus:border-white/25 transition-colors"
          />
        </div>

        {/* Files */}
        {activeFilePath && (
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-[var(--muted)]/40 uppercase tracking-wider">File</span>
            <span className="text-[10px] font-mono text-amber-400/60 truncate">{activeFilePath}</span>
          </div>
        )}

        {error && (
          <p className="text-[11px] text-red-400/80">{error}</p>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={handlePromote}
            disabled={promoting || !summary.trim()}
            className={`flex-1 rounded-full px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors disabled:opacity-40 ${
              scope === "ledger"
                ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30"
                : scope === "team"
                ? "bg-amber-500/20 border border-amber-500/30 text-amber-400 hover:bg-amber-500/30"
                : "bg-white/10 border border-white/15 text-[var(--text-blue)] hover:bg-white/15"
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
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
