import { ProjectSettingsForm } from "@/components/platform/ProjectSettingsForm";

export default async function ProjectSettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProjectSettingsForm coreProjectId={id} />;
}
