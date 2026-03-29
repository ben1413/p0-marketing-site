"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

/**
 * When Firebase is configured, redirects anonymous users to /auth.
 * When Firebase is not configured (local dev), allows access.
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading, firebaseEnabled } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!firebaseEnabled || loading) return;
    if (!user) router.replace("/auth?next=/platform/home");
  }, [firebaseEnabled, loading, user, router]);

  if (firebaseEnabled && loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-zinc-500">
        Loading…
      </div>
    );
  }

  if (firebaseEnabled && !user) {
    return null;
  }

  return <>{children}</>;
}
