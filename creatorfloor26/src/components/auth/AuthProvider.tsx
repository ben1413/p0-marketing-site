"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "firebase/auth";
import {
  getIdToken,
  isFirebaseClientConfigured,
  signOut as cfSignOut,
  subscribeAuth,
} from "@/lib/firebase/client";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  idToken: string | null;
  firebaseEnabled: boolean;
  refreshToken: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState<string | null>(null);
  const firebaseEnabled = isFirebaseClientConfigured();

  useEffect(() => {
    if (!firebaseEnabled) {
      setUser(null);
      setIdToken(null);
      setLoading(false);
      return;
    }
    return subscribeAuth(async (u) => {
      setUser(u);
      setIdToken(await getIdToken(u));
      setLoading(false);
    });
  }, [firebaseEnabled]);

  const refreshToken = useCallback(async () => {
    setIdToken(await getIdToken(user));
  }, [user]);

  const signOut = useCallback(async () => {
    await cfSignOut();
    setUser(null);
    setIdToken(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      idToken,
      firebaseEnabled,
      refreshToken,
      signOut,
    }),
    [user, loading, idToken, firebaseEnabled, refreshToken, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
