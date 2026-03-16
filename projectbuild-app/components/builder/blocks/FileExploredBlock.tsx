"use client";

import { useState } from "react";

interface FileExploredBlockProps {
  files: string[];
  label: string;
}

export function FileExploredBlock({ files, label }: FileExploredBlockProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-1.5 text-[10px] text-[var(--muted)]/50 hover:text-[var(--muted)]/70 transition-colors"
      >
        {/* Folder icon */}
        <span className="text-amber-400/40 text-[10px]">
          {expanded ? "▾" : "▸"}
        </span>
        <span className="font-mono tracking-wide">{label}</span>
      </button>

      {expanded && files.length > 0 && (
        <ul className="pl-4 space-y-0.5 border-l border-white/8">
          {files.map((f, i) => (
            <li
              key={i}
              className="text-[10px] font-mono text-[var(--muted)]/40 truncate"
              title={f}
            >
              {f}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
