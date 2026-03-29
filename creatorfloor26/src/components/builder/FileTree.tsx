"use client";

import { useCallback, useEffect, useState } from "react";
import { companionList, type CompanionListEntry } from "@/lib/companion";
import { CompanionStatus } from "@/components/CompanionStatus";

function joinPath(base: string, name: string) {
  if (!base) return name;
  return `${base.replace(/\/$/, "")}/${name}`;
}

function TreeNode({
  basePath,
  entry,
  depth,
  selectedPath,
  onSelect,
}: {
  basePath: string;
  entry: CompanionListEntry;
  depth: number;
  selectedPath: string;
  onSelect: (path: string, isDir: boolean) => void;
}) {
  const full = joinPath(basePath, entry.name);
  const [open, setOpen] = useState(depth < 1);
  const [children, setChildren] = useState<CompanionListEntry[] | null>(null);

  const load = useCallback(async () => {
    if (!entry.isDirectory) return;
    const list = await companionList(full);
    setChildren(list);
  }, [entry.isDirectory, full]);

  useEffect(() => {
    if (open && entry.isDirectory && children === null) void load();
  }, [open, entry.isDirectory, children, load]);

  if (!entry.isDirectory) {
    return (
      <button
        type="button"
        className={`block w-full truncate rounded px-1 py-0.5 text-left text-xs font-mono hover:bg-zinc-100 dark:hover:bg-zinc-900 ${
          selectedPath === full ? "bg-zinc-200 dark:bg-zinc-800" : ""
        }`}
        style={{ paddingLeft: 8 + depth * 12 }}
        onClick={() => onSelect(full, false)}
      >
        {entry.name}
      </button>
    );
  }

  return (
    <div>
      <button
        type="button"
        className="flex w-full items-center gap-1 truncate rounded px-1 py-0.5 text-left text-xs font-mono hover:bg-zinc-100 dark:hover:bg-zinc-900"
        style={{ paddingLeft: 8 + depth * 12 }}
        onClick={() => {
          setOpen(!open);
          onSelect(full, true);
        }}
      >
        <span className="text-zinc-400">{open ? "▼" : "▶"}</span>
        {entry.name}/
      </button>
      {open && children?.map((c) => (
        <TreeNode
          key={joinPath(full, c.name)}
          basePath={full}
          entry={c}
          depth={depth + 1}
          selectedPath={selectedPath}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export function FileTree({
  selectedPath,
  onSelectFile,
}: {
  selectedPath: string;
  onSelectFile: (path: string) => void;
}) {
  const [root, setRoot] = useState<CompanionListEntry[]>([]);

  useEffect(() => {
    void companionList("").then(setRoot);
  }, []);

  return (
    <div className="flex h-full min-h-[280px] flex-col border-r border-zinc-200 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="flex items-center justify-between border-b border-zinc-200 px-2 py-2 dark:border-zinc-800">
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          Files
        </span>
        <CompanionStatus />
      </div>
      <div className="flex-1 overflow-y-auto p-1">
        {root.length === 0 ? (
          <p className="p-2 text-xs text-zinc-500">
            Start Companion, then POST scope to your Rojo project root. See README.
          </p>
        ) : (
          root.map((e) => (
            <TreeNode
              key={e.name}
              basePath=""
              entry={e}
              depth={0}
              selectedPath={selectedPath}
              onSelect={(path, isDir) => {
                if (!isDir) onSelectFile(path);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
