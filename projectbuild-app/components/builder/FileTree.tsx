"use client";

import { useState, useEffect } from "react";
import { companionList } from "@/lib/companion";
import { useCompanionStatus } from "@/lib/hooks/useCompanionStatus";
import { CompanionStatus } from "@/components/CompanionStatus";
import type { CompanionListEntry } from "@/lib/companion";

interface FileTreeProps {
  onFileSelect: (path: string) => void;
  activePath: string | null;
}

function FileTreeEntry({
  entry,
  basePath,
  depth,
  onFileSelect,
  activePath,
}: {
  entry: CompanionListEntry;
  basePath: string;
  depth: number;
  onFileSelect: (path: string) => void;
  activePath: string | null;
}) {
  const fullPath = basePath ? `${basePath}/${entry.name}` : entry.name;
  const [expanded, setExpanded] = useState(false);
  const [children, setChildren] = useState<CompanionListEntry[] | null>(null);
  const [loading, setLoading] = useState(false);

  const isActive = activePath === fullPath;

  useEffect(() => {
    if (!expanded || !entry.isDirectory) return;
    setLoading(true);
    companionList(fullPath)
      .then(setChildren)
      .catch(() => setChildren([]))
      .finally(() => setLoading(false));
  }, [expanded, fullPath, entry.isDirectory]);

  if (entry.isDirectory) {
    return (
      <div className="select-none">
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="flex items-center gap-1.5 w-full px-2 py-1 text-left text-[12px] text-[var(--text-blue)] hover:bg-white/5 rounded transition-colors"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          <span className="text-[10px] text-[var(--muted)] w-3">
            {expanded ? "▾" : "▸"}
          </span>
          <span className="truncate">{entry.name}</span>
        </button>
        {expanded && (
          <div>
            {loading ? (
              <div
                className="px-2 py-1 text-[11px] text-[var(--muted)]/60"
                style={{ paddingLeft: `${(depth + 1) * 12 + 8}px` }}
              >
                loading…
              </div>
            ) : (
              (children ?? []).map((c) => (
                <FileTreeEntry
                  key={`${fullPath}/${c.name}`}
                  entry={c}
                  basePath={fullPath}
                  depth={depth + 1}
                  onFileSelect={onFileSelect}
                  activePath={activePath}
                />
              ))
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onFileSelect(fullPath)}
      className={`flex items-center gap-1.5 w-full px-2 py-1 text-left text-[12px] rounded transition-colors truncate ${
        isActive
          ? "bg-amber-500/20 text-amber-400/90 border-l-2 border-amber-400/60"
          : "text-[var(--text-blue)] hover:bg-white/5"
      }`}
      style={{ paddingLeft: `${depth * 12 + 20}px` }}
    >
      <span className="text-[10px] text-[var(--muted)] w-3">·</span>
      <span className="truncate">{entry.name}</span>
    </button>
  );
}

export function FileTree({ onFileSelect, activePath }: FileTreeProps) {
  const { connected, allowed } = useCompanionStatus();
  const [rootEntries, setRootEntries] = useState<CompanionListEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!connected || !allowed) {
      setRootEntries([]);
      setError(null);
      return;
    }
    setError(null);
    companionList("")
      .then(setRootEntries)
      .catch((e) => {
        setError(e instanceof Error ? e.message : "Failed to list");
        setRootEntries([]);
      });
  }, [connected, allowed]);

  return (
    <div className="flex flex-col h-full border-r border-white/10 bg-black/20">
      <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between gap-2">
        <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[var(--text-blue)]/50">
          Files
        </span>
        <CompanionStatus />
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar py-2">
        {!connected && (
          <p className="px-4 py-3 text-[11px] text-[var(--muted)]/60">
            Start Companion to browse files.
          </p>
        )}
        {connected && !allowed && (
          <p className="px-4 py-3 text-[11px] text-amber-400/80">
            Set folder scope (COMPANION_ROOT or POST /api/scope).
          </p>
        )}
        {connected && allowed && error && (
          <p className="px-4 py-3 text-[11px] text-red-400/80">{error}</p>
        )}
        {connected && allowed && !error && rootEntries.length === 0 && (
          <p className="px-4 py-3 text-[11px] text-[var(--muted)]/60">
            Empty folder.
          </p>
        )}
        {connected && allowed && !error &&
          rootEntries.map((e) => (
            <FileTreeEntry
              key={e.name}
              entry={e}
              basePath=""
              depth={0}
              onFileSelect={onFileSelect}
              activePath={activePath}
            />
          ))}
      </div>
    </div>
  );
}
