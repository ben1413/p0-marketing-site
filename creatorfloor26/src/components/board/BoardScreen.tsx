"use client";

import { useEffect, useState } from "react";
import { useBoard } from "@/lib/board/useBoard";
import type { BoardColumnId } from "@/lib/board/types";
import { mapDecisionsToBoardItems } from "@/lib/gaming/mapRemoteBoardCards";
import { useCfProject } from "@/lib/cf/useCfProject";
import { useAuth } from "@/components/auth/AuthProvider";

const COLUMNS: { id: BoardColumnId; label: string }[] = [
  { id: "tasks", label: "Tasks" },
  { id: "decisions", label: "Decisions" },
  { id: "risks", label: "Risks" },
  { id: "done", label: "Done" },
];

export function BoardScreen({ coreProjectId }: { coreProjectId: string }) {
  const { project } = useCfProject(coreProjectId);
  const { idToken } = useAuth();
  const { items, loading, move, add } = useBoard(coreProjectId);
  const [title, setTitle] = useState("");
  const [remoteDecisions, setRemoteDecisions] = useState<
    ReturnType<typeof mapDecisionsToBoardItems>
  >([]);

  const gameId = project?.gameId?.trim();

  useEffect(() => {
    if (!gameId) {
      setRemoteDecisions([]);
      return;
    }
    const headers: Record<string, string> = {};
    if (idToken) headers["Authorization"] = `Bearer ${idToken}`;
    const q = new URLSearchParams({ gameId, limit: "30" });
    void fetch(`/api/v1/gaming/decisions?${q}`, { headers, cache: "no-store" })
      .then((r) => r.json())
      .then((j) => setRemoteDecisions(mapDecisionsToBoardItems(j)))
      .catch(() => setRemoteDecisions([]));
  }, [gameId, idToken]);

  return (
    <div className="space-y-4">
      {remoteDecisions.length > 0 && (
        <section className="rounded-2xl border border-violet-200 bg-violet-50/60 p-4 dark:border-violet-900 dark:bg-violet-950/30">
          <h2 className="text-xs font-bold uppercase tracking-wide text-violet-800 dark:text-violet-300">
            Gaming proposals (Core)
          </h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {remoteDecisions.map((d) => (
              <li
                key={d.id}
                className="rounded-lg border border-violet-200 bg-white px-3 py-2 text-xs dark:border-violet-800 dark:bg-zinc-950"
              >
                {d.title}
              </li>
            ))}
          </ul>
        </section>
      )}

      <form
        className="flex flex-wrap gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim()) return;
          add(title.trim());
          setTitle("");
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task…"
          className="min-w-[200px] flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button
          type="submit"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Add
        </button>
      </form>

      {loading && <p className="text-xs text-zinc-500">Loading board…</p>}

      <div className="grid gap-3 md:grid-cols-4">
        {COLUMNS.map((col) => (
          <div
            key={col.id}
            className="min-h-[200px] rounded-xl border border-zinc-200 bg-zinc-50/80 p-2 dark:border-zinc-800 dark:bg-zinc-950/80"
          >
            <h3 className="mb-2 border-b border-zinc-200 pb-2 text-xs font-bold uppercase tracking-wide text-zinc-500 dark:border-zinc-800">
              {col.label}
            </h3>
            <ul className="space-y-2">
              {items
                .filter((i) => i.column === col.id)
                .map((item) => (
                  <li key={item.id}>
                    <div className="rounded-lg border border-zinc-200 bg-white p-2 text-xs dark:border-zinc-800 dark:bg-zinc-900">
                      <p className="font-medium text-zinc-800 dark:text-zinc-100">
                        {item.title}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {COLUMNS.filter((c) => c.id !== col.id).map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            className="rounded border border-zinc-200 px-1.5 py-0.5 text-[10px] dark:border-zinc-700"
                            onClick={() => move(item.id, c.id)}
                          >
                            → {c.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
