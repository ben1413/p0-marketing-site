"use client";

/**
 * CodeEditor — public entry point.
 * Wraps CodeEditorInner in a dynamic import with ssr:false to prevent
 * SSR issues with CodeMirror (it reads the DOM on mount).
 */

import dynamic from "next/dynamic";
import { useCompanionStatus } from "@/lib/hooks/useCompanionStatus";

const CodeEditorInner = dynamic(
  () => import("./CodeEditorInner").then((m) => m.CodeEditorInner),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-[11px] text-[var(--muted)]/50">
        Loading editor…
      </div>
    ),
  }
);

interface CodeEditorProps {
  filePath: string | null;
}

export function CodeEditor({ filePath }: CodeEditorProps) {
  const { connected, allowed } = useCompanionStatus();
  const companionConnected = connected && allowed;

  if (!companionConnected) {
    return (
      <div className="flex h-full flex-col">
        <div className="h-9 shrink-0 flex items-center px-4 border-b border-white/10 bg-black/30">
          <span className="text-[11px] text-[var(--muted)]/50 font-mono">
            {filePath ?? "no file selected"}
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[11px] text-[var(--muted)]/50">
          Start Companion to enable editing
        </div>
      </div>
    );
  }

  return <CodeEditorInner filePath={filePath} companionConnected={companionConnected} />;
}
