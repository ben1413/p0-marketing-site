/**
 * Client for ProjectBuild Companion API (localhost:3001).
 * Used by FileTree, CodeEditor, and Builder components.
 */

const COMPANION_BASE =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_COMPANION_URL
    ? process.env.NEXT_PUBLIC_COMPANION_URL.replace(/\/$/, "")
    : "http://localhost:3001";

export type CompanionListEntry = {
  name: string;
  isDirectory: boolean;
};

export async function companionList(path: string): Promise<CompanionListEntry[]> {
  const url = `${COMPANION_BASE}/api/list?path=${encodeURIComponent(path)}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.ok) throw new Error(data.error ?? "List failed");
  return data.entries ?? [];
}

export async function companionRead(path: string): Promise<string> {
  const url = `${COMPANION_BASE}/api/read?path=${encodeURIComponent(path)}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.ok) throw new Error(data.error ?? "Read failed");
  return data.content ?? "";
}

export async function companionWrite(path: string, content: string): Promise<void> {
  const res = await fetch(`${COMPANION_BASE}/api/write`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, content }),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.error ?? "Write failed");
}

/**
 * Returns the current git branch of the scoped root directory.
 * Returns null if not in a git repo or Companion is not running.
 */
export async function companionBranch(): Promise<string | null> {
  try {
    const res = await fetch(`${COMPANION_BASE}/api/git/branch`);
    const data = await res.json();
    return data.ok && data.branch ? (data.branch as string) : null;
  } catch {
    return null;
  }
}

export async function companionSetScope(path: string): Promise<{ ok: boolean; allowed?: boolean; root?: string }> {
  const res = await fetch(`${COMPANION_BASE}/api/scope`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path }),
  });
  return res.json();
}
