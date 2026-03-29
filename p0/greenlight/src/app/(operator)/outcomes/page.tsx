import type { Metadata } from "next";
import { DEMO_DECISIONS } from "@/lib/seed";
import { PageHeader } from "@/components/PageHeader";
import { OutcomeCard } from "@/components/OutcomeCard";
import Link from "next/link";

export const metadata: Metadata = { title: "Outcomes — Greenlight" };

export default function OutcomesPage() {
  const withOutcomes = DEMO_DECISIONS.filter((d) => d.outcome);

  return (
    <div className="space-y-8 max-w-3xl">
      <PageHeader
        title="Outcomes"
        subtitle="Deployment performance — what governance earned"
      />

      {withOutcomes.length === 0 ? (
        <p className="text-sm text-zinc-500 py-8">No outcomes recorded yet.</p>
      ) : (
        <div className="space-y-4">
          {withOutcomes.map((d) => (
            <div key={d.id} className="space-y-1">
              <Link
                href={`/proposals/${d.id}`}
                className="text-xs font-medium text-zinc-300 hover:text-white transition-colors"
              >
                {d.title}
              </Link>
              <OutcomeCard outcome={d.outcome!} animated />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
