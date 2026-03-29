import { BoardScreen } from "@/components/board/BoardScreen";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BoardScreen coreProjectId={id} />;
}
