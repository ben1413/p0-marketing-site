(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/builder/CodeEditorInner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CodeEditorInner",
    ()=>CodeEditorInner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * CodeEditorInner — the actual CodeMirror implementation.
 * Loaded via dynamic import with ssr:false to avoid SSR issues.
 * Never imported directly — always through CodeEditor.tsx.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$view$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@codemirror/view/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$codemirror$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/codemirror/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$javascript$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@codemirror/lang-javascript/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$css$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@codemirror/lang-css/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$json$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@codemirror/lang-json/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$theme$2d$one$2d$dark$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@codemirror/theme-one-dark/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$companion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/companion.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function getLanguageExtension(filePath) {
    if (!filePath) return [];
    if (filePath.endsWith(".ts") || filePath.endsWith(".tsx") || filePath.endsWith(".js") || filePath.endsWith(".jsx")) {
        return [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$javascript$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["javascript"])({
                typescript: filePath.endsWith(".ts") || filePath.endsWith(".tsx"),
                jsx: filePath.endsWith(".tsx") || filePath.endsWith(".jsx")
            })
        ];
    }
    if (filePath.endsWith(".css")) return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$css$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"])()
    ];
    if (filePath.endsWith(".json")) return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$json$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["json"])()
    ];
    return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$javascript$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["javascript"])()
    ];
}
function CodeEditorInner({ filePath, companionConnected }) {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const viewRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [saveState, setSaveState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const saveTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Mount editor once
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodeEditorInner.useEffect": ()=>{
            if (!containerRef.current) return;
            const view = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$view$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorView"]({
                parent: containerRef.current,
                extensions: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$codemirror$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["basicSetup"],
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$theme$2d$one$2d$dark$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["oneDark"],
                    ...filePath ? getLanguageExtension(filePath) : [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$lang$2d$javascript$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["javascript"])()
                    ],
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$view$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorView"].updateListener.of({
                        "CodeEditorInner.useEffect": (update)=>{
                            if (!update.docChanged || !filePath || !companionConnected) return;
                            // Debounced autosave on change
                            if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
                            setSaveState("saving");
                            saveTimerRef.current = setTimeout({
                                "CodeEditorInner.useEffect": async ()=>{
                                    try {
                                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$companion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["companionWrite"])(filePath, update.state.doc.toString());
                                        setSaveState("saved");
                                        setTimeout({
                                            "CodeEditorInner.useEffect": ()=>setSaveState("idle")
                                        }["CodeEditorInner.useEffect"], 1500);
                                    } catch  {
                                        setSaveState("error");
                                    }
                                }
                            }["CodeEditorInner.useEffect"], 800);
                        }
                    }["CodeEditorInner.useEffect"]),
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$codemirror$2f$view$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorView"].theme({
                        "&": {
                            height: "100%",
                            background: "transparent"
                        },
                        ".cm-scroller": {
                            overflow: "auto",
                            fontFamily: "'JetBrains Mono', 'Fira Mono', monospace",
                            fontSize: "12px"
                        },
                        ".cm-content": {
                            caretColor: "#f59e0b"
                        },
                        ".cm-focused": {
                            outline: "none"
                        },
                        ".cm-gutters": {
                            background: "rgba(0,0,0,0.3)",
                            borderRight: "1px solid rgba(255,255,255,0.06)"
                        }
                    })
                ]
            });
            viewRef.current = view;
            return ({
                "CodeEditorInner.useEffect": ()=>{
                    view.destroy();
                    viewRef.current = null;
                    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
                }
            })["CodeEditorInner.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["CodeEditorInner.useEffect"], []); // mount once — content loaded separately
    // Lazy file load — only fetches when filePath changes, not on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CodeEditorInner.useEffect": ()=>{
            if (!filePath || !companionConnected || !viewRef.current) return;
            setLoading(true);
            setError(null);
            setSaveState("idle");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$companion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["companionRead"])(filePath).then({
                "CodeEditorInner.useEffect": (content)=>{
                    const view = viewRef.current;
                    if (!view) return;
                    view.dispatch({
                        changes: {
                            from: 0,
                            to: view.state.doc.length,
                            insert: content
                        }
                    });
                    setLoading(false);
                }
            }["CodeEditorInner.useEffect"]).catch({
                "CodeEditorInner.useEffect": (e)=>{
                    setError(e instanceof Error ? e.message : "Failed to read file");
                    setLoading(false);
                }
            }["CodeEditorInner.useEffect"]);
        }
    }["CodeEditorInner.useEffect"], [
        filePath,
        companionConnected
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-9 shrink-0 flex items-center justify-between px-4 border-b border-white/10 bg-black/30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[11px] text-amber-400/80 truncate font-mono",
                        children: filePath ?? "no file selected"
                    }, void 0, false, {
                        fileName: "[project]/components/builder/CodeEditorInner.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-[10px] font-bold tracking-wider transition-colors ${saveState === "saving" ? "text-amber-400/60 animate-pulse" : saveState === "saved" ? "text-emerald-400/70" : saveState === "error" ? "text-red-400/70" : "text-transparent"}`,
                        children: saveState === "saving" ? "saving…" : saveState === "saved" ? "saved" : saveState === "error" ? "save failed" : "·"
                    }, void 0, false, {
                        fileName: "[project]/components/builder/CodeEditorInner.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/CodeEditorInner.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 relative min-h-0",
                children: [
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center z-10 bg-black/20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[11px] text-[var(--muted)] animate-pulse",
                            children: "loading…"
                        }, void 0, false, {
                            fileName: "[project]/components/builder/CodeEditorInner.tsx",
                            lineNumber: 124,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/builder/CodeEditorInner.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center z-10 bg-black/20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[11px] text-red-400/80",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/components/builder/CodeEditorInner.tsx",
                            lineNumber: 129,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/builder/CodeEditorInner.tsx",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this),
                    !filePath && !loading && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[11px] text-[var(--muted)]/50",
                            children: "Select a file to start editing"
                        }, void 0, false, {
                            fileName: "[project]/components/builder/CodeEditorInner.tsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/builder/CodeEditorInner.tsx",
                        lineNumber: 133,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: containerRef,
                        className: "h-full"
                    }, void 0, false, {
                        fileName: "[project]/components/builder/CodeEditorInner.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/CodeEditorInner.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/builder/CodeEditorInner.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_s(CodeEditorInner, "0wckpMzPRwFEMU2Km5BXmQd3GjA=");
_c = CodeEditorInner;
var _c;
__turbopack_context__.k.register(_c, "CodeEditorInner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/builder/CodeEditorInner.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/builder/CodeEditorInner.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_builder_CodeEditorInner_tsx_263f0aeb._.js.map