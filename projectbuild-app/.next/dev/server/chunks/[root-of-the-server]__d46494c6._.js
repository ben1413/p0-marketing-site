module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

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
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/p0/coreClient.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ensureEvaluation",
    ()=>ensureEvaluation,
    "listAgents",
    ()=>listAgents,
    "promoteToLedger",
    ()=>promoteToLedger,
    "registerAgent",
    ()=>registerAgent,
    "runAgentSimple",
    ()=>runAgentSimple,
    "runAgentStream",
    ()=>runAgentStream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/server-only/empty.js [app-route] (ecmascript)");
;
function buildHeaders() {
    const apiKey = process.env.P0_CORE_API_KEY;
    const jwt = process.env.P0_CORE_JWT;
    const devBypass = process.env.DEV_BYPASS_SECRET;
    const headers = {
        "Content-Type": "application/json",
        "x-request-id": typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `pb-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
    };
    const bearer = apiKey || jwt;
    if (bearer) {
        headers["Authorization"] = `Bearer ${bearer}`;
    } else if (devBypass) {
        headers["x-dev-bypass"] = devBypass;
    }
    return headers;
}
function baseUrl() {
    const url = process.env.P0_CORE_BASE_URL;
    if (!url) throw new Error("P0_CORE_BASE_URL is not set");
    return url;
}
// Resolve agentId: accepts a direct ID or an env-mapped persona key (e.g. "TONI" → P0_CORE_AGENT_TONI)
function resolveAgentId(requested) {
    if (!requested) {
        const fallback = process.env.P0_CORE_AGENT_ID;
        if (!fallback) throw new Error("No agentId provided and P0_CORE_AGENT_ID not set");
        return fallback;
    }
    const envKey = `P0_CORE_AGENT_${requested.toUpperCase()}`;
    return process.env[envKey] || process.env.P0_CORE_AGENT_ID || requested;
}
async function runAgentSimple(input) {
    const url = `${baseUrl()}/api/v1/agents/run/simple`;
    const agentId = resolveAgentId(input.agentId);
    const body = {
        agentId,
        message: input.message,
        memoryScope: input.memoryScope ?? "working",
        runId: input.runId,
        humanAck: input.humanAck,
        ...input.builderMode && {
            builderMode: true
        }
    };
    const res = await fetch(url, {
        method: "POST",
        headers: buildHeaders(),
        body: JSON.stringify(body),
        cache: "no-store"
    });
    // Retry once on 429
    if (res.status === 429) {
        await new Promise((r)=>setTimeout(r, 1500));
        const retry = await fetch(url, {
            method: "POST",
            headers: buildHeaders(),
            body: JSON.stringify(body),
            cache: "no-store"
        });
        const data = await retry.json();
        return data;
    }
    const data = await res.json();
    return data;
}
async function runAgentStream(input) {
    const url = `${baseUrl()}/api/v1/agents/run/simple/stream`;
    const agentId = resolveAgentId(input.agentId);
    return fetch(url, {
        method: "POST",
        headers: buildHeaders(),
        body: JSON.stringify({
            agentId,
            message: input.message,
            memoryScope: input.memoryScope ?? "working",
            runId: input.runId,
            projectId: input.projectId,
            builderMode: true
        }),
        cache: "no-store"
    });
}
async function promoteToLedger(payload) {
    const res = await fetch(`${baseUrl()}/api/v1/ledger/promote`, {
        method: "POST",
        headers: buildHeaders(),
        body: JSON.stringify(payload),
        cache: "no-store"
    });
    const data = await res.json();
    if (!res.ok) return {
        ok: false,
        error: data.error || `Promote failed (${res.status})`
    };
    return {
        ok: true,
        id: data.id
    };
}
async function ensureEvaluation(projectId) {
    const res = await fetch(`${baseUrl()}/api/v1/evaluations`, {
        method: "POST",
        headers: buildHeaders(),
        body: JSON.stringify({
            projectId,
            name: `${projectId}-default`
        }),
        cache: "no-store"
    });
    const data = await res.json();
    return data.id ?? data.evaluation?.id ?? projectId;
}
async function listAgents(projectId) {
    const res = await fetch(`${baseUrl()}/api/v1/agents/list?projectId=${projectId}`, {
        headers: buildHeaders(),
        cache: "no-store"
    });
    const data = await res.json();
    return {
        items: data.items ?? []
    };
}
async function registerAgent(input) {
    const res = await fetch(`${baseUrl()}/api/v1/agents/register`, {
        method: "POST",
        headers: buildHeaders(),
        body: JSON.stringify(input),
        cache: "no-store"
    });
    const data = await res.json();
    if (!res.ok || !data.agentId) {
        return {
            ok: false,
            error: data.error || `Agent register failed (${res.status})`
        };
    }
    return {
        ok: true,
        agentId: data.agentId
    };
}
}),
"[project]/lib/firebase/admin.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "adminDb",
    ()=>adminDb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/server-only/empty.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/app [external] (firebase-admin/app, esm_import, [project]/node_modules/firebase-admin)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/firestore [external] (firebase-admin/firestore, esm_import, [project]/node_modules/firebase-admin)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
/**
 * Server-side Firebase Admin client.
 *
 * Credential resolution order:
 * 1. FIREBASE_SERVICE_ACCOUNT_JSON — full service account JSON as a string (recommended for prod)
 * 2. Individual env vars:
 *    FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
 *
 * If neither is present the app will throw at runtime. Set one of these in your
 * environment before deploying or running the promote route.
 *
 * The projectId falls back to NEXT_PUBLIC_FIREBASE_PROJECT_ID so you don't need
 * to duplicate it if it's already set for the client SDK.
 */ function getAdminApp() {
    if ((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["getApps"])().length > 0) return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["getApps"])()[0];
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (serviceAccountJson) {
        const sa = JSON.parse(serviceAccountJson);
        return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["initializeApp"])({
            credential: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["cert"])(sa)
        });
    }
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (!projectId || !clientEmail || !privateKey) {
        throw new Error("Firebase Admin: set FIREBASE_SERVICE_ACCOUNT_JSON, or all three of " + "FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY");
    }
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["initializeApp"])({
        credential: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["cert"])({
            projectId,
            clientEmail,
            privateKey
        })
    });
}
const adminDb = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["getFirestore"])(getAdminApp());
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/api/agents/list/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$p0$2f$coreClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/p0/coreClient.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase/admin.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function GET(req) {
    try {
        const projectId = req.nextUrl.searchParams.get("projectId") ?? "";
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$p0$2f$coreClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listAgents"])(projectId);
        if (!projectId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
        }
        const projectSnap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminDb"].collection("pb_projects").doc(projectId).get();
        const data = projectSnap.data();
        const initAgentIds = data?.initialization?.agentIds;
        if (!Array.isArray(initAgentIds) || initAgentIds.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
        }
        const allow = new Set(initAgentIds.filter((value)=>typeof value === "string" && value.length > 0));
        const filtered = result.items.filter((agent)=>allow.has(agent.id));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            items: filtered
        });
    } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to list agents";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: msg,
            items: []
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d46494c6._.js.map