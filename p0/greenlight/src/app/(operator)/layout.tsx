import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";
import { UsageBanner } from "@/components/UsageBanner";
import { coreGetUsage } from "@/lib/core";
import { DemoEmitterProvider } from "@/lib/demoEmitter";
import { LiveTicker } from "@/components/LiveTicker";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: {
    template: "%s — Greenlight",
    default: "Dashboard — Greenlight",
  },
};

export default async function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const usage = await coreGetUsage();

  return (
    <DemoEmitterProvider>
      <div className="flex h-screen overflow-hidden bg-zinc-950">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <LiveTicker />
          <UsageBanner usage={usage} />
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
    </DemoEmitterProvider>
  );
}
