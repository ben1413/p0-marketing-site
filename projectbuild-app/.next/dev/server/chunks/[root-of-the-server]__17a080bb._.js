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
}),
"[project]/app/api/agents/list/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$p0$2f$coreClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/p0/coreClient.ts [app-route] (ecmascript)");
;
;
async function GET(req) {
    try {
        const projectId = req.nextUrl.searchParams.get("projectId") ?? "";
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$p0$2f$coreClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listAgents"])(projectId);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
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
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__17a080bb._.js.map