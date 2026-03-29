/**
 * MCP auth — resolves P0_API_KEY into an AuthContext for the session.
 * Key is read from P0_API_KEY env var (set in MCP client config).
 * Validates against Core's /api/admin/ping to confirm the key works,
 * then holds the resolved context for the session lifetime.
 */

export type MCPAuthContext = {
  apiKey: string;
  projectId: string;
  uid: string;
};

let cachedAuth: MCPAuthContext | null = null;

function getCoreBaseUrl(): string {
  return (
    process.env.P0_CORE_URL?.replace(/\/+$/, "") ||
    "http://localhost:3000"
  );
}

export function getApiKey(): string {
  const key = process.env.P0_API_KEY?.trim();
  if (!key) {
    throw new Error(
      "P0 authentication failed. Set P0_API_KEY in your MCP client config."
    );
  }
  return key;
}

/**
 * Validate the API key against Core and cache the auth context.
 * Called once on first tool invocation; subsequent calls return cached result.
 */
export async function resolveAuth(): Promise<MCPAuthContext> {
  if (cachedAuth) return cachedAuth;

  const apiKey = getApiKey();
  const base = getCoreBaseUrl();

  const res = await fetch(`${base}/api/admin/ping`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `P0 authentication failed (${res.status}). Provide a valid Core API key in your MCP client config. ${body}`
    );
  }

  const data = (await res.json()) as {
    ok?: boolean;
    projectId?: string;
    uid?: string;
  };

  cachedAuth = {
    apiKey,
    projectId: data.projectId || "unknown",
    uid: data.uid || "mcp-user",
  };

  return cachedAuth;
}

/**
 * Make an authenticated request to Core API.
 * Returns parsed JSON response.
 */
export async function coreRequest<T = Record<string, unknown>>(
  method: "GET" | "POST",
  path: string,
  body?: Record<string, unknown>,
  queryParams?: Record<string, string>
): Promise<{ status: number; data: T }> {
  const auth = await resolveAuth();
  const base = getCoreBaseUrl();

  let url = `${base}${path}`;
  if (queryParams) {
    const params = new URLSearchParams(queryParams);
    url += `?${params.toString()}`;
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${auth.apiKey}`,
    "Content-Type": "application/json",
  };

  const res = await fetch(url, {
    method,
    headers,
    ...(body && method !== "GET" ? { body: JSON.stringify(body) } : {}),
  });

  const data = (await res.json().catch(() => ({
    ok: false,
    error: "Failed to parse response",
  }))) as T;

  return { status: res.status, data };
}
