import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { NewProposalForm } from "@/components/NewProposalForm";

export const metadata: Metadata = { title: "New Proposal" };

export default function NewProposalPage() {
  return (
    <div className="flex flex-col min-h-full">
      <PageHeader
        title="New Proposal"
        subtitle="Describe the change you want to make. It will go through simulation and approval before deploy."
      />
      <div className="flex-1 px-6 py-8 max-w-2xl">
        <NewProposalForm />
      </div>
    </div>
  );
}
