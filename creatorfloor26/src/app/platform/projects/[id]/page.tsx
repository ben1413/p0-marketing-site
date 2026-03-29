import Link from "next/link";

export default async function ProjectOverviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const base = `/platform/projects/${id}`;
  const cards = [
    { href: `${base}/build`, title: "Build", desc: "IDE + agent + Companion" },
    { href: `${base}/design`, title: "Design", desc: "UI mockups for your platform" },
    { href: `${base}/board`, title: "Board", desc: "Tasks, risks, Core proposals" },
    { href: `${base}/live`, title: "Live Ops", desc: "Player, economy, moderation" },
    { href: `${base}/ledger`, title: "Ledger", desc: "Sealed decisions" },
    { href: `${base}/settings`, title: "Settings", desc: "gameId, Rojo, Roblox" },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <Link
          key={c.href}
          href={c.href}
          className="rounded-2xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600"
        >
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">{c.title}</h2>
          <p className="mt-1 text-sm text-zinc-500">{c.desc}</p>
        </Link>
      ))}
    </div>
  );
}
