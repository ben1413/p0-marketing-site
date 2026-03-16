import { ProjectRoom } from "@/components/room/ProjectRoom";

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProjectRoom projectId={id} />;
}
