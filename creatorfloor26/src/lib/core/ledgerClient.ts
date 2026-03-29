import "server-only";
import { fetchCore } from "./serverClient";

function bearerFromRequest(authHeader: string | null): string | undefined {
  const t = authHeader?.trim();
  if (t?.startsWith("Bearer ")) return t.slice(7).trim();
  return undefined;
}

export async function promoteToLedgerAsUser(
  authHeader: string | null,
  payload: Record<string, unknown>
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const bearer = bearerFromRequest(authHeader);
  const res = await fetchCore("/api/v1/ledger/promote", {
    method: "POST",
    bearerToken: bearer,
    body: JSON.stringify(payload),
  });
  const data = (await res.json()) as { ok?: boolean; id?: string; error?: string };
  if (!res.ok) return { ok: false, error: data.error || `Promote failed (${res.status})` };
  return { ok: true, id: data.id };
}

export async function ensureEvaluationAsUser(
  authHeader: string | null,
  projectId: string
): Promise<string> {
  const bearer = bearerFromRequest(authHeader);
  const listRes = await fetchCore(
    `/api/v1/evaluations?projectId=${encodeURIComponent(projectId)}&limit=50`,
    { method: "GET", bearerToken: bearer }
  );
  const listData = (await listRes.json()) as {
    ok?: boolean;
    items?: Array<{ id?: string; title?: string; name?: string }>;
    error?: string;
  };
  if (!listRes.ok) {
    throw new Error(listData.error || `Failed to list evaluations (${listRes.status})`);
  }
  const defaultName = `${projectId}-default`;
  const existing = (listData.items ?? []).find(
    (item) =>
      item &&
      (item.title === defaultName || item.name === defaultName) &&
      typeof item.id === "string"
  );
  if (existing?.id) return existing.id;

  const createRes = await fetchCore("/api/v1/evaluations", {
    method: "POST",
    bearerToken: bearer,
    body: JSON.stringify({ projectId, name: defaultName }),
  });
  const data = (await createRes.json()) as {
    ok?: boolean;
    evaluationId?: string;
    id?: string;
    evaluation?: { id: string };
    error?: string;
  };
  if (!createRes.ok) {
    throw new Error(data.error || `Failed to ensure evaluation (${createRes.status})`);
  }
  const evaluationId = data.evaluationId ?? data.id ?? data.evaluation?.id;
  if (!evaluationId) throw new Error("Core returned no evaluation id");
  return evaluationId;
}

export async function gamingDecisionsProposeAsUser(
  authHeader: string | null,
  body: Record<string, unknown>
): Promise<{ ok: boolean; proposal?: unknown; error?: string; status: number }> {
  const bearer = bearerFromRequest(authHeader);
  const res = await fetchCore("/api/v1/gaming/decisions/propose", {
    method: "POST",
    bearerToken: bearer,
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    proposal?: unknown;
    error?: string;
  };
  if (!res.ok) return { ok: false, error: data.error || `Propose failed (${res.status})`, status: res.status };
  return { ok: true, proposal: data.proposal ?? data, status: res.status };
}
