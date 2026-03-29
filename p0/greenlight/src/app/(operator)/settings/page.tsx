import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { IntegrationPaths } from "@/components/IntegrationPaths";
import { EnforcementStance } from "@/components/EnforcementStance";
import { TimeToValueCard } from "@/components/TimeToValueCard";

export const metadata: Metadata = { title: "Settings — Greenlight" };

export default function SettingsPage() {
  return (
    <div className="space-y-10 max-w-3xl">
      <PageHeader
        title="Settings"
        subtitle="Integration, enforcement model, and system boundaries"
      />
      <TimeToValueCard />
      <IntegrationPaths />
      <EnforcementStance />
    </div>
  );
}
