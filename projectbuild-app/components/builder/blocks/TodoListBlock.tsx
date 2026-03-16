"use client";

import type { TodoTask } from "@/types";

interface TodoListBlockProps {
  tasks: TodoTask[];
}

function TaskIcon({ status }: { status: TodoTask["status"] }) {
  if (status === "done") {
    return (
      <span className="text-amber-400 text-[11px] leading-none select-none">✓</span>
    );
  }
  if (status === "in_progress") {
    return (
      <span className="inline-block w-2 h-2 rounded-full bg-amber-400/70 animate-pulse" />
    );
  }
  // pending
  return (
    <span className="inline-block w-2 h-2 rounded-full border border-[var(--muted)]/30" />
  );
}

export function TodoListBlock({ tasks }: TodoListBlockProps) {
  if (tasks.length === 0) return null;

  return (
    <ul className="space-y-1.5">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center gap-2">
          <span className="shrink-0 w-3 flex items-center justify-center">
            <TaskIcon status={task.status} />
          </span>
          <span
            className={`text-[11px] leading-snug ${
              task.status === "done"
                ? "text-[var(--muted)]/50 line-through"
                : task.status === "in_progress"
                ? "text-[var(--text-blue)]"
                : "text-[var(--muted)]/60"
            }`}
          >
            {task.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
