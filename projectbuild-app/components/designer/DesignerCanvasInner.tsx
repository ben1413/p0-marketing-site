"use client";

/**
 * DesignerCanvasInner — Konva Stage.
 *
 * Dynamically imported with ssr: false by DesignerCanvas.tsx.
 *
 * Tool behavior:
 *   select — click to select, drag to move, Delete key to delete
 *   frame  — drag to draw a named frame container
 *   rect   — drag to draw a rectangle
 *   text   — click to place editable text
 *   arrow  — click start point, click end point
 *   pen    — hold + drag for freehand polyline
 *   note   — click to place annotation dot
 *
 * Canvas state is owned by DesignerShell. This component fires
 * onCreate / onUpdate / onDelete — never mutates props directly.
 *
 * Grid: rendered as a CSS background-image (radial-gradient dots)
 * on the container div. Konva Stage has transparent background.
 *
 * Stage dimensions: bound to container via ResizeObserver.
 */

import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from "react";
import { Stage, Layer, Rect, Text, Line, Arrow, Circle, Group, Transformer } from "react-konva";
import type Konva from "konva";
import type { CanvasElement, DesignerTool, DesignerMode } from "@/types";

interface DesignerCanvasInnerProps {
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

export interface CanvasHandle {
  toDataURL: () => string;
}

const DesignerCanvasInner = forwardRef<CanvasHandle, DesignerCanvasInnerProps>(
  function DesignerCanvasInner(
    { elements, activeTool, mode, selectedElementId, onSelect, onCreate, onUpdate, onDelete, isEmpty, onFigmaImport },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<Konva.Stage>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const [stageSize, setStageSize] = useState({ width: 600, height: 400 });

    // Drawing state
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawStart, setDrawStart] = useState({ x: 0, y: 0 });
    const [penPoints, setPenPoints] = useState<number[]>([]);
    const [arrowStart, setArrowStart] = useState<{ x: number; y: number } | null>(null);
    // Draft element shown while dragging — applied to real state on mouseup
    const [draftEl, setDraftEl] = useState<CanvasElement | null>(null);
    const draftIdRef = useRef<string | null>(null);

    // Expose toDataURL for promote artifact
    useImperativeHandle(ref, () => ({
      toDataURL: () => stageRef.current?.toDataURL() ?? "",
    }));

    // ResizeObserver — keep stage dimensions matching container
    useEffect(() => {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          setStageSize({ width, height });
        }
      });
      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, []);

    // Transformer — attach to selected node when select tool active
    useEffect(() => {
      if (!trRef.current || !stageRef.current) return;
      if (activeTool !== "select" || !selectedElementId) {
        trRef.current.nodes([]);
        trRef.current.getLayer()?.batchDraw();
        return;
      }
      const node = stageRef.current.findOne(`#${CSS.escape(selectedElementId)}`);
      if (node) {
        trRef.current.nodes([node]);
        trRef.current.getLayer()?.batchDraw();
      }
    }, [selectedElementId, activeTool, elements]);

    // Delete key — remove selected element
    useEffect(() => {
      function handleKey(e: KeyboardEvent) {
        if ((e.key === "Delete" || e.key === "Backspace") && selectedElementId) {
          // Only delete if not editing text
          if ((e.target as HTMLElement).tagName !== "INPUT" && (e.target as HTMLElement).tagName !== "TEXTAREA") {
            onDelete(selectedElementId);
            onSelect(null);
          }
        }
      }
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }, [selectedElementId, onDelete, onSelect]);

    function getPointerPos() {
      const stage = stageRef.current;
      if (!stage) return { x: 0, y: 0 };
      const pos = stage.getPointerPosition();
      return pos ?? { x: 0, y: 0 };
    }

    function makeId() {
      return `el_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    }

    const handleMouseDown = useCallback(
      (e: Konva.KonvaEventObject<MouseEvent>) => {
        const pos = getPointerPos();

        switch (activeTool) {
          case "select":
            if (e.target === stageRef.current) onSelect(null);
            break;

          case "rect":
          case "frame": {
            const id = makeId();
            draftIdRef.current = id;
            setDrawStart(pos);
            setIsDrawing(true);
            setDraftEl({
              id,
              type: activeTool,
              x: pos.x,
              y: pos.y,
              width: 0,
              height: 0,
              name: activeTool === "frame" ? "Frame" : undefined,
              createdBy: "human",
            });
            break;
          }

          case "text": {
            const id = makeId();
            onCreate({
              id,
              type: "text",
              x: pos.x,
              y: pos.y,
              width: 160,
              height: 28,
              content: "Text",
              createdBy: "human",
            });
            onSelect(id);
            break;
          }

          case "note": {
            const id = makeId();
            const number = elements.filter((el) => el.type === "note").length + 1;
            onCreate({
              id,
              type: "note",
              x: pos.x,
              y: pos.y,
              width: 24,
              height: 24,
              annotationNumber: number,
              content: "Agent note",
              createdBy: "human",
            });
            onSelect(id);
            break;
          }

          case "arrow": {
            if (!arrowStart) {
              setArrowStart(pos);
            } else {
              const id = makeId();
              onCreate({
                id,
                type: "arrow",
                x: arrowStart.x,
                y: arrowStart.y,
                width: 0,
                height: 0,
                points: [0, 0, pos.x - arrowStart.x, pos.y - arrowStart.y],
                createdBy: "human",
              });
              setArrowStart(null);
            }
            break;
          }

          case "pen": {
            setIsDrawing(true);
            setPenPoints([pos.x, pos.y]);
            draftIdRef.current = makeId();
            break;
          }
        }
      },
      [activeTool, arrowStart, elements, onCreate, onSelect]
    );

    const handleMouseMove = useCallback(
      (_e: Konva.KonvaEventObject<MouseEvent>) => {
        if (!isDrawing) return;
        const pos = getPointerPos();

        if (activeTool === "rect" || activeTool === "frame") {
          const x = Math.min(pos.x, drawStart.x);
          const y = Math.min(pos.y, drawStart.y);
          const width = Math.abs(pos.x - drawStart.x);
          const height = Math.abs(pos.y - drawStart.y);
          setDraftEl((prev) => prev ? { ...prev, x, y, width, height } : prev);
        }

        if (activeTool === "pen") {
          setPenPoints((prev) => [...prev, pos.x, pos.y]);
        }
      },
      [isDrawing, activeTool, drawStart]
    );

    const handleMouseUp = useCallback(() => {
      if (!isDrawing) return;
      setIsDrawing(false);

      if ((activeTool === "rect" || activeTool === "frame") && draftEl) {
        if (draftEl.width > 4 && draftEl.height > 4) {
          onCreate(draftEl);
          onSelect(draftEl.id);
        }
        setDraftEl(null);
        draftIdRef.current = null;
      }

      if (activeTool === "pen" && penPoints.length >= 4) {
        const id = draftIdRef.current ?? makeId();
        // Bounding box from points
        const xs = penPoints.filter((_, i) => i % 2 === 0);
        const ys = penPoints.filter((_, i) => i % 2 === 1);
        const minX = Math.min(...xs);
        const minY = Math.min(...ys);
        onCreate({
          id,
          type: "pen",
          x: minX,
          y: minY,
          width: Math.max(...xs) - minX,
          height: Math.max(...ys) - minY,
          points: penPoints,
          createdBy: "human",
        });
        setPenPoints([]);
        draftIdRef.current = null;
      }
    }, [isDrawing, activeTool, draftEl, penPoints, onCreate, onSelect]);

    const cursor =
      activeTool === "select"
        ? "default"
        : activeTool === "text"
        ? "text"
        : "crosshair";

    return (
      <div
        ref={containerRef}
        className="w-full h-full relative"
        style={{
          background: "#0c0c0e",
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          cursor,
        }}
      >
        {/* Empty state — shown when no elements exist */}
        {isEmpty && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none">
            <p className="text-[11px] font-mono text-white/20 tracking-[0.2em] uppercase">
              Empty canvas
            </p>
            <p className="text-[10px] text-white/15 font-mono">
              Use tools on the left to draw, or ask the agent.
            </p>
            <button
              type="button"
              onClick={onFigmaImport}
              className="pointer-events-auto mt-2 rounded-xl border border-white/10 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:border-white/20 hover:text-white/50 transition-colors font-mono"
            >
              Import from Figma
            </button>
          </div>
        )}

        {/* Arrow start indicator */}
        {arrowStart && (
          <div
            className="absolute w-2 h-2 rounded-full bg-amber-400 border border-amber-500/50 pointer-events-none"
            style={{ left: arrowStart.x - 4, top: arrowStart.y - 4 }}
          />
        )}

        <Stage
          ref={stageRef}
          width={stageSize.width}
          height={stageSize.height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ background: "transparent" }}
        >
          {/* Main elements layer */}
          <Layer>
            {/* Committed elements */}
            {elements.map((el) => (
              <CanvasShape
                key={el.id}
                el={el}
                isSelected={selectedElementId === el.id}
                activeTool={activeTool}
                mode={mode}
                onSelect={onSelect}
                onUpdate={onUpdate}
              />
            ))}

            {/* Draft rect/frame while dragging */}
            {draftEl && (draftEl.type === "rect" || draftEl.type === "frame") && (
              <Rect
                x={draftEl.x}
                y={draftEl.y}
                width={draftEl.width}
                height={draftEl.height}
                stroke={draftEl.type === "frame" ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.4)"}
                strokeWidth={1}
                dash={[4, 3]}
                fill="rgba(255,255,255,0.02)"
                listening={false}
              />
            )}

            {/* Draft pen line while drawing */}
            {penPoints.length >= 4 && (
              <Line
                points={penPoints}
                stroke="rgba(255,255,255,0.5)"
                strokeWidth={1.5}
                lineCap="round"
                lineJoin="round"
                listening={false}
              />
            )}

            {/* Transformer for selected element */}
            <Transformer
              ref={trRef}
              rotateEnabled={false}
              borderStroke="rgba(139,92,246,0.6)"
              borderStrokeWidth={1}
              anchorFill="#7c3aed"
              anchorStroke="rgba(139,92,246,0.8)"
              anchorSize={6}
              anchorCornerRadius={2}
              onTransformEnd={(e) => {
                const node = e.target;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();
                node.scaleX(1);
                node.scaleY(1);
                if (selectedElementId) {
                  onUpdate(selectedElementId, {
                    x: node.x(),
                    y: node.y(),
                    width: Math.max(4, node.width() * scaleX),
                    height: Math.max(4, node.height() * scaleY),
                  });
                }
              }}
            />
          </Layer>
        </Stage>

        {/* HTML overlay for annotation bubbles */}
        {elements
          .filter((el) => el.type === "note" && el.expanded)
          .map((el) => (
            <AnnotationBubble
              key={`bubble-${el.id}`}
              el={el}
              onUpdate={onUpdate}
            />
          ))}
      </div>
    );
  }
);

export default DesignerCanvasInner;

// ── CanvasShape — renders a single CanvasElement as Konva shape ──────────

interface CanvasShapeProps {
  el: CanvasElement;
  isSelected: boolean;
  activeTool: DesignerTool;
  mode: DesignerMode;
  onSelect: (id: string) => void;
  onUpdate: (id: string, patch: Partial<CanvasElement>) => void;
}

function CanvasShape({ el, activeTool, onSelect, onUpdate }: CanvasShapeProps) {
  const isSelectable = activeTool === "select";

  const selectProps = isSelectable
    ? {
        onClick: () => onSelect(el.id),
        onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => {
          onUpdate(el.id, { x: e.target.x(), y: e.target.y() });
        },
        draggable: true,
      }
    : {};

  const agentStroke = el.createdBy === "agent" ? "#EF9F27" : "rgba(255,255,255,0.25)";

  switch (el.type) {
    case "frame":
      return (
        <Group id={el.id} x={el.x} y={el.y} {...selectProps}>
          <Rect
            width={el.width}
            height={el.height}
            stroke={agentStroke}
            strokeWidth={1}
            fill="rgba(0,0,0,0.15)"
            cornerRadius={2}
          />
          {/* Frame label */}
          <Text
            text={(el.name ?? "Frame") + (el.createdBy === "agent" ? " · agent" : "")}
            x={4}
            y={-16}
            fontSize={10}
            fill={el.createdBy === "agent" ? "#EF9F27" : "rgba(255,255,255,0.4)"}
            fontFamily="SF Mono, Fira Code, monospace"
          />
        </Group>
      );

    case "rect":
      return (
        <Rect
          id={el.id}
          x={el.x}
          y={el.y}
          width={el.width}
          height={el.height}
          stroke={agentStroke}
          strokeWidth={1}
          fill={el.fill ?? "rgba(255,255,255,0.05)"}
          cornerRadius={2}
          {...selectProps}
        />
      );

    case "text":
      return (
        <Text
          id={el.id}
          x={el.x}
          y={el.y}
          width={el.width}
          text={el.content ?? "Text"}
          fontSize={13}
          fill={el.createdBy === "agent" ? "#EF9F27" : "rgba(255,255,255,0.75)"}
          fontFamily="SF Mono, Fira Code, monospace"
          {...selectProps}
        />
      );

    case "arrow":
      return (
        <Arrow
          id={el.id}
          x={el.x}
          y={el.y}
          points={el.points ?? [0, 0, 60, 0]}
          stroke={agentStroke}
          strokeWidth={1.5}
          fill={agentStroke}
          pointerLength={8}
          pointerWidth={6}
          {...selectProps}
        />
      );

    case "pen":
      return (
        <Line
          id={el.id}
          points={el.points ?? []}
          stroke={agentStroke}
          strokeWidth={1.5}
          lineCap="round"
          lineJoin="round"
          tension={0.4}
          {...selectProps}
        />
      );

    case "note":
      return (
        <Group
          id={el.id}
          x={el.x}
          y={el.y}
          onClick={() => {
            if (isSelectable) onSelect(el.id);
            // Toggle annotation expansion
            onUpdate(el.id, { expanded: !el.expanded });
          }}
          draggable={isSelectable}
          onDragEnd={(e) => onUpdate(el.id, { x: e.target.x(), y: e.target.y() })}
        >
          <Circle radius={10} fill="#EF9F27" opacity={0.85} />
          <Text
            text={String(el.annotationNumber ?? "?")}
            x={-5}
            y={-6}
            fontSize={10}
            fill="#000"
            fontStyle="bold"
            fontFamily="SF Mono, Fira Code, monospace"
          />
        </Group>
      );

    default:
      return null;
  }
}

// ── AnnotationBubble — HTML overlay for expanded note elements ────────────

interface AnnotationBubbleProps {
  el: CanvasElement;
  onUpdate: (id: string, patch: Partial<CanvasElement>) => void;
}

function AnnotationBubble({ el, onUpdate }: AnnotationBubbleProps) {
  return (
    <div
      className="absolute pointer-events-auto z-10"
      style={{ left: el.x + 16, top: el.y - 8 }}
    >
      <div className="w-56 rounded-xl border border-amber-500/30 bg-[#111113] shadow-2xl px-3 py-2.5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold uppercase tracking-widest text-amber-400/70">
            {el.agentName ?? "Agent"} · suggestion
          </span>
          <span className="text-[9px] text-amber-400/50 font-mono">#{el.annotationNumber}</span>
        </div>
        <p className="text-[11px] text-white/60 leading-relaxed">{el.content}</p>
        <div className="flex items-center gap-2 pt-0.5">
          <button
            type="button"
            className="text-[9px] font-bold uppercase tracking-widest text-amber-400/60 hover:text-amber-400 transition-colors"
            onClick={() => onUpdate(el.id, { expanded: false })}
          >
            apply
          </button>
          <button
            type="button"
            className="text-[9px] font-bold uppercase tracking-widest text-white/30 hover:text-white/50 transition-colors"
            onClick={() => onUpdate(el.id, { expanded: false })}
          >
            dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
