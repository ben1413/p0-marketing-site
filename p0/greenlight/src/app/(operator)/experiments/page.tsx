import { PhaseStubPage } from "@/components/PhaseStubPage";

export const metadata = { title: "Experiments — Greenlight" };

export default function ExperimentsPage() {
  return (
    <PhaseStubPage
      title="Experiments"
      phase="B"
      description="First-class experiment management — cohort assignment, holdout groups, statistical significance tracking, and results attribution — ships Phase B. Experiments can already be proposed and tracked as decisions through the core pipeline."
      relatedLinks={[
        { href: "/proposals/new", label: "Propose an experiment via decision pipeline" },
        { href: "/proposals",     label: "View active proposals (experiment type)" },
      ]}
    />
  );
}
