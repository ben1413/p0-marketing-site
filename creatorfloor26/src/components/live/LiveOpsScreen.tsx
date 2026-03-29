"use client";

import { useGamingLiveMetrics } from "@/lib/gaming/useGamingLiveMetrics";
import { useCfProject } from "@/lib/cf/useCfProject";

export function LiveOpsScreen({ coreProjectId }: { coreProjectId: string }) {
  const { project } = useCfProject(coreProjectId);
  const gameId = project?.gameId?.trim();
  const enabled = Boolean(gameId);
  const m = useGamingLiveMetrics(gameId, enabled);

  return (
    <div className="space-y-6">
      {!enabled ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
          Connect a <strong>gameId</strong> (Roblox universe / place id) in project
          Settings to activate Live Ops panels. Core gaming APIs power moderation,
          incidents, and decisions.
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard
          title="Moderation queue"
          value={m.moderationOpen}
          loading={m.loading}
        />
        <MetricCard
          title="Open incidents"
          value={m.incidentsOpen}
          loading={m.loading}
        />
        <MetricCard
          title="Decisions (sample)"
          value={m.decisionsRecent}
          loading={m.loading}
        />
      </div>

      {m.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{m.error}</p>
      )}

      <section className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Player health
        </h2>
        <p className="mt-1 text-xs text-zinc-500">
          CCU, sessions, and retention ingest via Roblox Open Cloud or in-experience
          telemetry (see Telemetry SDK).
        </p>
        <p className="mt-3 text-xs text-zinc-400">— Connect telemetry to populate —</p>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Economy health
        </h2>
        <p className="mt-1 text-xs text-zinc-500">
          Robux flow, sinks, DevEx signals — aggregate from platform APIs + your
          HttpService posts.
        </p>
        <p className="mt-3 text-xs text-zinc-400">— Connect economy telemetry —</p>
      </section>

      <section className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Deploy gate
        </h2>
        <p className="mt-1 text-xs text-zinc-500">
          Pre-publish review + post-deploy watch window — wire to Core execution
          configs and Ledger promote.
        </p>
      </section>
    </div>
  );
}

function MetricCard({
  title,
  value,
  loading,
}: {
  title: string;
  value: number;
  loading: boolean;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {title}
      </p>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
        {loading ? "…" : value}
      </p>
    </div>
  );
}
