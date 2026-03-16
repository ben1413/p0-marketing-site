"use client";

import { useState } from "react";
import { BuilderShell } from "./BuilderShell";

const RUN_ID_KEY = (projectId: string) => `pb_builder_runId_${projectId}`;

function createBuilderRunId(projectId: string): string {
  if (typeof window === "undefined") return `builder_${projectId}_${Date.now()}`;
  // Resume existing builder run for this project, or create a new one.
  // Only called when Builder is actually opened — not on page load.
  const stored = window.localStorage.getItem(RUN_ID_KEY(projectId));
  if (stored) return stored;
  const newId = `builder_${projectId}_${Date.now()}`;
  window.localStorage.setItem(RUN_ID_KEY(projectId), newId);
  return newId;
}

interface BuilderButtonAndShellProps {
  projectId: string;
  runId?: string; // Room passes its own runId; Board/Ledger create lazily on open
}

export function BuilderButtonAndShell({ projectId, runId: runIdProp }: BuilderButtonAndShellProps) {
  const [isOpen, setIsOpen] = useState(false);
  // builderRunId is null until first open — no orphaned records on page load.
  const [builderRunId, setBuilderRunId] = useState<string | null>(null);

  function handleOpen() {
    if (!builderRunId) {
      // Lazy creation: only create/retrieve runId when Builder is actually opened.
      setBuilderRunId(runIdProp ?? createBuilderRunId(projectId));
    }
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-amber-400/90 hover:bg-amber-500/20 transition-colors"
      >
        Builder
      </button>
      {isOpen && builderRunId && (
        <>
          {/* Backdrop — dims content behind, blocks interaction */}
          <div className="fixed inset-0 z-40 bg-black/50" aria-hidden />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
            <BuilderShell
              projectId={projectId}
              runId={builderRunId}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </>
      )}
    </>
  );
}
