"use client";

/**
 * BuilderAgentChat — message history strip in the Builder right panel.
 *
 * Renders two layers:
 *   1. Completed messages from Firestore via useMessages (persistent)
 *   2. In-progress streaming message from BuilderShell via streamingMsg prop
 *
 * The streaming bubble sits at the bottom, below all Firestore messages.
 * When the stream finishes, Firestore picks up the written message and
 * streamingMsg is cleared — the Firestore bubble takes over seamlessly.
 */

import { useEffect, useRef, useState } from "react";
import { useMessages } from "@/lib/hooks/useMessages";
import { BuilderBubble } from "./BuilderBubble";
import type { ThreadMessage } from "@/types";
import type { StreamingMessage } from "@/lib/builder/useBuilderStream";
import { CircuitBreakBanner } from "@/components/circuit/CircuitBreakBanner";

interface BuilderAgentChatProps {
  projectId: string;
  runId: string;
  onPromote: (message: ThreadMessage) => void;
  streamingMsg: StreamingMessage | null;
  buildPreamble?: (openFilePath: string | null) => string;
}

// Stub message shape that satisfies BuilderBubble's Pick<ThreadMessage, ...>
function makeStreamingMessage(msg: StreamingMessage): Pick<ThreadMessage, "id" | "authorType" | "agentJobTitle" | "authorName" | "actionsApplied" | "text"> & { blocks: NonNullable<ThreadMessage["blocks"]> } {
  return {
    id: "__streaming__",
    authorType: "agent",
    agentJobTitle: "Agent",
    authorName: "Agent",
    actionsApplied: [],
    text: "",
    blocks: msg.blocks,
  };
}

export function BuilderAgentChat({
  projectId,
  runId,
  onPromote,
  streamingMsg,
  buildPreamble,
}: BuilderAgentChatProps) {
  const messages = useMessages(projectId, runId);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [promotedIds, setPromotedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingMsg]);

  function handlePromote(message: Pick<ThreadMessage, "id" | "authorType" | "agentJobTitle" | "authorName" | "actionsApplied" | "text"> & { blocks?: NonNullable<ThreadMessage["blocks"]> }) {
    setPromotedIds((prev) => new Set([...prev, message.id]));
    onPromote(message as ThreadMessage);
  }

  const isEmpty = messages.length === 0 && !streamingMsg;

  if (isEmpty) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-0">
        <p className="text-[10px] text-[var(--muted)]/40 tracking-[0.2em] uppercase text-center px-4">
          Start a conversation
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto min-h-0 px-3 py-3 space-y-4 custom-scrollbar">
      {/* Completed messages from Firestore */}
      {messages.map((m) => (
        <BuilderBubble
          key={m.id}
          message={m}
          onPromote={handlePromote}
          promoted={promotedIds.has(m.id)}
        />
      ))}

      {/* In-progress streaming bubble — sits at bottom during active stream */}
      {streamingMsg && !streamingMsg.circuitBreak && (
        <BuilderBubble
          key="__streaming__"
          message={makeStreamingMessage(streamingMsg)}
          onPromote={() => {}}
          promoted={false}
          isStreaming
        />
      )}

      {/* Circuit break banner — when stream is terminated by circuit breaker */}
      {streamingMsg?.circuitBreak && (
        <CircuitBreakBanner
          code={streamingMsg.circuitBreak.code}
          reason={streamingMsg.circuitBreak.reason}
        />
      )}

      <div ref={bottomRef} className="h-1" />
    </div>
  );
}
