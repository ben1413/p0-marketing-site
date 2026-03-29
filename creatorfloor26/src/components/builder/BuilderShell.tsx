"use client";

import { useCallback, useState } from "react";
import { companionRead, companionWrite } from "@/lib/companion";
import { FileTree } from "./FileTree";
import { CodeEditor } from "./CodeEditor";
import { BuilderAgentChat } from "./BuilderAgentChat";
import { BuilderPromoteModal } from "./BuilderPromoteModal";
import { useCfProject } from "@/lib/cf/useCfProject";
import { useAuth } from "@/components/auth/AuthProvider";

export function BuilderShell({ coreProjectId }: { coreProjectId: string }) {
  const { project } = useCfProject(coreProjectId);
  const { user } = useAuth();
  const agentId = project?.agentIds?.codeReview || project?.agentIds?.studio || "";

  const [path, setPath] = useState("");
  const [content, setContent] = useState("");
  const [dirty, setDirty] = useState(false);
  const [promoteOpen, setPromoteOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const lang =
    project?.platform === "uefn" ? ("verse" as const) : ("luau" as const);

  const loadFile = useCallback(async (p: string) => {
    setPath(p);
    const text = await companionRead(p);
    setContent(text ?? "");
    setDirty(false);
  }, []);

  async function saveFile() {
    if (!path || !dirty) return;
    const ok = await companionWrite(path, content);
    if (ok) {
      setDirty(false);
      setToast("Saved");
      setTimeout(() => setToast(null), 1500);
    } else setToast("Save failed");
  }

  function onChangeEditor(v: string) {
    setContent(v);
    setDirty(true);
  }

  const userId = user?.uid ?? "anonymous";

  return (
    <div className="flex h-[calc(100vh-12rem)] min-h-[480px] flex-col gap-2 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-200 px-3 py-2 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
            {path || "No file"}
            {dirty ? " · unsaved" : ""}
          </span>
          {toast && <span className="text-xs text-emerald-600">{toast}</span>}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={!path || !dirty}
            onClick={() => void saveFile()}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs dark:border-zinc-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setPromoteOpen(true)}
            className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Promote
          </button>
        </div>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-0 md:grid-cols-[220px_1fr_280px]">
        <FileTree selectedPath={path} onSelectFile={loadFile} />
        <div className="min-h-0 min-w-0 overflow-hidden p-2">
          {path ? (
            <CodeEditor value={content} onChange={onChangeEditor} language={lang} />
          ) : (
            <p className="p-4 text-sm text-zinc-500">
              Select a file from the tree (requires Companion scoped to your project).
            </p>
          )}
        </div>
        <BuilderAgentChat
          agentId={agentId}
          coreProjectId={coreProjectId}
          activeFile={path}
          fileSnippet={content}
        />
      </div>

      <BuilderPromoteModal
        open={promoteOpen}
        onClose={() => setPromoteOpen(false)}
        coreProjectId={coreProjectId}
        userId={userId}
        gameId={project?.gameId}
        filePaths={path ? [path] : []}
        summaryDefault={
          path
            ? `Builder: ${path}`
            : `Builder checkpoint — ${project?.name ?? coreProjectId}`
        }
        onQueued={() => setToast("Promote queued")}
      />
    </div>
  );
}
