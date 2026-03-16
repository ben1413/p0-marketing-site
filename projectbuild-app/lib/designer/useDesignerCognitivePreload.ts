"use client";

/**
 * useDesignerCognitivePreload — fetches Designer-specific context before
 * the first agent call in a Designer session.
 *
 * Same pattern as useCognitivePreload (Builder Mode), different context:
 *   - Current git branch (from Companion)
 *   - Scoped root folder (from Companion)
 *   - Active designer mode (wireframe / render / prototype)
 *   - Current canvas element count
 *
 * Returns `buildPreamble(mode, elementCount)` — called before the first
 * message of a Designer session. Fires only once (gated by usedRef).
 *
 * Example preamble injected into the first message:
 *   [Designer Context]
 *   Project: my-project
 *   Branch: feature/onboarding-redesign
 *   Root: /Users/ben/Projects/myapp
 *   Mode: wireframe
 *   Canvas elements: 4
 *   ---
 */

import { useEffect, useRef, useState } from "react";
import { COMPANION_BASE } from "@/lib/hooks/useCompanionStatus";
import type { DesignerMode } from "@/types";

type PreloadState = {
  branch: string | null;
  root: string | null;
  loadedAt: string;
};

type DesignerCognitivePreload = {
  ready: boolean;
  loading: boolean;
  /** Call before the first send of a Designer session. */
  buildPreamble: (mode: DesignerMode, elementCount: number) => string;
};

export function useDesignerCognitivePreload(projectId: string): DesignerCognitivePreload {
  const [state, setState] = useState<PreloadState | null>(null);
  const [loading, setLoading] = useState(true);
  const usedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
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
   
  }, [projectId]);

  function buildPreamble(mode: DesignerMode, elementCount: number): string {
    if (usedRef.current || !state) return "";
    usedRef.current = true;

    const lines = ["[Designer Context]", `Project: ${projectId}`];
    if (state.branch) lines.push(`Branch: ${state.branch}`);
    if (state.root) lines.push(`Root: ${state.root}`);
    lines.push(`Mode: ${mode}`);
    lines.push(`Canvas elements: ${elementCount}`);
    lines.push("---\n");

    return lines.join("\n") + "\n";
  }

  return { ready: !loading && state !== null, loading, buildPreamble };
}
