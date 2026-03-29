"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

export function LedgerScreen({ coreProjectId }: { coreProjectId: string }) {
  const { idToken } = useAuth();
  const [raw, setRaw] = useState<unknown>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const headers: Record<string, string> = {};
    if (idToken) headers["Authorization"] = `Bearer ${idToken}`;
    const q = new URLSearchParams({ projectId: coreProjectId, limit: "40" });
    void fetch(`/api/v1/ledger/ui?${q}`, { headers, cache: "no-store" })
      .then((r) => r.json())
      .then(setRaw)
      .catch((e) => setErr(e instanceof Error ? e.message : "Failed"));
  }, [coreProjectId, idToken]);

  if (err) {
    return <p className="text-sm text-red-600">{err}</p>;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Sealed evaluations and ledger items from Core — authority and governance
        tiers appear here when your project uses Promote.
      </p>
      <pre className="max-h-[480px] overflow-auto rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-xs dark:border-zinc-800 dark:bg-zinc-900">
        {raw ? JSON.stringify(raw, null, 2) : "Loading…"}
      </pre>
    </div>
  );
}
