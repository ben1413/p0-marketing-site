import { Suspense } from "react";
import { AuthPageClient } from "./AuthPageClient";

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center text-sm text-zinc-500">
          Loading…
        </div>
      }
    >
      <AuthPageClient />
    </Suspense>
  );
}
