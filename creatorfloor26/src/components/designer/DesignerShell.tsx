"use client";

import { useState } from "react";
import { useCfProject } from "@/lib/cf/useCfProject";
import { useAuth } from "@/components/auth/AuthProvider";
import { BuilderPromoteModal } from "@/components/builder/BuilderPromoteModal";

type Mode = "wireframe" | "render";

type Box = { id: string; x: number; y: number; w: number; h: number; label: string };

export function DesignerShell({ coreProjectId }: { coreProjectId: string }) {
  const { project } = useCfProject(coreProjectId);
  const { user } = useAuth();
  const [mode, setMode] = useState<Mode>("wireframe");
  const [boxes, setBoxes] = useState<Box[]>([
    { id: "1", x: 40, y: 40, w: 200, h: 48, label: "Frame (ScreenGui)" },
    { id: "2", x: 56, y: 100, w: 160, h: 32, label: "TextLabel" },
  ]);
  const [promoteOpen, setPromoteOpen] = useState(false);

  const isRoblox = project?.platform !== "uefn";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-zinc-500">Mode</span>
        {(["wireframe", "render"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-lg border px-3 py-1 text-xs capitalize ${
              mode === m
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-300 dark:border-zinc-600"
            }`}
          >
            {m}
          </button>
        ))}
        <button
          type="button"
          onClick={() =>
            setBoxes((b) => [
              ...b,
              {
                id: `n_${Date.now()}`,
                x: 80,
                y: 160,
                w: 120,
                h: 40,
                label: "ImageLabel",
              },
            ])
          }
          className="rounded-lg border border-zinc-300 px-3 py-1 text-xs dark:border-zinc-600"
        >
          + Element
        </button>
        <button
          type="button"
          onClick={() => setPromoteOpen(true)}
          className="rounded-lg bg-zinc-900 px-3 py-1 text-xs text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Promote design
        </button>
      </div>

      <p className="text-xs text-zinc-500">
        {isRoblox
          ? "Roblox: ScreenGui, Frame, TextLabel, UIListLayout — agent context uses these primitives."
          : "UEFN: wire layouts here; Verse UI patterns in agent context."}
      </p>

      <div
        className={`relative h-[420px] overflow-hidden rounded-2xl border-2 border-dashed ${
          mode === "wireframe"
            ? "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/50"
            : "border-violet-300 bg-gradient-to-br from-violet-50 to-white dark:border-violet-800 dark:from-violet-950/40 dark:to-zinc-950"
        }`}
      >
        {boxes.map((b) => (
          <div
            key={b.id}
            className={`absolute flex items-center justify-center border-2 text-center text-xs font-medium ${
              mode === "wireframe"
                ? "border-zinc-400 bg-white/80 text-zinc-800 dark:border-zinc-600 dark:bg-zinc-950/80 dark:text-zinc-100"
                : "border-violet-400 bg-violet-100/90 text-violet-950 dark:border-violet-600 dark:bg-violet-900/50 dark:text-violet-100"
            }`}
            style={{ left: b.x, top: b.y, width: b.w, height: b.h }}
          >
            {b.label}
          </div>
        ))}
      </div>

      <BuilderPromoteModal
        open={promoteOpen}
        onClose={() => setPromoteOpen(false)}
        coreProjectId={coreProjectId}
        userId={user?.uid ?? "anonymous"}
        gameId={project?.gameId}
        filePaths={[]}
        summaryDefault={`Designer canvas — ${boxes.length} elements (${mode})`}
        onQueued={() => setPromoteOpen(false)}
      />
    </div>
  );
}
