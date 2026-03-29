"use client";

import { useCfProject } from "@/lib/cf/useCfProject";

export function ProjectHeader({ projectId }: { projectId: string }) {
  const { project, loading } = useCfProject(projectId);

  return (
    <header className="mt-2">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        {loading ? "…" : project?.name ?? projectId}
      </h1>
      {project && (
        <p className="text-xs text-zinc-500">
          {project.kit} · {project.platform}
          {project.gameId ? ` · Live: ${project.gameId}` : ""}
        </p>
      )}
    </header>
  );
}
