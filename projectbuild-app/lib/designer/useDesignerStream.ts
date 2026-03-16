"use client";

/**
 * useDesignerStream — SSE consumer for Designer Mode.
 *
 * Extends the Builder stream pattern with canvas_update event handling.
 *
 * Designer differences from useBuilderStream:
 *   1. canvas_update events are captured separately as `pendingCanvasUpdate`
 *      rather than written into the bubble blocks. The shell shows a
 *      preview overlay: "Apply to canvas? [yes] [dismiss]"
 *   2. Every message includes canvas state JSON (injected by DesignerShell
 *      before calling send — not this hook's responsibility).
 *   3. Firestore write includes designerMode: true.
 *   4. No diff blocks — canvas handles visual diff natively.
 *
 * Block assembly follows the same rules as useBuilderStream except:
 *   - canvas_update → sets pendingCanvasUpdate, not added to blocks array
 *   - diff events → ignored (no diff blocks in Designer)
 */

import { useCallback, useRef, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { MessageBlock, TodoTask, CanvasElement } from "@/types";

type DesignerStreamEvent =
  | { type: "text"; content: string }
  | { type: "file_explored"; files: string[]; label?: string }
  | { type: "todo_list"; tasks: TodoTask[] }
  | { type: "todo_update"; taskId: string; status: TodoTask["status"] }
  | { type: "canvas_update"; elements: CanvasElement[]; description?: string };

export type DesignerStreamingMessage = {
  blocks: MessageBlock[];
  agentId?: string;
};

interface UseDesignerStreamOptions {
  projectId: string;
  runId: string;
  agentJobTitle?: string;
}

export function useDesignerStream({ projectId, runId, agentJobTitle }: UseDesignerStreamOptions) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMsg, setStreamingMsg] = useState<DesignerStreamingMessage | null>(null);
  const [pendingCanvasUpdate, setPendingCanvasUpdate] = useState<CanvasElement[] | null>(null);
  const [pendingCanvasDescription, setPendingCanvasDescription] = useState<string | null>(null);

  const blocksRef = useRef<MessageBlock[]>([]);
  const agentIdRef = useRef<string | undefined>(undefined);

  function applyEvent(event: DesignerStreamEvent) {
    if (event.type === "canvas_update") {
      // Surface as pending preview — not into the blocks array
      setPendingCanvasUpdate(event.elements);
      setPendingCanvasDescription(event.description ?? null);
      return;
    }
    blocksRef.current = assembleDesignerBlocks(blocksRef.current, event);
    setStreamingMsg({ blocks: [...blocksRef.current], agentId: agentIdRef.current });
  }

  const send = useCallback(
    async (message: string, agentId?: string) => {
      if (isStreaming || !message.trim()) return;

      blocksRef.current = [];
      agentIdRef.current = agentId;
      setStreamingMsg({ blocks: [], agentId });
      setIsStreaming(true);
      setPendingCanvasUpdate(null);
      setPendingCanvasDescription(null);

      try {
        const res = await fetch("/api/v1/agents/run/stream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            agentId,
            message,
            runId,
            projectId,
            designerMode: true,
          }),
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
              const event = JSON.parse(data) as DesignerStreamEvent;
              applyEvent(event);
            } catch {
              // Ignore malformed events
            }
          }
        }

        await finalizeToFirestore();
      } catch (err) {
        console.error("[useDesignerStream]", err);
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
        designerMode: true,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("[useDesignerStream] Firestore write failed", err);
    } finally {
      setStreamingMsg(null);
      blocksRef.current = [];
    }
  }

  function dismissCanvasUpdate() {
    setPendingCanvasUpdate(null);
    setPendingCanvasDescription(null);
  }

  return {
    send,
    isStreaming,
    streamingMsg,
    pendingCanvasUpdate,
    pendingCanvasDescription,
    dismissCanvasUpdate,
  };
}

// ── Block assembly ──────────────────────────────────────────────────────────

function assembleDesignerBlocks(
  prev: MessageBlock[],
  event: Exclude<DesignerStreamEvent, { type: "canvas_update" }>
): MessageBlock[] {
  switch (event.type) {
    case "text": {
      const idx = prev.findIndex((b) => b.type === "text");
      if (idx !== -1) {
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

    default:
      return prev;
  }
}
