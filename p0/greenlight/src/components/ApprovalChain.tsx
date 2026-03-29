"use client";

import { clsx } from "clsx";
import type { Approver } from "@/lib/types";
import { timeAgo } from "@/lib/plainLanguage";
import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";

const ICON: Record<string, React.ReactNode> = {
  approved: <CheckCircleIcon className="w-4 h-4 text-emerald-400" />,
  awaiting: <ClockIcon className="w-4 h-4 text-amber-400" />,
  rejected: <XCircleIcon className="w-4 h-4 text-red-400" />,
};

const LABEL: Record<string, string> = {
  approved: "Approved",
  awaiting: "Awaiting",
  rejected: "Rejected",
};

type Props = {
  approvers: Approver[];
  compact?: boolean;
};

export function ApprovalChain({ approvers, compact = false }: Props) {
  if (approvers.length === 0) return null;

  if (compact) {
    const awaiting = approvers.filter((a) => a.status === "awaiting").length;
    const approved = approvers.filter((a) => a.status === "approved").length;
    if (awaiting === 0 && approved === approvers.length) return null;
    return (
      <span className="inline-flex items-center gap-1 text-xs text-amber-400">
        <ClockIcon className="w-3 h-3" />
        {awaiting} awaiting
      </span>
    );
  }

  return (
    <div className="space-y-1.5">
      {approvers.map((a) => (
        <div key={a.name} className="flex items-center gap-2.5">
          {ICON[a.status]}
          <div className="flex-1 min-w-0">
            <span className="text-xs font-medium text-zinc-200">{a.name}</span>
            <span className="text-xs text-zinc-500 ml-1.5">{a.role}</span>
          </div>
          <span
            className={clsx(
              "text-xs",
              a.status === "approved" ? "text-emerald-500" : a.status === "rejected" ? "text-red-500" : "text-amber-500"
            )}
          >
            {a.at ? timeAgo(a.at) : LABEL[a.status]}
          </span>
        </div>
      ))}
    </div>
  );
}
