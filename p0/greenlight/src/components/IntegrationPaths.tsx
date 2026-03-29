"use client";

import { clsx } from "clsx";
import {
  CodeBracketIcon,
  CpuChipIcon,
  CommandLineIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/20/solid";

type IntegrationPath = {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  status: "active" | "available" | "coming";
  friction: "low" | "medium" | "high";
  frictionLabel: string;
  description: string;
  steps: string[];
  bestFor: string;
};

const PATHS: IntegrationPath[] = [
  {
    id: "api",
    name: "REST API",
    subtitle: "Direct integration",
    icon: <CodeBracketIcon className="w-5 h-5" />,
    status: "active",
    friction: "low",
    frictionLabel: "Any language · Any pipeline",
    description:
      "POST decisions directly from your existing live ops tooling or game backend. Full 145-route API. Your engineers call it when a decision is made — Greenlight records, validates, and tracks from there.",
    steps: [
      "Get an API key from the Core dashboard",
      "POST /api/v1/gaming/decisions/propose with your decision payload",
      "Greenlight validates, runs governance rules, and returns a proposalId",
      "Use proposalId in subsequent simulate / approve / deploy calls",
    ],
    bestFor: "Teams with existing tooling who want accountability without rebuilding workflows",
  },
  {
    id: "sdk",
    name: "TypeScript SDK (@p0/sdk)",
    subtitle: "Typed client library",
    icon: <CpuChipIcon className="w-5 h-5" />,
    status: "active",
    friction: "low",
    frictionLabel: "TypeScript / Node.js",
    description:
      "Full typed coverage of the Core API. Install, configure, call. Designed for Next.js backends, Node services, and CI/CD pipelines. 15 resource modules — one per domain.",
    steps: [
      "npm install @p0/sdk",
      "const client = new P0Client({ apiKey, baseUrl })",
      "await client.gaming.propose({ gameId, type, title, ... })",
      "All types inferred — no manual contract maintenance",
    ],
    bestFor: "TypeScript / Node teams building new automation or dashboards on top of Greenlight",
  },
  {
    id: "mcp",
    name: "MCP Server",
    subtitle: "AI agent integration",
    icon: <CommandLineIcon className="w-5 h-5" />,
    status: "active",
    friction: "low",
    frictionLabel: "Claude / Cursor / any MCP host",
    description:
      "12 session-aware tools for AI agents. The agent proposes, simulates, and records — Greenlight enforces governance, authority declaration, and Ledger writes automatically. The agent never writes directly to the Ledger.",
    steps: [
      "Add Greenlight MCP to your agent host config",
      "Agent calls gl_session_start (opens evaluation, recalls context)",
      "Agent calls gl_propose_decision, gl_simulate, gl_approve_and_deploy",
      "All actions attributed to the agent's declared authority mode",
    ],
    bestFor: "Teams using AI agents for live ops automation who need governance on agent actions",
  },
];

const FRICTION_STYLES = {
  low:    "bg-emerald-950 text-emerald-300 border-emerald-800",
  medium: "bg-amber-950 text-amber-300 border-amber-700",
  high:   "bg-red-950 text-red-300 border-red-800",
};

const STATUS_STYLES = {
  active:    { bg: "bg-emerald-950 text-emerald-300 border-emerald-800", label: "Active" },
  available: { bg: "bg-zinc-800 text-zinc-300 border-zinc-700",          label: "Available" },
  coming:    { bg: "bg-zinc-800 text-zinc-500 border-zinc-700",          label: "Coming soon" },
};

export function IntegrationPaths() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold text-zinc-200">How decisions enter Greenlight</h2>
        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
          Greenlight is not a closed world. Decisions come in from your existing tools through one of three paths.
          You don&apos;t rebuild your pipeline — you attach Greenlight to it.
        </p>
      </div>

      <div className="space-y-3">
        {PATHS.map((path) => {
          const status = STATUS_STYLES[path.status];
          const friction = FRICTION_STYLES[path.friction];
          return (
            <div key={path.id} className="gl-card space-y-4">
              {/* Header */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0">
                  {path.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-zinc-200">{path.name}</span>
                    <span className={clsx("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border", status.bg)}>
                      {path.status === "active"
                        ? <CheckCircleIcon className="w-3 h-3" />
                        : <ClockIcon className="w-3 h-3" />}
                      {status.label}
                    </span>
                    <span className={clsx("px-2 py-0.5 rounded-full text-xs font-medium border", friction)}>
                      {path.frictionLabel}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">{path.subtitle}</p>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">{path.description}</p>

              {/* Steps */}
              <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2">
                  Integration steps
                </p>
                <ol className="space-y-1.5">
                  {path.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-500 shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="pt-1 border-t border-zinc-800">
                <p className="text-xs text-zinc-500">
                  <span className="text-zinc-400 font-medium">Best for: </span>
                  {path.bestFor}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* The anti-pattern */}
      <div className="p-3 bg-zinc-900 border border-zinc-700 rounded-xl">
        <p className="text-xs font-semibold text-zinc-400 mb-1.5">What Greenlight does NOT require</p>
        <ul className="space-y-1 text-xs text-zinc-500">
          <li>✗ Does not require replacing your existing game backend or tooling</li>
          <li>✗ Does not require cloud-provider-specific SDKs in your environment</li>
          <li>✗ Does not require decisions to be proposed through the Greenlight UI — the UI surfaces what your systems submit</li>
          <li>✗ Does not require a spine or agent if you have existing API-connected tooling</li>
        </ul>
      </div>
    </section>
  );
}
