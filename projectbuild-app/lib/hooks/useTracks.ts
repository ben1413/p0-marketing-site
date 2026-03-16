"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { Track } from "@/types";

export function useTracks(projectId: string) {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    if (!projectId) return;
    const q = query(
      collection(db, "pb_tracks"),
      where("projectId", "==", projectId),
      orderBy("createdAt", "asc")
    );
    return onSnapshot(q, (snap) => {
      setTracks(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Track)));
    });
  }, [projectId]);

  return tracks;
}
