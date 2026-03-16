"use client";

import Link from "next/link";
import { useProjects } from "@/lib/hooks/useProjects";
import { usePathname } from "next/navigation";

interface LeftPanelProps {
  activeProjectId?: string;
}

export function LeftPanel({ activeProjectId }: LeftPanelProps) {
  const { projects, loading } = useProjects();
  const pathname = usePathname();

  return (
    <aside className="w-72 border-r border-white/10 flex flex-col h-full bg-transparent">
      {/* Project list — Solo pattern: pill rows, no header label, pt-6 */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-4 pt-6 space-y-1">
        <div className="px-6 pb-2">
          <Link
            href="/projects"
            className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-blue)]/45 hover:text-[var(--text-blue)]/70 transition-colors"
          >
            Workspace
          </Link>
          <Link
            href="/projects?new=1"
            className="mt-1 inline-block text-[11px] text-[var(--muted)] hover:text-amber-300 transition-colors"
          >
            + New Project
          </Link>
        </div>
        {loading ? (
          <div className="px-6 py-3 text-[13px] text-[var(--muted)]">Loading…</div>
        ) : projects.length === 0 ? (
          <div className="px-6 py-3 text-[13px] text-[var(--muted)]/60">No projects yet.</div>
        ) : (
          projects.map((p) => {
            const isActive = p.id === activeProjectId;
            return (
              <Link
                key={p.id}
                href={`/projects/${p.id}/room`}
                className={`flex items-center justify-between gap-3 w-full px-6 py-3 rounded-full text-[14px] font-medium transition-all duration-200 min-h-[44px] ${
                  isActive
                    ? "bg-white/10 text-[var(--text-blue)] shadow-lg shadow-white/5"
                    : "text-[var(--text-blue)] hover:bg-white/5"
                }`}
              >
                <span className="truncate">{p.name}</span>
                {p.isCore && (
                  <span className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--text-blue)]">
                    Core
                  </span>
                )}
              </Link>
            );
          })
        )}
      </div>

      {/* Bottom nav — workspace + agent directory */}
      <div className="border-t border-white/10 px-4 py-4 space-y-1">
        <Link
          href="/projects"
          className={`flex items-center gap-3 w-full px-6 py-2.5 rounded-full text-[12px] font-medium transition-all duration-200 ${
            pathname === "/projects"
              ? "bg-white/10 text-[var(--text-blue)]"
              : "text-[var(--muted)] hover:text-[var(--text-blue)] hover:bg-white/5"
          }`}
        >
          Workspace
        </Link>
        <Link
          href="/agents"
          className={`flex items-center gap-3 w-full px-6 py-2.5 rounded-full text-[12px] font-medium transition-all duration-200 ${
            pathname?.startsWith("/agents")
              ? "bg-white/10 text-[var(--text-blue)]"
              : "text-[var(--muted)] hover:text-[var(--text-blue)] hover:bg-white/5"
          }`}
        >
          Agent Directory
        </Link>
      </div>
    </aside>
  );
}
