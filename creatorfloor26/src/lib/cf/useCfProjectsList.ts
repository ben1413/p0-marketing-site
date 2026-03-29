"use client";

import { useEffect, useState } from "react";
import { subscribeCfProjects, type CfProjectRow } from "./firestoreProjects";
import { useAuth } from "@/components/auth/AuthProvider";
import { isFirebaseClientConfigured } from "@/lib/firebase/client";
import { loadRegistry, type RegisteredProject } from "./registry";

function registryToRows(reg: RegisteredProject[]): CfProjectRow[] {
  return reg.map((p) => ({
    id: p.id,
    name: p.name,
    platform: p.platform as CfProjectRow["platform"],
    kit: p.kit as CfProjectRow["kit"],
    coreProjectId: p.id,
    userId: "local",
    status: "building",
    createdAt: p.createdAt,
    updatedAt: p.createdAt,
    agentIds: p.agentIds,
  }));
}

function mergeByCoreId(local: CfProjectRow[], remote: CfProjectRow[]): CfProjectRow[] {
  const map = new Map<string, CfProjectRow>();
  for (const r of local) map.set(r.coreProjectId, r);
  for (const r of remote) map.set(r.coreProjectId, r);
  return [...map.values()].sort((a, b) =>
    (b.createdAt || "").localeCompare(a.createdAt || "")
  );
}

export function useCfProjectsList() {
  const { user, firebaseEnabled } = useAuth();
  const [rows, setRows] = useState<CfProjectRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseEnabled || !isFirebaseClientConfigured() || !user) {
      setRows(registryToRows(loadRegistry()));
      setLoading(false);
      return;
    }

    const unsub = subscribeCfProjects(
      user.uid,
      (list) => {
        setRows(mergeByCoreId(registryToRows(loadRegistry()), list));
        setLoading(false);
      },
      () => {
        setRows(registryToRows(loadRegistry()));
        setLoading(false);
      }
    );

    if (!unsub) {
      setRows(registryToRows(loadRegistry()));
      setLoading(false);
      return () => {};
    }

    return unsub;
  }, [user, firebaseEnabled]);

  return { rows, loading };
}
