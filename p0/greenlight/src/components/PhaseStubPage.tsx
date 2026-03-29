"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { ClockIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

type Props = {
  title: string;
  description: string;
  phase: "B" | "C";
  relatedLinks?: { href: string; label: string }[];
};

export function PhaseStubPage({ title, description, phase, relatedLinks = [] }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-lg mx-auto space-y-6">
      <div
        className={clsx(
          "w-12 h-12 rounded-2xl flex items-center justify-center",
          phase === "B" ? "bg-amber-950 border border-amber-800" : "bg-zinc-900 border border-zinc-700"
        )}
      >
        <ClockIcon className={clsx("w-6 h-6", phase === "B" ? "text-amber-400" : "text-zinc-500")} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-xl font-bold text-zinc-100">{title}</h1>
          <span
            className={clsx(
              "px-2 py-0.5 rounded-full text-xs font-semibold border",
              phase === "B"
                ? "bg-amber-950 text-amber-300 border-amber-800"
                : "bg-zinc-900 text-zinc-500 border-zinc-700"
            )}
          >
            Phase {phase}
          </span>
        </div>
        <p className="text-sm text-zinc-500 leading-relaxed">{description}</p>
      </div>

      {relatedLinks.length > 0 && (
        <div className="space-y-2 w-full">
          <p className="text-xs text-zinc-600 uppercase tracking-widest">Available now</p>
          {relatedLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 transition-colors group w-full"
            >
              <span className="text-sm text-zinc-300">{label}</span>
              <ArrowRightIcon className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
