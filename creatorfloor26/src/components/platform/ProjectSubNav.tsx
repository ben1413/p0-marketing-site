"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "", label: "Overview" },
  { href: "/build", label: "Build" },
  { href: "/design", label: "Design" },
  { href: "/board", label: "Board" },
  { href: "/live", label: "Live" },
  { href: "/ledger", label: "Ledger" },
  { href: "/settings", label: "Settings" },
] as const;

export function ProjectSubNav({ projectId }: { projectId: string }) {
  const pathname = usePathname();
  const base = `/platform/projects/${projectId}`;

  return (
    <nav className="flex flex-wrap gap-1 border-b border-zinc-200 pb-3 dark:border-zinc-800">
      {tabs.map((t) => {
        const href = `${base}${t.href}`;
        const active =
          t.href === ""
            ? pathname === base || pathname === `${base}/`
            : pathname.startsWith(`${base}${t.href}`);
        return (
          <Link
            key={t.href || "overview"}
            href={href}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
