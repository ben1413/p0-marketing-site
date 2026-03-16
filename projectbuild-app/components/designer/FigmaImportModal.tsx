"use client";

/**
 * FigmaImportModal — stub UI for Figma file import.
 *
 * TODO: implement Figma API import
 * Figma REST API: GET /v1/files/:file_key
 * Parse response into canvas state JSON — CanvasElement[]
 * Map Figma frames → { type: "frame" }, rectangles → { type: "rect" },
 * text nodes → { type: "text" }, vectors → { type: "pen" }
 */

import { useState } from "react";

interface FigmaImportModalProps {
  onClose: () => void;
}

export function FigmaImportModal({ onClose }: FigmaImportModalProps) {
  const [figmaUrl, setFigmaUrl] = useState("");
  const [apiToken, setApiToken] = useState("");

  function handleImport() {
    // TODO: implement Figma API import
    // 1. Parse file key from URL: figmaUrl.match(/figma\.com\/file\/([a-zA-Z0-9]+)/)
    // 2. GET https://api.figma.com/v1/files/:fileKey with Authorization: Bearer :apiToken
    // 3. Walk response.document.children recursively
    // 4. Map Figma nodes to CanvasElement[] and call onCreate for each
    console.log("[FigmaImport] stub — not yet implemented", { figmaUrl, apiToken });
    onClose();
  }

  return (
    <div className="absolute inset-0 z-60 flex items-center justify-center bg-black/60 rounded-xl">
      <div
        className="relative w-full max-w-sm mx-4 rounded-2xl border border-white/10 bg-[#111113] shadow-2xl px-6 py-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-violet-400/60 font-mono">
            Import from Figma
          </span>
          <span className="text-[9px] font-mono text-white/20 border border-white/10 px-2 py-0.5 rounded-full">
            stub
          </span>
        </div>

        <p className="text-[11px] text-white/40 leading-relaxed">
          Paste your Figma file URL and a personal access token to import frames and components directly to the canvas.
        </p>

        {/* Figma file URL */}
        <div>
          <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/40 block mb-1.5 font-mono">
            Figma file URL
          </label>
          <input
            type="url"
            value={figmaUrl}
            onChange={(e) => setFigmaUrl(e.target.value)}
            placeholder="https://www.figma.com/file/…"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] font-mono text-white/60 placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>

        {/* API token */}
        <div>
          <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/40 block mb-1.5 font-mono">
            Personal access token
          </label>
          <input
            type="password"
            value={apiToken}
            onChange={(e) => setApiToken(e.target.value)}
            placeholder="figd_…"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] font-mono text-white/60 placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors"
          />
          <p className="text-[10px] text-white/25 mt-1 font-mono">
            Generated in Figma → Account → Personal access tokens
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={handleImport}
            disabled={!figmaUrl.trim() || !apiToken.trim()}
            className="flex-1 rounded-full bg-violet-500/20 border border-violet-500/30 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-violet-300 hover:bg-violet-500/30 disabled:opacity-30 transition-colors font-mono"
          >
            Import
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:bg-white/10 transition-colors font-mono"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
