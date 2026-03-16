"use client";

import { useProjects } from "@/lib/hooks/useProjects";
import { LeftPanel } from "@/components/layout/LeftPanel";
import { Suspense, useState } from "react";
import Link from "next/link";
import { ProjectInitFlow } from "@/components/projects/ProjectInitFlow";
import { useRouter, useSearchParams } from "next/navigation";

function ProjectsPageInner() {
  const { projects, loading } = useProjects();
  const [initOpen, setInitOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const openFromQuery = searchParams.get("new") === "1";
  const showInitFlow = initOpen || openFromQuery;

  function openInitFlow() {
    setInitOpen(true);
  }

  function closeInitFlow() {
    setInitOpen(false);
    if (openFromQuery) {
      router.replace("/projects");
    }
  }

  return (
    <div className="flex h-screen overflow-hidden text-[var(--text-blue)] bg-transparent">
      <LeftPanel />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header — mirrors Solo's h-24 grid header */}
        <header className="h-24 border-b border-white/10 grid grid-cols-[1fr_auto] items-center px-12 shrink-0">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--text-blue)]/50">
              ProjectBuild
            </span>
            <h1 className="text-[22px] font-semibold text-[var(--text-bright)] tracking-tight leading-none">
              Workspace
            </h1>
          </div>
          <button
            onClick={openInitFlow}
            className="rounded-full bg-white px-6 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-black soft-elevate hover:bg-white/90 transition-opacity"
          >
            + New Project
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-12 py-10">
          {loading ? (
            <div className="text-[13px] text-[var(--muted)]">Loading…</div>
          ) : projects.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center min-h-[320px] gap-5">
              <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--muted)]">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-[14px] font-medium text-[var(--text-blue)]/70">No projects yet</p>
                <p className="text-[12px] text-[var(--muted)] mt-1">Create your first project to get started.</p>
              </div>
              <button
                onClick={openInitFlow}
                className="rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-blue)] hover:bg-white/10 transition-colors"
              >
                + New Project
              </button>
            </div>
          ) : (
            /* Project grid — Solo card pattern */
            <div className="grid grid-cols-3 gap-4">
              {projects.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}/room`}
                  className="group rounded-2xl border border-white/10 bg-black/20 p-6 hover:border-white/20 hover:bg-white/5 transition-all duration-200 flex flex-col gap-3 min-h-[120px]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[15px] font-medium text-[var(--text-bright)] leading-snug group-hover:text-white transition-colors">
                      {p.name}
                    </span>
                    {p.isCore && (
                      <span className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--text-blue)]">
                        Core
                      </span>
                    )}
                  </div>
                  {p.description && (
                    <p className="text-[12px] text-[var(--muted)] line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  )}
                  <div className="mt-auto pt-2 text-[10px] font-bold tracking-[0.25em] uppercase text-[var(--muted)]/40 group-hover:text-[var(--muted)]/70 transition-colors">
                    Open Room →
                  </div>
                </Link>
              ))}

              {/* New project card */}
              <button
                onClick={openInitFlow}
                className="rounded-2xl border border-dashed border-white/10 bg-transparent p-6 hover:border-white/20 hover:bg-white/5 transition-all duration-200 flex flex-col items-center justify-center gap-2 min-h-[120px] text-[var(--muted)] hover:text-[var(--text-blue)]"
              >
                <span className="text-2xl font-light opacity-40">+</span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase">New Project</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {showInitFlow && <ProjectInitFlow onClose={closeInitFlow} />}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={null}>
      <ProjectsPageInner />
    </Suspense>
  );
}
