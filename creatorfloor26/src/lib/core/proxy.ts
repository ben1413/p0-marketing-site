import "server-only";
import {
  fetchWithCoreFallback,
  getCoreBaseUrl,
  getDevBypassProjectId,
} from "./config";

export type ProxyCoreOptions = {
  /** Incoming Authorization header from the browser (Firebase ID token). */
  authorizationHeader: string | null;
  method: string;
  path: string;
  search?: string;
  body?: string | null;
  contentType?: string | null;
};

/**
 * Forward a request to P0 Core with the same auth rules as other CF routes.
 */
export async function proxyToCore(opts: ProxyCoreOptions): Promise<Response> {
  const base = getCoreBaseUrl();
  if (!base) {
    return new Response(
      JSON.stringify({ ok: false, error: "P0_CORE_BASE_URL is not set" }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const url = `${base.replace(/\/$/, "")}${opts.path.startsWith("/") ? opts.path : `/${opts.path}`}${opts.search ?? ""}`;

  const headers: Record<string, string> = {
    "x-request-id": crypto.randomUUID(),
  };

  const incoming = opts.authorizationHeader?.trim();
  if (incoming?.startsWith("Bearer ")) {
    headers["Authorization"] = incoming;
  } else {
    const apiKey = process.env.P0_CORE_API_KEY?.trim();
    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    } else if (
      process.env.NODE_ENV === "development" &&
      process.env.DEV_BYPASS_SECRET
    ) {
      headers["x-dev-bypass"] = process.env.DEV_BYPASS_SECRET;
      headers["x-dev-bypass-project"] = getDevBypassProjectId();
    }
  }

  const ct = opts.contentType?.trim();
  if (ct) headers["Content-Type"] = ct;
  else if (opts.body && opts.method !== "GET" && opts.method !== "HEAD") {
    headers["Content-Type"] = "application/json";
  }

  return fetchWithCoreFallback(url, {
    method: opts.method,
    headers,
    body:
      opts.method !== "GET" && opts.method !== "HEAD" && opts.body
        ? opts.body
        : undefined,
    cache: "no-store",
  });
}

export async function readJsonResponse(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { ok: false, error: "Upstream returned non-JSON", raw: text.slice(0, 500) };
  }
}
