"use client";

import { useState } from "react";
import type { Agent } from "@/types";

interface BottomInputBarProps {
  agents: Agent[];
  selectedAgentId: string;
  selectedModel: string;
  onAgentChange: (id: string) => void;
  onModelChange: (model: string) => void;
  onSend: (message: string) => void;
  isRunning: boolean;
  placeholder?: string;
  ttsEnabled?: boolean;
  ttsSupported?: boolean;
  ttsSpeaking?: boolean;
  onTTSToggle?: () => void;
}

const MODELS = ["gpt-4o", "gpt-4o-mini", "gpt-5.2", "claude-3.5-sonnet", "gemini-1.5-pro"];

export function BottomInputBar({
  agents,
  selectedAgentId,
  selectedModel,
  onAgentChange,
  onModelChange,
  onSend,
  isRunning,
  placeholder = "Message…",
  ttsEnabled = false,
  ttsSupported = false,
  ttsSpeaking = false,
  onTTSToggle,
}: BottomInputBarProps) {
  const [input, setInput] = useState("");
  const [principlesOpen, setPrinciplesOpen] = useState(false);

  const selectedAgent = agents.find((a) => a.id === selectedAgentId) ?? agents[0];

  const handleSubmit = () => {
    const text = input.trim();
    if (!text || isRunning) return;
    setInput("");
    setPrinciplesOpen(false);
    onSend(text);
  };

  return (
    <div className="border-t border-white/10 px-8 py-4 flex flex-col gap-3 bg-transparent">
      {/* Principles panel (collapsible) */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          principlesOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {selectedAgent && (
          <div className="rounded-xl border border-white/10 bg-[var(--panel)] px-5 py-4 mb-2 space-y-3">
            <div>
              <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--text-blue)]/50 mb-1">
                Internal Identity
              </p>
              <p className="text-[13px] text-[var(--text-blue)] leading-relaxed">{selectedAgent.persona}</p>
            </div>
            {selectedAgent.allowedActions?.length > 0 && (
              <div>
                <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--text-blue)]/50 mb-1">
                  Non-Negotiables / Allowed Actions
                </p>
                <div className="flex flex-wrap gap-1">
                  {selectedAgent.allowedActions.map((a) => (
                    <span
                      key={a}
                      className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[var(--muted)]"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Row 1: Agent + model + principles */}
      <div className="flex items-center gap-3">
        {/* Agent selector */}
        <select
          value={selectedAgentId}
          onChange={(e) => onAgentChange(e.target.value)}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] focus:outline-none focus:border-white/30 transition-colors"
        >
          {agents.length === 0 ? (
            <option value="">No agents</option>
          ) : (
            agents.map((a) => (
              <option key={a.id} value={a.id} className="bg-[#0f141b]">
                {a.name} / {a.jobTitle}
              </option>
            ))
          )}
        </select>

        {/* Model selector */}
        <select
          value={selectedModel}
          onChange={(e) => onModelChange(e.target.value)}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] focus:outline-none focus:border-white/30 transition-colors"
        >
          {MODELS.map((m) => (
            <option key={m} value={m} className="bg-[#0f141b]">
              {m.toUpperCase()}
            </option>
          ))}
        </select>

        <div className="flex-1" />

        {/* Principles toggle */}
        <button
          onClick={() => setPrinciplesOpen((p) => !p)}
          className={`rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${
            principlesOpen
              ? "border-white/30 bg-white/10 text-[var(--text-bright)]"
              : "border-white/10 bg-white/5 text-[var(--text-blue)]"
          }`}
        >
          Principles
        </button>

        {/* TTS toggle — only shown when browser supports it */}
        {ttsSupported && onTTSToggle && (
          <button
            onClick={onTTSToggle}
            title={ttsEnabled ? "Agent audio on — click to mute" : "Click to hear agents speak"}
            className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5 ${
              ttsEnabled
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-white/10 bg-white/5 text-[var(--muted)]"
            }`}
          >
            {ttsSpeaking ? (
              /* Animated bars when actively speaking */
              <span className="flex items-end gap-[2px] h-3">
                <span className="w-[2px] rounded-full bg-current animate-[bounce_0.6s_ease-in-out_infinite]" style={{ height: "60%", animationDelay: "0ms" }} />
                <span className="w-[2px] rounded-full bg-current animate-[bounce_0.6s_ease-in-out_infinite]" style={{ height: "100%", animationDelay: "0.1s" }} />
                <span className="w-[2px] rounded-full bg-current animate-[bounce_0.6s_ease-in-out_infinite]" style={{ height: "40%", animationDelay: "0.2s" }} />
                <span className="w-[2px] rounded-full bg-current animate-[bounce_0.6s_ease-in-out_infinite]" style={{ height: "80%", animationDelay: "0.15s" }} />
              </span>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                {ttsEnabled ? (
                  <>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </>
                ) : (
                  <line x1="23" y1="9" x2="17" y2="15" />
                )}
              </svg>
            )}
            <span>{ttsEnabled ? "Audio On" : "Audio Off"}</span>
          </button>
        )}
      </div>

      {/* Row 2: Message input */}
      <div className="flex items-end gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder={isRunning ? "Agent is thinking…" : placeholder}
          disabled={isRunning}
          rows={1}
          className="flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[14px] text-[var(--text-blue)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-white/25 disabled:opacity-50 transition-colors"
          style={{ minHeight: "44px", maxHeight: "120px" }}
        />
        <button
          onClick={handleSubmit}
          disabled={isRunning || !input.trim()}
          className="rounded-full bg-white px-6 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-black disabled:opacity-40 soft-elevate hover:bg-white/90 transition-opacity"
        >
          {isRunning ? "…" : "Send"}
        </button>
      </div>
    </div>
  );
}
