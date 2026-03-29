import type { BoardItem, BoardColumnId } from "@/lib/board/types";

type UnknownRecord = Record<string, unknown>;

function pickString(o: UnknownRecord, keys: string[]): string {
  for (const k of keys) {
    const v = o[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "Untitled";
}

/**
 * Map Core gaming decisions list JSON into board items (decisions column).
 */
export function mapDecisionsToBoardItems(raw: unknown): BoardItem[] {
  if (!raw || typeof raw !== "object") return [];
  const o = raw as UnknownRecord;
  const list = (o.items ?? o.decisions ?? []) as unknown[];
  if (!Array.isArray(list)) return [];
  return list.map((row, i) => {
    const r = (row && typeof row === "object" ? row : {}) as UnknownRecord;
    const id =
      typeof r.id === "string" ? r.id : `gaming_dec_${i}_${pickString(r, ["title"])}`;
    return {
      id: `decision_${id}`,
      title: pickString(r, ["title", "summary", "description"]),
      column: "decisions" as BoardColumnId,
      kind: "gaming_proposal" as const,
      gamingProposalId: typeof r.id === "string" ? r.id : undefined,
    };
  });
}
