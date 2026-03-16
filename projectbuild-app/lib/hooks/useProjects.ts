"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { Project } from "@/types";

type ProjectDoc = {
  name?: unknown;
  description?: unknown;
  createdBy?: unknown;
  createdAt?: unknown;
  isCore?: unknown;
};

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "pb_projects"), orderBy("createdAt", "desc"));

    return onSnapshot(q, (snap) => {
      const rows: Project[] = snap.docs.map((d) => {
        const data = d.data() as ProjectDoc;
        return {
          id: d.id,
          name: typeof data.name === "string" ? data.name : d.id,
          description: typeof data.description === "string" ? data.description : undefined,
          createdBy: typeof data.createdBy === "string" ? data.createdBy : "unknown",
          createdAt: data.createdAt,
          isCore: typeof data.isCore === "boolean" ? data.isCore : false,
        };
      });
      setProjects(rows);
      setLoading(false);
    });
  }, []);

  return { projects, loading };
}
