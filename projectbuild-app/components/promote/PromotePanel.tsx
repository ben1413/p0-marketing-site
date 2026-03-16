"use client";

import { useState } from "react";
import type { ThreadMessage, AuthorityMode, LedgerItemType, TruthPosture } from "@/types";

interface PromotePanelProps {
  message: ThreadMessage;
  projectId: string;
  runId: string;
  onClose: () => void;
  onSealed: () => void;
}

const ITEM_TYPES: LedgerItemType[] = ["decision", "artifact", "task", "note", "code"];

export function PromotePanel({ message, projectId, runId, onClose, onSealed }: PromotePanelProps) {
  const [summary, setSummary] = useState(message.text.slice(0, 280));
  const [type, setType] = useState<LedgerItemType>("decision");
  const [authorityMode, setAuthorityMode] = useState<AuthorityMode>("human_led");
  const [tags, setTags] = useState("");
  const [promoting, setPromoting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const truthPosture: TruthPosture | undefined = message.truthPosture;
  // unknown posture disables agent_autonomous — both here and enforced server-side
  const availableAuthorityModes: AuthorityMode[] =
    truthPosture === "unknown"
      ? ["human_led", "human_in_the_loop"]
      : ["human_led", "human_in_the_loop", "agent_autonomous"];

  const postureLabel = truthPosture
    ? { known: "● KNOWN", inferred: "◐ INFERRED", unknown: "○ UNKNOWN" }[truthPosture]
    : null;
  const postureColor = truthPosture
    ? { known: "text-emerald-400/70", inferred: "text-amber-400/70", unknown: "text-white/30" }[truthPosture]
    : "";

  const handlePromote = async () => {
    if (!summary.trim() || promoting) return;
    setPromoting(true);
    setError(null);
    try {
      const res = await fetch("/api/agent/promote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: summary.trim(),
          authorityMode,
          actor: "user",
          type,
          tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
          projectId,
          runId,
          truthPosture,
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) throw new Error(data.error || "Promote failed");
      onSealed();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Promote failed");
    } finally {
      setPromoting(false);
    }
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md rounded-[24px] border border-white/10 bg-[var(--panel)] shadow-2xl px-7 py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/60">
            Promote to Ledger
          </span>
          {postureLabel && (
            <span className={`text-[9px] font-bold tracking-widest ${postureColor}`}>
              {postureLabel}
            </span>
          )}
        </div>

        {/* Summary */}
        <div>
          <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-[var(--muted)] block mb-1.5">
            Summary
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={4}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[13px] text-[var(--text-blue)] focus:outline-none focus:border-white/25 transition-colors"
          />
        </div>

        {/* Type + Authority mode */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-[var(--muted)] block mb-1.5">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as LedgerItemType)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-[var(--text-blue)] focus:outline-none focus:border-white/25"
            >
              {ITEM_TYPES.map((t) => (
                <option key={t} value={t} className="bg-[#0f141b]">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-[var(--muted)] block mb-1.5">
              Authority Mode
            </label>
            <select
              value={authorityMode}
              onChange={(e) => setAuthorityMode(e.target.value as AuthorityMode)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-[var(--text-blue)] focus:outline-none focus:border-white/25"
            >
              {availableAuthorityModes.map((m) => (
                <option key={m} value={m} className="bg-[#0f141b]">
                  {m.replace(/_/g, " ")}
                </option>
              ))}
            </select>
            {truthPosture === "unknown" && (
              <p className="text-[9px] text-[var(--muted)]/60 mt-1">
                agent_autonomous unavailable — unknown posture
              </p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-[var(--muted)] block mb-1.5">
            Tags (comma-separated, optional)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. vendor, q2, risk"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-[var(--text-blue)] placeholder:text-[var(--muted)]/40 focus:outline-none focus:border-white/25"
          />
        </div>

        {error && (
          <p className="text-[11px] text-red-400">{error}</p>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={handlePromote}
            disabled={promoting || !summary.trim()}
            className="flex-1 rounded-full bg-white px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-black disabled:opacity-40 soft-elevate hover:bg-white/90 transition-opacity"
          >
            {promoting ? "Sealing…" : "Seal to Ledger"}
          </button>
          <button
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
