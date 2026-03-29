"use client";

/**
 * BuilderAgentBar — the send input at the bottom of the Builder right panel.
 * Replaces the previous "Agent bar (agent picker, model, input, send)" placeholder.
 *
 * Minimal for now: agent selector + text input + send.
 * Calls onSend(message, agentId) — wired to useBuilderStream.send in BuilderShell.
 */

import { useEffect, useRef, useState } from "react";
import type { Agent } from "@/types";
import { dedupeAgentsByRole } from "@/types";

interface BuilderAgentBarProps {
  projectId: string;
  isStreaming: boolean;
  onSend: (message: string, agentId?: string) => void;
}

export function BuilderAgentBar({ projectId, isStreaming, onSend }: BuilderAgentBarProps) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch(`/api/agents/list?projectId=${projectId}`)
      .then((r) => r.json())
      .then((d: { items?: Agent[] }) => {
        const items = dedupeAgentsByRole(d.items ?? []);
        setAgents(items);
        if (items.length > 0) setSelectedAgentId(items[0].id);
      })
      .catch(() => {});
  }, [projectId]);

  function handleSend() {
    const msg = text.trim();
    if (!msg || isStreaming) return;
    onSend(msg, selectedAgentId || undefined);
    setText("");
    textareaRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="shrink-0 border-t border-white/10 bg-black/20 px-3 py-2 space-y-2">
      {/* Agent selector */}
      {agents.length > 0 && (
        <select
          value={selectedAgentId}
          onChange={(e) => setSelectedAgentId(e.target.value)}
          disabled={isStreaming}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-[var(--text-blue)] focus:outline-none focus:border-white/20 disabled:opacity-40"
        >
          {agents.map((a) => (
            <option key={a.id} value={a.id} className="bg-[#0f141b]">
              {a.jobTitle || a.name}
            </option>
          ))}
        </select>
      )}

      {/* Input + send */}
      <div className="flex gap-2 items-end">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isStreaming}
          rows={2}
          placeholder={isStreaming ? "Agent is working…" : "Message agent…"}
          className="flex-1 resize-none rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-[var(--text-blue)] placeholder:text-[var(--muted)]/30 focus:outline-none focus:border-white/20 disabled:opacity-40 transition-colors"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={isStreaming || !text.trim()}
          className="shrink-0 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-amber-400/80 hover:bg-amber-500/20 disabled:opacity-30 transition-colors"
        >
          {isStreaming ? (
            <span className="animate-pulse">…</span>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
}
