"use client";

import { useCallback, useEffect, useState } from "react";
import {
  emptyGdd,
  type GameDesignDocument,
  type GddEconomyCurrency,
} from "@/lib/gdd/schema";
import { useAuth } from "@/components/auth/AuthProvider";

export function GDDEditor({ coreProjectId }: { coreProjectId: string }) {
  const { idToken } = useAuth();
  const [gdd, setGdd] = useState<GameDesignDocument>(emptyGdd);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const brainKey = `cf_gdd_${coreProjectId}`;

  const load = useCallback(async () => {
    setLoading(true);
    const headers: Record<string, string> = {};
    if (idToken) headers["Authorization"] = `Bearer ${idToken}`;
    try {
      const res = await fetch(
        `/api/v1/brain/recall?key=${encodeURIComponent(brainKey)}&memoryType=core`,
        { headers, cache: "no-store" }
      );
      const data = (await res.json().catch(() => ({}))) as {
        content?: string;
        doc?: { content?: string };
      };
      const raw = data.content ?? data.doc?.content;
      if (raw) {
        const parsed = JSON.parse(raw) as GameDesignDocument;
        setGdd({ ...emptyGdd(), ...parsed });
      } else setGdd(emptyGdd());
    } catch {
      setGdd(emptyGdd());
    } finally {
      setLoading(false);
    }
  }, [brainKey, idToken]);

  useEffect(() => {
    void load();
  }, [load]);

  async function save() {
    setSaving(true);
    setStatus(null);
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (idToken) headers["Authorization"] = `Bearer ${idToken}`;
    try {
      const res = await fetch("/api/v1/brain/put", {
        method: "POST",
        headers,
        body: JSON.stringify({
          key: brainKey,
          content: JSON.stringify(gdd),
          memoryType: "core",
          persona: "CreatorFloor",
          jobTitle: "GDD",
        }),
      });
      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      setStatus("Saved to Core Brain — agents and Live Ops can consume this.");
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function addCurrency() {
    const c: GddEconomyCurrency = {
      id: `cur_${Date.now()}`,
      name: "New currency",
    };
    setGdd((g) => ({
      ...g,
      economy: { ...g.economy, currencies: [...g.economy.currencies, c] },
    }));
  }

  if (loading) {
    return <p className="text-sm text-zinc-500">Loading GDD…</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Living schema for economy, content, player state, and governance — Promote
          significant changes via Builder or Board.
        </p>
        <button
          type="button"
          disabled={saving}
          onClick={() => void save()}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          {saving ? "Saving…" : "Save to Brain"}
        </button>
      </div>
      {status && (
        <p className="text-sm text-emerald-700 dark:text-emerald-400">{status}</p>
      )}

      <section className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Economy</h2>
          <button
            type="button"
            onClick={addCurrency}
            className="text-xs text-zinc-600 underline dark:text-zinc-400"
          >
            + Currency
          </button>
        </div>
        <ul className="mt-3 space-y-2">
          {gdd.economy.currencies.map((c, i) => (
            <li key={c.id} className="flex flex-wrap gap-2">
              <input
                value={c.name}
                onChange={(e) => {
                  const next = [...gdd.economy.currencies];
                  next[i] = { ...c, name: e.target.value };
                  setGdd((g) => ({
                    ...g,
                    economy: { ...g.economy, currencies: next },
                  }));
                }}
                className="rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-900"
              />
            </li>
          ))}
        </ul>
        <label className="mt-3 block text-xs">
          Notes
          <textarea
            value={gdd.economy.notes ?? ""}
            onChange={(e) =>
              setGdd((g) => ({
                ...g,
                economy: { ...g.economy, notes: e.target.value },
              }))
            }
            className="mt-1 w-full rounded-lg border border-zinc-300 p-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            rows={2}
          />
        </label>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="text-sm font-semibold">Content</h2>
        <label className="mt-2 block text-xs">
          Levels (one per line)
          <textarea
            value={gdd.content.levels.join("\n")}
            onChange={(e) =>
              setGdd((g) => ({
                ...g,
                content: {
                  ...g.content,
                  levels: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                },
              }))
            }
            className="mt-1 w-full rounded-lg border border-zinc-300 p-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            rows={3}
          />
        </label>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="text-sm font-semibold">Player state (segment keys)</h2>
        <textarea
          value={gdd.player.fields.join("\n")}
          onChange={(e) =>
            setGdd((g) => ({
              ...g,
              player: {
                ...g.player,
                fields: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
              },
            }))
          }
          placeholder="premium&#10;session_count&#10;last_purchase_at"
          className="mt-2 w-full rounded-lg border border-zinc-300 p-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900"
          rows={4}
        />
      </section>

      <section className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="text-sm font-semibold">Governance</h2>
        <textarea
          value={gdd.governance.moderationNotes ?? ""}
          onChange={(e) =>
            setGdd((g) => ({
              ...g,
              governance: { ...g.governance, moderationNotes: e.target.value },
            }))
          }
          placeholder="Moderation policy notes…"
          className="mt-2 w-full rounded-lg border border-zinc-300 p-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          rows={3}
        />
      </section>
    </div>
  );
}
