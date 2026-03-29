/**
 * Firebase Auth (client) for Conclave Live — ID tokens forwarded as Bearer on BFF fetches.
 */

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { readConclaveFirebaseWebConfigFromEnv } from "./conclaveWebConfig";

let cachedApp: FirebaseApp | null = null;

export function ensureConclaveFirebaseApp(): FirebaseApp | null {
  const cfg = readConclaveFirebaseWebConfigFromEnv();
  if (!cfg) return null;
  if (cachedApp) return cachedApp;
  const existing = getApps()[0];
  if (existing) {
    cachedApp = existing;
    return existing;
  }
  cachedApp = initializeApp(cfg);
  return cachedApp;
}

export function subscribeConclaveAuth(callback: (user: User | null) => void): () => void {
  const app = ensureConclaveFirebaseApp();
  if (!app) return () => {};
  const auth = getAuth(app);
  return onAuthStateChanged(auth, callback);
}

export async function getConclaveFirebaseIdToken(forceRefresh = false): Promise<string | null> {
  const app = ensureConclaveFirebaseApp();
  if (!app) return null;
  const auth = getAuth(app);
  const u = auth.currentUser;
  if (!u) return null;
  try {
    return await u.getIdToken(forceRefresh);
  } catch {
    return null;
  }
}

export async function conclaveSignInWithEmailPassword(
  email: string,
  password: string
): Promise<{ ok: true } | { ok: false; message: string }> {
  const app = ensureConclaveFirebaseApp();
  if (!app) {
    return { ok: false, message: "Firebase is not configured for this deployment." };
  }
  const auth = getAuth(app);
  try {
    await signInWithEmailAndPassword(auth, email.trim(), password);
    return { ok: true };
  } catch (e: unknown) {
    const code = e && typeof e === "object" && "code" in e ? String((e as { code?: string }).code) : "";
    return { ok: false, message: mapFirebaseAuthError(code) };
  }
}

export async function conclaveSignOut(): Promise<void> {
  const app = ensureConclaveFirebaseApp();
  if (!app) return;
  const auth = getAuth(app);
  if (auth.currentUser) await signOut(auth);
}

function mapFirebaseAuthError(code: string): string {
  switch (code) {
    case "auth/invalid-email":
      return "That email does not look valid.";
    case "auth/user-disabled":
      return "This account is disabled.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email or password did not match.";
    case "auth/too-many-requests":
      return "Too many attempts. Wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network error — check your connection.";
    default:
      return "Sign-in failed. Check Email/Password sign-in is enabled in Firebase Console.";
  }
}
