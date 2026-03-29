"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  isFirebaseClientConfigured,
  signInEmail,
  signInWithGoogle,
  signUpEmail,
} from "@/lib/firebase/client";

export function AuthPageClient() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/platform/home";
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const configured = isFirebaseClientConfigured();

  useEffect(() => {
    if (!configured) {
      setErr(null);
    }
  }, [configured]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!configured) return;
    setErr(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        await signUpEmail(email.trim(), password);
      } else {
        await signInEmail(email.trim(), password);
      }
      router.replace(next);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Auth failed");
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    if (!configured) return;
    setErr(null);
    setBusy(true);
    try {
      await signInWithGoogle();
      router.replace(next);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Google sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  if (!configured) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center gap-6 px-4">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Sign in
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Firebase is not configured. Add{" "}
          <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">
            NEXT_PUBLIC_FIREBASE_*
          </code>{" "}
          to <code className="text-xs">.env.local</code> to enable email and Google
          sign-in. Until then you can use the app without auth.
        </p>
        <Link
          href={next}
          className="inline-flex justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Continue to CreatorFloor
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center gap-6 px-4">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {mode === "signup" ? "Create account" : "Welcome back"}
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Build faster with agents, live ops, and governance — one home for your
          games.
        </p>
      </div>

      <button
        type="button"
        onClick={onGoogle}
        disabled={busy}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 py-2.5 text-sm font-medium hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-600 dark:hover:bg-zinc-900"
      >
        Continue with Google
      </button>

      <div className="relative text-center text-xs text-zinc-500">
        <span className="bg-zinc-50 px-2 dark:bg-black">or email</span>
        <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>
        <label className="block text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">Password</span>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>
        {err && (
          <p className="text-sm text-red-600 dark:text-red-400">{err}</p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
        >
          {busy ? "…" : mode === "signup" ? "Sign up" : "Sign in"}
        </button>
      </form>

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        {mode === "signup" ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              className="font-medium text-zinc-900 underline dark:text-zinc-100"
              onClick={() => setMode("signin")}
            >
              Sign in
            </button>
          </>
        ) : (
          <>
            New here?{" "}
            <button
              type="button"
              className="font-medium text-zinc-900 underline dark:text-zinc-100"
              onClick={() => setMode("signup")}
            >
              Create account
            </button>
          </>
        )}
      </p>

      <Link href="/" className="text-center text-xs text-zinc-500 hover:underline">
        ← Back home
      </Link>
    </div>
  );
}
