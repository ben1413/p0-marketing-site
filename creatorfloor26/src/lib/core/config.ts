/**
 * Resolve P0 Core base URL. Prefer server env; public for client-only fetches.
 */
let cachedWorkingOrigin: string | null = null;

export function getCoreBaseUrl(): string {
  if (cachedWorkingOrigin) return cachedWorkingOrigin;
  const raw =
    process.env.P0_CORE_BASE_URL ??
    process.env.NEXT_PUBLIC_P0_CORE_BASE_URL ??
    "";
  return raw.replace(/\/+$/, "");
}

export function setCachedCoreOrigin(origin: string): void {
  cachedWorkingOrigin = origin.replace(/\/+$/, "");
}

function swapLocalhostPort(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname !== "localhost") return null;
    if (u.port === "3000") {
      u.port = "3001";
      return u.toString().replace(/\/$/, "");
    }
    if (u.port === "3001") {
      u.port = "3000";
      return u.toString().replace(/\/$/, "");
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch Core with localhost port flip on connection failure (dev).
 */
export async function fetchWithCoreFallback(
  url: string,
  init: RequestInit
): Promise<Response> {
  const alt =
    process.env.NODE_ENV === "development" ? swapLocalhostPort(url) : null;

  try {
    const res = await fetch(url, init);
    try {
      setCachedCoreOrigin(new URL(url).origin);
    } catch {
      /* ignore */
    }
    return res;
  } catch {
    if (alt) {
      const res = await fetch(alt, init);
      try {
        setCachedCoreOrigin(new URL(alt).origin);
      } catch {
        /* ignore */
      }
      return res;
    }
    throw new Error(`Core unreachable at ${url}`);
  }
}

export function getDevBypassProjectId(): string {
  return (
    process.env.P0_CORE_PROJECT_ID?.trim() ||
    process.env.NEXT_PUBLIC_P0_CORE_PROJECT_ID?.trim() ||
    "creatorfloor"
  );
}
