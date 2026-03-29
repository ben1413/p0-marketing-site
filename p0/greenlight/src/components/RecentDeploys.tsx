import { CheckCircle2, XCircle, Clock, Rocket } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { clsx } from "clsx";
import type { Deploy } from "@/lib/core";

const DEPLOY_ICONS = {
  deployed: <CheckCircle2 className="w-4 h-4 text-gl-400" />,
  rolled_back: <XCircle className="w-4 h-4 text-red-400" />,
  pending: <Clock className="w-4 h-4 text-yellow-400" />,
};

export function RecentDeploys({ deploys }: { deploys: Deploy[] }) {
  return (
    <div className="gl-card overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3.5 border-b border-zinc-800">
        <Rocket className="w-4 h-4 text-zinc-500" />
        <h2 className="text-sm font-semibold text-white">Recent Deploys</h2>
      </div>

      {deploys.length === 0 ? (
        <p className="text-xs text-zinc-600 text-center py-8">No deploys yet</p>
      ) : (
        <ul className="divide-y divide-zinc-800/60">
          {deploys.map((d) => (
            <li
              key={d.deploymentId}
              className="flex items-start gap-3 px-4 py-3"
            >
              <div className="mt-0.5 shrink-0">
                {DEPLOY_ICONS[d.status] ?? DEPLOY_ICONS.pending}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-zinc-300 truncate font-medium">
                  {d.proposalTitle}
                </p>
                <p className="text-xs text-zinc-600 mt-0.5">
                  {formatDistanceToNow(new Date(d.deployedAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
