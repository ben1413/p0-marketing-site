/**
 * Firebase **web** config for Conclave Live (browser only).
 * Uses `NEXT_PUBLIC_*` or `NEXT_PUBLIC_FIREBASE_CONFIG` JSON — never service account secrets.
 */

export type ConclaveFirebaseWebConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
  messagingSenderId?: string;
  storageBucket?: string;
};

function trimEnv(v: string | undefined): string {
  return typeof v === "string" ? v.trim() : "";
}

/**
 * Read web SDK config from env (inlined at build time for `NEXT_PUBLIC_*`).
 */
export function readConclaveFirebaseWebConfigFromEnv(): ConclaveFirebaseWebConfig | null {
  const raw = trimEnv(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);
  if (raw) {
    try {
      const parsed = raw.startsWith("{") ? (JSON.parse(raw) as Record<string, unknown>) : null;
      if (!parsed) return null;
      const apiKey = typeof parsed.apiKey === "string" ? parsed.apiKey.trim() : "";
      const projectId = typeof parsed.projectId === "string" ? parsed.projectId.trim() : "";
      const authDomain = typeof parsed.authDomain === "string" ? parsed.authDomain.trim() : "";
      const appId = typeof parsed.appId === "string" ? parsed.appId.trim() : "";
      if (!apiKey || !projectId || !appId) return null;
      const domain = authDomain || `${projectId}.firebaseapp.com`;
      return {
        apiKey,
        projectId,
        authDomain: domain,
        appId,
        messagingSenderId:
          typeof parsed.messagingSenderId === "string" ? parsed.messagingSenderId.trim() : undefined,
        storageBucket:
          typeof parsed.storageBucket === "string" ? parsed.storageBucket.trim() : undefined,
      };
    } catch {
      return null;
    }
  }

  const apiKey = trimEnv(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
  const projectId = trimEnv(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
  const appId = trimEnv(process.env.NEXT_PUBLIC_FIREBASE_APP_ID);
  const authDomain =
    trimEnv(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) ||
    (projectId ? `${projectId}.firebaseapp.com` : "");
  if (!apiKey || !projectId || !appId || !authDomain) return null;

  return {
    apiKey,
    authDomain,
    projectId,
    appId,
    messagingSenderId: trimEnv(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID) || undefined,
    storageBucket: trimEnv(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) || undefined,
  };
}

export function isConclaveFirebaseWebConfigured(): boolean {
  return readConclaveFirebaseWebConfigFromEnv() !== null;
}
