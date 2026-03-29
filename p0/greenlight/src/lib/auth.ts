/**
 * Firebase Auth client — browser-side.
 *
 * Initialized lazily so the server bundle never imports Firebase browser SDK.
 * All API calls in the BFF read the ID token via getIdToken() and include it
 * as Authorization: Bearer <token> so Core can verify the operator.
 */

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";

function getFirebaseConfig() {
  const raw = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      console.error("[greenlight] NEXT_PUBLIC_FIREBASE_CONFIG is not valid JSON");
    }
  }
  return {
    apiKey:             process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain:         process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId:          process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket:      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId:              process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
}

let app: FirebaseApp | null = null;

function getApp(): FirebaseApp {
  if (!app) {
    const existing = getApps();
    app = existing.length > 0 ? existing[0] : initializeApp(getFirebaseConfig());
  }
  return app;
}

export function getFirebaseAuth() {
  return getAuth(getApp());
}

export async function signIn(email: string, password: string) {
  const auth = getFirebaseAuth();
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOut() {
  const auth = getFirebaseAuth();
  return firebaseSignOut(auth);
}

export async function getCurrentIdToken(): Promise<string | null> {
  const auth = getFirebaseAuth();
  const user = auth.currentUser;
  if (!user) return null;
  return user.getIdToken();
}

export function onAuthChange(callback: (user: User | null) => void) {
  const auth = getFirebaseAuth();
  return onAuthStateChanged(auth, callback);
}

export function isFirebaseConfigured(): boolean {
  const cfg = getFirebaseConfig();
  return !!(cfg.apiKey && cfg.projectId);
}
