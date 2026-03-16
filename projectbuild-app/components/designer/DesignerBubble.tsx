"use client";

/**
 * DesignerBubble — single message bubble for the Designer agent chat strip.
 *
 * Same role-gate pattern as BuilderBubble:
 *   - PROMOTE only on agent bubbles
 *   - Fades in on hover
 *   - Suppressed during streaming
 *
 * Designer differences from BuilderBubble:
 *   - No diff blocks (canvas handles visual diff)
 *   - canvas_update blocks shown as compact "Canvas updated" badge
 *     with element count
 *   - Purple/violet accent instead of amber (designer = violet)
 */

import { useState } from "react";
import type { ThreadMessage, MessageBlock } from "@/types";
import { BlockRenderer } from "@/components/builder/blocks/BlockRenderer";

interface DesignerBubbleProps {
  message: Pick<ThreadMessage, "id" | "authorType" | "agentJobTitle" | "authorName" | "actionsApplied" | "text"> & {
    blocks?: MessageBlock[];
  };
  onPromote: (message: DesignerBubbleProps["message"]) => void;
  promoted?: boolean;
  isStreaming?: boolean;
}

export function DesignerBubble({ message, onPromote, promoted = false, isStreaming = false }: DesignerBubbleProps) {
  const [hovered, setHovered] = useState(false);
  const isAgent = message.authorType === "agent";

  // Filter canvas_update blocks — rendered as compact badge, not in BlockRenderer
  const blocks: MessageBlock[] = (() => {
    const raw = message.blocks && message.blocks.length > 0
      ? message.blocks
      : [{ type: "text" as const, content: message.text }];
    return raw.filter((b) => b.type !== "canvas_update");
  })();

  const canvasUpdateBlock = message.blocks?.find((b) => b.type === "canvas_update");

  return (
    <div
      className={`group flex flex-col gap-1 ${isAgent ? "items-start" : "items-end"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Role label */}
      <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 px-1 font-mono">
        {isAgent ? (message.agentJobTitle || message.authorName || "Agent") : "You"}
      </span>

      {/* Bubble */}
      <div
        className={`relative max-w-full px-3 py-2.5 rounded-xl border transition-colors ${
          isAgent
            ? "bg-white/5 border-white/8 rounded-tl-none"
            : "bg-violet-500/8 border-violet-500/15 rounded-tr-none"
        } ${isStreaming ? "border-violet-500/20" : ""}`}
      >
        {/* Text + todo + file blocks via BlockRenderer */}
        <BlockRenderer blocks={blocks} isStreaming={isStreaming} />

        {/* Canvas update badge */}
        {canvasUpdateBlock && canvasUpdateBlock.type === "canvas_update" && (
          <div className="mt-1.5 flex items-center gap-2 rounded-lg bg-violet-500/10 border border-violet-500/20 px-2.5 py-1.5">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-violet-400/70">
              canvas update
            </span>
            <span className="text-[9px] font-mono text-white/30">
              {canvasUpdateBlock.elements.length} elements
            </span>
          </div>
        )}

        {/* Action chips */}
        {!isStreaming && message.actionsApplied && message.actionsApplied.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {message.actionsApplied.map((a, i) => (
              <span
                key={i}
                className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40 font-mono"
              >
                {a}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* PROMOTE — agent only, not during streaming */}
      {isAgent && !isStreaming && (
        <div className={`px-1 transition-opacity duration-150 ${hovered ? "opacity-100" : "opacity-0"}`}>
          {promoted ? (
            <span className="text-[9px] font-bold tracking-widest uppercase text-emerald-400/50 font-mono">
              queued
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onPromote(message)}
              className="text-[9px] font-bold tracking-widest uppercase text-white/25 hover:text-violet-400/60 transition-colors font-mono"
            >
              promote
            </button>
          )}
        </div>
      )}
    </div>
  );
}
