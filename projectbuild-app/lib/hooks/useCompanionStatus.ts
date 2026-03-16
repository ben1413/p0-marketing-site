"use client";

import { useState, useEffect } from "react";

const COMPANION_BASE =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_COMPANION_URL
    ? process.env.NEXT_PUBLIC_COMPANION_URL.replace(/\/$/, "")
    : "http://localhost:3001";

export type CompanionStatus = {
  connected: boolean;
  allowed: boolean;
  root: string | null;
  error: string | null;
};

export function useCompanionStatus(): CompanionStatus {
  const [connected, setConnected] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [root, setRoot] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${COMPANION_BASE}/api/scope`, { method: "GET" })
      .then((res) => res.json())
      .then((data: { ok?: boolean; allowed?: boolean; root?: string }) => {
        if (cancelled) return;
        setConnected(true);
        setAllowed(Boolean(data?.allowed));
        setRoot(typeof data?.root === "string" ? data.root : null);
        setError(null);
      })
      .catch(() => {
        if (!cancelled) {
          setConnected(false);
          setAllowed(false);
          setRoot(null);
          setError("Companion not reachable");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { connected, allowed, root, error };
}

export { COMPANION_BASE };
