"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { BoardItem, BoardDoc, BoardColumnId } from "@/types";

export function useBoard(projectId: string) {
  const [items, setItems] = useState<BoardItem[]>([]);

  useEffect(() => {
    if (!projectId) return;
    const ref = doc(db, "pb_boards", projectId);
    return onSnapshot(ref, (snap) => {
      const data = snap.data() as BoardDoc | undefined;
      setItems(data?.items ?? []);
    });
  }, [projectId]);

  async function saveItems(newItems: BoardItem[]) {
    const ref = doc(db, "pb_boards", projectId);
    await setDoc(ref, { items: newItems, updatedAt: serverTimestamp() });
  }

  function moveItem(itemId: string, targetColumn: BoardColumnId) {
    const newItems = items.map((i) =>
      i.id === itemId ? { ...i, columnId: targetColumn } : i
    );
    setItems(newItems); // optimistic
    saveItems(newItems);
  }

  function addItem(item: Omit<BoardItem, "id">) {
    const newItem: BoardItem = { ...item, id: crypto.randomUUID() };
    const newItems = [...items, newItem];
    setItems(newItems); // optimistic
    saveItems(newItems);
  }

  // Apply board actions returned from Core (clientExecute: true)
  function applyBoardActions(actions: import("@/types").BoardAction[]) {
    let current = [...items];
    for (const action of actions) {
      if (!action.ok || !("clientExecute" in action)) continue;
      if (action.type === "create_board_task") {
        current.push({
          id: crypto.randomUUID(),
          title: action.payload.title,
          description: action.payload.description,
          columnId: "tasks",
          createdBy: "agent",
          createdByType: "agent",
        });
      } else if (action.type === "move_board_task") {
        current = current.map((i) =>
          i.id === action.payload.taskId
            ? { ...i, columnId: action.payload.targetChapterId as BoardColumnId }
            : i
        );
      } else if (action.type === "assign_board_task") {
        current = current.map((i) =>
          i.id === action.payload.taskId
            ? { ...i, assignedTo: action.payload.assigneeId }
            : i
        );
      }
    }
    setItems(current); // optimistic
    saveItems(current);
  }

  return { items, moveItem, addItem, applyBoardActions };
}
