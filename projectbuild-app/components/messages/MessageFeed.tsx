"use client";

import { useEffect, useRef, useState } from "react";
import { useMessages } from "@/lib/hooks/useMessages";
import type { ThreadMessage, TruthPosture } from "@/types";
import { PromotePanel } from "@/components/promote/PromotePanel";

interface MessageFeedProps {
  projectId: string;
  runId: string;
  trackId?: string;
  ttsEnabled?: boolean;
  onSpeak?: (text: string) => void;
}

function PostureIndicator({ posture }: { posture?: TruthPosture }) {
  if (!posture) return null;

  const config = {
    known: { symbol: "●", label: "KNOWN", color: "text-emerald-400/70", tooltip: "Grounded in Core Memory" },
    inferred: { symbol: "◐", label: "INFERRED", color: "text-amber-400/70", tooltip: "Reasoned from context" },
    unknown: { symbol: "○", label: "UNKNOWN", color: "text-white/30", tooltip: "Explicitly uncertain" },
  }[posture];

  return (
    <span
      className={`ml-2 text-[9px] font-bold tracking-widest ${config.color} cursor-default`}
      title={config.tooltip}
      aria-label={config.tooltip}
    >
      {config.symbol} {config.label}
    </span>
  );
}

const POSTURE_TAG = /\[P0_TRUTH_POSTURE:\s*(known|inferred|unknown)\]/i;
const POSTURE_TAG_GLOBAL = /\[P0_TRUTH_POSTURE:\s*(?:known|inferred|unknown)\]/gi;

function stripPostureTag(text: string): string {
  return text.replace(POSTURE_TAG_GLOBAL, "").trim();
}

function extractPosture(text: string): TruthPosture | undefined {
  const match = text.match(POSTURE_TAG);
  return match ? (match[1].toLowerCase() as TruthPosture) : undefined;
}

export function MessageFeed({ projectId, runId, trackId, ttsEnabled = false, onSpeak }: MessageFeedProps) {
  const messages = useMessages(projectId, runId, trackId);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [promoteTarget, setPromoteTarget] = useState<ThreadMessage | null>(null);
  const [sealedIds, setSealedIds] = useState<Set<string>>(new Set());
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const lastSpokenIdRef = useRef<string | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-speak newest agent message when TTS is on.
  // Pre-warm: fire speak() as soon as the message arrives (parallel to rendering)
  // so playback starts as close to message appearance as possible.
  useEffect(() => {
    if (!ttsEnabled || !onSpeak || messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.authorType !== "agent") return;
    if (lastMsg.id === lastSpokenIdRef.current) return;
    lastSpokenIdRef.current = lastMsg.id;
    setSpeakingId(lastMsg.id);
    // Call immediately — don't wait for any animation frame or render cycle
    onSpeak(stripPostureTag(lastMsg.text));
    const wordCount = stripPostureTag(lastMsg.text).split(/\s+/).length;
    const ms = Math.max(2000, wordCount * 80);
    const t = setTimeout(() => setSpeakingId(null), ms);
    return () => clearTimeout(t);
  }, [messages, ttsEnabled, onSpeak]);

  return (
    <div className="flex-1 overflow-y-auto px-10 py-6 space-y-6 custom-scrollbar bg-transparent">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[200px] text-center px-6">
          <p className="text-[12px] font-medium tracking-[0.2em] uppercase text-[var(--text-blue)]/50">
            The room is quiet
          </p>
          <p className="text-[11px] text-[var(--muted)] mt-1 max-w-[260px]">
            Start a conversation or select an agent below.
          </p>
        </div>
      ) : (
        messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.authorType === "human" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[75%] ${m.authorType === "human" ? "text-right" : "text-left"}`}>
              {/* Role label */}
              <div className="flex items-center gap-1 mb-2">
                {m.authorType === "agent" && (
                  <>
                    <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[var(--text-blue)]/70">
                      {m.agentJobTitle || m.authorName || "Agent"}
                    </span>
                    <PostureIndicator posture={m.truthPosture ?? extractPosture(m.text)} />
                    {speakingId === m.id && (
                      <span className="ml-2 flex items-end gap-[2px] h-3">
                        <span className="w-[2px] rounded-full bg-emerald-400/70 animate-[bounce_0.6s_ease-in-out_infinite]" style={{ height: "60%", animationDelay: "0ms" }} />
                        <span className="w-[2px] rounded-full bg-emerald-400/70 animate-[bounce_0.6s_ease-in-out_infinite]" style={{ height: "100%", animationDelay: "0.1s" }} />
                        <span className="w-[2px] rounded-full bg-emerald-400/70 animate-[bounce_0.6s_ease-in-out_infinite]" style={{ height: "40%", animationDelay: "0.2s" }} />
                        <span className="w-[2px] rounded-full bg-emerald-400/70 animate-[bounce_0.6s_ease-in-out_infinite]" style={{ height: "80%", animationDelay: "0.15s" }} />
                      </span>
                    )}
                  </>
                )}
                {m.authorType === "human" && (
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[var(--text-blue)]/70 ml-auto">
                    YOU
                  </span>
                )}
              </div>

              {/* Bubble */}
              <div
                className={`px-5 py-4 rounded-2xl border soft-elevate text-[15px] leading-relaxed whitespace-pre-wrap ${
                  m.authorType === "human"
                    ? "bg-white/10 text-[var(--text-blue)] border-white/10 rounded-tr-none"
                    : "bg-[var(--panel)] text-[var(--text-blue)] border-white/10 rounded-tl-none"
                } ${m.truthPosture === "unknown" ? "border-white/5" : ""} ${
                  speakingId === m.id ? "border-emerald-500/20" : ""
                }`}
              >
                {stripPostureTag(m.text)}

                {/* Action chips */}
                {m.actionsApplied && m.actionsApplied.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {m.actionsApplied.map((a, i) => (
                      <span
                        key={i}
                        className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[var(--muted)]"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                )}

                {/* Guardrail badges — show when limits applied */}
                {(m.inputTruncated || m.maxTurnsPerMeeting != null) && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {m.inputTruncated && (
                      <span
                        className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 cursor-default"
                        title="Your message was truncated to fit within the input token limit"
                      >
                        INPUT TRUNCATED
                      </span>
                    )}
                    {m.maxTurnsPerMeeting != null && (
                      <span
                        className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[var(--muted)] cursor-default"
                        title={`This conversation has a turn limit of ${m.maxTurnsPerMeeting} turns`}
                      >
                        TURN LIMIT: {m.maxTurnsPerMeeting}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Promote label */}
              <div className={`mt-1.5 ${m.authorType === "human" ? "text-right" : "text-left"}`}>
                {sealedIds.has(m.id) ? (
                  <span className="text-[9px] font-bold tracking-widest uppercase text-emerald-400/60">
                    SEALED
                  </span>
                ) : (
                  <button
                    onClick={() => setPromoteTarget(m)}
                    className="text-[9px] font-bold tracking-widest uppercase text-[var(--muted)]/50 hover:text-[var(--text-blue)]/70 transition-colors"
                  >
                    PROMOTE
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
      <div ref={bottomRef} className="h-2" />

      {/* Promote panel overlay */}
      {promoteTarget && (
        <PromotePanel
          message={promoteTarget}
          projectId={projectId}
          runId={runId}
          onClose={() => setPromoteTarget(null)}
          onSealed={() => {
            setSealedIds((prev) => new Set([...prev, promoteTarget.id]));
            setPromoteTarget(null);
          }}
        />
      )}
    </div>
  );
}
