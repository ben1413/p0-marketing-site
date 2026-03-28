import "server-only";
import type { RunSimpleResponse, PromotePayload } from "@/types";

function buildHeaders(): Record<string, string> {
  const apiKey = process.env.P0_CORE_API_KEY;
  const jwt = process.env.P0_CORE_JWT;
  const devBypass = process.env.DEV_BYPASS_SECRET;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-request-id":
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `pb-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
  };

  const bearer = apiKey || jwt;
  if (bearer) {
    headers["Authorization"] = `Bearer ${bearer}`;
  } else if (devBypass) {
    headers["x-dev-bypass"] = devBypass;
  }

  return headers;
}

function baseUrl(): string {
  const url = process.env.P0_CORE_BASE_URL;
  if (!url) throw new Error("P0_CORE_BASE_URL is not set");
  return url;
}

// Resolve agentId: accepts a direct ID or an env-mapped persona key (e.g. "TONI" → P0_CORE_AGENT_TONI)
function resolveAgentId(requested?: string): string {
  if (!requested) {
    const fallback = process.env.P0_CORE_AGENT_ID;
    if (!fallback) throw new Error("No agentId provided and P0_CORE_AGENT_ID not set");
    return fallback;
  }
  const envKey = `P0_CORE_AGENT_${requested.toUpperCase()}`;
  return process.env[envKey] || process.env.P0_CORE_AGENT_ID || requested;
}

export type RunInput = {
  agentId?: string;
  message: string;
  memoryScope?: "working" | "core";
  runId?: string;
  projectId?: string;
  humanAck?: boolean;
  builderMode?: boolean; // when true, Core parses structured blocks from reply
};

export async function runAgentSimple(input: RunInput): Promise<RunSimpleResponse> {
  const url = `${baseUrl()}/api/v1/agents/run/simple`;
  const agentId = resolveAgentId(input.agentId);

  const body = {
    agentId,
    message: input.message,
    memoryScope: input.memoryScope ?? "working",
    runId: input.runId,
    humanAck: input.humanAck,
    ...(input.builderMode && { builderMode: true }),
  };

  const res = await fetch(url, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(body),
    cache: "no-store",
  });

  // Retry once on 429
  if (res.status === 429) {
    await new Promise((r) => setTimeout(r, 1500));
    const retry = await fetch(url, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const data = (await retry.json()) as RunSimpleResponse;
    return data;
  }

  const data = (await res.json()) as RunSimpleResponse;
  return data;
}

/**
 * Streaming variant — proxies SSE from Core's /run/simple/stream.
 * Returns the raw Response so the caller (route handler) can proxy the body.
 */
export async function runAgentStream(input: RunInput): Promise<Response> {
  const url = `${baseUrl()}/api/v1/agents/run/simple/stream`;
  const agentId = resolveAgentId(input.agentId);

  return fetch(url, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({
      agentId,
      message: input.message,
      memoryScope: input.memoryScope ?? "working",
      runId: input.runId,
      projectId: input.projectId,
      builderMode: true,
    }),
    cache: "no-store",
  });
}

export async function promoteToLedger(payload: PromotePayload): Promise<{ ok: boolean; id?: string; error?: string }> {
  const res = await fetch(`${baseUrl()}/api/v1/ledger/promote`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const data = (await res.json()) as { ok?: boolean; id?: string; error?: string };
  if (!res.ok) return { ok: false, error: data.error || `Promote failed (${res.status})` };
  return { ok: true, id: data.id };
}

export async function ensureEvaluation(projectId: string): Promise<string> {
  const res = await fetch(`${baseUrl()}/api/v1/evaluations`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({ projectId, name: `${projectId}-default` }),
    cache: "no-store",
  });
  const data = (await res.json()) as { id?: string; evaluation?: { id: string } };
  return data.id ?? data.evaluation?.id ?? projectId;
}

export async function listAgents(projectId: string): Promise<{ items: import("@/types").Agent[] }> {
  const res = await fetch(`${baseUrl()}/api/v1/agents/list?projectId=${projectId}`, {
    headers: buildHeaders(),
    cache: "no-store",
  });
  const data = (await res.json()) as { items?: import("@/types").Agent[] };
  return { items: data.items ?? [] };
}

export type RegisterAgentInput = {
  name: string;
  persona: string;
  jobTitle: string;
  description?: string;
  allowedActions: string[];
  llm: { provider: string; model: string; version?: string };
};

export async function registerAgent(input: RegisterAgentInput): Promise<{ ok: boolean; agentId?: string; error?: string }> {
  const res = await fetch(`${baseUrl()}/api/v1/agents/register`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(input),
    cache: "no-store",
  });

  const data = (await res.json()) as { ok?: boolean; agentId?: string; error?: string };
  if (!res.ok || !data.agentId) {
    return { ok: false, error: data.error || `Agent register failed (${res.status})` };
  }
  return { ok: true, agentId: data.agentId };
}

export type AgentSelfPayload = {
  self: {
    agent: { id: string; name: string; persona: string; job_title: string; description?: string; status: string; allowed_actions: string[] };
    persona: { id: string; name: string; role: string; description?: string; capabilities: string[]; restrictions: string[] } | null;
    job: { id: string; objective: string; allowed_actions: string[]; disallowed_actions: string[]; authority_level?: string } | null;
    control_state: { op: string; reason: string; timestamp: string } | null;
    governance_rules: { id: string; type: string; action: string; reason: string }[];
    recent_gov_decisions: { action: string; outcome: string; reason?: string; timestamp: string }[];
    recent_runs: { run_id: string; completed_at?: string }[];
    roster: { id: string; name: string; job_title: string; description?: string; status: string }[];
  };
};

export async function getAgentSelf(agentId: string): Promise<AgentSelfPayload | null> {
  try {
    const res = await fetch(`${baseUrl()}/api/v1/agents/${agentId}/self`, {
      headers: buildHeaders(),
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as AgentSelfPayload;
  } catch {
    return null;
  }
}
