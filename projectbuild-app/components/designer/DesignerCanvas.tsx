"use client";

/**
 * DesignerCanvas — public entry point.
 *
 * Wraps DesignerCanvasInner with dynamic import (ssr: false) to prevent
 * Konva from executing server-side — same pattern as CodeEditor/CodeEditorInner.
 *
 * Forwards the ref for toDataURL access (used in promote artifact).
 */

import dynamic from "next/dynamic";
import { forwardRef } from "react";
import type { CanvasElement, DesignerTool, DesignerMode } from "@/types";
import type { CanvasHandle } from "./DesignerCanvasInner";

const DesignerCanvasInner = dynamic(() => import("./DesignerCanvasInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#0c0c0e]">
      <span className="text-[10px] font-mono text-white/20 tracking-[0.2em] uppercase animate-pulse">
        loading canvas…
      </span>
    </div>
  ),
});

interface DesignerCanvasProps {
  elements: CanvasElement[];
  activeTool: DesignerTool;
  mode: DesignerMode;
  selectedElementId: string | null;
  onSelect: (id: string | null) => void;
  onCreate: (el: CanvasElement) => void;
  onUpdate: (id: string, patch: Partial<CanvasElement>) => void;
  onDelete: (id: string) => void;
  isEmpty: boolean;
  onFigmaImport: () => void;
}

export const DesignerCanvas = forwardRef<CanvasHandle, DesignerCanvasProps>(
  function DesignerCanvas(props, ref) {
    return (
      <div className="w-full h-full">
        <DesignerCanvasInner ref={ref} {...props} />
      </div>
    );
  }
);
