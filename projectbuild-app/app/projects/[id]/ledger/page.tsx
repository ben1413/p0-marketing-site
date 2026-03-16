import { LedgerScreen } from "@/components/ledger/LedgerScreen";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function LedgerPage({ params }: Props) {
  const { id } = await params;
  return <LedgerScreen projectId={id} />;
}
