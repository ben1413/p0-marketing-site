import type { Metadata } from "next";
import { DEMO_DECISIONS } from "@/lib/seed";
import { PageHeader } from "@/components/PageHeader";
import { ChangeCalendar } from "@/components/ChangeCalendar";

export const metadata: Metadata = { title: "Calendar — Greenlight" };

export default function CalendarPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Change Calendar"
        subtitle="What shipped, what's live, what's coming"
      />
      <ChangeCalendar decisions={DEMO_DECISIONS} />
    </div>
  );
}
