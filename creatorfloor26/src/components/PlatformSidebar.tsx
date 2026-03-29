import Link from "next/link";
import { AuthUserMenu } from "@/components/platform/AuthUserMenu";

const links = [
  { href: "/platform/home", label: "Home" },
  { href: "/platform/projects/new", label: "New project" },
  { href: "/platform/settings", label: "Settings" },
  { href: "/platform/billing", label: "Billing" },
];

export default function PlatformSidebar() {
  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="border-b border-zinc-200 px-4 py-4 dark:border-zinc-800">
        <Link href="/platform/home" className="text-sm font-semibold tracking-tight">
          CreatorFloor
        </Link>
        <p className="mt-1 text-xs text-zinc-500">Build · ship · operate</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <AuthUserMenu />
    </aside>
  );
}
