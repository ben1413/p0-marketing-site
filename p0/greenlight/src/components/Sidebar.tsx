"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GitPullRequest,
  Rocket,
  FlaskConical,
  ShieldAlert,
  Users,
  Activity,
  ChevronDown,
  Settings,
  Zap,
} from "lucide-react";
import { clsx } from "clsx";

const nav = [
  {
    section: "Operations",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/proposals", label: "Proposals", icon: GitPullRequest },
      { href: "/deploys", label: "Deploys", icon: Rocket },
      { href: "/experiments", label: "Experiments", icon: FlaskConical },
    ],
  },
  {
    section: "Trust",
    items: [
      { href: "/incidents", label: "Incidents", icon: ShieldAlert },
      { href: "/moderation", label: "Moderation", icon: Users },
      { href: "/activity", label: "Audit Log", icon: Activity },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 flex flex-col border-r border-zinc-800 bg-zinc-950 shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gl-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-base font-semibold text-white tracking-tight">
            Greenlight
          </span>
        </div>
      </div>

      {/* Game selector */}
      <div className="px-3 pt-4 pb-2">
        <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-sm transition-colors">
          <span className="text-zinc-300 font-medium truncate">All Games</span>
          <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-5">
        {nav.map((group) => (
          <div key={group.section}>
            <p className="gl-label px-3 mb-1.5">{group.section}</p>
            <ul className="space-y-0.5">
              {group.items.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={clsx(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        active
                          ? "bg-gl-500/10 text-gl-400"
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
                      )}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-zinc-800">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
