import { DEMO_DECISIONS, DEMO_GAME_NAME } from "@/lib/seed";
import { DecisionCard } from "@/components/DecisionCard";
import { PageHeader } from "@/components/PageHeader";

export default function ProposalsPage() {
  const decisions = DEMO_DECISIONS;

  const pending  = decisions.filter((d) => d.status === "proposed" || d.status === "pending");
  const approved = decisions.filter((d) => d.status === "approved");
  const blocked  = decisions.filter((d) => d.status === "blocked");
  const deployed = decisions.filter((d) => d.status === "deployed");
  const rejected = decisions.filter((d) => d.status === "rejected");

  return (
    <div className="space-y-8">
      <PageHeader
        title="Decision Timeline"
        subtitle={`${DEMO_GAME_NAME} · ${decisions.length} proposals · Click any card to expand accountability trail`}
      />

      {/* Blocked — surface first */}
      {blocked.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">
            Blocked — action required ({blocked.length})
          </h2>
          <div className="space-y-3">
            {blocked.map((d) => <DecisionCard key={d.id} decision={d} />)}
          </div>
        </section>
      )}

      {/* Pending review */}
      {pending.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
            Pending review ({pending.length})
          </h2>
          <div className="space-y-3">
            {pending.map((d) => <DecisionCard key={d.id} decision={d} />)}
          </div>
        </section>
      )}

      {/* Approved — ready to deploy */}
      {approved.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">
            Approved — ready to deploy ({approved.length})
          </h2>
          <div className="space-y-3">
            {approved.map((d) => <DecisionCard key={d.id} decision={d} />)}
          </div>
        </section>
      )}

      {/* Deployed */}
      {deployed.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-gl-400 uppercase tracking-widest mb-3">
            Deployed ({deployed.length})
          </h2>
          <div className="space-y-3">
            {deployed.map((d) => <DecisionCard key={d.id} decision={d} />)}
          </div>
        </section>
      )}

      {/* Rejected */}
      {rejected.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">
            Rejected ({rejected.length})
          </h2>
          <div className="space-y-3">
            {rejected.map((d) => <DecisionCard key={d.id} decision={d} />)}
          </div>
        </section>
      )}
    </div>
  );
}
