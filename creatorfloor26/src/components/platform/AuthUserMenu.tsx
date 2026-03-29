"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { isFirebaseClientConfigured } from "@/lib/firebase/client";

export function AuthUserMenu() {
  const { user, firebaseEnabled, signOut } = useAuth();
  const configured = isFirebaseClientConfigured();

  if (!configured || !firebaseEnabled) {
    return (
      <Link
        href="/auth"
        className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
      >
        Sign in
      </Link>
    );
  }

  if (!user) {
    return (
      <Link
        href="/auth"
        className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex flex-col gap-1 border-t border-zinc-200 pt-3 dark:border-zinc-800">
      <p className="truncate px-3 text-xs text-zinc-500" title={user.email ?? user.uid}>
        {user.email ?? user.uid}
      </p>
      <button
        type="button"
        onClick={() => void signOut()}
        className="mx-2 rounded-lg px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
      >
        Sign out
      </button>
    </div>
  );
}
