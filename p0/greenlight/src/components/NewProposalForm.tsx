"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { Loader2, AlertCircle } from "lucide-react";

const TYPES = [
  { value: "economy", label: "Economy", desc: "Currency, prices, drops, rewards" },
  { value: "content", label: "Content", desc: "Events, offers, seasonal passes" },
  { value: "matchmaking", label: "Matchmaking", desc: "Skill brackets, queue logic" },
  { value: "moderation", label: "Moderation", desc: "Policy, thresholds, filters" },
  { value: "experiment", label: "Experiment", desc: "A/B test or feature flag" },
  { value: "emergency", label: "Emergency", desc: "Critical fix — expedited path" },
] as const;

const TIERS = [
  { value: "promoted", label: "Standard", desc: "Normal review and approval flow" },
  { value: "critical", label: "Critical", desc: "Heightened scrutiny — blocks autonomous authority" },
] as const;

export function NewProposalForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [type, setType] = useState<typeof TYPES[number]["value"]>("economy");
  const [tier, setTier] = useState<typeof TIERS[number]["value"]>("promoted");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [actions, setActions] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    setError(null);

    let parsedActions: Record<string, unknown> = {};
    if (actions.trim()) {
      try {
        parsedActions = JSON.parse(actions);
      } catch {
        parsedActions = { raw: actions };
      }
    }

    try {
      const res = await fetch("/api/gaming/decisions/propose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          type,
          description: description.trim() || undefined,
          governanceTier: tier,
          proposedActions: parsedActions,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? "Failed to create proposal");
      }

      const data = await res.json();
      router.push(`/proposals/${data.decisionProposalId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* Type */}
      <div className="space-y-2">
        <label className="gl-label">Change type</label>
        <div className="grid grid-cols-3 gap-2">
          {TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setType(t.value)}
              className={clsx(
                "p-3 rounded-lg border text-left transition-all",
                type === t.value
                  ? "border-gl-500 bg-gl-500/10"
                  : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
              )}
            >
              <p className={clsx("text-sm font-medium", type === t.value ? "text-gl-400" : "text-zinc-300")}>
                {t.label}
              </p>
              <p className="text-xs text-zinc-600 mt-0.5 leading-snug">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label className="gl-label" htmlFor="title">Proposal title</label>
        <input
          id="title"
          className="gl-input"
          placeholder="e.g. Increase sword drop rate by 15%"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={200}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="gl-label" htmlFor="description">
          What does this change do, and why?
        </label>
        <textarea
          id="description"
          className="gl-input min-h-[100px] resize-y"
          placeholder="Describe the expected impact and the reason for this change..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>

      {/* Proposed actions */}
      <div className="space-y-2">
        <label className="gl-label" htmlFor="actions">
          Proposed actions{" "}
          <span className="normal-case font-normal text-zinc-600 ml-1">(JSON — optional)</span>
        </label>
        <textarea
          id="actions"
          className="gl-input font-mono text-xs min-h-[80px] resize-y"
          placeholder={'{"dropRate": 0.15, "itemId": "sword_rare"}'}
          value={actions}
          onChange={(e) => setActions(e.target.value)}
          rows={3}
          spellCheck={false}
        />
      </div>

      {/* Governance tier */}
      <div className="space-y-2">
        <label className="gl-label">Governance tier</label>
        <div className="grid grid-cols-2 gap-2">
          {TIERS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTier(t.value)}
              className={clsx(
                "p-3 rounded-lg border text-left transition-all",
                tier === t.value
                  ? t.value === "critical"
                    ? "border-red-700 bg-red-900/20"
                    : "border-gl-500 bg-gl-500/10"
                  : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
              )}
            >
              <p className={clsx(
                "text-sm font-medium",
                tier === t.value
                  ? t.value === "critical" ? "text-red-400" : "text-gl-400"
                  : "text-zinc-300"
              )}>
                {t.label}
              </p>
              <p className="text-xs text-zinc-600 mt-0.5">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-900/20 border border-red-800/60">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {/* Submit */}
      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="gl-btn-primary"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Proposal"
          )}
        </button>
        <p className="text-xs text-zinc-600">
          Proposals go to simulation and approval before deploy.
        </p>
      </div>
    </form>
  );
}
