"use client";

/**
 * useBuilderStream — consumes the SSE stream from /api/v1/agents/run/stream
 * and assembles MessageBlocks in real time.
 *
 * Architecture:
 *   send()         — called by BuilderAgentBar; starts a fetch stream
 *   streamingMsg   — the in-progress message shown by BuilderAgentChat
 *   isStreaming    — true while stream is open; disables the send input
 *
 * On [DONE] the assembled message is written to Firestore (pb_messages)
 * so useMessages picks it up. streamingMsg is cleared immediately after —
 * the Firestore message takes over rendering within one snapshot cycle.
 *
 * Block assembly rules per event type:
 *   text         → create or append to the single text block
 *   file_explored → create or merge into a single file_explored block
 *   todo_list    → replace todo_list block wholesale
 *   todo_update  → patch a specific task's status in the todo_list block
 *   diff         → append a new diff block
 */

import { useCallback, useRef, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { MessageBlock, TodoTask } from "@/types";

type StreamEvent =
  | { type: "text"; content: string }
  | { type: "file_explored"; files: string[]; label?: string }
  | { type: "todo_list"; tasks: TodoTask[] }
  | { type: "todo_update"; taskId: string; status: TodoTask["status"] }
  | { type: "diff"; before: string; after: string; filePath: string };

export type StreamingMessage = {
  blocks: MessageBlock[];
  agentId?: string;
};

interface UseBuilderStreamOptions {
  projectId: string;
  runId: string;
  agentJobTitle?: string;
}

export function useBuilderStream({ projectId, runId, agentJobTitle }: UseBuilderStreamOptions) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMsg, setStreamingMsg] = useState<StreamingMessage | null>(null);

  // Ref keeps the latest blocks accessible inside async stream reader
  // without stale closure issues
  const blocksRef = useRef<MessageBlock[]>([]);
  const agentIdRef = useRef<string | undefined>(undefined);

  function applyEvent(event: StreamEvent) {
    blocksRef.current = assembleBlocks(blocksRef.current, event);
    setStreamingMsg({ blocks: [...blocksRef.current], agentId: agentIdRef.current });
  }

  const send = useCallback(
    async (message: string, agentId?: string) => {
      if (isStreaming || !message.trim()) return;

      blocksRef.current = [];
      agentIdRef.current = agentId;
      setStreamingMsg({ blocks: [], agentId });
      setIsStreaming(true);

      try {
        const res = await fetch("/api/v1/agents/run/stream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ agentId, message, runId, projectId, builderMode: true }),
        });

        if (!res.ok || !res.body) {
          throw new Error(`Stream failed: ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

         
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // SSE events are separated by \n\n
          const parts = buffer.split("\n\n");
          buffer = parts.pop() ?? "";

          for (const part of parts) {
            const line = part.trim();
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6);

            if (data === "[DONE]") {
              await finalizeToFirestore();
              return;
            }

            try {
              const event = JSON.parse(data) as StreamEvent;
              applyEvent(event);
            } catch {
              // Ignore malformed events — stream continues
            }
          }
        }

        // Stream ended without [DONE] — finalize anyway
        await finalizeToFirestore();
      } catch (err) {
        console.error("[useBuilderStream]", err);
        // Write whatever was assembled before the error
        if (blocksRef.current.length > 0) await finalizeToFirestore();
        else setStreamingMsg(null);
      } finally {
        setIsStreaming(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isStreaming, projectId, runId]
  );

  async function finalizeToFirestore() {
    const blocks = blocksRef.current;
    // Derive plain text from text blocks for backward compat
    const text = blocks
      .filter((b): b is Extract<MessageBlock, { type: "text" }> => b.type === "text")
      .map((b) => b.content)
      .join("");

    try {
      await addDoc(collection(db, "pb_messages"), {
        projectId,
        runId,
        text: text || "[no text]",
        blocks,
        authorType: "agent",
        agentId: agentIdRef.current ?? null,
        agentJobTitle: agentJobTitle ?? "Agent",
        truthPosture: "inferred",
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("[useBuilderStream] Firestore write failed", err);
    } finally {
      // Clear streaming state — Firestore message takes over
      setStreamingMsg(null);
      blocksRef.current = [];
    }
  }

  return { send, isStreaming, streamingMsg };
}

// ── Block assembly ─────────────────────────────────────────────────────────

function assembleBlocks(prev: MessageBlock[], event: StreamEvent): MessageBlock[] {
  switch (event.type) {
    case "text": {
      const idx = prev.findIndex((b) => b.type === "text");
      if (idx !== -1) {
        // Append to existing text block
        return prev.map((b, i) =>
          i === idx && b.type === "text" ? { ...b, content: b.content + event.content } : b
        );
      }
      return [...prev, { type: "text", content: event.content }];
    }

    case "file_explored": {
      const idx = prev.findIndex((b) => b.type === "file_explored");
      if (idx !== -1 && prev[idx].type === "file_explored") {
        const existing = prev[idx] as Extract<MessageBlock, { type: "file_explored" }>;
        const merged = [...existing.files, ...event.files];
        const label = `Explored ${merged.length} file${merged.length === 1 ? "" : "s"}`;
        return prev.map((b, i) =>
          i === idx ? { type: "file_explored" as const, files: merged, label } : b
        );
      }
      const label = event.label ?? `Explored ${event.files.length} file${event.files.length === 1 ? "" : "s"}`;
      return [...prev, { type: "file_explored", files: event.files, label }];
    }

    case "todo_list": {
      const without = prev.filter((b) => b.type !== "todo_list");
      return [...without, { type: "todo_list", tasks: event.tasks }];
    }

    case "todo_update": {
      return prev.map((b) => {
        if (b.type !== "todo_list") return b;
        return {
          ...b,
          tasks: b.tasks.map((t) =>
            t.id === event.taskId ? { ...t, status: event.status } : t
          ),
        };
      });
    }

    case "diff": {
      return [
        ...prev,
        { type: "diff", before: event.before, after: event.after, filePath: event.filePath },
      ];
    }

    default:
      return prev;
  }
}
