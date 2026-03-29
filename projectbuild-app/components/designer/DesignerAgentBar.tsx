"use client";

/**
 * DesignerAgentBar — send input pinned to the bottom of the agent chat strip.
 *
 * Same pattern as BuilderAgentBar exactly:
 *   [AGENT ▾] [MODEL ▾] [input...........] [PRINCIPLES] [AUDIO OFF] [SEND]
 *
 * Note: Model selector is stubbed — Designer shares Core's model config.
 * PRINCIPLES and AUDIO OFF are placeholder chips for future expansion.
 */

import { useState, useEffect, useRef } from "react";
import type { Agent } from "@/types";
import { dedupeAgentsByRole } from "@/types";

interface DesignerAgentBarProps {
  projectId: string;
  isStreaming: boolean;
  onSend: (message: string, agentId?: string) => void;
}

export function DesignerAgentBar({ projectId, isStreaming, onSend }: DesignerAgentBarProps) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch(`/api/agents/list?projectId=${projectId}`)
      .then((r) => r.json())
      .then((d: { items?: Agent[] }) => {
        const items = dedupeAgentsByRole(d.items ?? []);
        setAgents(items);
        if (items.length > 0 && !selectedAgentId) {
          setSelectedAgentId(items[0].id);
        }
      })
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;
    onSend(trimmed, selectedAgentId || undefined);
    setInput("");
    textareaRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="shrink-0 border-t border-white/8 bg-black/20 p-2 space-y-2">
      {/* Top row: agent + model selectors */}
      <div className="flex items-center gap-1.5">
        <select
          value={selectedAgentId}
          onChange={(e) => setSelectedAgentId(e.target.value)}
          disabled={isStreaming}
          className="flex-1 min-w-0 rounded-lg border border-white/8 bg-white/5 px-2 py-1 text-[10px] font-mono text-white/60 focus:outline-none focus:border-white/20 transition-colors disabled:opacity-40 truncate"
        >
          {agents.length === 0 && (
            <option value="">No agents</option>
          )}
          {agents.map((a) => (
            <option key={a.id} value={a.id}>
              {a.jobTitle || a.name}
            </option>
          ))}
        </select>
        <div className="shrink-0 rounded-lg border border-white/8 bg-white/5 px-2 py-1 text-[10px] font-mono text-white/30">
          model ▾
        </div>
      </div>

      {/* Input textarea */}
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isStreaming}
        placeholder={isStreaming ? "Agent thinking…" : "Ask or instruct the agent…"}
        rows={2}
        className={`w-full resize-none rounded-xl border bg-white/5 px-3 py-2 text-[12px] font-mono text-white/80 placeholder-white/20 focus:outline-none transition-colors disabled:opacity-50 ${
          isStreaming
            ? "border-violet-500/20 animate-pulse"
            : "border-white/8 focus:border-white/20"
        }`}
      />

      {/* Bottom row: chips + send */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          className="rounded-lg border border-white/8 px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-widest text-white/25 hover:text-white/45 transition-colors"
        >
          principles
        </button>
        <button
          type="button"
          className="rounded-lg border border-white/8 px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-widest text-white/25 hover:text-white/45 transition-colors"
        >
          audio off
        </button>
        <button
          type="button"
          onClick={handleSend}
          disabled={isStreaming || !input.trim()}
          className="ml-auto rounded-full bg-violet-500/20 border border-violet-500/35 px-4 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-violet-300/80 hover:bg-violet-500/30 disabled:opacity-30 transition-colors"
        >
          {isStreaming ? "…" : "Send"}
        </button>
      </div>
    </div>
  );
}
