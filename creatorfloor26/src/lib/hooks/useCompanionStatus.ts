"use client";

import { useEffect, useState } from "react";
import { companionPing } from "@/lib/companion";

export function useCompanionStatus(pollMs = 5000) {
  const [connected, setConnected] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function tick() {
      const ok = await companionPing();
      if (!cancelled) {
        setConnected(ok);
        setChecked(true);
      }
    }
    void tick();
    const id = setInterval(tick, pollMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [pollMs]);

  return { connected, checked };
}
