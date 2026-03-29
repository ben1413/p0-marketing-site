"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { getFirebaseAuth, getFirestoreDb } from "@/lib/firebase/client";
import type { BoardDoc, BoardItem, BoardColumnId } from "./types";

/**
 * Boards live under users/{uid}/cf_boards/{coreProjectId} so Firestore rules
 * can enforce owner == request.auth.uid without orphan-document issues.
 */
function boardDocRef(db: ReturnType<typeof getFirestoreDb>, uid: string, coreProjectId: string) {
  return doc(db!, "users", uid, "cf_boards", coreProjectId);
}

export function useBoard(coreProjectId: string | undefined) {
  const [items, setItems] = useState<BoardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!coreProjectId) {
      setItems([]);
      setLoading(false);
      return;
    }
    const db = getFirestoreDb();
    const auth = getFirebaseAuth();
    const uid = auth?.currentUser?.uid;
    if (!db || !uid) {
      setItems([]);
      setLoading(false);
      return;
    }

    const ref = boardDocRef(db, uid, coreProjectId);
    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) {
        setItems([]);
        setLoading(false);
        return;
      }
      const data = snap.data() as BoardDoc;
      setItems(data.items ?? []);
      setLoading(false);
    });

    return () => unsub?.();
  }, [coreProjectId]);

  async function persist(next: BoardItem[]) {
    if (!coreProjectId) return;
    const db = getFirestoreDb();
    const auth = getFirebaseAuth();
    const uid = auth?.currentUser?.uid;
    if (!db || !uid) return;
    const ref = boardDocRef(db, uid, coreProjectId);
    const docData: BoardDoc = {
      items: next,
      updatedAt: new Date().toISOString(),
    };
    await setDoc(ref, docData, { merge: true });
  }

  function move(itemId: string, to: BoardColumnId) {
    const next = items.map((i) =>
      i.id === itemId ? { ...i, column: to } : i
    );
    setItems(next);
    void persist(next);
  }

  function add(title: string, column: BoardColumnId = "tasks") {
    const id = `local_${Date.now()}`;
    const next = [...items, { id, title, column }];
    setItems(next);
    void persist(next);
  }

  return { items, loading, move, add };
}
