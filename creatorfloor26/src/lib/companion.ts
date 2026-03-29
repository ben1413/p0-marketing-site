"use client";

const DEFAULT_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_COMPANION_URL || "http://127.0.0.1:3002"
    : "http://127.0.0.1:3002";

export type CompanionListEntry = { name: string; isDirectory: boolean };

async function fetchCompanion(path: string, init?: RequestInit) {
  const url = `${DEFAULT_URL.replace(/\/$/, "")}${path}`;
  const res = await fetch(url, init);
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  return { res, data };
}

export async function companionPing(): Promise<boolean> {
  try {
    const { res, data } = await fetchCompanion("/api/scope", { method: "GET" });
    return res.ok && data.ok === true;
  } catch {
    return false;
  }
}

export async function companionList(relativePath: string): Promise<CompanionListEntry[]> {
  const q = new URLSearchParams({ path: relativePath });
  const { res, data } = await fetchCompanion(`/api/list?${q}`, { method: "GET" });
  if (!res.ok || !data.entries) return [];
  return data.entries as CompanionListEntry[];
}

export async function companionRead(relativePath: string): Promise<string | null> {
  const q = new URLSearchParams({ path: relativePath });
  const { res, data } = await fetchCompanion(`/api/read?${q}`, { method: "GET" });
  if (!res.ok || typeof data.content !== "string") return null;
  return data.content;
}

export async function companionWrite(
  relativePath: string,
  content: string
): Promise<boolean> {
  const { res } = await fetchCompanion("/api/write", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: relativePath, content }),
  });
  return res.ok;
}

export async function companionBranch(): Promise<string | null> {
  const { res, data } = await fetchCompanion("/api/git/branch", { method: "GET" });
  if (!res.ok || typeof data.branch !== "string") return null;
  return data.branch;
}

export async function companionSetScope(absolutePath: string): Promise<boolean> {
  const { res } = await fetchCompanion("/api/scope", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: absolutePath }),
  });
  return res.ok;
}
