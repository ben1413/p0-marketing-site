"use client";

/**
 * CodeEditorInner — the actual CodeMirror implementation.
 * Loaded via dynamic import with ssr:false to avoid SSR issues.
 * Never imported directly — always through CodeEditor.tsx.
 */

import { useEffect, useRef, useState } from "react";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import { companionRead, companionWrite } from "@/lib/companion";

interface CodeEditorInnerProps {
  filePath: string | null;
  companionConnected: boolean;
}

function getLanguageExtension(filePath: string | null) {
  if (!filePath) return [];
  if (filePath.endsWith(".ts") || filePath.endsWith(".tsx") || filePath.endsWith(".js") || filePath.endsWith(".jsx")) {
    return [javascript({ typescript: filePath.endsWith(".ts") || filePath.endsWith(".tsx"), jsx: filePath.endsWith(".tsx") || filePath.endsWith(".jsx") })];
  }
  if (filePath.endsWith(".css")) return [css()];
  if (filePath.endsWith(".json")) return [json()];
  return [javascript()];
}

export function CodeEditorInner({ filePath, companionConnected }: CodeEditorInnerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mount editor once
  useEffect(() => {
    if (!containerRef.current) return;
    const view = new EditorView({
      parent: containerRef.current,
      extensions: [
        basicSetup,
        oneDark,
        ...(filePath ? getLanguageExtension(filePath) : [javascript()]),
        EditorView.updateListener.of((update) => {
          if (!update.docChanged || !filePath || !companionConnected) return;
          // Debounced autosave on change
          if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
          setSaveState("saving");
          saveTimerRef.current = setTimeout(async () => {
            try {
              await companionWrite(filePath, update.state.doc.toString());
              setSaveState("saved");
              setTimeout(() => setSaveState("idle"), 1500);
            } catch {
              setSaveState("error");
            }
          }, 800);
        }),
        EditorView.theme({
          "&": { height: "100%", background: "transparent" },
          ".cm-scroller": { overflow: "auto", fontFamily: "'JetBrains Mono', 'Fira Mono', monospace", fontSize: "12px" },
          ".cm-content": { caretColor: "#f59e0b" },
          ".cm-focused": { outline: "none" },
          ".cm-gutters": { background: "rgba(0,0,0,0.3)", borderRight: "1px solid rgba(255,255,255,0.06)" },
        }),
      ],
    });
    viewRef.current = view;
    return () => {
      view.destroy();
      viewRef.current = null;
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount once — content loaded separately

  // Lazy file load — only fetches when filePath changes, not on mount
  useEffect(() => {
    if (!filePath || !companionConnected || !viewRef.current) return;
    setLoading(true);
    setError(null);
    setSaveState("idle");
    companionRead(filePath)
      .then((content) => {
        const view = viewRef.current;
        if (!view) return;
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: content },
        });
        setLoading(false);
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : "Failed to read file");
        setLoading(false);
      });
  }, [filePath, companionConnected]);

  return (
    <div className="flex flex-col h-full">
      {/* File header */}
      <div className="h-9 shrink-0 flex items-center justify-between px-4 border-b border-white/10 bg-black/30">
        <span className="text-[11px] text-amber-400/80 truncate font-mono">
          {filePath ?? "no file selected"}
        </span>
        <span className={`text-[10px] font-bold tracking-wider transition-colors ${
          saveState === "saving" ? "text-amber-400/60 animate-pulse" :
          saveState === "saved" ? "text-emerald-400/70" :
          saveState === "error" ? "text-red-400/70" :
          "text-transparent"
        }`}>
          {saveState === "saving" ? "saving…" : saveState === "saved" ? "saved" : saveState === "error" ? "save failed" : "·"}
        </span>
      </div>

      {/* Editor area */}
      <div className="flex-1 relative min-h-0">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20">
            <span className="text-[11px] text-[var(--muted)] animate-pulse">loading…</span>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20">
            <span className="text-[11px] text-red-400/80">{error}</span>
          </div>
        )}
        {!filePath && !loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="text-[11px] text-[var(--muted)]/50">Select a file to start editing</span>
          </div>
        )}
        <div ref={containerRef} className="h-full" />
      </div>
    </div>
  );
}
