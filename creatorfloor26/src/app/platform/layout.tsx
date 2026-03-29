import type { ReactNode } from "react";
import PlatformSidebar from "@/components/PlatformSidebar";
import { RequireAuth } from "@/components/auth/RequireAuth";

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <div className="flex min-h-0 flex-1 bg-zinc-50 dark:bg-black">
        <PlatformSidebar />
        <main className="min-h-0 min-w-0 flex-1 overflow-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </RequireAuth>
  );
}
