"use client";

/**
 * BlockRenderer — renders an ordered array of MessageBlocks inside a bubble.
 *
 * Block display order: file_explored → todo_list → text → diff
 * This matches the reasoning trail feel: what was explored, what was planned,
 * what was said, what changed.
 *
 * Backward compat: if no blocks, callers should pass a single text block
 * wrapping message.text — handled upstream in BuilderBubble.
 */

import type { MessageBlock } from "@/types";
import { TextBlock } from "./TextBlock";
import { TodoListBlock } from "./TodoListBlock";
import { FileExploredBlock } from "./FileExploredBlock";
import { DiffBlock } from "./DiffBlock";

const BLOCK_ORDER: MessageBlock["type"][] = [
  "file_explored",
  "todo_list",
  "text",
  "diff",
];

interface BlockRendererProps {
  blocks: MessageBlock[];
  isStreaming?: boolean;
}

export function BlockRenderer({ blocks, isStreaming }: BlockRendererProps) {
  // Sort by canonical order, preserve relative order within same type
  const sorted = [...blocks].sort(
    (a, b) => BLOCK_ORDER.indexOf(a.type) - BLOCK_ORDER.indexOf(b.type)
  );

  return (
    <div className="space-y-3">
      {sorted.map((block, i) => {
        switch (block.type) {
          case "file_explored":
            return (
              <FileExploredBlock
                key={i}
                files={block.files}
                label={block.label}
              />
            );
          case "todo_list":
            return <TodoListBlock key={i} tasks={block.tasks} />;
          case "text":
            return (
              <TextBlock
                key={i}
                content={block.content}
                // Only animate the cursor on the last text block while streaming
                isStreaming={isStreaming && i === sorted.length - 1}
              />
            );
          case "diff":
            return (
              <DiffBlock
                key={i}
                filePath={block.filePath}
                before={block.before}
                after={block.after}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
