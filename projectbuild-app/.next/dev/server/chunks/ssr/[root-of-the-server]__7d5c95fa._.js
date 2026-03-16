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
"use client";
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
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    item.createdByType === "agent" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "shrink-0 text-[8px] font-bold tracking-widest uppercase text-[var(--muted)]/60 mt-0.5",
                        children: "agent"
                    }, void 0, false, {
                        fileName: "[project]/components/board/BoardScreen.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/board/BoardScreen.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            item.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-[10px] text-[var(--muted)] line-clamp-2 leading-relaxed",
                children: item.description
            }, void 0, false, {
                fileName: "[project]/components/board/BoardScreen.tsx",
                lineNumber: 47,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/board/BoardScreen.tsx",
        lineNumber: 25,
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
                lineNumber: 68,
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
                lineNumber: 76,
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
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onSave(title, description),
                        className: "rounded-full bg-white/10 border border-white/20 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[var(--text-blue)] hover:bg-white/20 transition-colors",
                        children: "Done"
                    }, void 0, false, {
                        fileName: "[project]/components/board/BoardScreen.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/board/BoardScreen.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/board/BoardScreen.tsx",
        lineNumber: 67,
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
                lineNumber: 119,
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
                        lineNumber: 123,
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
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full bg-black/10 border border-white/10 px-3 py-1.5 text-[10px] text-[var(--text-blue)]/80 text-center",
                        children: counts ? `${counts.agents} agents · ${counts.decisions} decisions` : "Gov: —"
                    }, void 0, false, {
                        fileName: "[project]/components/board/BoardScreen.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: `/projects/${projectId}/ledger`,
                        className: "rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-[10px] font-medium text-[var(--text-blue)] hover:bg-white/10 transition-colors text-center",
                        children: "Open Ledger →"
                    }, void 0, false, {
                        fileName: "[project]/components/board/BoardScreen.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/board/BoardScreen.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/board/BoardScreen.tsx",
        lineNumber: 118,
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: `/projects/${projectId}/ledger`,
                            className: "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors",
                            children: "Ledger"
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 324,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: `/projects/${projectId}/room`,
                            className: "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors",
                            children: "Room"
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 330,
                            columnNumber: 13
                        }, void 0),
                        meetingActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: endMeeting,
                            className: "rounded-full border border-red-500/40 bg-red-500/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-red-400 hover:bg-red-500/20 transition-colors",
                            children: "End Meeting"
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 337,
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
                            lineNumber: 344,
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
                            lineNumber: 355,
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
                                                lineNumber: 362,
                                                columnNumber: 21
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative inline-flex h-2 w-2 rounded-full bg-red-500"
                                            }, void 0, false, {
                                                fileName: "[project]/components/board/BoardScreen.tsx",
                                                lineNumber: 363,
                                                columnNumber: 21
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 361,
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
                                        lineNumber: 365,
                                        columnNumber: 19
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] tabular-nums text-[var(--text-blue)]/60",
                                        children: formatElapsed(meetingElapsed)
                                    }, void 0, false, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 368,
                                        columnNumber: 19
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/board/BoardScreen.tsx",
                                lineNumber: 360,
                                columnNumber: 17
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 359,
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
                                                        lineNumber: 391,
                                                        columnNumber: 25
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-[var(--muted)]/60 tabular-nums",
                                                        children: colItems.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 25
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/board/BoardScreen.tsx",
                                                lineNumber: 390,
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
                                                        lineNumber: 399,
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
                                                        lineNumber: 409,
                                                        columnNumber: 27
                                                    }, void 0),
                                                    colItems.map((item)=>editingId === item.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TaskEditCard, {
                                                            item: item,
                                                            onSave: (t, d)=>saveEdit(item.id, t, d),
                                                            onCancel: ()=>setEditingId(null)
                                                        }, item.id, false, {
                                                            fileName: "[project]/components/board/BoardScreen.tsx",
                                                            lineNumber: 418,
                                                            columnNumber: 29
                                                        }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TaskPill, {
                                                            item: item,
                                                            isDragging: dragItemId === item.id,
                                                            onDragStart: ()=>setDragItemId(item.id),
                                                            onDragEnd: ()=>setDragItemId(null),
                                                            onEdit: ()=>setEditingId(item.id)
                                                        }, item.id, false, {
                                                            fileName: "[project]/components/board/BoardScreen.tsx",
                                                            lineNumber: 425,
                                                            columnNumber: 29
                                                        }, void 0)),
                                                    isOver && colItems.length === 0 && newItemCol !== col.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-lg border border-dashed border-white/20 py-4 text-center text-[10px] text-[var(--muted)]/40",
                                                        children: "Drop here"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                                        lineNumber: 437,
                                                        columnNumber: 27
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/board/BoardScreen.tsx",
                                                lineNumber: 397,
                                                columnNumber: 23
                                            }, void 0)
                                        ]
                                    }, col.id, true, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 381,
                                        columnNumber: 21
                                    }, void 0);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/board/BoardScreen.tsx",
                                lineNumber: 376,
                                columnNumber: 15
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 375,
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
                                lineNumber: 452,
                                columnNumber: 15
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 451,
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
                                    lineNumber: 459,
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
                                                        lineNumber: 465,
                                                        columnNumber: 23
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] text-[var(--text-blue)] truncate",
                                                        children: a.jobTitle
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                                        lineNumber: 466,
                                                        columnNumber: 23
                                                    }, void 0)
                                                ]
                                            }, a.id, true, {
                                                fileName: "[project]/components/board/BoardScreen.tsx",
                                                lineNumber: 464,
                                                columnNumber: 21
                                            }, void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "h-1.5 w-1.5 rounded-full bg-emerald-400/70 shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/board/BoardScreen.tsx",
                                                    lineNumber: 470,
                                                    columnNumber: 21
                                                }, void 0),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[11px] text-[var(--text-blue)]",
                                                    children: "You"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/board/BoardScreen.tsx",
                                                    lineNumber: 471,
                                                    columnNumber: 21
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/board/BoardScreen.tsx",
                                            lineNumber: 469,
                                            columnNumber: 19
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/board/BoardScreen.tsx",
                                    lineNumber: 462,
                                    columnNumber: 17
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 458,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1"
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 477,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LedgerStrip, {
                            projectId: projectId
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 478,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-5"
                        }, void 0, false, {
                            fileName: "[project]/components/board/BoardScreen.tsx",
                            lineNumber: 479,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/board/BoardScreen.tsx",
                    lineNumber: 450,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/components/board/BoardScreen.tsx",
                lineNumber: 319,
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
                        lineNumber: 487,
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
                                        lineNumber: 490,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[18px] font-semibold text-[var(--text-bright)] mt-1",
                                        children: "Start meeting"
                                    }, void 0, false, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 493,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[12px] text-[var(--muted)] mt-1",
                                        children: "Select one or more agents to join."
                                    }, void 0, false, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 496,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/board/BoardScreen.tsx",
                                lineNumber: 489,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar",
                                children: agents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[12px] text-[var(--muted)]/60",
                                    children: "No agents available. Connect Core to load agents."
                                }, void 0, false, {
                                    fileName: "[project]/components/board/BoardScreen.tsx",
                                    lineNumber: 502,
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
                                                lineNumber: 509,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[13px] text-[var(--text-blue)]",
                                                children: a.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/board/BoardScreen.tsx",
                                                lineNumber: 519,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] text-[var(--muted)] ml-auto",
                                                children: a.jobTitle
                                            }, void 0, false, {
                                                fileName: "[project]/components/board/BoardScreen.tsx",
                                                lineNumber: 520,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, a.id, true, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 505,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/board/BoardScreen.tsx",
                                lineNumber: 500,
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
                                lineNumber: 525,
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
                                        lineNumber: 534,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowStartModal(false),
                                        className: "rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors",
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 541,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/board/BoardScreen.tsx",
                                lineNumber: 533,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/board/BoardScreen.tsx",
                        lineNumber: 488,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/board/BoardScreen.tsx",
                lineNumber: 486,
                columnNumber: 9
            }, this),
            showEndModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/60 backdrop-blur-sm"
                    }, void 0, false, {
                        fileName: "[project]/components/board/BoardScreen.tsx",
                        lineNumber: 555,
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
                                        lineNumber: 558,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[18px] font-semibold text-[var(--text-bright)] mt-1",
                                        children: "Promote this meeting?"
                                    }, void 0, false, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 561,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[12px] text-[var(--muted)] mt-1",
                                        children: "Save this meeting to the Ledger as a sealed decision record."
                                    }, void 0, false, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 564,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/board/BoardScreen.tsx",
                                lineNumber: 557,
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
                                lineNumber: 568,
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
                                        lineNumber: 576,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>confirmEndMeeting(false),
                                        className: "rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors",
                                        children: "End without promoting"
                                    }, void 0, false, {
                                        fileName: "[project]/components/board/BoardScreen.tsx",
                                        lineNumber: 583,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/board/BoardScreen.tsx",
                                lineNumber: 575,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/board/BoardScreen.tsx",
                        lineNumber: 556,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/board/BoardScreen.tsx",
                lineNumber: 554,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7d5c95fa._.js.map