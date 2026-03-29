"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

export type GamingMetricsSnapshot = {
  moderationOpen: number;
  incidentsOpen: number;
  decisionsRecent: number;
  loading: boolean;
  error: string | null;
};

export function useGamingLiveMetrics(
  gameId: string | undefined,
  enabled: boolean,
  pollMs = 30_000
): GamingMetricsSnapshot {
  const { idToken } = useAuth();
  const [moderationOpen, setModerationOpen] = useState(0);
  const [incidentsOpen, setIncidentsOpen] = useState(0);
  const [decisionsRecent, setDecisionsRecent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOnce = useCallback(async () => {
    if (!enabled || !gameId?.trim()) return;
    setLoading(true);
    setError(null);
    const q = new URLSearchParams({ gameId: gameId.trim(), limit: "50" });
    const headers: Record<string, string> = {};
    if (idToken) headers["Authorization"] = `Bearer ${idToken}`;

    try {
      const [modRes, incRes, decRes] = await Promise.all([
        fetch(`/api/v1/gaming/moderation/queue?${q}`, { headers, cache: "no-store" }),
        fetch(`/api/v1/gaming/incidents?${q}`, { headers, cache: "no-store" }),
        fetch(`/api/v1/gaming/decisions?${q}`, { headers, cache: "no-store" }),
      ]);
      const mod = (await modRes.json().catch(() => ({}))) as {
        items?: unknown[];
        cases?: unknown[];
      };
      const inc = (await incRes.json().catch(() => ({}))) as { items?: unknown[] };
      const dec = (await decRes.json().catch(() => ({}))) as { items?: unknown[] };

      setModerationOpen((mod.items ?? mod.cases ?? []).length);
      setIncidentsOpen((inc.items ?? []).filter(Boolean).length);
      setDecisionsRecent((dec.items ?? []).length);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Metrics failed");
    } finally {
      setLoading(false);
    }
  }, [enabled, gameId, idToken]);

  useEffect(() => {
    if (!enabled || !gameId?.trim()) return;
    void fetchOnce();
    const id = setInterval(() => void fetchOnce(), pollMs);
    return () => clearInterval(id);
  }, [enabled, gameId, pollMs, fetchOnce]);

  return {
    moderationOpen,
    incidentsOpen,
    decisionsRecent,
    loading,
    error,
  };
}
