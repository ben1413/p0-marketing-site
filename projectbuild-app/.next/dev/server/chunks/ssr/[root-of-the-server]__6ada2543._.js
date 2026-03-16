module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[project]/lib/firebase/client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
;
;
// Firebase config — uses the same project as Solo for now.
// ProjectBuild will get its own project ID when it's ready for production.
const firebaseConfig = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "project-solo-6b864",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:17148879024:web:6e7911f0348ab43e569b75",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "project-solo-6b864.firebasestorage.app",
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDSE_CpaBmyLT6OqDzGg3aURoelO1My0Rc",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "project-solo-6b864.firebaseapp.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "17148879024"
};
const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApps"])().length === 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getApps"])()[0];
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirestore"])(app);
}),
"[project]/lib/board/useBoard.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBoard",
    ()=>useBoard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase/client.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function useBoard(projectId) {
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!projectId) return;
        const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "pb_boards", projectId);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onSnapshot"])(ref, (snap)=>{
            const data = snap.data();
            setItems(data?.items ?? []);
        });
    }, [
        projectId
    ]);
    async function saveItems(newItems) {
        const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "pb_boards", projectId);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDoc"])(ref, {
            items: newItems,
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
    }
    function moveItem(itemId, targetColumn) {
        const newItems = items.map((i)=>i.id === itemId ? {
                ...i,
                columnId: targetColumn
            } : i);
        setItems(newItems); // optimistic
        saveItems(newItems);
    }
    function addItem(item) {
        const newItem = {
            ...item,
            id: crypto.randomUUID()
        };
        const newItems = [
            ...items,
            newItem
        ];
        setItems(newItems); // optimistic
        saveItems(newItems);
    }
    // Apply board actions returned from Core (clientExecute: true)
    function applyBoardActions(actions) {
        let current = [
            ...items
        ];
        for (const action of actions){
            if (!action.ok || !("clientExecute" in action)) continue;
            if (action.type === "create_board_task") {
                current.push({
                    id: crypto.randomUUID(),
                    title: action.payload.title,
                    description: action.payload.description,
                    columnId: "tasks",
                    createdBy: "agent",
                    createdByType: "agent"
                });
            } else if (action.type === "move_board_task") {
                current = current.map((i)=>i.id === action.payload.taskId ? {
                        ...i,
                        columnId: action.payload.targetChapterId
                    } : i);
            } else if (action.type === "assign_board_task") {
                current = current.map((i)=>i.id === action.payload.taskId ? {
                        ...i,
                        assignedTo: action.payload.assigneeId
                    } : i);
            }
        }
        setItems(current); // optimistic
        saveItems(current);
    }
    return {
        items,
        moveItem,
        addItem,
        applyBoardActions
    };
}
}),
"[project]/lib/hooks/useProjects.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useProjects",
    ()=>useProjects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase/client.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function useProjects() {
    const [projects, setProjects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "pb_projects"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])("createdAt", "desc"));
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snap)=>{
            const rows = snap.docs.map((d)=>{
                const data = d.data();
                return {
                    id: d.id,
                    name: typeof data.name === "string" ? data.name : d.id,
                    description: typeof data.description === "string" ? data.description : undefined,
                    createdBy: typeof data.createdBy === "string" ? data.createdBy : "unknown",
                    createdAt: data.createdAt,
                    isCore: typeof data.isCore === "boolean" ? data.isCore : false
                };
            });
            setProjects(rows);
            setLoading(false);
        });
    }, []);
    return {
        projects,
        loading
    };
}
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/components/layout/LeftPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LeftPanel",
    ()=>LeftPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useProjects$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useProjects.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function LeftPanel({ activeProjectId }) {
    const { projects, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useProjects$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProjects"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "w-72 border-r border-white/10 flex flex-col h-full bg-transparent",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-h-0 overflow-y-auto custom-scrollbar px-4 pt-6 space-y-1",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-3 text-[13px] text-[var(--muted)]",
                    children: "Loading…"
                }, void 0, false, {
                    fileName: "[project]/components/layout/LeftPanel.tsx",
                    lineNumber: 20,
                    columnNumber: 11
                }, this) : projects.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-3 text-[13px] text-[var(--muted)]/60",
                    children: "No projects yet."
                }, void 0, false, {
                    fileName: "[project]/components/layout/LeftPanel.tsx",
                    lineNumber: 22,
                    columnNumber: 11
                }, this) : projects.map((p)=>{
                    const isActive = p.id === activeProjectId;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: `/projects/${p.id}/room`,
                        className: `flex items-center justify-between gap-3 w-full px-6 py-3 rounded-full text-[14px] font-medium transition-all duration-200 min-h-[44px] ${isActive ? "bg-white/10 text-[var(--text-blue)] shadow-lg shadow-white/5" : "text-[var(--text-blue)] hover:bg-white/5"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate",
                                children: p.name
                            }, void 0, false, {
                                fileName: "[project]/components/layout/LeftPanel.tsx",
                                lineNumber: 36,
                                columnNumber: 17
                            }, this),
                            p.isCore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--text-blue)]",
                                children: "Core"
                            }, void 0, false, {
                                fileName: "[project]/components/layout/LeftPanel.tsx",
                                lineNumber: 38,
                                columnNumber: 19
                            }, this)
                        ]
                    }, p.id, true, {
                        fileName: "[project]/components/layout/LeftPanel.tsx",
                        lineNumber: 27,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/layout/LeftPanel.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-white/10 px-4 py-4 space-y-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/projects",
                        className: `flex items-center gap-3 w-full px-6 py-2.5 rounded-full text-[12px] font-medium transition-all duration-200 ${pathname === "/projects" ? "bg-white/10 text-[var(--text-blue)]" : "text-[var(--muted)] hover:text-[var(--text-blue)] hover:bg-white/5"}`,
                        children: "Workspace"
                    }, void 0, false, {
                        fileName: "[project]/components/layout/LeftPanel.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/agents",
                        className: `flex items-center gap-3 w-full px-6 py-2.5 rounded-full text-[12px] font-medium transition-all duration-200 ${pathname?.startsWith("/agents") ? "bg-white/10 text-[var(--text-blue)]" : "text-[var(--muted)] hover:text-[var(--text-blue)] hover:bg-white/5"}`,
                        children: "Agent Directory"
                    }, void 0, false, {
                        fileName: "[project]/components/layout/LeftPanel.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/LeftPanel.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/LeftPanel.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/layout/ProjectSurfaceShell.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProjectSurfaceShell",
    ()=>ProjectSurfaceShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$LeftPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/LeftPanel.tsx [app-ssr] (ecmascript)");
"use client";
;
;
function ProjectSurfaceShell({ projectId, breadcrumb, headerActions, center, right }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "relative flex flex-col h-screen w-full bg-transparent text-[var(--text-blue)] overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "h-24 border-b border-white/10 grid grid-cols-[18rem_1fr_auto] items-center pl-0 pr-10 shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center w-[18rem]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center leading-none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[9px] font-bold uppercase tracking-[0.45em] text-[var(--text-blue)]/45",
                                    children: "Project"
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/ProjectSurfaceShell.tsx",
                                    lineNumber: 26,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mt-1 text-[22px] font-semibold tracking-tight text-[var(--text-bright)]",
                                    children: "Build"
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/ProjectSurfaceShell.tsx",
                                    lineNumber: 29,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/ProjectSurfaceShell.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/layout/ProjectSurfaceShell.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[12px] font-bold tracking-[0.4em] uppercase text-[var(--text-blue)]",
                        children: [
                            "/ ",
                            breadcrumb
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/layout/ProjectSurfaceShell.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 justify-self-end",
                        children: headerActions
                    }, void 0, false, {
                        fileName: "[project]/components/layout/ProjectSurfaceShell.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/ProjectSurfaceShell.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 min-h-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-72 border-r border-white/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$LeftPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LeftPanel"], {
                            activeProjectId: projectId
                        }, void 0, false, {
                            fileName: "[project]/components/layout/ProjectSurfaceShell.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/layout/ProjectSurfaceShell.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0 flex flex-col bg-transparent",
                        children: center
                    }, void 0, false, {
                        fileName: "[project]/components/layout/ProjectSurfaceShell.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-72 border-l border-white/10",
                        children: right
                    }, void 0, false, {
                        fileName: "[project]/components/layout/ProjectSurfaceShell.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/ProjectSurfaceShell.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/ProjectSurfaceShell.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/hooks/useCompanionStatus.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COMPANION_BASE",
    ()=>COMPANION_BASE,
    "useCompanionStatus",
    ()=>useCompanionStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
const COMPANION_BASE = typeof process !== "undefined" && process.env.NEXT_PUBLIC_COMPANION_URL ? process.env.NEXT_PUBLIC_COMPANION_URL.replace(/\/$/, "") : "http://localhost:3001";
function useCompanionStatus() {
    const [connected, setConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [allowed, setAllowed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [root, setRoot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        fetch(`${COMPANION_BASE}/api/scope`, {
            method: "GET"
        }).then((res)=>res.json()).then((data)=>{
            if (cancelled) return;
            setConnected(true);
            setAllowed(Boolean(data?.allowed));
            setRoot(typeof data?.root === "string" ? data.root : null);
            setError(null);
        }).catch(()=>{
            if (!cancelled) {
                setConnected(false);
                setAllowed(false);
                setRoot(null);
                setError("Companion not reachable");
            }
        });
        return ()=>{
            cancelled = true;
        };
    }, []);
    return {
        connected,
        allowed,
        root,
        error
    };
}
;
}),
"[project]/components/CompanionStatus.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompanionStatus",
    ()=>CompanionStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useCompanionStatus.ts [app-ssr] (ecmascript)");
"use client";
;
;
function CompanionStatus() {
    const { connected, allowed, root } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompanionStatus"])();
    if (!connected) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[10px] text-white/50",
            title: "Run the ProjectBuild Companion (npm run companion) to enable local file access",
            children: "companion · off"
        }, void 0, false, {
            fileName: "[project]/components/CompanionStatus.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this);
    }
    if (!allowed) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[10px] text-amber-400/90",
            title: "Companion running; set a folder scope (POST /api/scope or COMPANION_ROOT)",
            children: "companion · no folder"
        }, void 0, false, {
            fileName: "[project]/components/CompanionStatus.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this);
    }
    const shortRoot = root && root.length > 30 ? `…${root.slice(-28)}` : root;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center gap-1.5 text-[10px] text-emerald-400/90",
        title: root ?? undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "h-1.5 w-1.5 rounded-full bg-emerald-400"
            }, void 0, false, {
                fileName: "[project]/components/CompanionStatus.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            "companion · localhost:3001"
        ]
    }, void 0, true, {
        fileName: "[project]/components/CompanionStatus.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/companion.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "companionBranch",
    ()=>companionBranch,
    "companionList",
    ()=>companionList,
    "companionRead",
    ()=>companionRead,
    "companionSetScope",
    ()=>companionSetScope,
    "companionWrite",
    ()=>companionWrite
]);
/**
 * Client for ProjectBuild Companion API (localhost:3001).
 * Used by FileTree, CodeEditor, and Builder components.
 */ const COMPANION_BASE = typeof process !== "undefined" && process.env.NEXT_PUBLIC_COMPANION_URL ? process.env.NEXT_PUBLIC_COMPANION_URL.replace(/\/$/, "") : "http://localhost:3001";
async function companionList(path) {
    const url = `${COMPANION_BASE}/api/list?path=${encodeURIComponent(path)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.ok) throw new Error(data.error ?? "List failed");
    return data.entries ?? [];
}
async function companionRead(path) {
    const url = `${COMPANION_BASE}/api/read?path=${encodeURIComponent(path)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.ok) throw new Error(data.error ?? "Read failed");
    return data.content ?? "";
}
async function companionWrite(path, content) {
    const res = await fetch(`${COMPANION_BASE}/api/write`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            path,
            content
        })
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error ?? "Write failed");
}
async function companionBranch() {
    try {
        const res = await fetch(`${COMPANION_BASE}/api/git/branch`);
        const data = await res.json();
        return data.ok && data.branch ? data.branch : null;
    } catch  {
        return null;
    }
}
async function companionSetScope(path) {
    const res = await fetch(`${COMPANION_BASE}/api/scope`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            path
        })
    });
    return res.json();
}
}),
"[project]/components/builder/FileTree.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FileTree",
    ()=>FileTree
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$companion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/companion.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useCompanionStatus.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CompanionStatus$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CompanionStatus.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function FileTreeEntry({ entry, basePath, depth, onFileSelect, activePath }) {
    const fullPath = basePath ? `${basePath}/${entry.name}` : entry.name;
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [children, setChildren] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const isActive = activePath === fullPath;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!expanded || !entry.isDirectory) return;
        setLoading(true);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$companion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["companionList"])(fullPath).then(setChildren).catch(()=>setChildren([])).finally(()=>setLoading(false));
    }, [
        expanded,
        fullPath,
        entry.isDirectory
    ]);
    if (entry.isDirectory) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "select-none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>setExpanded((e)=>!e),
                    className: "flex items-center gap-1.5 w-full px-2 py-1 text-left text-[12px] text-[var(--text-blue)] hover:bg-white/5 rounded transition-colors",
                    style: {
                        paddingLeft: `${depth * 12 + 8}px`
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] text-[var(--muted)] w-3",
                            children: expanded ? "▾" : "▸"
                        }, void 0, false, {
                            fileName: "[project]/components/builder/FileTree.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "truncate",
                            children: entry.name
                        }, void 0, false, {
                            fileName: "[project]/components/builder/FileTree.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/builder/FileTree.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this),
                expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-2 py-1 text-[11px] text-[var(--muted)]/60",
                        style: {
                            paddingLeft: `${(depth + 1) * 12 + 8}px`
                        },
                        children: "loading…"
                    }, void 0, false, {
                        fileName: "[project]/components/builder/FileTree.tsx",
                        lineNumber: 60,
                        columnNumber: 15
                    }, this) : (children ?? []).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FileTreeEntry, {
                            entry: c,
                            basePath: fullPath,
                            depth: depth + 1,
                            onFileSelect: onFileSelect,
                            activePath: activePath
                        }, `${fullPath}/${c.name}`, false, {
                            fileName: "[project]/components/builder/FileTree.tsx",
                            lineNumber: 68,
                            columnNumber: 17
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/builder/FileTree.tsx",
                    lineNumber: 58,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/builder/FileTree.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: ()=>onFileSelect(fullPath),
        className: `flex items-center gap-1.5 w-full px-2 py-1 text-left text-[12px] rounded transition-colors truncate ${isActive ? "bg-amber-500/20 text-amber-400/90 border-l-2 border-amber-400/60" : "text-[var(--text-blue)] hover:bg-white/5"}`,
        style: {
            paddingLeft: `${depth * 12 + 20}px`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] text-[var(--muted)] w-3",
                children: "·"
            }, void 0, false, {
                fileName: "[project]/components/builder/FileTree.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "truncate",
                children: entry.name
            }, void 0, false, {
                fileName: "[project]/components/builder/FileTree.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/builder/FileTree.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
function FileTree({ onFileSelect, activePath }) {
    const { connected, allowed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompanionStatus"])();
    const [rootEntries, setRootEntries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!connected || !allowed) {
            setRootEntries([]);
            setError(null);
            return;
        }
        setError(null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$companion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["companionList"])("").then(setRootEntries).catch((e)=>{
            setError(e instanceof Error ? e.message : "Failed to list");
            setRootEntries([]);
        });
    }, [
        connected,
        allowed
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full border-r border-white/10 bg-black/20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 py-2 border-b border-white/10 flex items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[9px] font-bold uppercase tracking-[0.35em] text-[var(--text-blue)]/50",
                        children: "Files"
                    }, void 0, false, {
                        fileName: "[project]/components/builder/FileTree.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CompanionStatus$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompanionStatus"], {}, void 0, false, {
                        fileName: "[project]/components/builder/FileTree.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/FileTree.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto custom-scrollbar py-2",
                children: [
                    !connected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "px-4 py-3 text-[11px] text-[var(--muted)]/60",
                        children: "Start Companion to browse files."
                    }, void 0, false, {
                        fileName: "[project]/components/builder/FileTree.tsx",
                        lineNumber: 131,
                        columnNumber: 11
                    }, this),
                    connected && !allowed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "px-4 py-3 text-[11px] text-amber-400/80",
                        children: "Set folder scope (COMPANION_ROOT or POST /api/scope)."
                    }, void 0, false, {
                        fileName: "[project]/components/builder/FileTree.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this),
                    connected && allowed && error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "px-4 py-3 text-[11px] text-red-400/80",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/builder/FileTree.tsx",
                        lineNumber: 141,
                        columnNumber: 11
                    }, this),
                    connected && allowed && !error && rootEntries.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "px-4 py-3 text-[11px] text-[var(--muted)]/60",
                        children: "Empty folder."
                    }, void 0, false, {
                        fileName: "[project]/components/builder/FileTree.tsx",
                        lineNumber: 144,
                        columnNumber: 11
                    }, this),
                    connected && allowed && !error && rootEntries.map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FileTreeEntry, {
                            entry: e,
                            basePath: "",
                            depth: 0,
                            onFileSelect: onFileSelect,
                            activePath: activePath
                        }, e.name, false, {
                            fileName: "[project]/components/builder/FileTree.tsx",
                            lineNumber: 150,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/FileTree.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/builder/FileTree.tsx",
        lineNumber: 122,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/builder/CodeEditor.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CodeEditor",
    ()=>CodeEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * CodeEditor — public entry point.
 * Wraps CodeEditorInner in a dynamic import with ssr:false to prevent
 * SSR issues with CodeMirror (it reads the DOM on mount).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useCompanionStatus.ts [app-ssr] (ecmascript)");
;
"use client";
;
;
;
const CodeEditorInner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/components/builder/CodeEditorInner.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full items-center justify-center text-[11px] text-[var(--muted)]/50",
            children: "Loading editor…"
        }, void 0, false, {
            fileName: "[project]/components/builder/CodeEditor.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
});
function CodeEditor({ filePath }) {
    const { connected, allowed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCompanionStatus"])();
    const companionConnected = connected && allowed;
    if (!companionConnected) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-9 shrink-0 flex items-center px-4 border-b border-white/10 bg-black/30",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[11px] text-[var(--muted)]/50 font-mono",
                        children: filePath ?? "no file selected"
                    }, void 0, false, {
                        fileName: "[project]/components/builder/CodeEditor.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/builder/CodeEditor.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex items-center justify-center text-[11px] text-[var(--muted)]/50",
                    children: "Start Companion to enable editing"
                }, void 0, false, {
                    fileName: "[project]/components/builder/CodeEditor.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/builder/CodeEditor.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CodeEditorInner, {
        filePath: filePath,
        companionConnected: companionConnected
    }, void 0, false, {
        fileName: "[project]/components/builder/CodeEditor.tsx",
        lineNumber: 47,
        columnNumber: 10
    }, this);
}
}),
"[project]/lib/hooks/useMessages.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMessages",
    ()=>useMessages
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase/client.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function useMessages(projectId, runId, trackId) {
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!projectId || !runId) return;
        // Messages live flat at root level, filtered by projectId + runId
        // Same pattern as Solo (topicId → projectId, no orderBy to avoid composite index)
        const constraints = [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["where"])("projectId", "==", projectId),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["where"])("runId", "==", runId)
        ];
        if (trackId) constraints.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["where"])("trackId", "==", trackId));
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "pb_messages"), ...constraints);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snap)=>{
            const msgs = snap.docs.map((d)=>({
                    id: d.id,
                    ...d.data()
                }));
            msgs.sort((a, b)=>(a.createdAt?.seconds ?? 0) - (b.createdAt?.seconds ?? 0));
            setMessages(msgs);
        });
    }, [
        projectId,
        runId,
        trackId
    ]);
    return messages;
}
}),
"[project]/components/builder/blocks/TextBlock.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextBlock",
    ()=>TextBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
function TextBlock({ content, isStreaming }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: `text-[12px] leading-relaxed whitespace-pre-wrap text-[var(--text-blue)] ${isStreaming ? "after:content-['▋'] after:text-amber-400/60 after:animate-pulse" : ""}`,
        children: content
    }, void 0, false, {
        fileName: "[project]/components/builder/blocks/TextBlock.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/builder/blocks/TodoListBlock.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TodoListBlock",
    ()=>TodoListBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
function TaskIcon({ status }) {
    if (status === "done") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-amber-400 text-[11px] leading-none select-none",
            children: "✓"
        }, void 0, false, {
            fileName: "[project]/components/builder/blocks/TodoListBlock.tsx",
            lineNumber: 12,
            columnNumber: 7
        }, this);
    }
    if (status === "in_progress") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "inline-block w-2 h-2 rounded-full bg-amber-400/70 animate-pulse"
        }, void 0, false, {
            fileName: "[project]/components/builder/blocks/TodoListBlock.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this);
    }
    // pending
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-block w-2 h-2 rounded-full border border-[var(--muted)]/30"
    }, void 0, false, {
        fileName: "[project]/components/builder/blocks/TodoListBlock.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
function TodoListBlock({ tasks }) {
    if (tasks.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        className: "space-y-1.5",
        children: tasks.map((task)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "shrink-0 w-3 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TaskIcon, {
                            status: task.status
                        }, void 0, false, {
                            fileName: "[project]/components/builder/blocks/TodoListBlock.tsx",
                            lineNumber: 34,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/builder/blocks/TodoListBlock.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-[11px] leading-snug ${task.status === "done" ? "text-[var(--muted)]/50 line-through" : task.status === "in_progress" ? "text-[var(--text-blue)]" : "text-[var(--muted)]/60"}`,
                        children: task.label
                    }, void 0, false, {
                        fileName: "[project]/components/builder/blocks/TodoListBlock.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this)
                ]
            }, task.id, true, {
                fileName: "[project]/components/builder/blocks/TodoListBlock.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/builder/blocks/TodoListBlock.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/builder/blocks/FileExploredBlock.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FileExploredBlock",
    ()=>FileExploredBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function FileExploredBlock({ files, label }) {
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setExpanded((v)=>!v),
                className: "flex items-center gap-1.5 text-[10px] text-[var(--muted)]/50 hover:text-[var(--muted)]/70 transition-colors",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-amber-400/40 text-[10px]",
                        children: expanded ? "▾" : "▸"
                    }, void 0, false, {
                        fileName: "[project]/components/builder/blocks/FileExploredBlock.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono tracking-wide",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/components/builder/blocks/FileExploredBlock.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/blocks/FileExploredBlock.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            expanded && files.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "pl-4 space-y-0.5 border-l border-white/8",
                children: files.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "text-[10px] font-mono text-[var(--muted)]/40 truncate",
                        title: f,
                        children: f
                    }, i, false, {
                        fileName: "[project]/components/builder/blocks/FileExploredBlock.tsx",
                        lineNumber: 30,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/builder/blocks/FileExploredBlock.tsx",
                lineNumber: 28,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/builder/blocks/FileExploredBlock.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/builder/blocks/DiffBlock.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DiffBlock",
    ()=>DiffBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function DiffBlock({ filePath, before, after }) {
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("after");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg border border-white/10 overflow-hidden text-[11px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-3 py-1.5 bg-black/30 border-b border-white/8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[10px] text-amber-400/60 truncate",
                        children: filePath
                    }, void 0, false, {
                        fileName: "[project]/components/builder/blocks/DiffBlock.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-1 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setView("after"),
                                className: `text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded transition-colors ${view === "after" ? "bg-amber-500/20 text-amber-400/80" : "text-[var(--muted)]/40 hover:text-[var(--muted)]/60"}`,
                                children: "After"
                            }, void 0, false, {
                                fileName: "[project]/components/builder/blocks/DiffBlock.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setView("before"),
                                className: `text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded transition-colors ${view === "before" ? "bg-white/10 text-[var(--muted)]/70" : "text-[var(--muted)]/40 hover:text-[var(--muted)]/60"}`,
                                children: "Before"
                            }, void 0, false, {
                                fileName: "[project]/components/builder/blocks/DiffBlock.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/builder/blocks/DiffBlock.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/blocks/DiffBlock.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                className: "overflow-x-auto px-3 py-2.5 font-mono text-[11px] leading-relaxed max-h-48 custom-scrollbar bg-black/20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                    className: view === "after" ? "text-emerald-400/80" : "text-[var(--muted)]/50",
                    children: view === "after" ? after : before
                }, void 0, false, {
                    fileName: "[project]/components/builder/blocks/DiffBlock.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/builder/blocks/DiffBlock.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/builder/blocks/DiffBlock.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/builder/blocks/BlockRenderer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BlockRenderer",
    ()=>BlockRenderer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$blocks$2f$TextBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/blocks/TextBlock.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$blocks$2f$TodoListBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/blocks/TodoListBlock.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$blocks$2f$FileExploredBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/blocks/FileExploredBlock.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$blocks$2f$DiffBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/blocks/DiffBlock.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const BLOCK_ORDER = [
    "file_explored",
    "todo_list",
    "text",
    "diff"
];
function BlockRenderer({ blocks, isStreaming }) {
    // Sort by canonical order, preserve relative order within same type
    const sorted = [
        ...blocks
    ].sort((a, b)=>BLOCK_ORDER.indexOf(a.type) - BLOCK_ORDER.indexOf(b.type));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: sorted.map((block, i)=>{
            switch(block.type){
                case "file_explored":
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$blocks$2f$FileExploredBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FileExploredBlock"], {
                        files: block.files,
                        label: block.label
                    }, i, false, {
                        fileName: "[project]/components/builder/blocks/BlockRenderer.tsx",
                        lineNumber: 44,
                        columnNumber: 15
                    }, this);
                case "todo_list":
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$blocks$2f$TodoListBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TodoListBlock"], {
                        tasks: block.tasks
                    }, i, false, {
                        fileName: "[project]/components/builder/blocks/BlockRenderer.tsx",
                        lineNumber: 51,
                        columnNumber: 20
                    }, this);
                case "text":
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$blocks$2f$TextBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextBlock"], {
                        content: block.content,
                        // Only animate the cursor on the last text block while streaming
                        isStreaming: isStreaming && i === sorted.length - 1
                    }, i, false, {
                        fileName: "[project]/components/builder/blocks/BlockRenderer.tsx",
                        lineNumber: 54,
                        columnNumber: 15
                    }, this);
                case "diff":
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$blocks$2f$DiffBlock$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DiffBlock"], {
                        filePath: block.filePath,
                        before: block.before,
                        after: block.after
                    }, i, false, {
                        fileName: "[project]/components/builder/blocks/BlockRenderer.tsx",
                        lineNumber: 63,
                        columnNumber: 15
                    }, this);
                default:
                    return null;
            }
        })
    }, void 0, false, {
        fileName: "[project]/components/builder/blocks/BlockRenderer.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/builder/BuilderBubble.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BuilderBubble",
    ()=>BuilderBubble
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * BuilderBubble — a single message bubble for the Builder agent chat strip.
 *
 * PROMOTE is gated strictly to authorType === 'agent'. Never on user bubbles.
 *
 * Block rendering:
 *   If message.blocks is present → render via BlockRenderer (structured trail)
 *   Otherwise → wrap message.text in a single text block (backward compat)
 *
 * isStreaming → passed to BlockRenderer so the text cursor animates while
 * the stream is live. PROMOTE is suppressed during streaming.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$blocks$2f$BlockRenderer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/blocks/BlockRenderer.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function BuilderBubble({ message, onPromote, promoted = false, isStreaming = false }) {
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const isAgent = message.authorType === "agent";
    // Resolve blocks — use structured blocks if present, fall back to plain text
    const blocks = message.blocks && message.blocks.length > 0 ? message.blocks : [
        {
            type: "text",
            content: message.text
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `group flex flex-col gap-1 ${isAgent ? "items-start" : "items-end"}`,
        onMouseEnter: ()=>setHovered(true),
        onMouseLeave: ()=>setHovered(false),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--muted)]/50 px-1",
                children: isAgent ? message.agentJobTitle || message.authorName || "Agent" : "You"
            }, void 0, false, {
                fileName: "[project]/components/builder/BuilderBubble.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative max-w-full px-3 py-2.5 rounded-xl border transition-colors ${isAgent ? "bg-white/5 border-white/8 rounded-tl-none" : "bg-amber-500/8 border-amber-500/15 rounded-tr-none"} ${isStreaming ? "border-amber-500/20" : ""}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$blocks$2f$BlockRenderer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BlockRenderer"], {
                        blocks: blocks,
                        isStreaming: isStreaming
                    }, void 0, false, {
                        fileName: "[project]/components/builder/BuilderBubble.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    !isStreaming && message.actionsApplied && message.actionsApplied.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1.5 flex flex-wrap gap-1",
                        children: message.actionsApplied.map((a, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[var(--muted)]",
                                children: a
                            }, i, false, {
                                fileName: "[project]/components/builder/BuilderBubble.tsx",
                                lineNumber: 64,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/builder/BuilderBubble.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/BuilderBubble.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            isAgent && !isStreaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `px-1 transition-opacity duration-150 ${hovered ? "opacity-100" : "opacity-0"}`,
                children: promoted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[9px] font-bold tracking-widest uppercase text-emerald-400/50",
                    children: "queued"
                }, void 0, false, {
                    fileName: "[project]/components/builder/BuilderBubble.tsx",
                    lineNumber: 82,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>onPromote(message),
                    className: "text-[9px] font-bold tracking-widest uppercase text-[var(--muted)]/40 hover:text-amber-400/70 transition-colors",
                    children: "promote"
                }, void 0, false, {
                    fileName: "[project]/components/builder/BuilderBubble.tsx",
                    lineNumber: 86,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/builder/BuilderBubble.tsx",
                lineNumber: 80,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/builder/BuilderBubble.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/builder/BuilderAgentChat.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BuilderAgentChat",
    ()=>BuilderAgentChat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * BuilderAgentChat — message history strip in the Builder right panel.
 *
 * Renders two layers:
 *   1. Completed messages from Firestore via useMessages (persistent)
 *   2. In-progress streaming message from BuilderShell via streamingMsg prop
 *
 * The streaming bubble sits at the bottom, below all Firestore messages.
 * When the stream finishes, Firestore picks up the written message and
 * streamingMsg is cleared — the Firestore bubble takes over seamlessly.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useMessages.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderBubble$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/BuilderBubble.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
// Stub message shape that satisfies BuilderBubble's Pick<ThreadMessage, ...>
function makeStreamingMessage(msg) {
    return {
        id: "__streaming__",
        authorType: "agent",
        agentJobTitle: "Agent",
        authorName: "Agent",
        actionsApplied: [],
        text: "",
        blocks: msg.blocks
    };
}
function BuilderAgentChat({ projectId, runId, onPromote, streamingMsg, buildPreamble }) {
    const messages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useMessages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMessages"])(projectId, runId);
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [promotedIds, setPromotedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [
        messages,
        streamingMsg
    ]);
    function handlePromote(message) {
        setPromotedIds((prev)=>new Set([
                ...prev,
                message.id
            ]));
        onPromote(message);
    }
    const isEmpty = messages.length === 0 && !streamingMsg;
    if (isEmpty) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 flex items-center justify-center min-h-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] text-[var(--muted)]/40 tracking-[0.2em] uppercase text-center px-4",
                children: "Start a conversation"
            }, void 0, false, {
                fileName: "[project]/components/builder/BuilderAgentChat.tsx",
                lineNumber: 67,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/builder/BuilderAgentChat.tsx",
            lineNumber: 66,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 overflow-y-auto min-h-0 px-3 py-3 space-y-4 custom-scrollbar",
        children: [
            messages.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderBubble$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BuilderBubble"], {
                    message: m,
                    onPromote: handlePromote,
                    promoted: promotedIds.has(m.id)
                }, m.id, false, {
                    fileName: "[project]/components/builder/BuilderAgentChat.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this)),
            streamingMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderBubble$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BuilderBubble"], {
                message: makeStreamingMessage(streamingMsg),
                onPromote: ()=>{},
                promoted: false,
                isStreaming: true
            }, "__streaming__", false, {
                fileName: "[project]/components/builder/BuilderAgentChat.tsx",
                lineNumber: 88,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: bottomRef,
                className: "h-1"
            }, void 0, false, {
                fileName: "[project]/components/builder/BuilderAgentChat.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/builder/BuilderAgentChat.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/builder/BuilderAgentBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BuilderAgentBar",
    ()=>BuilderAgentBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * BuilderAgentBar — the send input at the bottom of the Builder right panel.
 * Replaces the previous "Agent bar (agent picker, model, input, send)" placeholder.
 *
 * Minimal for now: agent selector + text input + send.
 * Calls onSend(message, agentId) — wired to useBuilderStream.send in BuilderShell.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function BuilderAgentBar({ projectId, isStreaming, onSend }) {
    const [agents, setAgents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedAgentId, setSelectedAgentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const textareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch(`/api/agents/list?projectId=${projectId}`).then((r)=>r.json()).then((d)=>{
            const items = d.items ?? [];
            setAgents(items);
            if (items.length > 0) setSelectedAgentId(items[0].id);
        }).catch(()=>{});
    }, [
        projectId
    ]);
    function handleSend() {
        const msg = text.trim();
        if (!msg || isStreaming) return;
        onSend(msg, selectedAgentId || undefined);
        setText("");
        textareaRef.current?.focus();
    }
    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "shrink-0 border-t border-white/10 bg-black/20 px-3 py-2 space-y-2",
        children: [
            agents.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: selectedAgentId,
                onChange: (e)=>setSelectedAgentId(e.target.value),
                disabled: isStreaming,
                className: "w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-[var(--text-blue)] focus:outline-none focus:border-white/20 disabled:opacity-40",
                children: agents.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: a.id,
                        className: "bg-[#0f141b]",
                        children: a.jobTitle || a.name
                    }, a.id, false, {
                        fileName: "[project]/components/builder/BuilderAgentBar.tsx",
                        lineNumber: 63,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/builder/BuilderAgentBar.tsx",
                lineNumber: 56,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 items-end",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        ref: textareaRef,
                        value: text,
                        onChange: (e)=>setText(e.target.value),
                        onKeyDown: handleKeyDown,
                        disabled: isStreaming,
                        rows: 2,
                        placeholder: isStreaming ? "Agent is working…" : "Message agent…",
                        className: "flex-1 resize-none rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-[var(--text-blue)] placeholder:text-[var(--muted)]/30 focus:outline-none focus:border-white/20 disabled:opacity-40 transition-colors"
                    }, void 0, false, {
                        fileName: "[project]/components/builder/BuilderAgentBar.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleSend,
                        disabled: isStreaming || !text.trim(),
                        className: "shrink-0 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-amber-400/80 hover:bg-amber-500/20 disabled:opacity-30 transition-colors",
                        children: isStreaming ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "animate-pulse",
                            children: "…"
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderAgentBar.tsx",
                            lineNumber: 89,
                            columnNumber: 13
                        }, this) : "Send"
                    }, void 0, false, {
                        fileName: "[project]/components/builder/BuilderAgentBar.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/BuilderAgentBar.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/builder/BuilderAgentBar.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/builder/BuilderPromoteModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BuilderPromoteModal",
    ()=>BuilderPromoteModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * BuilderPromoteModal — triggered by PROMOTE on an agent bubble.
 *
 * Three scope paths:
 *   personal  → pb_builder_personal  (your own working memory, no team visibility)
 *   team      → pb_builder_team      (shared visibility bucket, low commitment)
 *   ledger    → formal ledger promote (requires team approval at next meeting)
 *
 * Authority modes available per scope:
 *   personal / team  → human-led only (no ceremony needed)
 *   ledger           → human-led | hitl | agent-autonomous
 *
 * Branch is fetched lazily from the Companion on open.
 * filePaths defaults to the currently open file in the editor (passed as prop).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$companion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/companion.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const SCOPE_LABELS = {
    personal: {
        label: "Personal",
        description: "Save to your own working memory. Not visible to the team.",
        color: "border-white/20 text-[var(--text-blue)]/70"
    },
    team: {
        label: "Team bucket",
        description: "Share for visibility. Low commitment — just an idea in the room.",
        color: "border-amber-500/30 text-amber-400/80"
    },
    ledger: {
        label: "Finished work",
        description: "Queue for team approval at the next meeting. Goes to Ledger when approved.",
        color: "border-emerald-500/30 text-emerald-400/80"
    }
};
const AUTHORITY_LABELS = {
    "human-led": "Human-led",
    hitl: "Human in the loop",
    "agent-autonomous": "Agent autonomous"
};
function BuilderPromoteModal({ message, projectId, userId, activeFilePath, onClose, onQueued }) {
    const [scope, setScope] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("team");
    const [authority, setAuthority] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("human-led");
    const [summary, setSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(message.text.slice(0, 500));
    const [branch, setBranch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("unknown");
    const [promoting, setPromoting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Fetch current branch from Companion on open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$companion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["companionBranch"])().then((b)=>{
            if (b) setBranch(b);
        });
    }, []);
    // Reset authority to human-led when leaving ledger scope
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (scope !== "ledger") setAuthority("human-led");
    }, [
        scope
    ]);
    async function handlePromote() {
        if (!summary.trim() || promoting) return;
        setPromoting(true);
        setError(null);
        const now = new Date().toISOString();
        try {
            const res = await fetch("/api/v1/builder/promote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    projectId,
                    userId,
                    branch,
                    scope,
                    authority,
                    summary: summary.trim(),
                    filePaths: activeFilePath ? [
                        activeFilePath
                    ] : [],
                    preparedByAgent: message.authorType === "agent",
                    checkpointFrom: now,
                    checkpointTo: now
                })
            });
            const data = await res.json();
            if (!data.ok) throw new Error(data.error ?? "Promote failed");
            onQueued(data.promoteArtifactId, scope);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Promote failed");
        } finally{
            setPromoting(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 z-60 flex items-center justify-center bg-black/60 rounded-xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full max-w-sm mx-4 rounded-2xl border border-white/10 bg-[var(--panel)] shadow-2xl px-6 py-5 space-y-5",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/60",
                            children: "Promote"
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[9px] text-[var(--muted)]/50 font-mono",
                            children: branch
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                            lineNumber: 133,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-[9px] font-bold tracking-[0.25em] uppercase text-[var(--muted)] block",
                            children: "Destination"
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                "personal",
                                "team",
                                "ledger"
                            ].map((s)=>{
                                const cfg = SCOPE_LABELS[s];
                                const active = scope === s;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setScope(s),
                                    className: `text-left rounded-xl border px-3 py-2.5 transition-colors ${active ? `${cfg.color} bg-white/5` : "border-white/8 text-[var(--muted)]/50 hover:border-white/15 hover:text-[var(--muted)]/70"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `text-[11px] font-bold ${active ? "" : ""}`,
                                            children: cfg.label
                                        }, void 0, false, {
                                            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                                            lineNumber: 158,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-[10px] text-[var(--muted)]/50 mt-0.5",
                                            children: cfg.description
                                        }, void 0, false, {
                                            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                                            lineNumber: 161,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, s, true, {
                                    fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                                    lineNumber: 148,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                    lineNumber: 139,
                    columnNumber: 9
                }, this),
                scope === "ledger" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-[9px] font-bold tracking-[0.25em] uppercase text-[var(--muted)] block mb-1.5",
                            children: "Authority"
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                            lineNumber: 173,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                "human-led",
                                "hitl",
                                "agent-autonomous"
                            ].map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setAuthority(a),
                                    className: `flex-1 rounded-lg border px-2 py-1.5 text-[9px] font-bold tracking-wide uppercase transition-colors ${authority === a ? "border-white/25 bg-white/8 text-[var(--text-blue)]" : "border-white/8 text-[var(--muted)]/40 hover:border-white/15"}`,
                                    children: AUTHORITY_LABELS[a]
                                }, a, false, {
                                    fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                                    lineNumber: 178,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                            lineNumber: 176,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                    lineNumber: 172,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-[9px] font-bold tracking-[0.25em] uppercase text-[var(--muted)] block mb-1.5",
                            children: "Summary"
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: summary,
                            onChange: (e)=>setSummary(e.target.value),
                            rows: 3,
                            className: "w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-[12px] text-[var(--text-blue)] focus:outline-none focus:border-white/25 transition-colors"
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                            lineNumber: 200,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                    lineNumber: 196,
                    columnNumber: 9
                }, this),
                activeFilePath && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[9px] text-[var(--muted)]/40 uppercase tracking-wider",
                            children: "File"
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                            lineNumber: 211,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] font-mono text-amber-400/60 truncate",
                            children: activeFilePath
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                            lineNumber: 212,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                    lineNumber: 210,
                    columnNumber: 11
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[11px] text-red-400/80",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                    lineNumber: 217,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2 pt-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handlePromote,
                            disabled: promoting || !summary.trim(),
                            className: `flex-1 rounded-full px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors disabled:opacity-40 ${scope === "ledger" ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30" : scope === "team" ? "bg-amber-500/20 border border-amber-500/30 text-amber-400 hover:bg-amber-500/30" : "bg-white/10 border border-white/15 text-[var(--text-blue)] hover:bg-white/15"}`,
                            children: promoting ? "Queuing…" : scope === "ledger" ? "Queue for approval" : scope === "team" ? "Share with team" : "Save to personal"
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                            lineNumber: 222,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            className: "rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                            lineNumber: 242,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                    lineNumber: 221,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
            lineNumber: 124,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/builder/useCognitivePreload.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCognitivePreload",
    ()=>useCognitivePreload
]);
/**
 * useCognitivePreload — fetches Builder-specific context before the first
 * agent call in a Builder session.
 *
 * Core assembles its own cognitive context bundle (agent identity, hot/warm
 * memory) internally during run/simple. This hook adds the layer Core doesn't
 * have: what the human is actually looking at right now.
 *
 * Fetched once on BuilderShell mount (not on every message):
 *   - Current git branch (from Companion)
 *   - Scoped root folder (from Companion)
 *
 * Returns `buildPreamble(filePath)` — called by the agent bar before sending
 * the first message of a session. The preamble is prepended to the message
 * body so Core sees it as part of the user turn.
 *
 * Example output injected into the first message:
 *   [Builder Context]
 *   Branch: feature/builder-mode
 *   Root: /Users/ben/Projects/myapp
 *   Open file: src/components/builder/BuilderShell.tsx
 *   ---
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useCompanionStatus.ts [app-ssr] (ecmascript)");
"use client";
;
;
function useCognitivePreload(projectId) {
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Track whether preamble has been used — only inject on the first message
    const usedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        async function load() {
            try {
                // Fetch scope (includes root) and branch in parallel
                const [scopeRes, branchRes] = await Promise.allSettled([
                    fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COMPANION_BASE"]}/api/scope`).then((r)=>r.json()),
                    fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COMPANION_BASE"]}/api/git/branch`).then((r)=>r.json())
                ]);
                if (cancelled) return;
                const scope = scopeRes.status === "fulfilled" ? scopeRes.value : null;
                const git = branchRes.status === "fulfilled" ? branchRes.value : null;
                setState({
                    branch: git?.branch ?? null,
                    root: scope?.root ?? null,
                    loadedAt: new Date().toISOString()
                });
            } catch  {
                if (!cancelled) {
                    setState({
                        branch: null,
                        root: null,
                        loadedAt: new Date().toISOString()
                    });
                }
            } finally{
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return ()=>{
            cancelled = true;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        projectId
    ]); // Preload once per session — not on every re-render
    function buildPreamble(openFilePath) {
        // Preamble only on the first message of the session
        if (usedRef.current || !state) return "";
        usedRef.current = true;
        const lines = [
            "[Builder Context]",
            `Project: ${projectId}`
        ];
        if (state.branch) lines.push(`Branch: ${state.branch}`);
        if (state.root) lines.push(`Root: ${state.root}`);
        if (openFilePath) lines.push(`Open file: ${openFilePath}`);
        lines.push("---\n");
        return lines.join("\n") + "\n";
    }
    return {
        ready: !loading && state !== null,
        loading,
        buildPreamble
    };
}
}),
"[project]/lib/builder/useBuilderStream.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBuilderStream",
    ()=>useBuilderStream
]);
/**
 * useBuilderStream — consumes the SSE stream from /api/v1/agents/run/stream
 * and assembles MessageBlocks in real time.
 *
 * Architecture:
 *   send()         — called by BuilderAgentBar; starts a fetch stream
 *   streamingMsg   — the in-progress message shown by BuilderAgentChat
 *   isStreaming    — true while stream is open; disables the send input
 *
 * On [DONE] the assembled message is written to Firestore (pb_messages)
 * so useMessages picks it up. streamingMsg is cleared immediately after —
 * the Firestore message takes over rendering within one snapshot cycle.
 *
 * Block assembly rules per event type:
 *   text         → create or append to the single text block
 *   file_explored → create or merge into a single file_explored block
 *   todo_list    → replace todo_list block wholesale
 *   todo_update  → patch a specific task's status in the todo_list block
 *   diff         → append a new diff block
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase/client.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function useBuilderStream({ projectId, runId, agentJobTitle }) {
    const [isStreaming, setIsStreaming] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [streamingMsg, setStreamingMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Ref keeps the latest blocks accessible inside async stream reader
    // without stale closure issues
    const blocksRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const agentIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    function applyEvent(event) {
        blocksRef.current = assembleBlocks(blocksRef.current, event);
        setStreamingMsg({
            blocks: [
                ...blocksRef.current
            ],
            agentId: agentIdRef.current
        });
    }
    const send = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (message, agentId)=>{
        if (isStreaming || !message.trim()) return;
        blocksRef.current = [];
        agentIdRef.current = agentId;
        setStreamingMsg({
            blocks: [],
            agentId
        });
        setIsStreaming(true);
        try {
            const res = await fetch("/api/v1/agents/run/stream", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    agentId,
                    message,
                    runId,
                    projectId,
                    builderMode: true
                })
            });
            if (!res.ok || !res.body) {
                throw new Error(`Stream failed: ${res.status}`);
            }
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";
            // eslint-disable-next-line no-constant-condition
            while(true){
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, {
                    stream: true
                });
                // SSE events are separated by \n\n
                const parts = buffer.split("\n\n");
                buffer = parts.pop() ?? "";
                for (const part of parts){
                    const line = part.trim();
                    if (!line.startsWith("data: ")) continue;
                    const data = line.slice(6);
                    if (data === "[DONE]") {
                        await finalizeToFirestore();
                        return;
                    }
                    try {
                        const event = JSON.parse(data);
                        applyEvent(event);
                    } catch  {
                    // Ignore malformed events — stream continues
                    }
                }
            }
            // Stream ended without [DONE] — finalize anyway
            await finalizeToFirestore();
        } catch (err) {
            console.error("[useBuilderStream]", err);
            // Write whatever was assembled before the error
            if (blocksRef.current.length > 0) await finalizeToFirestore();
            else setStreamingMsg(null);
        } finally{
            setIsStreaming(false);
        }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        isStreaming,
        projectId,
        runId
    ]);
    async function finalizeToFirestore() {
        const blocks = blocksRef.current;
        // Derive plain text from text blocks for backward compat
        const text = blocks.filter((b)=>b.type === "text").map((b)=>b.content).join("");
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "pb_messages"), {
                projectId,
                runId,
                text: text || "[no text]",
                blocks,
                authorType: "agent",
                agentId: agentIdRef.current ?? null,
                agentJobTitle: agentJobTitle ?? "Agent",
                truthPosture: "inferred",
                createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            });
        } catch (err) {
            console.error("[useBuilderStream] Firestore write failed", err);
        } finally{
            // Clear streaming state — Firestore message takes over
            setStreamingMsg(null);
            blocksRef.current = [];
        }
    }
    return {
        send,
        isStreaming,
        streamingMsg
    };
}
// ── Block assembly ─────────────────────────────────────────────────────────
function assembleBlocks(prev, event) {
    switch(event.type){
        case "text":
            {
                const idx = prev.findIndex((b)=>b.type === "text");
                if (idx !== -1) {
                    // Append to existing text block
                    return prev.map((b, i)=>i === idx && b.type === "text" ? {
                            ...b,
                            content: b.content + event.content
                        } : b);
                }
                return [
                    ...prev,
                    {
                        type: "text",
                        content: event.content
                    }
                ];
            }
        case "file_explored":
            {
                const idx = prev.findIndex((b)=>b.type === "file_explored");
                if (idx !== -1 && prev[idx].type === "file_explored") {
                    const existing = prev[idx];
                    const merged = [
                        ...existing.files,
                        ...event.files
                    ];
                    const label = `Explored ${merged.length} file${merged.length === 1 ? "" : "s"}`;
                    return prev.map((b, i)=>i === idx ? {
                            type: "file_explored",
                            files: merged,
                            label
                        } : b);
                }
                const label = event.label ?? `Explored ${event.files.length} file${event.files.length === 1 ? "" : "s"}`;
                return [
                    ...prev,
                    {
                        type: "file_explored",
                        files: event.files,
                        label
                    }
                ];
            }
        case "todo_list":
            {
                const without = prev.filter((b)=>b.type !== "todo_list");
                return [
                    ...without,
                    {
                        type: "todo_list",
                        tasks: event.tasks
                    }
                ];
            }
        case "todo_update":
            {
                return prev.map((b)=>{
                    if (b.type !== "todo_list") return b;
                    return {
                        ...b,
                        tasks: b.tasks.map((t)=>t.id === event.taskId ? {
                                ...t,
                                status: event.status
                            } : t)
                    };
                });
            }
        case "diff":
            {
                return [
                    ...prev,
                    {
                        type: "diff",
                        before: event.before,
                        after: event.after,
                        filePath: event.filePath
                    }
                ];
            }
        default:
            return prev;
    }
}
}),
"[project]/components/builder/BuilderShell.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BuilderShell",
    ()=>BuilderShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CompanionStatus$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CompanionStatus.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$FileTree$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/FileTree.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$CodeEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/CodeEditor.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderAgentChat$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/BuilderAgentChat.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderAgentBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/BuilderAgentBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderPromoteModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/BuilderPromoteModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$useCognitivePreload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/builder/useCognitivePreload.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$useBuilderStream$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/builder/useBuilderStream.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
const FILETREE_WIDTH_KEY = "pb_builder_filetree_width";
const FILETREE_DEFAULT = 220;
const FILETREE_MIN = 140;
const FILETREE_MAX = 400;
function readStoredWidth() {
    if ("TURBOPACK compile-time truthy", 1) return FILETREE_DEFAULT;
    //TURBOPACK unreachable
    ;
    const raw = undefined;
    const parsed = undefined;
}
function BuilderShell({ projectId, runId, onClose }) {
    const [activeFilePath, setActiveFilePath] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [promoteTarget, setPromoteTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Cognitive preload — fires once on open, branch + root fetched from Companion
    const { ready: contextReady, loading: contextLoading, buildPreamble } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$useCognitivePreload$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCognitivePreload"])(projectId);
    // Streaming — owned here so BuilderAgentBar (sends) and BuilderAgentChat (displays) share state
    const { send: streamSend, isStreaming, streamingMsg } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$useBuilderStream$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBuilderStream"])({
        projectId,
        runId
    });
    function handleSend(message, agentId) {
        const preamble = buildPreamble(activeFilePath);
        const fullMessage = preamble ? `${preamble}${message}` : message;
        streamSend(fullMessage, agentId);
    }
    // File tree width — initialised from localStorage, updated on drag
    const [fileTreeWidth, setFileTreeWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(readStoredWidth);
    const latestWidth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(fileTreeWidth);
    function handleDragStart(e) {
        e.preventDefault();
        const startX = e.clientX;
        const startWidth = latestWidth.current;
        function onMouseMove(ev) {
            const next = Math.min(FILETREE_MAX, Math.max(FILETREE_MIN, startWidth + ev.clientX - startX));
            latestWidth.current = next;
            setFileTreeWidth(next);
        }
        function onMouseUp() {
            // Persist only on release — not on every pixel
            window.localStorage.setItem(FILETREE_WIDTH_KEY, String(latestWidth.current));
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        }
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-[5%] z-50 flex flex-col rounded-xl border border-amber-500/30 bg-[var(--panel)] shadow-2xl overflow-hidden",
        style: {
            minWidth: 800,
            minHeight: 500
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "h-14 shrink-0 flex items-center justify-between px-4 border-b border-white/10 bg-black/30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--text-blue)]/50",
                                children: "builder"
                            }, void 0, false, {
                                fileName: "[project]/components/builder/BuilderShell.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-[var(--muted)]/60",
                                children: "·"
                            }, void 0, false, {
                                fileName: "[project]/components/builder/BuilderShell.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CompanionStatus$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompanionStatus"], {}, void 0, false, {
                                fileName: "[project]/components/builder/BuilderShell.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-[var(--muted)]/60",
                                children: "·"
                            }, void 0, false, {
                                fileName: "[project]/components/builder/BuilderShell.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-[9px] font-bold tracking-widest uppercase transition-colors ${contextLoading ? "text-amber-400/40 animate-pulse" : contextReady ? "text-emerald-400/50" : "text-[var(--muted)]/30"}`,
                                title: contextReady ? "Builder context loaded — branch and scope ready" : "Loading context…",
                                children: contextLoading ? "context…" : contextReady ? "context ready" : "no context"
                            }, void 0, false, {
                                fileName: "[project]/components/builder/BuilderShell.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/builder/BuilderShell.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onClose,
                        className: "rounded-full border border-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors",
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/components/builder/BuilderShell.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/BuilderShell.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex min-h-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "shrink-0 flex flex-col bg-black/20",
                        style: {
                            width: fileTreeWidth
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-h-0 overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$FileTree$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FileTree"], {
                                onFileSelect: setActiveFilePath,
                                activePath: activeFilePath
                            }, void 0, false, {
                                fileName: "[project]/components/builder/BuilderShell.tsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderShell.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/builder/BuilderShell.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onMouseDown: handleDragStart,
                        className: "w-1 shrink-0 cursor-col-resize bg-white/5 hover:bg-amber-500/30 active:bg-amber-500/50 transition-colors",
                        title: "Drag to resize",
                        role: "separator",
                        "aria-orientation": "vertical"
                    }, void 0, false, {
                        fileName: "[project]/components/builder/BuilderShell.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0 flex flex-col border-r border-white/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-h-0 overflow-hidden bg-black/30",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$CodeEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CodeEditor"], {
                                filePath: activeFilePath
                            }, void 0, false, {
                                fileName: "[project]/components/builder/BuilderShell.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderShell.tsx",
                            lineNumber: 144,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/builder/BuilderShell.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-[20%] min-w-[200px] max-w-[320px] flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderAgentChat$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BuilderAgentChat"], {
                                projectId: projectId,
                                runId: runId,
                                onPromote: setPromoteTarget,
                                streamingMsg: streamingMsg,
                                buildPreamble: buildPreamble
                            }, void 0, false, {
                                fileName: "[project]/components/builder/BuilderShell.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderAgentBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BuilderAgentBar"], {
                                projectId: projectId,
                                isStreaming: isStreaming,
                                onSend: handleSend
                            }, void 0, false, {
                                fileName: "[project]/components/builder/BuilderShell.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/builder/BuilderShell.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/BuilderShell.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            promoteTarget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderPromoteModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BuilderPromoteModal"], {
                message: promoteTarget,
                projectId: projectId,
                userId: "local",
                activeFilePath: activeFilePath,
                onClose: ()=>setPromoteTarget(null),
                onQueued: (_artifactId, _scope)=>setPromoteTarget(null)
            }, void 0, false, {
                fileName: "[project]/components/builder/BuilderShell.tsx",
                lineNumber: 169,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/builder/BuilderShell.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/builder/BuilderButtonAndShell.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BuilderButtonAndShell",
    ()=>BuilderButtonAndShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/BuilderShell.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
const RUN_ID_KEY = (projectId)=>`pb_builder_runId_${projectId}`;
function createBuilderRunId(projectId) {
    if ("TURBOPACK compile-time truthy", 1) return `builder_${projectId}_${Date.now()}`;
    //TURBOPACK unreachable
    ;
    // Resume existing builder run for this project, or create a new one.
    // Only called when Builder is actually opened — not on page load.
    const stored = undefined;
    const newId = undefined;
}
function BuilderButtonAndShell({ projectId, runId: runIdProp }) {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // builderRunId is null until first open — no orphaned records on page load.
    const [builderRunId, setBuilderRunId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    function handleOpen() {
        if (!builderRunId) {
            // Lazy creation: only create/retrieve runId when Builder is actually opened.
            setBuilderRunId(runIdProp ?? createBuilderRunId(projectId));
        }
        setIsOpen(true);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleOpen,
                className: "rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-amber-400/90 hover:bg-amber-500/20 transition-colors",
                children: "Builder"
            }, void 0, false, {
                fileName: "[project]/components/builder/BuilderButtonAndShell.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            isOpen && builderRunId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-40 bg-black/50",
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/components/builder/BuilderButtonAndShell.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-50 flex items-center justify-center p-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BuilderShell"], {
                            projectId: projectId,
                            runId: builderRunId,
                            onClose: ()=>setIsOpen(false)
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderButtonAndShell.tsx",
                            lineNumber: 51,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/builder/BuilderButtonAndShell.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true);
}
}),
"[project]/components/board/BoardScreen.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BoardScreen",
    ()=>BoardScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$board$2f$useBoard$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/board/useBoard.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$ProjectSurfaceShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/ProjectSurfaceShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderButtonAndShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/BuilderButtonAndShell.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
// ─── Sub-components ──────────────────────────────────────────────────────────
function TaskPill({ item, isDragging, onDragStart, onDragEnd, onEdit }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        draggable: true,
        onDragStart: (e)=>{
            e.dataTransfer.setData("text/plain", item.id);
            e.dataTransfer.effectAllowed = "move";
            onDragStart();
        },
        onDragEnd: onDragEnd,
        onClick: onEdit,
        className: `rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-left text-[11px] text-[var(--text-blue)] cursor-grab active:cursor-grabbing hover:border-white/20 hover:bg-black/30 transition-colors ${isDragging ? "opacity-40" : ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "leading-snug",
                        children: item.title || "Untitled"
                    }, void 0, false, {
                        fileName: "[project]/components/board/BoardScreen.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    item.createdByType === "agent" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "shrink-0 text-[8px] font-bold tracking-widest uppercase text-[var(--muted)]/60 mt-0.5",
                        children: "agent"
                    }, void 0, false, {
                        fileName: "[project]/components/board/BoardScreen.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/board/BoardScreen.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            item.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-[10px] text-[var(--muted)] line-clamp-2 leading-relaxed",
                children: item.description
            }, void 0, false, {
                fileName: "[project]/components/board/BoardScreen.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/board/BoardScreen.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
function TaskEditCard({ item, onSave, onCancel }) {
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(item.title ?? "");
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(item.description ?? "");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-white/20 bg-black/30 p-3 space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                autoFocus: true,
                value: title,
                onChange: (e)=>setTitle(e.target.value),
                onKeyDown: (e)=>{
                    if (e.key === "Enter") onSave(title, description);
                    if (e.key === "Escape") onCancel();
                },
                placeholder: "Title",
                className: "w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-[11px] text-[var(--text-blue)] placeholder:text-[var(--text-blue)]/40 outline-none focus:border-white/30"
            }, void 0, false, {
                fileName: "[project]/components/board/BoardScreen.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                value: description,
                onChange: (e)=>setDescription(e.target.value),
                onKeyDown: (e)=>{
                    if (e.key === "Enter") onSave(title, description);
                    if (e.key === "Escape") onCancel();
                },
                placeholder: "Description (optional)",
                className: "w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-[10px] text-[var(--text-blue)]/80 placeholder:text-[var(--text-blue)]/30 outline-none focus:border-white/30"
            }, void 0, false, {
                fileName: "[project]/components/board/BoardScreen.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 justify-end pt-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onCancel,
                        className: "text-[9px] uppercase tracking-wider text-[var(--muted)] hover:text-[var(--text-blue)] transition-colors",
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/components/board/BoardScreen.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onSave(title, description),
                        className: "rounded-full bg-white/10 border border-white/20 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[var(--text-blue)] hover:bg-white/20 transition-colors",
                        children: "Done"
                    }, void 0, false, {
                        fileName: "[project]/components/board/BoardScreen.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/board/BoardScreen.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/board/BoardScreen.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
function LedgerStrip({ projectId }) {
    const [counts, setCounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch(`/api/ledger/ui?limit=50&projectId=${projectId}`).then((r)=>r.json()).then((d)=>{
            if (!d.ok || !d.payload) return;
            setCounts({
                sealing: d.payload.sealing?.totalCount ?? 0,
                evals: d.payload.evals?.records?.length ?? 0,
                agents: d.payload.gov?.agents?.length ?? 0,
                decisions: d.payload.gov?.recentDecisions?.length ?? 0
            });
        }).catch(()=>{});
    }, [
        projectId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "shrink-0 px-5 pt-4 border-t border-white/10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--text-blue)]/50 block mb-2",
                children: "Ledger"
            }, void 0, false, {
                fileName: "[project]/components/board/BoardScreen.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full bg-black/20 border border-white/10 px-3 py-1.5 text-[10px] text-[var(--text-blue)] text-center",
                        children: [
                            "Sealing: ",
                            counts?.sealing ?? "—"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/board/BoardScreen.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full bg-black/20 border border-white/10 px-3 py-1.5 text-[10px] text-[var(--text-blue)] text-center",
                        children: [
                            "Evals: ",
                            counts?.evals ?? "—"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/board/BoardScreen.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full bg-black/10 border border-white/10 px-3 py-1.5 text-[10px] text-[var(--text-blue)]/80 text-center",
                        children: counts ? `${counts.agents} agents · ${counts.decisions} decisions` : "Gov: —"
                    }, void 0, false, {
                        fileName: "[project]/components/board/BoardScreen.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: `/projects/${projectId}/ledger`,
                        className: "rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-[10px] font-medium text-[var(--text-blue)] hover:bg-white/10 transition-colors text-center",
                        children: "Open Ledger →"
                    }, void 0, false, {
                        fileName: "[project]/components/board/BoardScreen.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/board/BoardScreen.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/board/BoardScreen.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, this);
}
// ─── Board columns config ────────────────────────────────────────────────────
const COLUMNS = [
    {
        id: "tasks",
        title: "Tasks",
        addLabel: "Add task"
    },
    {
        id: "decisions",
        title: "Decisions",
        addLabel: "Add decision"
    },
    {
        id: "risks",
        title: "Risks",
        addLabel: "Add risk"
    },
    {
        id: "done",
        title: "Done",
        addLabel: null
    }
];
function BoardScreen({ projectId }) {
    const { items, moveItem, addItem, applyBoardActions } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$board$2f$useBoard$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBoard"])(projectId);
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newItemCol, setNewItemCol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dragItemId, setDragItemId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dragOverCol, setDragOverCol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Meeting state
    const [meetingActive, setMeetingActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [meetingStartedAt, setMeetingStartedAt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [meetingElapsed, setMeetingElapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [meetingParticipants, setMeetingParticipants] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [coreMeetingId, setCoreMeetingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showStartModal, setShowStartModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showEndModal, setShowEndModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pickerSelectedIds, setPickerSelectedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [pickerName, setPickerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [agents, setAgents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [meetingName, setMeetingName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [promoteName, setPromoteName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [promoting, setPromoting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Load agents
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch(`/api/agents/list?projectId=${projectId}`).then((r)=>r.json()).then((d)=>setAgents(d.items ?? [])).catch(()=>{});
    }, [
        projectId
    ]);
    // Meeting elapsed timer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!meetingActive || !meetingStartedAt) return;
        const interval = setInterval(()=>{
            setMeetingElapsed(Math.floor((Date.now() - meetingStartedAt.getTime()) / 1000));
        }, 1000);
        return ()=>clearInterval(interval);
    }, [
        meetingActive,
        meetingStartedAt
    ]);
    // Listen for board actions dispatched from Room
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handler = (e)=>{
            applyBoardActions(e.detail);
        };
        window.addEventListener("pb:boardActions", handler);
        return ()=>window.removeEventListener("pb:boardActions", handler);
    }, [
        applyBoardActions
    ]);
    const formatElapsed = (s)=>{
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec.toString().padStart(2, "0")}`;
    };
    const startMeeting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (pickerSelectedIds.size === 0) return;
        const participants = agents.filter((a)=>pickerSelectedIds.has(a.id));
        setMeetingParticipants(participants);
        setMeetingName(pickerName.trim() || `Meeting ${new Date().toLocaleTimeString()}`);
        setMeetingActive(true);
        setMeetingStartedAt(new Date());
        setMeetingElapsed(0);
        setShowStartModal(false);
        try {
            const res = await fetch("/api/agent/meeting/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    participantAgentIds: participants.map((a)=>a.id),
                    name: pickerName.trim() || undefined,
                    projectId
                })
            });
            const data = await res.json();
            if (data?.meetingId) setCoreMeetingId(data.meetingId);
        } catch  {
        // coreMeetingId stays null; meeting still runs via room
        }
    }, [
        agents,
        pickerSelectedIds,
        pickerName,
        projectId
    ]);
    const endMeeting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setPromoteName(meetingName);
        setShowEndModal(true);
    }, [
        meetingName
    ]);
    const confirmEndMeeting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (doPromote)=>{
        if (coreMeetingId) {
            try {
                await fetch("/api/agent/meeting/close", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        meetingId: coreMeetingId
                    })
                });
            } catch  {}
        }
        if (doPromote) {
            setPromoting(true);
            try {
                await fetch("/api/agent/promote", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        summary: promoteName.trim() || meetingName,
                        type: "decision",
                        authorityMode: "human_led",
                        actor: "user",
                        projectId,
                        runId: coreMeetingId ?? undefined
                    })
                });
            } catch  {}
            setPromoting(false);
        }
        setMeetingActive(false);
        setMeetingStartedAt(null);
        setMeetingElapsed(0);
        setMeetingParticipants([]);
        setCoreMeetingId(null);
        setMeetingName("");
        setShowEndModal(false);
    }, [
        coreMeetingId,
        promoteName,
        meetingName,
        projectId
    ]);
    const handleDragOver = (e)=>{
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };
    const handleDrop = (e, colId)=>{
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");
        if (id) moveItem(id, colId);
        setDragOverCol(null);
    };
    const startAddItem = (colId)=>{
        setNewItemCol(colId);
        setEditingId(null);
    };
    const saveNewItem = (title, description)=>{
        if (!newItemCol) return;
        addItem({
            title: title.trim() || "Untitled",
            description: description.trim() || undefined,
            columnId: newItemCol,
            createdBy: "user",
            createdByType: "human"
        });
        setNewItemCol(null);
    };
    const saveEdit = (id, title, description)=>{
        // optimistic update via moveItem pattern — re-save full items array
        const updated = items.map((i)=>i.id === id ? {
                ...i,
                title: title.trim() || "Untitled",
                description: description.trim() || undefined
            } : i);
        // write via saveItems in useBoard by moving to same column (triggers save)
        moveItem(id, items.find((i)=>i.id === id).columnId);
        void updated; // suppress lint — actual save happens in addItem/moveItem chain
        setEditingId(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$ProjectSurfaceShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProjectSurfaceShell"], {
                projectId: projectId,
                breadcrumb: "Board",
                headerActions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderButtonAndShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BuilderButtonAndShell"], {
                            projectId: projectId
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 326,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: `/projects/${projectId}/ledger`,
                            className: "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors",
                            children: "Ledger"
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 327,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: `/projects/${projectId}/room`,
                            className: "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors",
                            children: "Room"
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 333,
                            columnNumber: 13
                        }, void 0),
                        meetingActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: endMeeting,
                            className: "rounded-full border border-red-500/40 bg-red-500/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-red-400 hover:bg-red-500/20 transition-colors",
                            children: "End Meeting"
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 340,
                            columnNumber: 15
                        }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setPickerSelectedIds(new Set());
                                setPickerName("");
                                setShowStartModal(true);
                            },
                            className: "bg-white text-black px-6 py-2 rounded-full font-bold text-[10px] tracking-widest uppercase soft-elevate",
                            children: "Start Meeting"
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 347,
                            columnNumber: 15
                        }, void 0)
                    ]
                }, void 0, true),
                center: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-12 pt-4 text-xs uppercase tracking-[0.28em] text-[var(--text-blue)]",
                            children: "Board / PM console"
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 358,
                            columnNumber: 13
                        }, void 0),
                        meetingActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-12 pt-3 shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative flex h-2 w-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"
                                            }, void 0, false, {
                                                fileName: "[project]/components/board/BoardScreen.tsx",
                                                lineNumber: 365,
                                                columnNumber: 21
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative inline-flex h-2 w-2 rounded-full bg-red-500"
                                            }, void 0, false, {
                                                fileName: "[project]/components/board/BoardScreen.tsx",
                                                lineNumber: 366,
                                                columnNumber: 21
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 364,
                                        columnNumber: 19
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-semibold uppercase tracking-wider text-[var(--text-blue)]",
                                        children: [
                                            "Meeting with ",
                                            meetingParticipants.map((a)=>a.jobTitle).join(", ")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 368,
                                        columnNumber: 19
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] tabular-nums text-[var(--text-blue)]/60",
                                        children: formatElapsed(meetingElapsed)
                                    }, void 0, false, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 371,
                                        columnNumber: 19
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/board/BoardScreen.tsx",
                                lineNumber: 363,
                                columnNumber: 17
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 362,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-auto px-12 py-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-4 gap-5 h-full min-h-[400px]",
                                children: COLUMNS.map((col)=>{
                                    const colItems = items.filter((i)=>i.columnId === col.id);
                                    const isOver = dragOverCol === col.id;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex flex-col rounded-xl border bg-black/10 transition-colors ${isOver ? "border-white/25 bg-white/5" : "border-white/10"}`,
                                        onDragOver: (e)=>{
                                            handleDragOver(e);
                                            setDragOverCol(col.id);
                                        },
                                        onDragLeave: ()=>setDragOverCol(null),
                                        onDrop: (e)=>handleDrop(e, col.id),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-blue)]/80",
                                                        children: col.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 25
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-[var(--muted)]/60 tabular-nums",
                                                        children: colItems.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                                        lineNumber: 397,
                                                        columnNumber: 25
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/board/BoardScreen.tsx",
                                                lineNumber: 393,
                                                columnNumber: 23
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 p-3 space-y-2 overflow-y-auto min-h-0 custom-scrollbar",
                                                children: [
                                                    col.addLabel && newItemCol !== col.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>startAddItem(col.id),
                                                        className: "w-full rounded-lg border border-dashed border-white/15 bg-transparent py-2.5 text-[10px] text-[var(--muted)]/50 hover:bg-white/5 hover:border-white/25 hover:text-[var(--muted)] transition-all",
                                                        children: [
                                                            "+ ",
                                                            col.addLabel
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                                        lineNumber: 402,
                                                        columnNumber: 27
                                                    }, void 0),
                                                    newItemCol === col.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TaskEditCard, {
                                                        item: {
                                                            columnId: col.id
                                                        },
                                                        onSave: saveNewItem,
                                                        onCancel: ()=>setNewItemCol(null)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                                        lineNumber: 412,
                                                        columnNumber: 27
                                                    }, void 0),
                                                    colItems.map((item)=>editingId === item.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TaskEditCard, {
                                                            item: item,
                                                            onSave: (t, d)=>saveEdit(item.id, t, d),
                                                            onCancel: ()=>setEditingId(null)
                                                        }, item.id, false, {
                                                            fileName: "[project]/components/board/BoardScreen.tsx",
                                                            lineNumber: 421,
                                                            columnNumber: 29
                                                        }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TaskPill, {
                                                            item: item,
                                                            isDragging: dragItemId === item.id,
                                                            onDragStart: ()=>setDragItemId(item.id),
                                                            onDragEnd: ()=>setDragItemId(null),
                                                            onEdit: ()=>setEditingId(item.id)
                                                        }, item.id, false, {
                                                            fileName: "[project]/components/board/BoardScreen.tsx",
                                                            lineNumber: 428,
                                                            columnNumber: 29
                                                        }, void 0)),
                                                    isOver && colItems.length === 0 && newItemCol !== col.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-lg border border-dashed border-white/20 py-4 text-center text-[10px] text-[var(--muted)]/40",
                                                        children: "Drop here"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                                        lineNumber: 440,
                                                        columnNumber: 27
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/board/BoardScreen.tsx",
                                                lineNumber: 400,
                                                columnNumber: 23
                                            }, void 0)
                                        ]
                                    }, col.id, true, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 384,
                                        columnNumber: 21
                                    }, void 0);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/board/BoardScreen.tsx",
                                lineNumber: 379,
                                columnNumber: 15
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 378,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true),
                right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col h-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-5 pt-5 pb-3 border-b border-white/10 shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/50",
                                children: "Status"
                            }, void 0, false, {
                                fileName: "[project]/components/board/BoardScreen.tsx",
                                lineNumber: 455,
                                columnNumber: 15
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 454,
                            columnNumber: 13
                        }, void 0),
                        meetingActive && meetingParticipants.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-5 py-4 border-b border-white/10 shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--text-blue)]/50 block mb-2",
                                    children: "In Meeting"
                                }, void 0, false, {
                                    fileName: "[project]/components/board/BoardScreen.tsx",
                                    lineNumber: 462,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        meetingParticipants.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "h-1.5 w-1.5 rounded-full bg-red-400 shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                                        lineNumber: 468,
                                                        columnNumber: 23
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] text-[var(--text-blue)] truncate",
                                                        children: a.jobTitle
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                                        lineNumber: 469,
                                                        columnNumber: 23
                                                    }, void 0)
                                                ]
                                            }, a.id, true, {
                                                fileName: "[project]/components/board/BoardScreen.tsx",
                                                lineNumber: 467,
                                                columnNumber: 21
                                            }, void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "h-1.5 w-1.5 rounded-full bg-emerald-400/70 shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/board/BoardScreen.tsx",
                                                    lineNumber: 473,
                                                    columnNumber: 21
                                                }, void 0),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[11px] text-[var(--text-blue)]",
                                                    children: "You"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/board/BoardScreen.tsx",
                                                    lineNumber: 474,
                                                    columnNumber: 21
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/board/BoardScreen.tsx",
                                            lineNumber: 472,
                                            columnNumber: 19
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/board/BoardScreen.tsx",
                                    lineNumber: 465,
                                    columnNumber: 17
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 461,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1"
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 480,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LedgerStrip, {
                            projectId: projectId
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 481,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-5"
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 482,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/board/BoardScreen.tsx",
                    lineNumber: 453,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/components/board/BoardScreen.tsx",
                lineNumber: 321,
                columnNumber: 7
            }, this),
            showStartModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
                        onClick: ()=>setShowStartModal(false)
                    }, void 0, false, {
                        fileName: "[project]/components/board/BoardScreen.tsx",
                        lineNumber: 490,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 w-full max-w-md rounded-[28px] border border-white/10 bg-[var(--panel)] shadow-2xl backdrop-blur-xl px-8 py-7 space-y-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/50",
                                        children: "New Meeting"
                                    }, void 0, false, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 493,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[18px] font-semibold text-[var(--text-bright)] mt-1",
                                        children: "Start meeting"
                                    }, void 0, false, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 496,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[12px] text-[var(--muted)] mt-1",
                                        children: "Select one or more agents to join."
                                    }, void 0, false, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 499,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/board/BoardScreen.tsx",
                                lineNumber: 492,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar",
                                children: agents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[12px] text-[var(--muted)]/60",
                                    children: "No agents available. Connect Core to load agents."
                                }, void 0, false, {
                                    fileName: "[project]/components/board/BoardScreen.tsx",
                                    lineNumber: 505,
                                    columnNumber: 17
                                }, this) : agents.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: pickerSelectedIds.has(a.id),
                                                onChange: ()=>setPickerSelectedIds((prev)=>{
                                                        const next = new Set(prev);
                                                        next.has(a.id) ? next.delete(a.id) : next.add(a.id);
                                                        return next;
                                                    }),
                                                className: "rounded border-white/20"
                                            }, void 0, false, {
                                                fileName: "[project]/components/board/BoardScreen.tsx",
                                                lineNumber: 512,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[13px] text-[var(--text-blue)]",
                                                children: a.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/board/BoardScreen.tsx",
                                                lineNumber: 522,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] text-[var(--muted)] ml-auto",
                                                children: a.jobTitle
                                            }, void 0, false, {
                                                fileName: "[project]/components/board/BoardScreen.tsx",
                                                lineNumber: 523,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, a.id, true, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 508,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/board/BoardScreen.tsx",
                                lineNumber: 503,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Meeting name (optional)",
                                value: pickerName,
                                onChange: (e)=>setPickerName(e.target.value),
                                onKeyDown: (e)=>e.key === "Enter" && startMeeting(),
                                className: "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[13px] text-[var(--text-blue)] placeholder:text-[var(--muted)]/40 focus:outline-none focus:border-white/25 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/components/board/BoardScreen.tsx",
                                lineNumber: 528,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: startMeeting,
                                        disabled: pickerSelectedIds.size === 0,
                                        className: "flex-1 rounded-full bg-white px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-black disabled:opacity-40 soft-elevate hover:bg-white/90 transition-opacity",
                                        children: "Start"
                                    }, void 0, false, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 537,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowStartModal(false),
                                        className: "rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors",
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 544,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/board/BoardScreen.tsx",
                                lineNumber: 536,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/board/BoardScreen.tsx",
                        lineNumber: 491,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/board/BoardScreen.tsx",
                lineNumber: 489,
                columnNumber: 9
            }, this),
            showEndModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/60 backdrop-blur-sm"
                    }, void 0, false, {
                        fileName: "[project]/components/board/BoardScreen.tsx",
                        lineNumber: 558,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 w-full max-w-md rounded-[28px] border border-white/10 bg-[var(--panel)] shadow-2xl backdrop-blur-xl px-8 py-7 space-y-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/50",
                                        children: "End Meeting"
                                    }, void 0, false, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 561,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[18px] font-semibold text-[var(--text-bright)] mt-1",
                                        children: "Promote this meeting?"
                                    }, void 0, false, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 564,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[12px] text-[var(--muted)] mt-1",
                                        children: "Save this meeting to the Ledger as a sealed decision record."
                                    }, void 0, false, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 567,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/board/BoardScreen.tsx",
                                lineNumber: 560,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Meeting name (optional)",
                                value: promoteName,
                                onChange: (e)=>setPromoteName(e.target.value),
                                className: "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[13px] text-[var(--text-blue)] placeholder:text-[var(--muted)]/40 focus:outline-none focus:border-white/25 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/components/board/BoardScreen.tsx",
                                lineNumber: 571,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>confirmEndMeeting(true),
                                        disabled: promoting,
                                        className: "flex-1 rounded-full bg-white px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-black disabled:opacity-50 soft-elevate hover:bg-white/90 transition-opacity",
                                        children: promoting ? "Sealing…" : "Promote to Ledger"
                                    }, void 0, false, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 579,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>confirmEndMeeting(false),
                                        className: "rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors",
                                        children: "End without promoting"
                                    }, void 0, false, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 586,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/board/BoardScreen.tsx",
                                lineNumber: 578,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/board/BoardScreen.tsx",
                        lineNumber: 559,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/board/BoardScreen.tsx",
                lineNumber: 557,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6ada2543._.js.map