export default function HomePage() {
  const coreUrl =
    process.env.NEXT_PUBLIC_P0_CORE_BASE_URL || "http://localhost:3000";

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-6 py-12">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
        <div className="text-sm uppercase tracking-widest text-neutral-400">
          Project0 Starter Spine
        </div>
        <h1 className="mt-2 text-2xl font-semibold">Welcome</h1>
        <p className="mt-2 text-neutral-300">
          This is the starter spine — Next.js + Firebase + Vercel + Stripe +
          Project0 Core.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
        <div className="text-xs uppercase tracking-wider text-neutral-400">
          Core API
        </div>
        <div className="mt-2 font-mono text-sm text-neutral-300">
          {coreUrl}
        </div>
        <p className="mt-2 text-xs text-neutral-500">
          Set <code className="rounded bg-neutral-800 px-1">P0_CORE_BASE_URL</code>{" "}
          or <code className="rounded bg-neutral-800 px-1">NEXT_PUBLIC_P0_CORE_BASE_URL</code>{" "}
          to point at your Core instance.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 text-sm text-neutral-400">
        <strong className="text-neutral-300">Next:</strong> Connect to Core
        agents, Brain, Ledger via API. See{" "}
        <code className="rounded bg-neutral-800 px-1">/api/v1/</code> routes.
      </div>
    </main>
  );
}
