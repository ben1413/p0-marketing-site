import { LedgerScreen } from "@/components/ledger/LedgerScreen";

export default async function LedgerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <LedgerScreen coreProjectId={id} />;
}
