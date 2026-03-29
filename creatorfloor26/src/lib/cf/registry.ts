export type RegisteredProject = {
  id: string;
  name: string;
  platform: string;
  kit: string;
  createdAt: string;
  agentIds?: {
    studio: string;
    design: string;
    game: string;
    codeReview: string;
  };
};

const KEY = "cf_project_registry";
const BEARER_KEY = "cf_core_bearer";

export function loadRegistry(): RegisteredProject[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as RegisteredProject[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveRegistry(items: RegisteredProject[]): void {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function upsertProject(project: RegisteredProject): void {
  const items = loadRegistry().filter((p) => p.id !== project.id);
  items.unshift(project);
  saveRegistry(items);
}

export function getStoredBearer(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(BEARER_KEY)?.trim() || "";
}

export function setStoredBearer(token: string): void {
  sessionStorage.setItem(BEARER_KEY, token.trim());
}
