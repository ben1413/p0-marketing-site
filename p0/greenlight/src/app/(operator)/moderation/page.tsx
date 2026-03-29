import { PhaseStubPage } from "@/components/PhaseStubPage";

export const metadata = { title: "Moderation — Greenlight" };

export default function ModerationPage() {
  return (
    <PhaseStubPage
      title="Moderation"
      phase="B"
      description="Full moderation queue — case management, assignment, appeals workflow, and moderation action attribution — is Phase B. Moderation threshold decisions (like auto-mute config changes) are already fully governed as proposals with simulation, approval, and outcome tracking."
      relatedLinks={[
        { href: "/proposals", label: "View moderation proposals in decision timeline" },
        { href: "/story",     label: "The Moderation Incident — a real example of governed moderation change" },
      ]}
    />
  );
}
