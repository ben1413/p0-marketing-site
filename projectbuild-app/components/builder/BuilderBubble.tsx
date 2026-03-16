"use client";

/**
 * BuilderBubble — a single message bubble for the Builder agent chat strip.
 *
 * PROMOTE is gated strictly to authorType === 'agent'. Never on user bubbles.
 *
 * Block rendering:
 *   If message.blocks is present → render via BlockRenderer (structured trail)
 *   Otherwise → wrap message.text in a single text block (backward compat)
 *
 * isStreaming → passed to BlockRenderer so the text cursor animates while
 * the stream is live. PROMOTE is suppressed during streaming.
 */

import { useState } from "react";
import type { ThreadMessage, MessageBlock } from "@/types";
import { BlockRenderer } from "./blocks/BlockRenderer";

interface BuilderBubbleProps {
  message: Pick<ThreadMessage, "id" | "authorType" | "agentJobTitle" | "authorName" | "actionsApplied" | "text"> & {
    blocks?: MessageBlock[];
  };
  onPromote: (message: BuilderBubbleProps["message"]) => void;
  promoted?: boolean;
  isStreaming?: boolean;
}

export function BuilderBubble({ message, onPromote, promoted = false, isStreaming = false }: BuilderBubbleProps) {
  const [hovered, setHovered] = useState(false);
  const isAgent = message.authorType === "agent";

  // Resolve blocks — use structured blocks if present, fall back to plain text
  const blocks: MessageBlock[] =
    message.blocks && message.blocks.length > 0
      ? message.blocks
      : [{ type: "text", content: message.text }];

  return (
    <div
      className={`group flex flex-col gap-1 ${isAgent ? "items-start" : "items-end"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Role label */}
      <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--muted)]/50 px-1">
        {isAgent ? (message.agentJobTitle || message.authorName || "Agent") : "You"}
      </span>

      {/* Bubble */}
      <div
        className={`relative max-w-full px-3 py-2.5 rounded-xl border transition-colors ${
          isAgent
            ? "bg-white/5 border-white/8 rounded-tl-none"
            : "bg-amber-500/8 border-amber-500/15 rounded-tr-none"
        } ${isStreaming ? "border-amber-500/20" : ""}`}
      >
        <BlockRenderer blocks={blocks} isStreaming={isStreaming} />

        {/* Action chips — shown after streaming completes */}
        {!isStreaming && message.actionsApplied && message.actionsApplied.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {message.actionsApplied.map((a, i) => (
              <span
                key={i}
                className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[var(--muted)]"
              >
                {a}
              </span>
            ))}
          </div>
        )}
      </div>

      {/*
        PROMOTE — agent bubbles only, never on user bubbles, never while streaming.
        Fades in on hover. Once queued shows a quiet QUEUED label.
      */}
      {isAgent && !isStreaming && (
        <div className={`px-1 transition-opacity duration-150 ${hovered ? "opacity-100" : "opacity-0"}`}>
          {promoted ? (
            <span className="text-[9px] font-bold tracking-widest uppercase text-emerald-400/50">
              queued
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onPromote(message)}
              className="text-[9px] font-bold tracking-widest uppercase text-[var(--muted)]/40 hover:text-amber-400/70 transition-colors"
            >
              promote
            </button>
          )}
        </div>
      )}
    </div>
  );
}
