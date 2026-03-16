import { BoardScreen } from "@/components/board/BoardScreen";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BoardPage({ params }: Props) {
  const { id } = await params;
  return <BoardScreen projectId={id} />;
}
