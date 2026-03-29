import Link from "next/link";
import { ZapIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-sm">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <ZapIcon className="w-6 h-6 text-zinc-600" strokeWidth={1.5} />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs text-zinc-600 uppercase tracking-widest">404</p>
          <h1 className="text-xl font-bold text-zinc-100">Page not found</h1>
          <p className="text-sm text-zinc-500">
            This page doesn&apos;t exist or hasn&apos;t been built yet.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-zinc-300 hover:border-zinc-500 transition-colors"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
