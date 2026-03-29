"use client";

import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
  type Unsubscribe,
} from "firebase/firestore";
import type { CfProjectDoc } from "./projectTypes";
import { getFirestoreDb } from "@/lib/firebase/client";
import type { CreatorKitId, GamePlatform } from "@/lib/init/types";

export type CfProjectRow = { id: string } & CfProjectDoc;

const COL = "cf_projects";

export function subscribeCfProjects(
  userId: string,
  onData: (rows: CfProjectRow[]) => void,
  onError?: (e: Error) => void
): Unsubscribe | null {
  const db = getFirestoreDb();
  if (!db) return null;
  const q = query(collection(db, COL), where("userId", "==", userId));
  return onSnapshot(
    q,
    (snap) => {
      const rows: CfProjectRow[] = snap.docs.map((d) => {
        const data = d.data() as CfProjectDoc;
        return { id: d.id, ...data };
      });
      rows.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
      onData(rows);
    },
    (err) => onError?.(err)
  );
}

export async function addCfProject(
  userId: string,
  params: {
    coreProjectId: string;
    name: string;
    platform: GamePlatform;
    kit: CreatorKitId;
    agentIds: NonNullable<CfProjectDoc["agentIds"]>;
    gameId?: string;
  }
): Promise<string> {
  const db = getFirestoreDb();
  if (!db) throw new Error("Firestore not configured");
  const now = new Date().toISOString();
  const payload: CfProjectDoc = {
    name: params.name,
    platform: params.platform,
    kit: params.kit,
    coreProjectId: params.coreProjectId,
    gameId: params.gameId?.trim() || undefined,
    userId,
    status: "building",
    agentIds: params.agentIds,
    createdAt: now,
    updatedAt: now,
  };
  const ref = await addDoc(collection(db, COL), payload);
  return ref.id;
}

export async function findCfProjectByCoreId(
  userId: string,
  coreProjectId: string
): Promise<CfProjectRow | null> {
  const db = getFirestoreDb();
  if (!db) return null;
  const q = query(
    collection(db, COL),
    where("userId", "==", userId),
    where("coreProjectId", "==", coreProjectId)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0]!;
  return { id: d.id, ...(d.data() as CfProjectDoc) };
}

export async function updateCfProject(
  firestoreDocId: string,
  patch: Partial<Pick<CfProjectDoc, "name" | "gameId" | "status">>
): Promise<void> {
  const db = getFirestoreDb();
  if (!db) throw new Error("Firestore not configured");
  const payload: Record<string, string> = {
    updatedAt: new Date().toISOString(),
  };
  if (patch.name !== undefined) payload.name = patch.name;
  if (patch.status !== undefined) payload.status = patch.status;
  if (patch.gameId !== undefined) payload.gameId = patch.gameId || "";
  await updateDoc(doc(db, COL, firestoreDocId), payload);
}
