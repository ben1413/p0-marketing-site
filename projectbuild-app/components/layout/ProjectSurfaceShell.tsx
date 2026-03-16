"use client";

import type { ReactNode } from "react";
import { LeftPanel } from "@/components/layout/LeftPanel";

interface ProjectSurfaceShellProps {
  projectId: string;
  breadcrumb: string;
  headerActions?: ReactNode;
  center: ReactNode;
  right?: ReactNode;
}

export function ProjectSurfaceShell({
  projectId,
  breadcrumb,
  headerActions,
  center,
  right,
}: ProjectSurfaceShellProps) {
  return (
    <main className="relative flex flex-col h-screen w-full bg-transparent text-[var(--text-blue)] overflow-hidden">
      <header className="h-24 border-b border-white/10 grid grid-cols-[18rem_1fr_auto] items-center pl-0 pr-10 shrink-0">
        <div className="flex items-center justify-center w-[18rem]">
          <div className="flex flex-col items-center leading-none">
            <span className="text-[9px] font-bold uppercase tracking-[0.45em] text-[var(--text-blue)]/45">
              Project
            </span>
            <span className="mt-1 text-[22px] font-semibold tracking-tight text-[var(--text-bright)]">
              Build
            </span>
          </div>
        </div>

        <div className="text-[12px] font-bold tracking-[0.4em] uppercase text-[var(--text-blue)]">
          / {breadcrumb}
        </div>

        <div className="flex items-center gap-3 justify-self-end">
          {headerActions}
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        <div className="w-72 border-r border-white/10">
          <LeftPanel activeProjectId={projectId} />
        </div>

        <div className="flex-1 min-w-0 flex flex-col bg-transparent">
          {center}
        </div>

        <div className="w-72 border-l border-white/10">
          {right}
        </div>
      </div>
    </main>
  );
}
