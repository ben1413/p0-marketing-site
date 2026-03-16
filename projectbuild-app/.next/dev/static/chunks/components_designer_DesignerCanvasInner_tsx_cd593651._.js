(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/designer/DesignerCanvasInner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonva$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-konva/es/ReactKonva.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-konva/es/ReactKonvaCore.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const DesignerCanvasInner = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s(function DesignerCanvasInner({ elements, activeTool, mode, selectedElementId, onSelect, onCreate, onUpdate, onDelete, isEmpty, onFigmaImport }, ref) {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const stageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const trRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [stageSize, setStageSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        width: 600,
        height: 400
    });
    // Drawing state
    const [isDrawing, setIsDrawing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [drawStart, setDrawStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [penPoints, setPenPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [arrowStart, setArrowStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Draft element shown while dragging — applied to real state on mouseup
    const [draftEl, setDraftEl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const draftIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Expose toDataURL for promote artifact
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "DesignerCanvasInner.DesignerCanvasInner.useImperativeHandle": ()=>({
                toDataURL: ({
                    "DesignerCanvasInner.DesignerCanvasInner.useImperativeHandle": ()=>stageRef.current?.toDataURL() ?? ""
                })["DesignerCanvasInner.DesignerCanvasInner.useImperativeHandle"]
            })
    }["DesignerCanvasInner.DesignerCanvasInner.useImperativeHandle"]);
    // ResizeObserver — keep stage dimensions matching container
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DesignerCanvasInner.DesignerCanvasInner.useEffect": ()=>{
            const observer = new ResizeObserver({
                "DesignerCanvasInner.DesignerCanvasInner.useEffect": (entries)=>{
                    for (const entry of entries){
                        const { width, height } = entry.contentRect;
                        setStageSize({
                            width,
                            height
                        });
                    }
                }
            }["DesignerCanvasInner.DesignerCanvasInner.useEffect"]);
            if (containerRef.current) observer.observe(containerRef.current);
            return ({
                "DesignerCanvasInner.DesignerCanvasInner.useEffect": ()=>observer.disconnect()
            })["DesignerCanvasInner.DesignerCanvasInner.useEffect"];
        }
    }["DesignerCanvasInner.DesignerCanvasInner.useEffect"], []);
    // Transformer — attach to selected node when select tool active
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DesignerCanvasInner.DesignerCanvasInner.useEffect": ()=>{
            if (!trRef.current || !stageRef.current) return;
            if (activeTool !== "select" || !selectedElementId) {
                trRef.current.nodes([]);
                trRef.current.getLayer()?.batchDraw();
                return;
            }
            const node = stageRef.current.findOne(`#${CSS.escape(selectedElementId)}`);
            if (node) {
                trRef.current.nodes([
                    node
                ]);
                trRef.current.getLayer()?.batchDraw();
            }
        }
    }["DesignerCanvasInner.DesignerCanvasInner.useEffect"], [
        selectedElementId,
        activeTool,
        elements
    ]);
    // Delete key — remove selected element
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DesignerCanvasInner.DesignerCanvasInner.useEffect": ()=>{
            function handleKey(e) {
                if ((e.key === "Delete" || e.key === "Backspace") && selectedElementId) {
                    // Only delete if not editing text
                    if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
                        onDelete(selectedElementId);
                        onSelect(null);
                    }
                }
            }
            window.addEventListener("keydown", handleKey);
            return ({
                "DesignerCanvasInner.DesignerCanvasInner.useEffect": ()=>window.removeEventListener("keydown", handleKey)
            })["DesignerCanvasInner.DesignerCanvasInner.useEffect"];
        }
    }["DesignerCanvasInner.DesignerCanvasInner.useEffect"], [
        selectedElementId,
        onDelete,
        onSelect
    ]);
    function getPointerPos() {
        const stage = stageRef.current;
        if (!stage) return {
            x: 0,
            y: 0
        };
        const pos = stage.getPointerPosition();
        return pos ?? {
            x: 0,
            y: 0
        };
    }
    function makeId() {
        return `el_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    }
    const handleMouseDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DesignerCanvasInner.DesignerCanvasInner.useCallback[handleMouseDown]": (e)=>{
            const pos = getPointerPos();
            switch(activeTool){
                case "select":
                    if (e.target === stageRef.current) onSelect(null);
                    break;
                case "rect":
                case "frame":
                    {
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
                            createdBy: "human"
                        });
                        break;
                    }
                case "text":
                    {
                        const id = makeId();
                        onCreate({
                            id,
                            type: "text",
                            x: pos.x,
                            y: pos.y,
                            width: 160,
                            height: 28,
                            content: "Text",
                            createdBy: "human"
                        });
                        onSelect(id);
                        break;
                    }
                case "note":
                    {
                        const id = makeId();
                        const number = elements.filter({
                            "DesignerCanvasInner.DesignerCanvasInner.useCallback[handleMouseDown]": (el)=>el.type === "note"
                        }["DesignerCanvasInner.DesignerCanvasInner.useCallback[handleMouseDown]"]).length + 1;
                        onCreate({
                            id,
                            type: "note",
                            x: pos.x,
                            y: pos.y,
                            width: 24,
                            height: 24,
                            annotationNumber: number,
                            content: "Agent note",
                            createdBy: "human"
                        });
                        onSelect(id);
                        break;
                    }
                case "arrow":
                    {
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
                                points: [
                                    0,
                                    0,
                                    pos.x - arrowStart.x,
                                    pos.y - arrowStart.y
                                ],
                                createdBy: "human"
                            });
                            setArrowStart(null);
                        }
                        break;
                    }
                case "pen":
                    {
                        setIsDrawing(true);
                        setPenPoints([
                            pos.x,
                            pos.y
                        ]);
                        draftIdRef.current = makeId();
                        break;
                    }
            }
        }
    }["DesignerCanvasInner.DesignerCanvasInner.useCallback[handleMouseDown]"], [
        activeTool,
        arrowStart,
        elements,
        onCreate,
        onSelect
    ]);
    const handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DesignerCanvasInner.DesignerCanvasInner.useCallback[handleMouseMove]": (_e)=>{
            if (!isDrawing) return;
            const pos = getPointerPos();
            if (activeTool === "rect" || activeTool === "frame") {
                const x = Math.min(pos.x, drawStart.x);
                const y = Math.min(pos.y, drawStart.y);
                const width = Math.abs(pos.x - drawStart.x);
                const height = Math.abs(pos.y - drawStart.y);
                setDraftEl({
                    "DesignerCanvasInner.DesignerCanvasInner.useCallback[handleMouseMove]": (prev)=>prev ? {
                            ...prev,
                            x,
                            y,
                            width,
                            height
                        } : prev
                }["DesignerCanvasInner.DesignerCanvasInner.useCallback[handleMouseMove]"]);
            }
            if (activeTool === "pen") {
                setPenPoints({
                    "DesignerCanvasInner.DesignerCanvasInner.useCallback[handleMouseMove]": (prev)=>[
                            ...prev,
                            pos.x,
                            pos.y
                        ]
                }["DesignerCanvasInner.DesignerCanvasInner.useCallback[handleMouseMove]"]);
            }
        }
    }["DesignerCanvasInner.DesignerCanvasInner.useCallback[handleMouseMove]"], [
        isDrawing,
        activeTool,
        drawStart
    ]);
    const handleMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DesignerCanvasInner.DesignerCanvasInner.useCallback[handleMouseUp]": ()=>{
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
                const xs = penPoints.filter({
                    "DesignerCanvasInner.DesignerCanvasInner.useCallback[handleMouseUp].xs": (_, i)=>i % 2 === 0
                }["DesignerCanvasInner.DesignerCanvasInner.useCallback[handleMouseUp].xs"]);
                const ys = penPoints.filter({
                    "DesignerCanvasInner.DesignerCanvasInner.useCallback[handleMouseUp].ys": (_, i)=>i % 2 === 1
                }["DesignerCanvasInner.DesignerCanvasInner.useCallback[handleMouseUp].ys"]);
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
                    createdBy: "human"
                });
                setPenPoints([]);
                draftIdRef.current = null;
            }
        }
    }["DesignerCanvasInner.DesignerCanvasInner.useCallback[handleMouseUp]"], [
        isDrawing,
        activeTool,
        draftEl,
        penPoints,
        onCreate,
        onSelect
    ]);
    const cursor = activeTool === "select" ? "default" : activeTool === "text" ? "text" : "crosshair";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "w-full h-full relative",
        style: {
            background: "#0c0c0e",
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            cursor
        },
        children: [
            isEmpty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] font-mono text-white/20 tracking-[0.2em] uppercase",
                        children: "Empty canvas"
                    }, void 0, false, {
                        fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                        lineNumber: 295,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] text-white/15 font-mono",
                        children: "Use tools on the left to draw, or ask the agent."
                    }, void 0, false, {
                        fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                        lineNumber: 298,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onFigmaImport,
                        className: "pointer-events-auto mt-2 rounded-xl border border-white/10 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:border-white/20 hover:text-white/50 transition-colors font-mono",
                        children: "Import from Figma"
                    }, void 0, false, {
                        fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                        lineNumber: 301,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                lineNumber: 294,
                columnNumber: 11
            }, this),
            arrowStart && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute w-2 h-2 rounded-full bg-amber-400 border border-amber-500/50 pointer-events-none",
                style: {
                    left: arrowStart.x - 4,
                    top: arrowStart.y - 4
                }
            }, void 0, false, {
                fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                lineNumber: 313,
                columnNumber: 11
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Stage"], {
                ref: stageRef,
                width: stageSize.width,
                height: stageSize.height,
                onMouseDown: handleMouseDown,
                onMouseMove: handleMouseMove,
                onMouseUp: handleMouseUp,
                style: {
                    background: "transparent"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Layer"], {
                    children: [
                        elements.map((el)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CanvasShape, {
                                el: el,
                                isSelected: selectedElementId === el.id,
                                activeTool: activeTool,
                                mode: mode,
                                onSelect: onSelect,
                                onUpdate: onUpdate
                            }, el.id, false, {
                                fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                                lineNumber: 332,
                                columnNumber: 15
                            }, this)),
                        draftEl && (draftEl.type === "rect" || draftEl.type === "frame") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"], {
                            x: draftEl.x,
                            y: draftEl.y,
                            width: draftEl.width,
                            height: draftEl.height,
                            stroke: draftEl.type === "frame" ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.4)",
                            strokeWidth: 1,
                            dash: [
                                4,
                                3
                            ],
                            fill: "rgba(255,255,255,0.02)",
                            listening: false
                        }, void 0, false, {
                            fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                            lineNumber: 345,
                            columnNumber: 15
                        }, this),
                        penPoints.length >= 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                            points: penPoints,
                            stroke: "rgba(255,255,255,0.5)",
                            strokeWidth: 1.5,
                            lineCap: "round",
                            lineJoin: "round",
                            listening: false
                        }, void 0, false, {
                            fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                            lineNumber: 360,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Transformer"], {
                            ref: trRef,
                            rotateEnabled: false,
                            borderStroke: "rgba(139,92,246,0.6)",
                            borderStrokeWidth: 1,
                            anchorFill: "#7c3aed",
                            anchorStroke: "rgba(139,92,246,0.8)",
                            anchorSize: 6,
                            anchorCornerRadius: 2,
                            onTransformEnd: (e)=>{
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
                                        height: Math.max(4, node.height() * scaleY)
                                    });
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                            lineNumber: 371,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                    lineNumber: 329,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                lineNumber: 319,
                columnNumber: 9
            }, this),
            elements.filter((el)=>el.type === "note" && el.expanded).map((el)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AnnotationBubble, {
                    el: el,
                    onUpdate: onUpdate
                }, `bubble-${el.id}`, false, {
                    fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                    lineNumber: 403,
                    columnNumber: 13
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
        lineNumber: 281,
        columnNumber: 7
    }, this);
}, "9+8fKUc6GfYydNzZXldYrKQgOR8=")), "9+8fKUc6GfYydNzZXldYrKQgOR8=");
_c1 = DesignerCanvasInner;
const __TURBOPACK__default__export__ = DesignerCanvasInner;
function CanvasShape({ el, activeTool, onSelect, onUpdate }) {
    const isSelectable = activeTool === "select";
    const selectProps = isSelectable ? {
        onClick: ()=>onSelect(el.id),
        onDragEnd: (e)=>{
            onUpdate(el.id, {
                x: e.target.x(),
                y: e.target.y()
            });
        },
        draggable: true
    } : {};
    const agentStroke = el.createdBy === "agent" ? "#EF9F27" : "rgba(255,255,255,0.25)";
    switch(el.type){
        case "frame":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
                id: el.id,
                x: el.x,
                y: el.y,
                ...selectProps,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"], {
                        width: el.width,
                        height: el.height,
                        stroke: agentStroke,
                        strokeWidth: 1,
                        fill: "rgba(0,0,0,0.15)",
                        cornerRadius: 2
                    }, void 0, false, {
                        fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                        lineNumber: 446,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        text: (el.name ?? "Frame") + (el.createdBy === "agent" ? " · agent" : ""),
                        x: 4,
                        y: -16,
                        fontSize: 10,
                        fill: el.createdBy === "agent" ? "#EF9F27" : "rgba(255,255,255,0.4)",
                        fontFamily: "SF Mono, Fira Code, monospace"
                    }, void 0, false, {
                        fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                        lineNumber: 455,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                lineNumber: 445,
                columnNumber: 9
            }, this);
        case "rect":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"], {
                id: el.id,
                x: el.x,
                y: el.y,
                width: el.width,
                height: el.height,
                stroke: agentStroke,
                strokeWidth: 1,
                fill: el.fill ?? "rgba(255,255,255,0.05)",
                cornerRadius: 2,
                ...selectProps
            }, void 0, false, {
                fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                lineNumber: 468,
                columnNumber: 9
            }, this);
        case "text":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                id: el.id,
                x: el.x,
                y: el.y,
                width: el.width,
                text: el.content ?? "Text",
                fontSize: 13,
                fill: el.createdBy === "agent" ? "#EF9F27" : "rgba(255,255,255,0.75)",
                fontFamily: "SF Mono, Fira Code, monospace",
                ...selectProps
            }, void 0, false, {
                fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                lineNumber: 484,
                columnNumber: 9
            }, this);
        case "arrow":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Arrow"], {
                id: el.id,
                x: el.x,
                y: el.y,
                points: el.points ?? [
                    0,
                    0,
                    60,
                    0
                ],
                stroke: agentStroke,
                strokeWidth: 1.5,
                fill: agentStroke,
                pointerLength: 8,
                pointerWidth: 6,
                ...selectProps
            }, void 0, false, {
                fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                lineNumber: 499,
                columnNumber: 9
            }, this);
        case "pen":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                id: el.id,
                points: el.points ?? [],
                stroke: agentStroke,
                strokeWidth: 1.5,
                lineCap: "round",
                lineJoin: "round",
                tension: 0.4,
                ...selectProps
            }, void 0, false, {
                fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                lineNumber: 515,
                columnNumber: 9
            }, this);
        case "note":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
                id: el.id,
                x: el.x,
                y: el.y,
                onClick: ()=>{
                    if (isSelectable) onSelect(el.id);
                    // Toggle annotation expansion
                    onUpdate(el.id, {
                        expanded: !el.expanded
                    });
                },
                draggable: isSelectable,
                onDragEnd: (e)=>onUpdate(el.id, {
                        x: e.target.x(),
                        y: e.target.y()
                    }),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Circle"], {
                        radius: 10,
                        fill: "#EF9F27",
                        opacity: 0.85
                    }, void 0, false, {
                        fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                        lineNumber: 541,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        text: String(el.annotationNumber ?? "?"),
                        x: -5,
                        y: -6,
                        fontSize: 10,
                        fill: "#000",
                        fontStyle: "bold",
                        fontFamily: "SF Mono, Fira Code, monospace"
                    }, void 0, false, {
                        fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                        lineNumber: 542,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                lineNumber: 529,
                columnNumber: 9
            }, this);
        default:
            return null;
    }
}
_c2 = CanvasShape;
function AnnotationBubble({ el, onUpdate }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute pointer-events-auto z-10",
        style: {
            left: el.x + 16,
            top: el.y - 8
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-56 rounded-xl border border-amber-500/30 bg-[#111113] shadow-2xl px-3 py-2.5 space-y-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[9px] font-bold uppercase tracking-widest text-amber-400/70",
                            children: [
                                el.agentName ?? "Agent",
                                " · suggestion"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                            lineNumber: 574,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[9px] text-amber-400/50 font-mono",
                            children: [
                                "#",
                                el.annotationNumber
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                            lineNumber: 577,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                    lineNumber: 573,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[11px] text-white/60 leading-relaxed",
                    children: el.content
                }, void 0, false, {
                    fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                    lineNumber: 579,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 pt-0.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "text-[9px] font-bold uppercase tracking-widest text-amber-400/60 hover:text-amber-400 transition-colors",
                            onClick: ()=>onUpdate(el.id, {
                                    expanded: false
                                }),
                            children: "apply"
                        }, void 0, false, {
                            fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                            lineNumber: 581,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "text-[9px] font-bold uppercase tracking-widest text-white/30 hover:text-white/50 transition-colors",
                            onClick: ()=>onUpdate(el.id, {
                                    expanded: false
                                }),
                            children: "dismiss"
                        }, void 0, false, {
                            fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                            lineNumber: 588,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
                    lineNumber: 580,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
            lineNumber: 572,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/designer/DesignerCanvasInner.tsx",
        lineNumber: 568,
        columnNumber: 5
    }, this);
}
_c3 = AnnotationBubble;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "DesignerCanvasInner$forwardRef");
__turbopack_context__.k.register(_c1, "DesignerCanvasInner");
__turbopack_context__.k.register(_c2, "CanvasShape");
__turbopack_context__.k.register(_c3, "AnnotationBubble");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/designer/DesignerCanvasInner.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/designer/DesignerCanvasInner.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_designer_DesignerCanvasInner_tsx_cd593651._.js.map