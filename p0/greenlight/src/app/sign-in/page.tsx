"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, isFirebaseConfigured } from "@/lib/auth";
import { ZapIcon } from "lucide-react";
import { clsx } from "clsx";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);

  const firebaseReady = isFirebaseConfigured();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Sign-in failed.";
      if (msg.includes("user-not-found") || msg.includes("wrong-password") || msg.includes("invalid-credential")) {
        setError("Invalid email or password.");
      } else if (msg.includes("too-many-requests")) {
        setError("Too many attempts. Try again in a few minutes.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gl-500 flex items-center justify-center">
            <ZapIcon className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-semibold text-white">Greenlight</h1>
            <p className="text-sm text-zinc-500 mt-0.5">Operator sign-in</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!firebaseReady && (
            <div className="p-3 bg-amber-950/30 border border-amber-800/50 rounded-xl text-xs text-amber-300 text-center">
              Firebase not configured — set <code className="font-mono">NEXT_PUBLIC_FIREBASE_*</code> env vars to enable sign-in.
            </div>
          )}

          <div className="space-y-1">
            <label htmlFor="email" className="gl-label">Email</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              className="gl-input"
              placeholder="you@studio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!firebaseReady || loading}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="gl-label">Password</label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              className="gl-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!firebaseReady || loading}
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={!firebaseReady || loading}
            className={clsx(
              "w-full gl-btn-primary justify-center",
              (!firebaseReady || loading) && "opacity-50 cursor-not-allowed"
            )}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="text-xs text-zinc-600 text-center">
          For demo access contact your Greenlight administrator.
        </p>
      </div>
    </div>
  );
}
