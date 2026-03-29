import { PhaseStubPage } from "@/components/PhaseStubPage";

export const metadata = { title: "Incidents — Greenlight" };

export default function IncidentsPage() {
  return (
    <PhaseStubPage
      title="Incidents"
      phase="B"
      description="War-room mode — expedited path with required post-hoc verification, dedicated incident timeline, and team escalation routing — is Phase B. Incidents that are caught by outcome drift are already surfaced on the dashboard as live risk alerts."
      relatedLinks={[
        { href: "/dashboard", label: "Dashboard — live risk alerts (active incidents)" },
        { href: "/story",     label: "The Moderation Incident — see how drift detection works" },
      ]}
    />
  );
}
