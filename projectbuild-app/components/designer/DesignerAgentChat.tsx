"use client";

/**
 * DesignerAgentChat — message history strip for the Designer right panel.
 *
 * Same two-layer pattern as BuilderAgentChat:
 *   1. Completed messages from Firestore via useMessages (persistent)
 *   2. In-progress streaming message from DesignerShell via streamingMsg prop
 */

import { useEffect, useRef, useState } from "react";
import { useMessages } from "@/lib/hooks/useMessages";
import { DesignerBubble } from "./DesignerBubble";
import type { ThreadMessage, MessageBlock } from "@/types";
import type { DesignerStreamingMessage } from "@/lib/designer/useDesignerStream";

interface DesignerAgentChatProps {
  projectId: string;
  runId: string;
  streamingMsg: DesignerStreamingMessage | null;
  onPromote: (message: ThreadMessage) => void;
}

function makeStreamingMessage(
  msg: DesignerStreamingMessage
): Pick<ThreadMessage, "id" | "authorType" | "agentJobTitle" | "authorName" | "actionsApplied" | "text"> & {
  blocks: MessageBlock[];
} {
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

export function DesignerAgentChat({ projectId, runId, streamingMsg, onPromote }: DesignerAgentChatProps) {
  const messages = useMessages(projectId, runId);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [promotedIds, setPromotedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingMsg]);

  function handlePromote(message: Pick<ThreadMessage, "id" | "authorType" | "agentJobTitle" | "authorName" | "actionsApplied" | "text"> & { blocks?: MessageBlock[] }) {
    setPromotedIds((prev) => new Set([...prev, message.id]));
    onPromote(message as ThreadMessage);
  }

  const isEmpty = messages.length === 0 && !streamingMsg;

  if (isEmpty) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-0">
        <p className="text-[10px] text-white/20 tracking-[0.2em] uppercase text-center px-4 font-mono">
          Ask the agent
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto min-h-0 px-3 py-3 space-y-4 custom-scrollbar">
      {messages.map((m) => (
        <DesignerBubble
          key={m.id}
          message={m}
          onPromote={handlePromote}
          promoted={promotedIds.has(m.id)}
        />
      ))}

      {streamingMsg && (
        <DesignerBubble
          key="__streaming__"
          message={makeStreamingMessage(streamingMsg)}
          onPromote={() => {}}
          promoted={false}
          isStreaming
        />
      )}

      <div ref={bottomRef} className="h-1" />
    </div>
  );
}
