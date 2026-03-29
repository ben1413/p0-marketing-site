import { DesignerShell } from "@/components/designer/DesignerShell";

export default async function DesignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DesignerShell coreProjectId={id} />;
}
