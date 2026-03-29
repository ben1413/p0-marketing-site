import { PhaseStubPage } from "@/components/PhaseStubPage";

export const metadata = { title: "Deploys — Greenlight" };

export default function DeploysPage() {
  return (
    <PhaseStubPage
      title="Deploys"
      phase="B"
      description="Gradual rollout tracking — % ramp, region targeting, staged deployment, and kill switch — is Phase B. Today, deploys are tracked through the Decision Timeline as part of the proposal trail."
      relatedLinks={[
        { href: "/proposals", label: "View decision timeline (includes deploy events)" },
        { href: "/activity",  label: "Governance audit — all deploy records" },
      ]}
    />
  );
}
