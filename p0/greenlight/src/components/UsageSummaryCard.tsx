import { coreGetUsage } from "@/lib/core";

function formatTierLabel(tier: string): string {
  return tier
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function barColor(status: string): string {
  switch (status) {
    case "exceeded":
    case "critical":
      return "bg-red-500";
    case "warning":
      return "bg-amber-500";
    case "ok":
      return "bg-emerald-600";
    case "unlimited":
      return "bg-zinc-500";
    case "unavailable":
    default:
      return "bg-zinc-700";
  }
}

function QuotaRow({
  label,
  used,
  limit,
  status,
  pct,
  remaining,
}: {
  label: string;
  used: number;
  limit: number;
  status: string;
  pct: number | null;
  remaining: number | null;
}) {
  if (limit === -1) {
    return (
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-zinc-400">{label}</span>
          <span className="text-zinc-300">Unlimited</span>
        </div>
      </div>
    );
  }
  if (limit === 0) {
    return (
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-zinc-400">{label}</span>
          <span className="text-zinc-500">Not on plan</span>
        </div>
      </div>
    );
  }
  const width = Math.min(100, pct ?? 0);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-zinc-400">{label}</span>
        <span className="text-zinc-300 tabular-nums">
          {used.toLocaleString()} / {limit.toLocaleString()}
          {remaining !== null && (
            <span className="text-zinc-500 ml-1">({remaining.toLocaleString()} left)</span>
          )}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${barColor(status)}`}
          style={{ width: `${width}%` }}
        />
      </div>
      <p className="text-[10px] uppercase tracking-wider text-zinc-500">{status.replace(/_/g, " ")}</p>
    </div>
  );
}

export async function UsageSummaryCard() {
  const data = await coreGetUsage();
  if (!data?.ok) {
    return (
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Usage &amp; plan</h3>
        <p className="text-sm text-zinc-500">
          Connect <code className="text-zinc-400">GREENLIGHT_CORE_API_KEY</code> to show live quota from Core.
        </p>
      </section>
    );
  }

  const propose = data.usage["gaming.propose"];
  const deploy = data.usage["gaming.deploy"];

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Usage &amp; plan</h3>
        <span className="rounded-full border border-zinc-600 bg-zinc-800/80 px-2.5 py-0.5 text-[11px] font-medium text-zinc-200">
          {formatTierLabel(data.tier)}
        </span>
      </div>
      <p className="text-[11px] text-zinc-500 mb-4">
        Billing period <span className="text-zinc-400 font-mono">{data.period}</span> (UTC month)
      </p>
      <div className="space-y-5">
        {propose && (
          <QuotaRow
            label="Decision proposals"
            used={propose.used}
            limit={propose.limit}
            status={propose.status}
            pct={propose.pct}
            remaining={propose.remaining}
          />
        )}
        {deploy && (
          <QuotaRow
            label="Deploys"
            used={deploy.used}
            limit={deploy.limit}
            status={deploy.status}
            pct={deploy.pct}
            remaining={deploy.remaining}
          />
        )}
      </div>
    </section>
  );
}
