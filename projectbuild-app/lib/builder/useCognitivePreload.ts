"use client";

/**
 * useCognitivePreload — fetches Builder-specific context before the first
 * agent call in a Builder session.
 *
 * Core assembles its own cognitive context bundle (agent identity, hot/warm
 * memory) internally during run/simple. This hook adds the layer Core doesn't
 * have: what the human is actually looking at right now.
 *
 * Fetched once on BuilderShell mount (not on every message):
 *   - Current git branch (from Companion)
 *   - Scoped root folder (from Companion)
 *
 * Returns `buildPreamble(filePath)` — called by the agent bar before sending
 * the first message of a session. The preamble is prepended to the message
 * body so Core sees it as part of the user turn.
 *
 * Example output injected into the first message:
 *   [Builder Context]
 *   Branch: feature/builder-mode
 *   Root: /Users/ben/Projects/myapp
 *   Open file: src/components/builder/BuilderShell.tsx
 *   ---
 */

import { useEffect, useRef, useState } from "react";
import { COMPANION_BASE } from "@/lib/hooks/useCompanionStatus";

type PreloadState = {
  branch: string | null;
  root: string | null;
  loadedAt: string;
};

type CognitivePreload = {
  ready: boolean;
  loading: boolean;
  /** Call this before the first send of a Builder session. */
  buildPreamble: (openFilePath: string | null) => string;
};

export function useCognitivePreload(projectId: string): CognitivePreload {
  const [state, setState] = useState<PreloadState | null>(null);
  const [loading, setLoading] = useState(true);
  // Track whether preamble has been used — only inject on the first message
  const usedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        // Fetch scope (includes root) and branch in parallel
        const [scopeRes, branchRes] = await Promise.allSettled([
          fetch(`${COMPANION_BASE}/api/scope`).then((r) => r.json()),
          fetch(`${COMPANION_BASE}/api/git/branch`).then((r) => r.json()),
        ]);

        if (cancelled) return;

        const scope =
          scopeRes.status === "fulfilled"
            ? (scopeRes.value as { root?: string })
            : null;
        const git =
          branchRes.status === "fulfilled"
            ? (branchRes.value as { branch?: string | null })
            : null;

        setState({
          branch: git?.branch ?? null,
          root: scope?.root ?? null,
          loadedAt: new Date().toISOString(),
        });
      } catch {
        if (!cancelled) {
          setState({ branch: null, root: null, loadedAt: new Date().toISOString() });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
   
  }, [projectId]); // Preload once per session — not on every re-render

  function buildPreamble(openFilePath: string | null): string {
    // Preamble only on the first message of the session
    if (usedRef.current || !state) return "";
    usedRef.current = true;

    const lines = ["[Builder Context]", `Project: ${projectId}`];
    if (state.branch) lines.push(`Branch: ${state.branch}`);
    if (state.root) lines.push(`Root: ${state.root}`);
    if (openFilePath) lines.push(`Open file: ${openFilePath}`);
    lines.push("---\n");

    return lines.join("\n") + "\n";
  }

  return { ready: !loading && state !== null, loading, buildPreamble };
}
