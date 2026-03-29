"use client";

import Link from "next/link";
import { useState } from "react";
import {
  upsertProject,
  type RegisteredProject,
} from "@/lib/cf/registry";
import { useCfProjectsList } from "@/lib/cf/useCfProjectsList";

export default function PlatformHomePage() {
  const { rows, loading } = useCfProjectsList();
  const [manualId, setManualId] = useState("");
  const [manualName, setManualName] = useState("");

  function addManual(e: React.FormEvent) {
    e.preventDefault();
    const id = manualId.trim();
    if (!id) return;
    const p: RegisteredProject = {
      id,
      name: manualName.trim() || id,
      platform: "roblox",
      kit: "starter",
      createdAt: new Date().toISOString(),
    };
    upsertProject(p);
    setManualId("");
    setManualName("");
    window.location.reload();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Home
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Your builds and live games in one place — backed by P0 Core.
          </p>
        </div>
        <Link
          href="/platform/projects/new"
          className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          New project
        </Link>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Your projects
        </h2>
        {loading ? (
          <p className="mt-3 text-sm text-zinc-500">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500">
            No projects yet. Create one with a CreatorKit, or add an existing Core project ID below.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {rows.map((p) => (
              <li key={p.coreProjectId}>
                <Link
                  href={`/platform/projects/${p.coreProjectId}`}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 px-4 py-3 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                >
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {p.name}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {p.kit} · {p.platform}
                    {p.status === "live" ? " · live" : ""}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Add existing Core project
        </h2>
        <p className="mt-1 text-xs text-zinc-500">
          Link a Core project id for quick access (full Firestore row created on next bootstrap from an account).
        </p>
        <form onSubmit={addManual} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="flex-1 text-xs">
            <span className="text-zinc-500">Project ID</span>
            <input
              value={manualId}
              onChange={(e) => setManualId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              placeholder="proj_abc123"
            />
          </label>
          <label className="flex-1 text-xs">
            <span className="text-zinc-500">Display name</span>
            <input
              value={manualName}
              onChange={(e) => setManualName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              placeholder="My game"
            />
          </label>
          <button
            type="submit"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-900"
          >
            Add
          </button>
        </form>
      </section>
    </div>
  );
}
