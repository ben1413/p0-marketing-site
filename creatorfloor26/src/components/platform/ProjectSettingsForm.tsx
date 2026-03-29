"use client";

import { useEffect, useState } from "react";
import { useCfProject } from "@/lib/cf/useCfProject";
import { updateCfProject } from "@/lib/cf/firestoreProjects";
import { GDDEditor } from "@/components/gdd/GDDEditor";

export function ProjectSettingsForm({ coreProjectId }: { coreProjectId: string }) {
  const { project, loading } = useCfProject(coreProjectId);
  const [gameId, setGameId] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (project?.gameId) setGameId(project.gameId);
  }, [project?.gameId]);

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Live experience
        </h2>
        <p className="mt-1 text-xs text-zinc-500">
          Set your Roblox universe id or place id to power Live Ops and gaming-scoped
          Promote. Data flows through P0 Core — CF does not replace Roblox analytics.
        </p>
        {loading ? (
          <p className="mt-3 text-sm text-zinc-500">Loading…</p>
        ) : (
          <form
            className="mt-4 space-y-3"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!project?.firestoreDocId) {
                setMsg(
                  "Firestore row missing — create this project while signed in with Firebase, or it only exists in local storage."
                );
                return;
              }
              setSaving(true);
              setMsg(null);
              try {
                await updateCfProject(project.firestoreDocId, {
                  gameId: gameId.trim() || undefined,
                  status: gameId.trim() ? "live" : "building",
                });
                setMsg("Saved.");
              } catch (err) {
                setMsg(err instanceof Error ? err.message : "Save failed");
              } finally {
                setSaving(false);
              }
            }}
          >
            <label className="block text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">gameId</span>
              <input
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900"
                placeholder="Roblox universe or place id"
              />
            </label>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            {msg && <p className="text-sm text-zinc-600 dark:text-zinc-400">{msg}</p>}
          </form>
        )}
      </section>

      <section className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Rojo & Companion
        </h2>
        <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
          Run <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-900">npm run companion</code>{" "}
          from the repo root, then POST your Rojo project root to Companion{" "}
          <code className="text-xs">/api/scope</code>. The Build file tree maps your on-disk{" "}
          <code className="text-xs">default.project.json</code> layout.
        </p>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Roblox Open Cloud
        </h2>
        <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
          Server-side adapter uses <code className="text-xs">ROBLOX_API_KEY</code> in{" "}
          <code className="text-xs">.env.local</code> for Open Cloud calls (see{" "}
          <code className="text-xs">src/lib/roblox/openCloud.ts</code>).
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Game Design Document
        </h2>
        <GDDEditor coreProjectId={coreProjectId} />
      </section>
    </div>
  );
}
