import { BuilderShell } from "@/components/builder/BuilderShell";

export default async function BuildPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BuilderShell coreProjectId={id} />;
}
