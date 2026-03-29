"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

type Msg = { role: "user" | "assistant"; content: string };

export function BuilderAgentChat({
  agentId,
  coreProjectId,
  activeFile,
  fileSnippet,
}: {
  agentId: string;
  coreProjectId: string;
  activeFile: string;
  fileSnippet: string;
}) {
  const { idToken } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || !agentId) return;
    const context =
      activeFile && fileSnippet
        ? `[Active file: ${activeFile}]\n\`\`\`\n${fileSnippet.slice(0, 12000)}\n\`\`\`\n\n`
        : "";
    const full = `${context}${text}`;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setBusy(true);
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (idToken) headers["Authorization"] = `Bearer ${idToken}`;

      const res = await fetch("/api/agents/run/simple", {
        method: "POST",
        headers,
        body: JSON.stringify({
          agentId,
          message: full,
          memoryScope: "working",
          runId: `cf_builder_${coreProjectId}`,
          projectId: coreProjectId,
          builderMode: true,
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      const reply =
        data.reply ||
        data.error ||
        (res.ok ? "(empty reply)" : `Error ${res.status}`);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: err instanceof Error ? err.message : "Request failed",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex h-full min-h-[280px] flex-col border-l border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="border-b border-zinc-200 px-3 py-2 dark:border-zinc-800">
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          Agent
        </span>
      </div>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
        {messages.length === 0 && (
          <p className="text-xs text-zinc-500">
            Ask for Luau help, refactors, or RemoteEvent patterns. Active file is
            included automatically.
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "user"
                ? "ml-4 rounded-lg bg-zinc-100 px-2 py-1.5 text-xs dark:bg-zinc-900"
                : "mr-4 rounded-lg border border-zinc-200 px-2 py-1.5 text-xs dark:border-zinc-800"
            }
          >
            <pre className="whitespace-pre-wrap font-sans">{m.content}</pre>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={send} className="flex gap-2 border-t border-zinc-200 p-2 dark:border-zinc-800">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={busy || !agentId}
          placeholder="Message agent…"
          className="min-w-0 flex-1 rounded-lg border border-zinc-300 px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button
          type="submit"
          disabled={busy || !agentId}
          className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
        >
          Send
        </button>
      </form>
    </div>
  );
}
