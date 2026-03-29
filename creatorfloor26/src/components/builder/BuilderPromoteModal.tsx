"use client";

import { useEffect, useState } from "react";
import { companionBranch } from "@/lib/companion";
import { useAuth } from "@/components/auth/AuthProvider";

type Scope = "personal" | "team" | "ledger" | "gaming";

export function BuilderPromoteModal({
  open,
  onClose,
  coreProjectId,
  userId,
  gameId,
  filePaths,
  summaryDefault,
  onQueued,
}: {
  open: boolean;
  onClose: () => void;
  coreProjectId: string;
  userId: string;
  gameId?: string;
  filePaths: string[];
  summaryDefault: string;
  onQueued: (id: string, scope: Scope) => void;
}) {
  const { idToken } = useAuth();
  const [scope, setScope] = useState<Scope>("personal");
  const [authority, setAuthority] = useState<"human-led" | "hitl" | "agent-autonomous">(
    "human-led"
  );
  const [summary, setSummary] = useState(summaryDefault);
  const [branch, setBranch] = useState("main");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setSummary(summaryDefault);
      setErr(null);
      void companionBranch().then((b) => {
        if (b) setBranch(b);
      });
    }
  }, [open, summaryDefault]);

  useEffect(() => {
    if (scope !== "ledger" && scope !== "gaming") setAuthority("human-led");
  }, [scope]);

  if (!open) return null;

  async function submit() {
    setBusy(true);
    setErr(null);
    try {
      const now = new Date().toISOString();
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (idToken) headers["Authorization"] = `Bearer ${idToken}`;

      const res = await fetch("/api/v1/builder/promote", {
        method: "POST",
        headers,
        body: JSON.stringify({
          projectId: coreProjectId,
          userId,
          branch,
          scope,
          authority,
          summary: summary.trim() || summaryDefault,
          filePaths,
          preparedByAgent: false,
          checkpointFrom: now,
          checkpointTo: now,
          gameId: scope === "gaming" ? gameId?.trim() || undefined : undefined,
          governanceTier: scope === "gaming" ? "promoted" : undefined,
          gamingDecisionType: scope === "gaming" ? "content" : undefined,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        promoteArtifactId?: string;
        error?: string;
      };
      if (!data.ok) throw new Error(data.error || `Promote failed (${res.status})`);
      onQueued(data.promoteArtifactId!, scope);
      onClose();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Promote failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Promote
        </h2>
        <p className="mt-1 text-xs text-zinc-500">
          Seal to Core Ledger, team bucket, or open a gaming proposal for live ops.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {(
            [
              ["personal", "Personal"],
              ["team", "Team"],
              ["ledger", "Ledger"],
              ...(gameId?.trim() ? ([["gaming", "Gaming"]] as const) : []),
            ] as const
          ).map(([s, label]) => (
            <button
              key={s}
              type="button"
              onClick={() => setScope(s)}
              className={`rounded-lg border px-3 py-1.5 text-sm ${
                scope === s
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                  : "border-zinc-300 dark:border-zinc-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {(scope === "ledger" || scope === "gaming") && (
          <div className="mt-3">
            <span className="text-xs text-zinc-500">Authority</span>
            <select
              value={authority}
              onChange={(e) =>
                setAuthority(e.target.value as typeof authority)
              }
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-2 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-900"
            >
              <option value="human-led">Human-led</option>
              <option value="hitl">Human in the loop</option>
              <option value="agent-autonomous">Agent autonomous</option>
            </select>
          </div>
        )}

        <label className="mt-4 block text-sm">
          <span className="text-zinc-500">Summary</span>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>

        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-600"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={submit}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
          >
            {busy ? "Sealing…" : "Promote"}
          </button>
        </div>
      </div>
    </div>
  );
}
