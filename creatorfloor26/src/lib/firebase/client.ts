"use client";

import { initializeApp, getApps, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import {
  getAuth,
  type Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

function readConfig(): FirebaseOptions | null {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim();
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim();
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.trim();
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.trim();
  if (!projectId || !apiKey || !appId || !authDomain) return null;
  return {
    projectId,
    apiKey,
    appId,
    authDomain,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  };
}

export function isFirebaseClientConfigured(): boolean {
  return readConfig() !== null;
}

function getOrInitApp(): FirebaseApp | null {
  const config = readConfig();
  if (!config) return null;
  const existing = getApps().find((a) => a.name === "creatorfloor");
  if (existing) return existing;
  return initializeApp(config, "creatorfloor");
}

export function getFirebaseApp(): FirebaseApp | null {
  return getOrInitApp();
}

let _auth: Auth | null | undefined;
export function getFirebaseAuth(): Auth | null {
  if (_auth !== undefined) return _auth;
  const app = getOrInitApp();
  _auth = app ? getAuth(app) : null;
  return _auth;
}

let _db: Firestore | null | undefined;
export function getFirestoreDb(): Firestore | null {
  if (_db !== undefined) return _db;
  const app = getOrInitApp();
  _db = app ? getFirestore(app) : null;
  return _db;
}

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle(): Promise<User> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase Auth is not configured");
  const cred = await signInWithPopup(auth, googleProvider);
  return cred.user;
}

export async function signInEmail(email: string, password: string): Promise<User> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase Auth is not configured");
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function signUpEmail(email: string, password: string): Promise<User> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase Auth is not configured");
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function signOut(): Promise<void> {
  const auth = getFirebaseAuth();
  if (auth) await firebaseSignOut(auth);
}

export function subscribeAuth(cb: (user: User | null) => void): () => void {
  const auth = getFirebaseAuth();
  if (!auth) {
    cb(null);
    return () => {};
  }
  return onAuthStateChanged(auth, cb);
}

export async function getIdToken(user: User | null): Promise<string | null> {
  if (!user) return null;
  return user.getIdToken();
}
