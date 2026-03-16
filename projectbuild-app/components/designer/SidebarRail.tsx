"use client";

/**
 * SidebarRail — 40px collapsible sidebar on the right edge.
 *
 * Rail icons (top to bottom):
 *   › — open-all toggle
 *   ≡ layers
 *   ⬡ tracks
 *   ⊞ board
 *   ⬚ ledger
 *   PROMOTE (pinned to bottom)
 *
 * Hover → peek panel slides out (188px), dismisses on mouse-leave.
 * Click → pins that panel open, shows ‹ close inside panel.
 * Click › → pins full sidebar with all sections.
 */

import { useState, useRef } from "react";
import { useTracks } from "@/lib/hooks/useTracks";
import type { CanvasElement } from "@/types";

type PanelId = "layers" | "tracks" | "board" | "ledger";

interface SidebarRailProps {
  projectId: string;
  canvasElements: CanvasElement[];
  selectedElementId: string | null;
  onSelect: (id: string | null) => void;
  onOpenPromote: () => void;
}

const RAIL_ICONS: { id: PanelId; icon: string; title: string }[] = [
  { id: "layers", icon: "≡", title: "Layers" },
  { id: "tracks", icon: "⬡", title: "Tracks" },
  { id: "board", icon: "⊞", title: "Board" },
  { id: "ledger", icon: "⬚", title: "Ledger" },
];

export function SidebarRail({ projectId, canvasElements, selectedElementId, onSelect, onOpenPromote }: SidebarRailProps) {
  const [pinnedPanel, setPinnedPanel] = useState<PanelId | "all" | null>(null);
  const [hoverPanel, setHoverPanel] = useState<PanelId | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tracks = useTracks(projectId);

  const activePanel = pinnedPanel === "all" ? null : pinnedPanel ?? hoverPanel;
  const showFullSidebar = pinnedPanel === "all";

  function handleRailIconClick(id: PanelId) {
    setPinnedPanel((prev) => (prev === id ? null : id));
  }

  function handleRailHoverEnter(id: PanelId) {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (!pinnedPanel) setHoverPanel(id);
  }

  function handleRailHoverLeave() {
    hoverTimerRef.current = setTimeout(() => {
      if (!pinnedPanel) setHoverPanel(null);
    }, 120);
  }

  function handlePanelHoverEnter() {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  }

  function handlePanelHoverLeave() {
    hoverTimerRef.current = setTimeout(() => {
      if (!pinnedPanel) setHoverPanel(null);
    }, 120);
  }

  return (
    <div className="flex min-h-0 h-full">
      {/* Peek / pinned panel — slides from rail */}
      {(activePanel || showFullSidebar) && (
        <div
          className="w-[188px] shrink-0 flex flex-col bg-[#111113] border-r border-white/8 overflow-y-auto custom-scrollbar"
          onMouseEnter={handlePanelHoverEnter}
          onMouseLeave={handlePanelHoverLeave}
        >
          {showFullSidebar ? (
            // Full sidebar — all panels stacked
            <>
              <LayersSection
                elements={canvasElements}
                selectedElementId={selectedElementId}
                onSelect={onSelect}
                pinned
                onUnpin={() => setPinnedPanel(null)}
              />
              <div className="h-px bg-white/8 mx-3" />
              <TracksSection tracks={tracks} pinned onUnpin={() => {}} />
              <div className="h-px bg-white/8 mx-3" />
              <BoardSection pinned onUnpin={() => {}} />
              <div className="h-px bg-white/8 mx-3" />
              <LedgerSection pinned onUnpin={() => {}} />
            </>
          ) : activePanel === "layers" ? (
            <LayersSection
              elements={canvasElements}
              selectedElementId={selectedElementId}
              onSelect={onSelect}
              pinned={pinnedPanel === "layers"}
              onUnpin={() => setPinnedPanel(null)}
            />
          ) : activePanel === "tracks" ? (
            <TracksSection
              tracks={tracks}
              pinned={pinnedPanel === "tracks"}
              onUnpin={() => setPinnedPanel(null)}
            />
          ) : activePanel === "board" ? (
            <BoardSection
              pinned={pinnedPanel === "board"}
              onUnpin={() => setPinnedPanel(null)}
            />
          ) : activePanel === "ledger" ? (
            <LedgerSection
              pinned={pinnedPanel === "ledger"}
              onUnpin={() => setPinnedPanel(null)}
            />
          ) : null}

          {/* Promote pinned to bottom of layers panel */}
          {(activePanel === "layers" || showFullSidebar) && (
            <PromoteSection onOpenPromote={onOpenPromote} />
          )}
        </div>
      )}

      {/* Rail — 40px, always visible */}
      <div className="w-10 shrink-0 flex flex-col items-center py-2 gap-1 bg-black/20 border-l border-white/8">
        {/* Open-all toggle */}
        <button
          type="button"
          title="Open all panels"
          onClick={() => setPinnedPanel((prev) => (prev === "all" ? null : "all"))}
          className={`w-7 h-7 flex items-center justify-center rounded-md text-[13px] transition-colors mb-1 ${
            pinnedPanel === "all"
              ? "text-violet-400 bg-violet-500/15"
              : "text-white/30 hover:text-white/60 hover:bg-white/5"
          }`}
        >
          {pinnedPanel === "all" ? "‹" : "›"}
        </button>

        <div className="w-5 h-px bg-white/10 mb-1" />

        {RAIL_ICONS.map(({ id, icon, title }) => (
          <button
            key={id}
            type="button"
            title={title}
            onClick={() => handleRailIconClick(id)}
            onMouseEnter={() => handleRailHoverEnter(id)}
            onMouseLeave={handleRailHoverLeave}
            className={`w-7 h-7 flex items-center justify-center rounded-md text-[14px] transition-colors font-mono ${
              pinnedPanel === id
                ? "text-violet-400 bg-violet-500/15"
                : hoverPanel === id
                ? "text-white/60 bg-white/5"
                : "text-white/25 hover:text-white/50"
            }`}
          >
            {icon}
          </button>
        ))}

        {/* Promote CTA at bottom */}
        <div className="mt-auto mb-1">
          <button
            type="button"
            title="Promote"
            onClick={onOpenPromote}
            className="w-7 h-7 flex items-center justify-center rounded-md text-[10px] font-bold uppercase tracking-widest text-amber-400/50 hover:text-amber-400/80 hover:bg-amber-500/10 transition-colors font-mono"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Panel sections ────────────────────────────────────────────────────────

interface LayersSectionProps {
  elements: CanvasElement[];
  selectedElementId: string | null;
  onSelect: (id: string | null) => void;
  pinned: boolean;
  onUnpin: () => void;
}

function LayersSection({ elements, selectedElementId, onSelect, pinned, onUnpin }: LayersSectionProps) {
  const ICONS: Record<string, string> = {
    frame: "⬜",
    rect: "▭",
    text: "T",
    arrow: "↗",
    pen: "✏",
    note: "◉",
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 font-mono">
          Layers
        </span>
        {pinned && (
          <button
            type="button"
            onClick={onUnpin}
            className="text-[9px] text-white/25 hover:text-white/50 transition-colors font-mono"
          >
            ‹
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-2 space-y-0.5">
        {elements.length === 0 && (
          <p className="text-[10px] text-white/20 font-mono px-1 py-2">No elements</p>
        )}
        {elements.map((el) => (
          <button
            key={el.id}
            type="button"
            onClick={() => onSelect(selectedElementId === el.id ? null : el.id)}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-colors ${
              selectedElementId === el.id
                ? "bg-violet-500/15 text-violet-300"
                : "text-white/40 hover:bg-white/5 hover:text-white/60"
            }`}
          >
            <span className="text-[11px] font-mono shrink-0">{ICONS[el.type] ?? "□"}</span>
            <span className="text-[10px] font-mono truncate flex-1">
              {el.name ?? el.content?.slice(0, 16) ?? el.type}
            </span>
            <span
              className={`text-[8px] font-bold uppercase tracking-widest shrink-0 ${
                el.createdBy === "agent" ? "text-amber-400/60" : "text-emerald-400/50"
              }`}
            >
              {el.createdBy === "agent" ? "a" : "h"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

interface TracksSectionProps {
  tracks: { id: string; name: string }[];
  pinned: boolean;
  onUnpin: () => void;
}

function TracksSection({ tracks, pinned, onUnpin }: TracksSectionProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 font-mono">
          Tracks
        </span>
        {pinned && (
          <button type="button" onClick={onUnpin} className="text-[9px] text-white/25 hover:text-white/50 font-mono">
            ‹
          </button>
        )}
      </div>
      <div className="px-2 pb-3 space-y-0.5">
        {tracks.length === 0 ? (
          <p className="text-[10px] text-white/20 font-mono px-1">No tracks</p>
        ) : (
          tracks.slice(0, 8).map((t) => (
            <div key={t.id} className="px-2 py-1 text-[10px] font-mono text-white/40 truncate">
              {t.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function BoardSection({ pinned, onUnpin }: { pinned: boolean; onUnpin: () => void }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 font-mono">Board</span>
        {pinned && (
          <button type="button" onClick={onUnpin} className="text-[9px] text-white/25 hover:text-white/50 font-mono">‹</button>
        )}
      </div>
      <div className="px-3 pb-3">
        <p className="text-[10px] text-white/20 font-mono">Open board to view tasks.</p>
      </div>
    </div>
  );
}

function LedgerSection({ pinned, onUnpin }: { pinned: boolean; onUnpin: () => void }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 font-mono">Ledger</span>
        {pinned && (
          <button type="button" onClick={onUnpin} className="text-[9px] text-white/25 hover:text-white/50 font-mono">‹</button>
        )}
      </div>
      <div className="px-3 pb-3">
        <p className="text-[10px] text-white/20 font-mono">Open ledger to view entries.</p>
      </div>
    </div>
  );
}

function PromoteSection({ onOpenPromote }: { onOpenPromote: () => void }) {
  return (
    <div className="shrink-0 border-t border-white/8 p-3 space-y-2">
      <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 font-mono">Promote</p>
      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={onOpenPromote}
          className="flex-1 rounded-lg border border-white/10 px-2 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider text-white/40 hover:text-white/60 hover:border-white/20 transition-colors"
        >
          personal
        </button>
        <button
          type="button"
          onClick={onOpenPromote}
          className="flex-1 rounded-lg border border-amber-500/20 px-2 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider text-amber-400/50 hover:text-amber-400/70 hover:border-amber-500/35 transition-colors"
        >
          team
        </button>
      </div>
      <button
        type="button"
        onClick={onOpenPromote}
        className="w-full rounded-lg border border-emerald-500/20 px-2 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-400/50 hover:text-emerald-400/70 hover:border-emerald-500/35 transition-colors"
      >
        → ledger (approved)
      </button>
    </div>
  );
}
