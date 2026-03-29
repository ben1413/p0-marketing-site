/**
 * Roblox Open Cloud adapter (server-side).
 * Set ROBLOX_API_KEY in env for authenticated calls.
 * @see https://create.roblox.com/docs/reference/cloud
 */

const OPEN_CLOUD_BASE = "https://apis.roblox.com";

export type OpenCloudConfig = {
  apiKey: string;
};

export function getOpenCloudConfigFromEnv(): OpenCloudConfig | null {
  const apiKey = process.env.ROBLOX_API_KEY?.trim();
  if (!apiKey) return null;
  return { apiKey };
}

/** Example: universe / experience metadata — extend per Open Cloud reference. */
export async function fetchExperienceStub(
  universeId: string,
  config: OpenCloudConfig
): Promise<{ ok: boolean; status: number; body: string }> {
  const url = `${OPEN_CLOUD_BASE}/cloud/v2/universes/${encodeURIComponent(universeId)}`;
  const res = await fetch(url, {
    headers: {
      "x-api-key": config.apiKey,
      Accept: "application/json",
    },
    cache: "no-store",
  });
  const body = await res.text();
  return { ok: res.ok, status: res.status, body };
}
