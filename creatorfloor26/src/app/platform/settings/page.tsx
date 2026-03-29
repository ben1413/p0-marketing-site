"use client";

import { useEffect, useState } from "react";
import { getStoredBearer, setStoredBearer } from "@/lib/cf/registry";
import { useAuth } from "@/components/auth/AuthProvider";
import { isFirebaseClientConfigured } from "@/lib/firebase/client";
import Link from "next/link";

export default function SettingsPage() {
  const { user, firebaseEnabled, refreshToken } = useAuth();
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(getStoredBearer());
  }, []);

  function save(e: React.FormEvent) {
    e.preventDefault();
    setStoredBearer(token.trim());
  }

  const configured = isFirebaseClientConfigured();

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Settings
      </h1>

      {configured && firebaseEnabled && user && (
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Account
          </h2>
          <p className="mt-1 text-xs text-zinc-500">{user.email ?? user.uid}</p>
          <p className="mt-2 text-xs text-zinc-500">
            API routes use your Firebase session token automatically when you&apos;re signed in.
          </p>
          <button
            type="button"
            onClick={() => void refreshToken()}
            className="mt-3 rounded-lg border border-zinc-300 px-3 py-1.5 text-xs dark:border-zinc-600"
          >
            Refresh token
          </button>
        </section>
      )}

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Legacy session token
        </h2>
        <p className="mt-1 text-xs text-zinc-500">
          Optional: paste a Core-accepted JWT into session storage for older flows. Prefer{" "}
          <Link href="/auth" className="underline">
            Sign in
          </Link>
          .
        </p>
        <form onSubmit={save} className="mt-3 space-y-3">
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-900"
            placeholder="eyJhbG..."
            autoComplete="off"
          />
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Save to this browser
          </button>
        </form>
      </section>
    </div>
  );
}
