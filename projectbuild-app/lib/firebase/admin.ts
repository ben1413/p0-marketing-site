import "server-only";
import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

/**
 * Server-side Firebase Admin client.
 *
 * Credential resolution order:
 * 1. FIREBASE_SERVICE_ACCOUNT_JSON — full service account JSON as a string (recommended for prod)
 * 2. Individual env vars:
 *    FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
 *
 * If neither is present the app will throw at runtime. Set one of these in your
 * environment before deploying or running the promote route.
 *
 * The projectId falls back to NEXT_PUBLIC_FIREBASE_PROJECT_ID so you don't need
 * to duplicate it if it's already set for the client SDK.
 */
function getAdminApp(): App {
  if (getApps().length > 0) return getApps()[0]!;

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (serviceAccountJson) {
    const sa = JSON.parse(serviceAccountJson) as Record<string, string>;
    return initializeApp({ credential: cert(sa) });
  }

  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firebase Admin: set FIREBASE_SERVICE_ACCOUNT_JSON, or all three of " +
        "FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY"
    );
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

export const adminDb = getFirestore(getAdminApp());
