import { DEMO_DECISIONS } from "@/lib/seed";
import { LedgerChain } from "@/components/LedgerChain";
import { BrainArchitectureCard } from "@/components/BrainArchitectureCard";
import { LedgerIntegrityCard } from "@/components/LedgerIntegrityCard";
import { PageHeader } from "@/components/PageHeader";

export default function LedgerBoardPage() {
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <PageHeader
        title="System of Record"
        subtitle="The sealed evidence chain behind every decision. Append-only. Authority-attributed. Tamper-evident."
      />

      {/* Chain visualization — the centerpiece */}
      <LedgerChain decisions={DEMO_DECISIONS} />

      {/* Architecture + Integrity side by side on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BrainArchitectureCard />
        <LedgerIntegrityCard />
      </div>
    </div>
  );
}
