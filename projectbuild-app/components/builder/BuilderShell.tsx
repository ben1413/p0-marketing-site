"use client";

import { useRef, useState } from "react";
import { CompanionStatus } from "@/components/CompanionStatus";
import { FileTree } from "./FileTree";
import { CodeEditor } from "./CodeEditor";
import { BuilderAgentChat } from "./BuilderAgentChat";
import { BuilderAgentBar } from "./BuilderAgentBar";
import { BuilderPromoteModal } from "./BuilderPromoteModal";
import { useCognitivePreload } from "@/lib/builder/useCognitivePreload";
import { useBuilderStream } from "@/lib/builder/useBuilderStream";
import { useStableUserId } from "@/lib/user/useStableUserId";
import type { ThreadMessage } from "@/types";

const FILETREE_WIDTH_KEY = "pb_builder_filetree_width";
const FILETREE_DEFAULT = 220;
const FILETREE_MIN = 140;
const FILETREE_MAX = 400;

function readStoredWidth(): number {
  if (typeof window === "undefined") return FILETREE_DEFAULT;
  const raw = window.localStorage.getItem(FILETREE_WIDTH_KEY);
  const parsed = raw ? parseInt(raw, 10) : NaN;
  return isNaN(parsed) ? FILETREE_DEFAULT : Math.min(FILETREE_MAX, Math.max(FILETREE_MIN, parsed));
}

interface BuilderShellProps {
  projectId: string;
  runId: string;
  onClose: () => void;
}

/**
 * Floating Builder Mode shell.
 *
 * Layout:
 * - Header: builder label + CompanionStatus + close
 * - Body: FileTree (resizable, persisted) | drag handle | CodeEditor | AgentChat
 */
export function BuilderShell({ projectId, runId, onClose }: BuilderShellProps) {
  const [activeFilePath, setActiveFilePath] = useState<string | null>(null);
  const [promoteTarget, setPromoteTarget] = useState<ThreadMessage | null>(null);
  const userId = useStableUserId();

  // Cognitive preload — fires once on open, branch + root fetched from Companion
  const { ready: contextReady, loading: contextLoading, buildPreamble } = useCognitivePreload(projectId);

  // Streaming — owned here so BuilderAgentBar (sends) and BuilderAgentChat (displays) share state
  const { send: streamSend, isStreaming, streamingMsg } = useBuilderStream({ projectId, runId });

  function handleSend(message: string, agentId?: string) {
    const preamble = buildPreamble(activeFilePath);
    const fullMessage = preamble ? `${preamble}${message}` : message;
    streamSend(fullMessage, agentId);
  }

  // File tree width — initialised from localStorage, updated on drag
  const [fileTreeWidth, setFileTreeWidth] = useState<number>(readStoredWidth);
  const latestWidth = useRef(fileTreeWidth);

  function handleDragStart(e: React.MouseEvent) {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = latestWidth.current;

    function onMouseMove(ev: MouseEvent) {
      const next = Math.min(FILETREE_MAX, Math.max(FILETREE_MIN, startWidth + ev.clientX - startX));
      latestWidth.current = next;
      setFileTreeWidth(next);
    }

    function onMouseUp() {
      // Persist only on release — not on every pixel
      window.localStorage.setItem(FILETREE_WIDTH_KEY, String(latestWidth.current));
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  return (
    <div
      className="fixed inset-[5%] z-50 flex flex-col rounded-xl border border-amber-500/30 bg-[var(--panel)] shadow-2xl overflow-hidden"
      style={{ minWidth: 800, minHeight: 500 }}
    >
      {/* Header */}
      <header className="h-14 shrink-0 flex items-center justify-between px-4 border-b border-white/10 bg-black/30">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--text-blue)]/50">
            builder
          </span>
          <span className="text-[10px] text-[var(--muted)]/60">·</span>
          <CompanionStatus />
          <span className="text-[10px] text-[var(--muted)]/60">·</span>
          {/* Cognitive preload status — fades out once ready */}
          <span
            className={`text-[9px] font-bold tracking-widest uppercase transition-colors ${
              contextLoading
                ? "text-amber-400/40 animate-pulse"
                : contextReady
                ? "text-emerald-400/50"
                : "text-[var(--muted)]/30"
            }`}
            title={contextReady ? "Builder context loaded — branch and scope ready" : "Loading context…"}
          >
            {contextLoading ? "context…" : contextReady ? "context ready" : "no context"}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors"
        >
          Close
        </button>
      </header>

      {/* Body: three-panel layout */}
      <div className="flex-1 flex min-h-0">
        {/* Left: File tree — resizable width, min 140px, max 400px */}
        <div
          className="shrink-0 flex flex-col bg-black/20"
          style={{ width: fileTreeWidth }}
        >
          <div className="flex-1 min-h-0 overflow-hidden">
            <FileTree
              onFileSelect={setActiveFilePath}
              activePath={activeFilePath}
            />
          </div>
        </div>

        {/* Drag handle — between file tree and editor */}
        <div
          onMouseDown={handleDragStart}
          className="w-1 shrink-0 cursor-col-resize bg-white/5 hover:bg-amber-500/30 active:bg-amber-500/50 transition-colors"
          title="Drag to resize"
          role="separator"
          aria-orientation="vertical"
        />

        {/* Center: Code editor — takes remaining space */}
        <div className="flex-1 min-w-0 flex flex-col border-r border-white/10">
          <div className="flex-1 min-h-0 overflow-hidden bg-black/30">
            <CodeEditor filePath={activeFilePath} />
          </div>
        </div>

        {/* Right: Agent chat — 20% */}
        <div className="w-[20%] min-w-[200px] max-w-[320px] flex flex-col">
          {/* Message history — scrollable, stacks above AgentBar */}
          <BuilderAgentChat
            projectId={projectId}
            runId={runId}
            onPromote={setPromoteTarget}
            streamingMsg={streamingMsg}
            buildPreamble={buildPreamble}
          />
          <BuilderAgentBar
            projectId={projectId}
            isStreaming={isStreaming}
            onSend={handleSend}
          />
        </div>
      </div>

      {/* Promote modal — renders over the shell when an agent bubble's PROMOTE is clicked */}
      {promoteTarget && (
        <BuilderPromoteModal
          message={promoteTarget}
          projectId={projectId}
          userId={userId || "local"}
          activeFilePath={activeFilePath}
          onClose={() => setPromoteTarget(null)}
          onQueued={(_artifactId, _scope) => setPromoteTarget(null)}
        />
      )}
    </div>
  );
}
