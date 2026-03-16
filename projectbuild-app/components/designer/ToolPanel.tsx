"use client";

import type { DesignerTool } from "@/types";

interface ToolPanelProps {
  activeTool: DesignerTool;
  onToolChange: (tool: DesignerTool) => void;
}

type ToolEntry = {
  id: DesignerTool;
  icon: string;
  label: string;
  title: string;
};

const TOOLS: (ToolEntry | "divider")[] = [
  { id: "select", icon: "↖", label: "select", title: "Select & move" },
  "divider",
  { id: "frame", icon: "⬜", label: "frame", title: "Frame container" },
  { id: "rect", icon: "▭", label: "rect", title: "Rectangle" },
  { id: "text", icon: "T", label: "text", title: "Text" },
  { id: "arrow", icon: "↗", label: "arrow", title: "Arrow" },
  { id: "pen", icon: "✏", label: "pen", title: "Freehand pen" },
  "divider",
  { id: "note", icon: "◉", label: "note", title: "Annotation note" },
];

export function ToolPanel({ activeTool, onToolChange }: ToolPanelProps) {
  return (
    <div className="w-12 shrink-0 flex flex-col items-center py-3 gap-1 bg-black/30 border-r border-white/8">
      {TOOLS.map((entry, i) => {
        if (entry === "divider") {
          return (
            <div
              key={`divider-${i}`}
              className="w-6 h-px bg-white/10 my-1"
            />
          );
        }

        const active = activeTool === entry.id;
        return (
          <button
            key={entry.id}
            type="button"
            title={entry.title}
            onClick={() => onToolChange(entry.id)}
            className={`w-9 h-9 flex flex-col items-center justify-center rounded-lg transition-colors gap-px group ${
              active
                ? "bg-amber-500/20 text-amber-400"
                : "text-white/30 hover:text-white/60 hover:bg-white/5"
            }`}
          >
            <span className="text-[14px] leading-none font-mono">{entry.icon}</span>
            <span
              className={`text-[7px] font-bold tracking-wider uppercase font-mono ${
                active ? "text-amber-400/70" : "text-white/20 group-hover:text-white/40"
              }`}
            >
              {entry.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
