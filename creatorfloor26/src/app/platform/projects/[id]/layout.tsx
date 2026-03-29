import type { ReactNode } from "react";
import Link from "next/link";
import { ProjectSubNav } from "@/components/platform/ProjectSubNav";
import { ProjectHeader } from "@/components/platform/ProjectHeader";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4">
      <div>
        <Link
          href="/platform/home"
          className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
        >
          ← All projects
        </Link>
        <ProjectHeader projectId={id} />
        <ProjectSubNav projectId={id} />
      </div>
      {children}
    </div>
  );
}
