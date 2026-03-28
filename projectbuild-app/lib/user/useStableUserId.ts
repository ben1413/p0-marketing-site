"use client";

import { useState, useEffect } from "react";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getApps } from "firebase/app";

const LOCAL_KEY = "pb_stable_user_id";

function readLocal(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(LOCAL_KEY) ?? "";
}

/**
 * Resolves a stable user ID for promote attribution.
 *
 * Tries Firebase anonymous auth first (gives a real UID).
 * Falls back to a persistent localStorage ID if auth fails.
 */
export function useStableUserId(): string {
  const [userId, setUserId] = useState(readLocal);

  useEffect(() => {
    const apps = getApps();
    if (apps.length === 0) {
      if (!userId) {
        const fallback = `pb_${crypto.randomUUID()}`;
        window.localStorage.setItem(LOCAL_KEY, fallback);
        setUserId(fallback);
      }
      return;
    }

    const auth = getAuth(apps[0]);

    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        window.localStorage.setItem(LOCAL_KEY, user.uid);
        setUserId(user.uid);
      }
    });

    if (!auth.currentUser) {
      signInAnonymously(auth).catch(() => {
        if (!readLocal()) {
          const fallback = `pb_${crypto.randomUUID()}`;
          window.localStorage.setItem(LOCAL_KEY, fallback);
          setUserId(fallback);
        }
      });
    }

    return unsub;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return userId;
}
