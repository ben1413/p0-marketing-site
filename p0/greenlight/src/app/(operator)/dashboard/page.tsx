import type { Metadata } from "next";
import { getDashboardData } from "@/lib/core";
import { ProposalsFeed } from "@/components/ProposalsFeed";
import { StatsBar } from "@/components/StatsBar";
import { RecentDeploys } from "@/components/RecentDeploys";
import { GovernanceHealth } from "@/components/GovernanceHealth";
import { PageHeader } from "@/components/PageHeader";
import { Plus } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const data = await getDashboardData().catch(() => null);

  return (
    <div className="flex flex-col min-h-full">
      <PageHeader title="Dashboard">
        <Link href="/proposals/new" className="gl-btn-primary">
          <Plus className="w-4 h-4" />
          New Proposal
        </Link>
      </PageHeader>

      <div className="flex-1 px-6 pb-8 space-y-6">
        {/* Stats row */}
        <StatsBar data={data} />

        {/* Main grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Proposals feed — 2 cols */}
          <div className="col-span-2">
            <ProposalsFeed proposals={data?.proposals ?? []} />
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <GovernanceHealth data={data} />
            <RecentDeploys deploys={data?.recentDeploys ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
}
