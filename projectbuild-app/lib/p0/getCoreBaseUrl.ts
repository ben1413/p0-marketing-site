/**
 * Resolve Core base URL with 3000↔3001 fallback in dev.
 * When Core moves ports (e.g. Build on 3000, Core on 3001), retries with alternate.
 */

/** Cached working base URL (avoids retrying every request after first success). */
let cachedWorkingBase: string | null = null;

export function getCoreBaseUrl(): string {
  if (cachedWorkingBase) return cachedWorkingBase;
  const fromEnv =
    process.env.P0_CORE_BASE_URL ??
    process.env.NEXT_PUBLIC_P0_CORE_BASE_URL ??
    "";
  return fromEnv.replace(/\/$/, "");
}

/** Swap localhost port 3000↔3001. Returns null if not localhost. */
function swapLocalhostPort(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname !== "localhost") return null;
    if (u.port === "3000") {
      u.port = "3001";
      return u.toString();
    }
    if (u.port === "3001") {
      u.port = "3000";
      return u.toString();
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch with 3000↔3001 fallback in dev.
 * On connection failure (ECONNREFUSED etc.), retries with alternate port.
 */
export async function fetchWithCoreFallback(
  url: string,
  init: RequestInit
): Promise<Response> {
  const alt =
    process.env.NODE_ENV === "development" ? swapLocalhostPort(url) : null;

  try {
    const res = await fetch(url, init);
    cachedWorkingBase = new URL(url).origin;
    return res;
  } catch {
    /* connection failed, try alternate port */
    if (alt) {
      const res = await fetch(alt, init);
      cachedWorkingBase = new URL(alt).origin;
      return res;
    }
    throw new Error(`Core unreachable at ${url}`);
  }
}
