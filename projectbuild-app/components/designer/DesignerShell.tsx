"use client";

import { useState, useRef } from "react";
import { ToolPanel } from "./ToolPanel";
import { DesignerCanvas } from "./DesignerCanvas";
import { SidebarRail } from "./SidebarRail";
import { DesignerAgentChat } from "./DesignerAgentChat";
import { DesignerAgentBar } from "./DesignerAgentBar";
import { DesignerPromoteModal } from "./DesignerPromoteModal";
import { FigmaImportModal } from "./FigmaImportModal";
import { useDesignerCognitivePreload } from "@/lib/designer/useDesignerCognitivePreload";
import { useDesignerStream } from "@/lib/designer/useDesignerStream";
import { useStableUserId } from "@/lib/user/useStableUserId";
import type { CanvasElement, DesignerMode, DesignerTool, ThreadMessage } from "@/types";

interface DesignerShellProps {
  projectId: string;
  projectName?: string;
  runId: string;
  onClose: () => void;
}

const MODES: DesignerMode[] = ["wireframe", "render", "prototype"];

export function DesignerShell({ projectId, projectName, runId, onClose }: DesignerShellProps) {
  const [mode, setMode] = useState<DesignerMode>("wireframe");
  const [activeTool, setActiveTool] = useState<DesignerTool>("select");
  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [promoteTarget, setPromoteTarget] = useState<ThreadMessage | null>(null);
  const [showFigmaImport, setShowFigmaImport] = useState(false);
  const [canvasSnapshot, setCanvasSnapshot] = useState<string | null>(null);
  const userId = useStableUserId();

  // Canvas ref — used to capture toDataURL for promote artifact
  const canvasRef = useRef<{ toDataURL: () => string } | null>(null);

  // Cognitive preload — fires once on open
  const { ready: contextReady, loading: contextLoading, buildPreamble } = useDesignerCognitivePreload(projectId);

  // Streaming — owned here so AgentBar (sends) and AgentChat (displays) share state
  const {
    send: streamSend,
    isStreaming,
    streamingMsg,
    pendingCanvasUpdate,
    pendingCanvasDescription,
    dismissCanvasUpdate,
  } = useDesignerStream({ projectId, runId });

  function handleSend(message: string, agentId?: string) {
    // Cognitive preload — prepends context on first message only
    const preamble = buildPreamble(mode, canvasElements.length);

    // Canvas state injected with every message — agent always sees current state
    const canvasContext =
      canvasElements.length > 0
        ? `\n[Canvas State JSON]\n${JSON.stringify(canvasElements, null, 2)}\n[/Canvas State JSON]\n`
        : "\n[Canvas State JSON]\n[]\n[/Canvas State JSON]\n";

    const fullMessage = `${preamble}${canvasContext}${message}`;
    streamSend(fullMessage, agentId);
  }

  function handleApplyCanvasUpdate() {
    if (!pendingCanvasUpdate) return;
    setCanvasElements(pendingCanvasUpdate);
    dismissCanvasUpdate();
  }

  function handleOpenPromote() {
    // Capture canvas snapshot before opening modal
    const snapshot = canvasRef.current?.toDataURL() ?? null;
    setCanvasSnapshot(snapshot);
    setPromoteTarget({
      id: `designer_promote_${Date.now()}`,
      projectId,
      runId,
      text: `Designer session — ${canvasElements.length} elements on canvas`,
      authorType: "agent",
      authorName: "Designer",
    } as ThreadMessage);
  }

  return (
    <div
      className="fixed inset-[3%] z-50 flex flex-col rounded-xl border border-violet-500/20 bg-[#111113] shadow-2xl overflow-hidden"
      style={{ minWidth: 900, minHeight: 560 }}
    >
      {/* ── Titlebar ────────────────────────────────────────────── */}
      <header className="h-9 shrink-0 flex items-center justify-between px-4 border-b border-white/8 bg-black/40 select-none cursor-grab active:cursor-grabbing">
        {/* Traffic light dots */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors"
            title="Close"
          />
          <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
          <div className="w-3 h-3 rounded-full bg-green-500/40" />
        </div>

        {/* Center label */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-violet-400/50 font-mono">
            designer
          </span>
          {projectName && (
            <>
              <span className="text-[9px] text-white/20">—</span>
              <span className="text-[10px] text-white/40 font-mono truncate max-w-[200px]">
                {projectName}
              </span>
            </>
          )}
          {/* Cognitive preload indicator */}
          <span
            className={`text-[8px] font-bold tracking-widest uppercase transition-colors ${
              contextLoading
                ? "text-violet-400/30 animate-pulse"
                : contextReady
                ? "text-emerald-400/40"
                : "text-white/20"
            }`}
          >
            {contextLoading ? "·" : contextReady ? "·" : ""}
          </span>
        </div>

        {/* Mode toggle — right side */}
        <div className="flex items-center gap-0.5 bg-white/5 rounded-lg p-0.5">
          {MODES.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest transition-colors font-mono ${
                mode === m
                  ? "bg-violet-500/30 text-violet-300"
                  : "text-white/30 hover:text-white/50"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Left: Tool panel — 48px fixed */}
        <ToolPanel activeTool={activeTool} onToolChange={setActiveTool} />

        {/* Center: Canvas zone */}
        <div className="flex-1 min-w-0 relative">
          <DesignerCanvas
            ref={canvasRef}
            elements={canvasElements}
            activeTool={activeTool}
            mode={mode}
            selectedElementId={selectedElementId}
            onSelect={setSelectedElementId}
            onCreate={(el) => setCanvasElements((prev) => [...prev, el])}
            onUpdate={(id, patch) =>
              setCanvasElements((prev) =>
                prev.map((el) => (el.id === id ? { ...el, ...patch } : el))
              )
            }
            onDelete={(id) =>
              setCanvasElements((prev) => prev.filter((el) => el.id !== id))
            }
            isEmpty={canvasElements.length === 0}
            onFigmaImport={() => setShowFigmaImport(true)}
          />

          {/* Canvas update preview overlay */}
          {pendingCanvasUpdate && (
            <div className="absolute inset-0 z-20 flex items-end justify-center pb-6 pointer-events-none">
              <div className="pointer-events-auto flex items-center gap-3 bg-[#111113] border border-violet-500/30 rounded-2xl px-5 py-3 shadow-2xl">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-violet-400">
                    Agent updated canvas
                  </p>
                  {pendingCanvasDescription && (
                    <p className="text-[11px] text-white/50 mt-0.5 truncate max-w-[300px]">
                      {pendingCanvasDescription}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleApplyCanvasUpdate}
                  className="rounded-full bg-violet-500/20 border border-violet-500/40 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-violet-300 hover:bg-violet-500/30 transition-colors"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={dismissCanvasUpdate}
                  className="rounded-full border border-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white/60 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Sidebar rail + agent chat strip */}
        <div className="flex min-h-0">
          {/* Agent chat strip — sits left of rail */}
          <div className="w-[220px] flex flex-col border-r border-white/8">
            <DesignerAgentChat
              projectId={projectId}
              runId={runId}
              streamingMsg={streamingMsg}
              onPromote={setPromoteTarget}
            />
            <DesignerAgentBar
              projectId={projectId}
              isStreaming={isStreaming}
              onSend={handleSend}
            />
          </div>

          {/* Sidebar rail */}
          <SidebarRail
            projectId={projectId}
            canvasElements={canvasElements}
            selectedElementId={selectedElementId}
            onSelect={setSelectedElementId}
            onOpenPromote={handleOpenPromote}
          />
        </div>
      </div>

      {/* ── Promote modal ─────────────────────────────────────────── */}
      {promoteTarget && (
        <DesignerPromoteModal
          projectId={projectId}
          userId={userId || "local"}
          canvasElements={canvasElements}
          canvasSnapshot={canvasSnapshot}
          runId={runId}
          onClose={() => setPromoteTarget(null)}
          onQueued={() => setPromoteTarget(null)}
        />
      )}

      {/* ── Figma import stub ─────────────────────────────────────── */}
      {showFigmaImport && (
        <FigmaImportModal onClose={() => setShowFigmaImport(false)} />
      )}
    </div>
  );
}
