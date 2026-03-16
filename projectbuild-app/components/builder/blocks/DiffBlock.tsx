"use client";

import { useState } from "react";

interface DiffBlockProps {
  filePath: string;
  before: string;
  after: string;
}

export function DiffBlock({ filePath, before, after }: DiffBlockProps) {
  const [view, setView] = useState<"after" | "before">("after");

  return (
    <div className="rounded-lg border border-white/10 overflow-hidden text-[11px]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-black/30 border-b border-white/8">
        <span className="font-mono text-[10px] text-amber-400/60 truncate">{filePath}</span>
        <div className="flex gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setView("after")}
            className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded transition-colors ${
              view === "after"
                ? "bg-amber-500/20 text-amber-400/80"
                : "text-[var(--muted)]/40 hover:text-[var(--muted)]/60"
            }`}
          >
            After
          </button>
          <button
            type="button"
            onClick={() => setView("before")}
            className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded transition-colors ${
              view === "before"
                ? "bg-white/10 text-[var(--muted)]/70"
                : "text-[var(--muted)]/40 hover:text-[var(--muted)]/60"
            }`}
          >
            Before
          </button>
        </div>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto px-3 py-2.5 font-mono text-[11px] leading-relaxed max-h-48 custom-scrollbar bg-black/20">
        <code
          className={
            view === "after"
              ? "text-emerald-400/80"
              : "text-[var(--muted)]/50"
          }
        >
          {view === "after" ? after : before}
        </code>
      </pre>
    </div>
  );
}
