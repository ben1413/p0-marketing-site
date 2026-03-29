"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CREATOR_KITS, type CreatorKitId, type GamePlatform } from "@/lib/init/types";
import { setStoredBearer, upsertProject } from "@/lib/cf/registry";
import { addCfProject } from "@/lib/cf/firestoreProjects";
import { useAuth } from "@/components/auth/AuthProvider";
import { isFirebaseClientConfigured } from "@/lib/firebase/client";

export default function NewProjectPage() {
  const router = useRouter();
  const { user, idToken } = useAuth();
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState<GamePlatform>("roblox");
  const [kit, setKit] = useState<CreatorKitId>("starter");
  const [bearer, setBearer] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const pasted = bearer.trim();
      if (pasted) setStoredBearer(pasted);

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      const authToken = idToken || pasted;
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

      const res = await fetch("/api/cf/bootstrap", {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: name.trim() || "Untitled game",
          platform,
          kit,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        projectId?: string;
        agentIds?: {
          studio: string;
          design: string;
          game: string;
          codeReview: string;
        };
        error?: string;
      };

      if (!res.ok || !data.ok || !data.projectId) {
        throw new Error(data.error || `Bootstrap failed (${res.status})`);
      }

      const displayName = name.trim() || "Untitled game";

      upsertProject({
        id: data.projectId,
        name: displayName,
        platform,
        kit,
        createdAt: new Date().toISOString(),
        agentIds: data.agentIds,
      });

      if (
        user &&
        isFirebaseClientConfigured() &&
        data.agentIds?.studio &&
        data.agentIds.design &&
        data.agentIds.game &&
        data.agentIds.codeReview
      ) {
        try {
          await addCfProject(user.uid, {
            coreProjectId: data.projectId,
            name: displayName,
            platform,
            kit,
            agentIds: data.agentIds,
          });
        } catch {
          /* Firestore rules or offline — local registry still works */
        }
      }

      router.push(`/platform/projects/${data.projectId}/build`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          New project
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Pick a platform and CreatorKit. Core creates the project, registers kit-aware agents, and seeds memory.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <label className="block text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">Project name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            placeholder="My Roblox game"
          />
        </label>

        <div>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Platform</span>
          <div className="mt-2 flex gap-2">
            {(["roblox", "uefn"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPlatform(p)}
                className={`rounded-lg border px-3 py-2 text-sm capitalize ${
                  platform === p
                    ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                    : "border-zinc-300 dark:border-zinc-700"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">CreatorKit</span>
          <ul className="mt-2 space-y-2">
            {CREATOR_KITS.map((k) => (
              <li key={k.id}>
                <button
                  type="button"
                  onClick={() => setKit(k.id)}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm ${
                    kit === k.id
                      ? "border-zinc-900 ring-1 ring-zinc-900 dark:border-zinc-100 dark:ring-zinc-100"
                      : "border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  <div className="font-medium text-zinc-900 dark:text-zinc-100">{k.name}</div>
                  <div className="mt-0.5 text-xs text-zinc-500">{k.blurb}</div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <label className="block text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">
            Override: paste Firebase ID token if not signed in here (or use{" "}
            <code className="text-xs">P0_CORE_BEARER_TOKEN</code> on server)
          </span>
          <input
            value={bearer}
            onChange={(e) => setBearer(e.target.value)}
            type="password"
            autoComplete="off"
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-900"
            placeholder="Optional when signed in with Firebase"
          />
        </label>

        {err && <p className="text-sm text-red-600 dark:text-red-400">{err}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
        >
          {loading ? "Creating…" : "Create on Core"}
        </button>
      </form>
    </div>
  );
}
