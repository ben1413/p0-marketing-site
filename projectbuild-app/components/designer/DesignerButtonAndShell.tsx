"use client";

import { useState } from "react";
import { DesignerShell } from "./DesignerShell";

const RUN_ID_KEY = (projectId: string) => `pb_designer_runId_${projectId}`;

function createDesignerRunId(projectId: string): string {
  if (typeof window === "undefined") return `designer_${projectId}_${Date.now()}`;
  const stored = window.localStorage.getItem(RUN_ID_KEY(projectId));
  if (stored) return stored;
  const newId = `designer_${projectId}_${Date.now()}`;
  window.localStorage.setItem(RUN_ID_KEY(projectId), newId);
  return newId;
}

interface DesignerButtonAndShellProps {
  projectId: string;
  projectName?: string;
}

export function DesignerButtonAndShell({ projectId, projectName }: DesignerButtonAndShellProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Lazy creation — only create/retrieve runId when Designer is actually opened.
  const [designerRunId, setDesignerRunId] = useState<string | null>(null);

  function handleOpen() {
    if (!designerRunId) {
      setDesignerRunId(createDesignerRunId(projectId));
    }
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-violet-400/90 hover:bg-violet-500/20 transition-colors"
      >
        Designer
      </button>
      {isOpen && designerRunId && (
        <>
          {/* Backdrop — dims content behind, blocks interaction */}
          <div className="fixed inset-0 z-40 bg-black/50" aria-hidden />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
            <DesignerShell
              projectId={projectId}
              projectName={projectName}
              runId={designerRunId}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </>
      )}
    </>
  );
}
