"use client";

import Link from "next/link";
import { clsx } from "clsx";
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";

/**
 * WhyNotBuild — the build vs. buy kill shot.
 *
 * Answers: "Could we just implement these rules ourselves?"
 *
 * The honest answer is: yes, you could build any individual piece.
 * The real answer is: teams don't fail to build this because it's impossible.
 * They fail because it requires cross-cutting standardization across every
 * decision surface — and that standardization is exactly the hard part.
 */

const WHAT_TEAMS_TRY: { approach: string; problem: string }[] = [
  {
    approach: "Logs + dashboards",
    problem:
      "Visibility without accountability. You can see what happened but not who decided, under what authority, or what the pre-deploy prediction was. No sealed record.",
  },
  {
    approach: "Jira + Slack approvals",
    problem:
      "Approvals exist but are unstructured: no authority mode, no simulation state captured, no authority delegation validation. Reconstruction after the fact is manual and incomplete.",
  },
  {
    approach: "Internal rule systems / scripts",
    problem:
      "Rules exist but are per-team, per-system, often undocumented. No standard decision contract. Authority model is implicit. Agent actions have no governance layer. Rules drift.",
  },
  {
    approach: "Analytics → retroactive investigation",
    problem:
      "Detection is end-of-day or escalation-driven — not continuous. By the time analytics surfaces an issue, the exposure window has already been open for hours. No baseline was captured at deploy time.",
  },
];

const WHERE_IT_BREAKS: { gap: string; detail: string; consequence: string }[] = [
  {
    gap: "No unified decision model",
    detail: "Different teams use different formats: some use tickets, some use config files, some use verbal approvals. There is no standard `Decision` contract that every surface writes to and reads from.",
    consequence: "Cross-team audit becomes manual reconciliation. You can't answer \"all decisions in the last 30 days\" without hitting 4 different systems.",
  },
  {
    gap: "No authority attribution standard",
    detail: "Decisions are made by humans and agents with no declared authority mode. Who made this call — a human, an agent acting autonomously, or an agent with a human in the loop? That distinction disappears instantly.",
    consequence: "When an agent makes a bad call, you can't distinguish it from a human decision in the audit trail. Regulatory exposure. Agent accountability is invisible.",
  },
  {
    gap: "No immutable audit chain",
    detail: "Even teams with good logging can edit or delete records through normal database paths. There is no structural guarantee that what you're reading today is what was written at decision time.",
    consequence: "A publisher or regulator who asks for the audit trail gets a politely formatted CSV that could have been edited. That's not a defensible record.",
  },
  {
    gap: "No cross-agent accountability",
    detail: "As teams add more AI agents to their live ops pipeline, each agent has its own logs, its own identity, its own action history — none of it unified. Trust is assumed, not measured.",
    consequence: "One bad agent config causes an incident. No one can reconstruct which agent made how many decisions, under what authority, with what track record. Policy is retroactive.",
  },
  {
    gap: "No consistent simulation gate enforcement",
    detail: "Teams run simulations manually or not at all. There is no system-level enforcement that a simulation must pass before a deploy, or that a deploy must match the version that was simulated.",
    consequence: "Simulation becomes theater. A developer under pressure can skip it. The gate has no teeth unless it's in the deploy path itself.",
  },
];

const WHAT_GREENLIGHT_STANDARDIZES: {
  primitive: string;
  what: string;
  why: string;
}[] = [
  {
    primitive: "Decision contract",
    what: "Decision, TrailEvent, OutcomeSummary — typed, versioned, shared across every surface",
    why: "Cross-team audit becomes one query, not manual reconciliation across 4 systems",
  },
  {
    primitive: "Authority model",
    what: "human_led / human_in_the_loop / agent_autonomous — declared on every write, validated against delegations",
    why: "Agent accountability is structural, not assumed. Every action is attributed.",
  },
  {
    primitive: "Ledger structure",
    what: "Append-only writes, no delete path, KMS-signed Artifact 5 bundles on key events",
    why: "The record cannot be edited retroactively. Verification is offline and independent.",
  },
  {
    primitive: "Simulation gating layer",
    what: "Hash enforcement (proposal didn't change), freshness enforcement (type-based), pass/fail in the deploy path",
    why: "Simulation has teeth. Skipping it requires an explicit bypass that is logged.",
  },
  {
    primitive: "Plain-language translation layer",
    what: "Every system state, error code, and status translated to human language in one module",
    why: "Governance is visible to non-engineers. An exec can read the dashboard and understand it.",
  },
];

export function WhyNotBuild() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="text-xs text-zinc-500 uppercase tracking-widest">Build vs. buy</div>
        <h1 className="text-2xl font-bold text-zinc-100">Why not build this yourself?</h1>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
          You could. Any individual piece here is buildable in a sprint.
          The question is whether you want to own the cross-cutting standardization problem
          that makes those pieces actually work together — and keep working as your team and
          tooling evolve.
        </p>
      </div>

      {/* Section 1 — What teams try */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-zinc-200">What teams typically build</h2>
        <p className="text-xs text-zinc-500">These all work at first. Here's where each one breaks down.</p>
        <div className="space-y-3">
          {WHAT_TEAMS_TRY.map(({ approach, problem }) => (
            <div key={approach} className="flex items-start gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <XCircleIcon className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-zinc-300">{approach}</p>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{problem}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2 — Where it breaks */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-zinc-200">Where the internal build breaks</h2>
        <p className="text-xs text-zinc-500">
          Each gap below is individually solvable. The problem is that solving one without the others
          leaves the system broken at a different seam. The hard part is doing all of them consistently.
        </p>
        <div className="space-y-4">
          {WHERE_IT_BREAKS.map(({ gap, detail, consequence }, i) => (
            <div key={gap} className="border border-zinc-800 rounded-xl overflow-hidden">
              <div className="flex items-start gap-3 px-4 py-3 bg-zinc-900">
                <span className="text-xs font-bold text-zinc-600 w-4 shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <p className="text-sm font-semibold text-zinc-200">{gap}</p>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{detail}</p>
                </div>
              </div>
              <div className="px-4 py-2.5 border-t border-zinc-800 bg-red-950/10 flex items-start gap-2">
                <XCircleIcon className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-400/80 leading-relaxed italic">{consequence}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 — What Greenlight standardizes */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-zinc-200">What Greenlight standardizes</h2>
        <p className="text-xs text-zinc-500">
          These are not features. They are cross-cutting primitives that every surface in your
          live ops pipeline can write to and read from consistently.
        </p>
        <div className="space-y-3">
          {WHAT_GREENLIGHT_STANDARDIZES.map(({ primitive, what, why }) => (
            <div key={primitive} className="flex items-start gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <CheckCircleIcon className="w-4 h-4 text-gl-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-zinc-200">{primitive}</p>
                <p className="text-xs text-zinc-400 font-mono">{what}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{why}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The kill shot line */}
      <div className="p-5 bg-zinc-900 border border-zinc-600 rounded-xl space-y-3">
        <LockClosedIcon className="w-5 h-5 text-zinc-400" />
        <p className="text-sm text-zinc-200 leading-relaxed font-medium">
          Teams don&apos;t fail to build this because it&apos;s impossible.
        </p>
        <p className="text-sm text-zinc-400 leading-relaxed">
          They fail because it requires{" "}
          <span className="text-zinc-200 font-medium">
            cross-cutting standardization across every decision surface
          </span>{" "}
          — every team, every agent, every deploy path, every simulation,
          every audit export — all writing to the same contract, enforcing the same authority model,
          producing the same sealed record format. That standardization is the hard part.
          And it only gets harder as the number of agents and decision surfaces grows.
        </p>
        <div
          className={clsx(
            "text-xs text-zinc-500 pt-2 border-t border-zinc-700 leading-relaxed"
          )}
        >
          The alternative is a system that works for the team that built it,
          for the decisions they anticipated, until the first engineer who understood it moves on.
        </div>
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-3 flex-wrap pb-8">
        <Link
          href="/story"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-gl-600 hover:bg-gl-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          See the proof scenario
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
        <Link
          href="/settings"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-300 rounded-lg text-sm font-medium transition-colors"
        >
          Integration paths
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
        <Link
          href="/activity"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-300 rounded-lg text-sm font-medium transition-colors"
        >
          See the audit trail
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
