"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "@/components/auth/AuthProvider";
import { isFirebaseClientConfigured, getFirestoreDb } from "@/lib/firebase/client";
import type { CfProjectDoc } from "./projectTypes";
import { loadRegistry } from "./registry";

export type CfProjectView = CfProjectDoc & {
  firestoreDocId?: string;
  coreProjectId: string;
};

export function useCfProject(coreProjectId: string | undefined) {
  const { user, firebaseEnabled } = useAuth();
  const [project, setProject] = useState<CfProjectView | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!coreProjectId) {
      setProject(null);
      setLoading(false);
      return;
    }

    const fromRegistry = loadRegistry().find((p) => p.id === coreProjectId);
    const fallback: CfProjectView | null = fromRegistry
      ? {
          coreProjectId: fromRegistry.id,
          name: fromRegistry.name,
          platform: fromRegistry.platform as CfProjectView["platform"],
          kit: fromRegistry.kit as CfProjectView["kit"],
          userId: user?.uid ?? "local",
          status: "building",
          createdAt: fromRegistry.createdAt,
          updatedAt: fromRegistry.createdAt,
          agentIds: fromRegistry.agentIds,
        }
      : null;

    if (!firebaseEnabled || !isFirebaseClientConfigured() || !user) {
      setProject(fallback);
      setLoading(false);
      return;
    }

    const db = getFirestoreDb();
    if (!db) {
      setProject(fallback);
      setLoading(false);
      return;
    }

    let unsub: (() => void) | undefined;
    let cancelled = false;

    void (async () => {
      const snap = await getDocs(
        query(
          collection(db, "cf_projects"),
          where("userId", "==", user.uid),
          where("coreProjectId", "==", coreProjectId)
        )
      );
      if (cancelled) return;
      if (snap.empty) {
        setProject(fallback);
        setLoading(false);
        return;
      }
      const docRef = snap.docs[0]!.ref;
      const apply = (data: CfProjectDoc, id: string) =>
        setProject({ ...data, coreProjectId: data.coreProjectId, firestoreDocId: id });

      apply(snap.docs[0]!.data() as CfProjectDoc, snap.docs[0]!.id);
      setLoading(false);

      unsub = onSnapshot(docRef, (s) => {
        if (!s.exists()) return;
        apply(s.data() as CfProjectDoc, s.id);
      });
    })();

    return () => {
      cancelled = true;
      unsub?.();
    };
  }, [coreProjectId, user, firebaseEnabled]);

  return { project, loading };
}
