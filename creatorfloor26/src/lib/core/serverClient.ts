import "server-only";

import { fetchWithCoreFallback, getCoreBaseUrl, getDevBypassProjectId } from "./config";

export type CoreFetchOptions = RequestInit & {
  /** Forward end-user Bearer (Firebase ID token). Overrides env bearer. */
  bearerToken?: string | null;
};

/**
 * Server-side fetch to P0 Core. Uses API key, or dev bypass, or forwarded Bearer.
 */
export async function fetchCore(
  path: string,
  options: CoreFetchOptions = {}
): Promise<Response> {
  const base = getCoreBaseUrl();
  if (!base) {
    throw new Error("P0_CORE_BASE_URL is not set");
  }

  const url = `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = new Headers(options.headers);

  const bearerFromEnv =
    process.env.P0_CORE_BEARER_TOKEN?.trim() ||
    process.env.P0_CORE_API_KEY?.trim() ||
    "";

  const bearer = options.bearerToken?.trim() || bearerFromEnv;

  if (bearer) {
    headers.set("Authorization", `Bearer ${bearer}`);
  } else if (
    process.env.NODE_ENV === "development" &&
    process.env.DEV_BYPASS_SECRET
  ) {
    headers.set("x-dev-bypass", process.env.DEV_BYPASS_SECRET);
    headers.set("x-dev-bypass-project", getDevBypassProjectId());
  }

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  const { bearerToken: _omitBearer, ...rest } = options;
  void _omitBearer;
  return fetchWithCoreFallback(url, {
    ...rest,
    headers,
  });
}
