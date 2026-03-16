"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { ThreadMessage } from "@/types";

export function useMessages(projectId: string, runId: string, trackId?: string) {
  const [messages, setMessages] = useState<ThreadMessage[]>([]);

  useEffect(() => {
    if (!projectId || !runId) return;

    // Messages live flat at root level, filtered by projectId + runId
    // Same pattern as Solo (topicId → projectId, no orderBy to avoid composite index)
    const constraints = [
      where("projectId", "==", projectId),
      where("runId", "==", runId),
    ];
    if (trackId) constraints.push(where("trackId", "==", trackId));

    const q = query(collection(db, "pb_messages"), ...constraints);

    return onSnapshot(q, (snap) => {
      const msgs = snap.docs.map((d) => ({ id: d.id, ...d.data() } as ThreadMessage));
      msgs.sort((a, b) => (a.createdAt?.seconds ?? 0) - (b.createdAt?.seconds ?? 0));
      setMessages(msgs);
    });
  }, [projectId, runId, trackId]);

  return messages;
}
