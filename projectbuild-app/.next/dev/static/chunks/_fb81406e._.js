(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/firebase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
;
;
// Firebase config — uses the same project as Solo for now.
// ProjectBuild will get its own project ID when it's ready for production.
const firebaseConfig = {
    projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "project-solo-6b864",
    appId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:17148879024:web:6e7911f0348ab43e569b75",
    storageBucket: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "project-solo-6b864.firebasestorage.app",
    apiKey: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDSE_CpaBmyLT6OqDzGg3aURoelO1My0Rc",
    authDomain: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "project-solo-6b864.firebaseapp.com",
    messagingSenderId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "17148879024"
};
const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApps"])().length === 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApps"])()[0];
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])(app);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useTracks.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTracks",
    ()=>useTracks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useTracks(projectId) {
    _s();
    const [tracks, setTracks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTracks.useEffect": ()=>{
            if (!projectId) return;
            const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "pb_tracks"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])("projectId", "==", projectId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("createdAt", "asc"));
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, {
                "useTracks.useEffect": (snap)=>{
                    setTracks(snap.docs.map({
                        "useTracks.useEffect": (d)=>({
                                id: d.id,
                                ...d.data()
                            })
                    }["useTracks.useEffect"]));
                }
            }["useTracks.useEffect"]);
        }
    }["useTracks.useEffect"], [
        projectId
    ]);
    return tracks;
}
_s(useTracks, "f0kRKS0z35esRkLUBB+Oc19rjkA=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useTTS.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTTS",
    ()=>useTTS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useTTS(options = {}) {
    _s();
    const [enabled, setEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [speaking, setSpeaking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const abortRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioCtxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sourceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fallbackAudioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const getAudioContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTTS.useCallback[getAudioContext]": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
                audioCtxRef.current = new AudioContext();
            }
            return audioCtxRef.current;
        }
    }["useTTS.useCallback[getAudioContext]"], []);
    const cancel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTTS.useCallback[cancel]": ()=>{
            abortRef.current?.abort();
            abortRef.current = null;
            // Stop Web Audio source
            try {
                sourceRef.current?.stop();
            } catch  {}
            sourceRef.current = null;
            // Stop fallback audio element
            if (fallbackAudioRef.current) {
                fallbackAudioRef.current.pause();
                fallbackAudioRef.current.src = "";
                fallbackAudioRef.current = null;
            }
            // Stop browser speechSynthesis fallback
            if ("TURBOPACK compile-time truthy", 1) {
                window.speechSynthesis?.cancel();
            }
            setSpeaking(false);
        }
    }["useTTS.useCallback[cancel]"], []);
    /** Last-resort fallback — browser TTS (no Core needed) */ const speakViaBrowser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTTS.useCallback[speakViaBrowser]": (text)=>{
            if (("TURBOPACK compile-time value", "object") === "undefined" || !("speechSynthesis" in window)) return;
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onstart = ({
                "useTTS.useCallback[speakViaBrowser]": ()=>setSpeaking(true)
            })["useTTS.useCallback[speakViaBrowser]"];
            utterance.onend = ({
                "useTTS.useCallback[speakViaBrowser]": ()=>setSpeaking(false)
            })["useTTS.useCallback[speakViaBrowser]"];
            utterance.onerror = ({
                "useTTS.useCallback[speakViaBrowser]": ()=>setSpeaking(false)
            })["useTTS.useCallback[speakViaBrowser]"];
            window.speechSynthesis.speak(utterance);
        }
    }["useTTS.useCallback[speakViaBrowser]"], []);
    /** Buffered fallback — blob URL on <audio> element (no Web Audio needed) */ const speakViaBlob = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTTS.useCallback[speakViaBlob]": (buffer, contentType)=>{
            const blob = new Blob([
                buffer
            ], {
                type: contentType
            });
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            fallbackAudioRef.current = audio;
            audio.onended = ({
                "useTTS.useCallback[speakViaBlob]": ()=>{
                    URL.revokeObjectURL(url);
                    setSpeaking(false);
                }
            })["useTTS.useCallback[speakViaBlob]"];
            audio.onerror = ({
                "useTTS.useCallback[speakViaBlob]": ()=>{
                    URL.revokeObjectURL(url);
                    setSpeaking(false);
                }
            })["useTTS.useCallback[speakViaBlob]"];
            audio.play().catch({
                "useTTS.useCallback[speakViaBlob]": ()=>setSpeaking(false)
            }["useTTS.useCallback[speakViaBlob]"]);
        }
    }["useTTS.useCallback[speakViaBlob]"], []);
    const speak = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTTS.useCallback[speak]": async (text)=>{
            if (!enabled || !text.trim()) return;
            cancel();
            const controller = new AbortController();
            abortRef.current = controller;
            setSpeaking(true);
            try {
                const res = await fetch("/api/voice/speak", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        text,
                        voice: options.voice ?? "nova",
                        model: options.model ?? "tts-1"
                    }),
                    signal: controller.signal
                });
                if (controller.signal.aborted) return;
                // Core not configured — fall back to browser speech
                if (res.status === 503) {
                    speakViaBrowser(text);
                    return;
                }
                if (!res.ok) {
                    setSpeaking(false);
                    return;
                }
                const contentType = res.headers.get("content-type") ?? "audio/mpeg";
                const ctx = getAudioContext();
                // If Web Audio not available, collect full buffer and play via <audio>
                if (!ctx || !res.body) {
                    const buffer = await res.arrayBuffer();
                    if (controller.signal.aborted) return;
                    speakViaBlob(buffer, contentType);
                    return;
                }
                // Resume AudioContext if suspended (browser autoplay policy)
                if (ctx.state === "suspended") await ctx.resume();
                // Stream: accumulate chunks, decode full buffer when stream ends,
                // then play. This gives us ~150-250ms to first sound because we start
                // decoding as soon as the stream ends rather than waiting for arrayBuffer().
                const reader = res.body.getReader();
                const chunks = [];
                let totalLength = 0;
                while(true){
                    const { done, value } = await reader.read();
                    if (controller.signal.aborted) {
                        reader.cancel();
                        return;
                    }
                    if (done) break;
                    if (value) {
                        chunks.push(value);
                        totalLength += value.byteLength;
                    }
                }
                if (controller.signal.aborted) return;
                // Merge chunks into one ArrayBuffer
                const merged = new Uint8Array(totalLength);
                let offset = 0;
                for (const chunk of chunks){
                    merged.set(chunk, offset);
                    offset += chunk.byteLength;
                }
                // Decode and schedule playback
                const audioBuffer = await ctx.decodeAudioData(merged.buffer);
                if (controller.signal.aborted) return;
                const source = ctx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(ctx.destination);
                sourceRef.current = source;
                source.onended = ({
                    "useTTS.useCallback[speak]": ()=>setSpeaking(false)
                })["useTTS.useCallback[speak]"];
                source.start(0);
            } catch (e) {
                if (e.name === "AbortError") return;
                // Any failure — try browser speech as last resort
                speakViaBrowser(text);
            }
        }
    }["useTTS.useCallback[speak]"], [
        enabled,
        cancel,
        speakViaBrowser,
        speakViaBlob,
        getAudioContext,
        options.voice,
        options.model
    ]);
    const toggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTTS.useCallback[toggle]": ()=>{
            setEnabled({
                "useTTS.useCallback[toggle]": (prev)=>{
                    if (prev) cancel();
                    return !prev;
                }
            }["useTTS.useCallback[toggle]"]);
        }
    }["useTTS.useCallback[toggle]"], [
        cancel
    ]);
    // Always "supported" — worst case falls back to browser speech
    const supported = true;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTTS.useEffect": ()=>{
            return ({
                "useTTS.useEffect": ()=>{
                    cancel();
                    audioCtxRef.current?.close().catch({
                        "useTTS.useEffect": ()=>{}
                    }["useTTS.useEffect"]);
                }
            })["useTTS.useEffect"];
        }
    }["useTTS.useEffect"], [
        cancel
    ]);
    return {
        supported,
        enabled,
        speaking,
        speak,
        cancel,
        toggle
    };
}
_s(useTTS, "aevuYTh/JFrBxHUJEMrY4uvBWsc=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useProjects.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useProjects",
    ()=>useProjects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useProjects() {
    _s();
    const [projects, setProjects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useProjects.useEffect": ()=>{
            const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "pb_projects"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("createdAt", "desc"));
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, {
                "useProjects.useEffect": (snap)=>{
                    const rows = snap.docs.map({
                        "useProjects.useEffect.rows": (d)=>{
                            const data = d.data();
                            return {
                                id: d.id,
                                name: typeof data.name === "string" ? data.name : d.id,
                                description: typeof data.description === "string" ? data.description : undefined,
                                createdBy: typeof data.createdBy === "string" ? data.createdBy : "unknown",
                                createdAt: data.createdAt,
                                isCore: typeof data.isCore === "boolean" ? data.isCore : false
                            };
                        }
                    }["useProjects.useEffect.rows"]);
                    setProjects(rows);
                    setLoading(false);
                }
            }["useProjects.useEffect"]);
        }
    }["useProjects.useEffect"], []);
    return {
        projects,
        loading
    };
}
_s(useProjects, "OQ1VoVBkBYQ0DtEeE9la9LZgEb0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/layout/LeftPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LeftPanel",
    ()=>LeftPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useProjects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useProjects.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function LeftPanel({ activeProjectId }) {
    _s();
    const { projects, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useProjects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjects"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "w-72 border-r border-white/10 flex flex-col h-full bg-transparent",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-h-0 overflow-y-auto custom-scrollbar px-4 pt-6 space-y-1",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-3 text-[13px] text-[var(--muted)]",
                    children: "Loading…"
                }, void 0, false, {
                    fileName: "[project]/components/layout/LeftPanel.tsx",
                    lineNumber: 20,
                    columnNumber: 11
                }, this) : projects.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-3 text-[13px] text-[var(--muted)]/60",
                    children: "No projects yet."
                }, void 0, false, {
                    fileName: "[project]/components/layout/LeftPanel.tsx",
                    lineNumber: 22,
                    columnNumber: 11
                }, this) : projects.map((p)=>{
                    const isActive = p.id === activeProjectId;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/projects/${p.id}/room`,
                        className: `flex items-center justify-between gap-3 w-full px-6 py-3 rounded-full text-[14px] font-medium transition-all duration-200 min-h-[44px] ${isActive ? "bg-white/10 text-[var(--text-blue)] shadow-lg shadow-white/5" : "text-[var(--text-blue)] hover:bg-white/5"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate",
                                children: p.name
                            }, void 0, false, {
                                fileName: "[project]/components/layout/LeftPanel.tsx",
                                lineNumber: 36,
                                columnNumber: 17
                            }, this),
                            p.isCore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-white/10 px-4 py-4 space-y-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/projects",
                        className: `flex items-center gap-3 w-full px-6 py-2.5 rounded-full text-[12px] font-medium transition-all duration-200 ${pathname === "/projects" ? "bg-white/10 text-[var(--text-blue)]" : "text-[var(--muted)] hover:text-[var(--text-blue)] hover:bg-white/5"}`,
                        children: "Workspace"
                    }, void 0, false, {
                        fileName: "[project]/components/layout/LeftPanel.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
_s(LeftPanel, "zXgby52R4QRy+BG1Aznh3NpLoVs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useProjects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProjects"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = LeftPanel;
var _c;
__turbopack_context__.k.register(_c, "LeftPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/layout/ProjectSurfaceShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProjectSurfaceShell",
    ()=>ProjectSurfaceShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$LeftPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/LeftPanel.tsx [app-client] (ecmascript)");
"use client";
;
;
function ProjectSurfaceShell({ projectId, breadcrumb, headerActions, center, right }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "relative flex flex-col h-screen w-full bg-transparent text-[var(--text-blue)] overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "h-24 border-b border-white/10 grid grid-cols-[18rem_1fr_auto] items-center pl-0 pr-10 shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center w-[18rem]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center leading-none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[9px] font-bold uppercase tracking-[0.45em] text-[var(--text-blue)]/45",
                                    children: "Project"
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/ProjectSurfaceShell.tsx",
                                    lineNumber: 26,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 min-h-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-72 border-r border-white/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$LeftPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LeftPanel"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0 flex flex-col bg-transparent",
                        children: center
                    }, void 0, false, {
                        fileName: "[project]/components/layout/ProjectSurfaceShell.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_c = ProjectSurfaceShell;
var _c;
__turbopack_context__.k.register(_c, "ProjectSurfaceShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useMessages.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMessages",
    ()=>useMessages
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useMessages(projectId, runId, trackId) {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMessages.useEffect": ()=>{
            if (!projectId || !runId) return;
            // Messages live flat at root level, filtered by projectId + runId
            // Same pattern as Solo (topicId → projectId, no orderBy to avoid composite index)
            const constraints = [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])("projectId", "==", projectId),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])("runId", "==", runId)
            ];
            if (trackId) constraints.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])("trackId", "==", trackId));
            const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "pb_messages"), ...constraints);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, {
                "useMessages.useEffect": (snap)=>{
                    const msgs = snap.docs.map({
                        "useMessages.useEffect.msgs": (d)=>({
                                id: d.id,
                                ...d.data()
                            })
                    }["useMessages.useEffect.msgs"]);
                    msgs.sort({
                        "useMessages.useEffect": (a, b)=>(a.createdAt?.seconds ?? 0) - (b.createdAt?.seconds ?? 0)
                    }["useMessages.useEffect"]);
                    setMessages(msgs);
                }
            }["useMessages.useEffect"]);
        }
    }["useMessages.useEffect"], [
        projectId,
        runId,
        trackId
    ]);
    return messages;
}
_s(useMessages, "RyA59LRbn9goj/9N7rELX+NWNVI=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/promote/PromotePanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PromotePanel",
    ()=>PromotePanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const ITEM_TYPES = [
    "decision",
    "artifact",
    "task",
    "note",
    "code"
];
function PromotePanel({ message, projectId, runId, onClose, onSealed }) {
    _s();
    const [summary, setSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(message.text.slice(0, 280));
    const [type, setType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("decision");
    const [authorityMode, setAuthorityMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("human_led");
    const [tags, setTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [promoting, setPromoting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const truthPosture = message.truthPosture;
    // unknown posture disables agent_autonomous — both here and enforced server-side
    const availableAuthorityModes = truthPosture === "unknown" ? [
        "human_led",
        "human_in_the_loop"
    ] : [
        "human_led",
        "human_in_the_loop",
        "agent_autonomous"
    ];
    const postureLabel = truthPosture ? ({
        known: "● KNOWN",
        inferred: "◐ INFERRED",
        unknown: "○ UNKNOWN"
    })[truthPosture] : null;
    const postureColor = truthPosture ? ({
        known: "text-emerald-400/70",
        inferred: "text-amber-400/70",
        unknown: "text-white/30"
    })[truthPosture] : "";
    const handlePromote = async ()=>{
        if (!summary.trim() || promoting) return;
        setPromoting(true);
        setError(null);
        try {
            const res = await fetch("/api/agent/promote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    summary: summary.trim(),
                    authorityMode,
                    actor: "user",
                    type,
                    tags: tags ? tags.split(",").map((t)=>t.trim()).filter(Boolean) : [],
                    projectId,
                    runId,
                    truthPosture
                })
            });
            const data = await res.json();
            if (!data.ok) throw new Error(data.error || "Promote failed");
            onSealed();
        } catch (e) {
            setError(e instanceof Error ? e.message : "Promote failed");
        } finally{
            setPromoting(false);
        }
    };
    return(// Backdrop
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        onClick: (e)=>e.target === e.currentTarget && onClose(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/40 backdrop-blur-sm",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/components/promote/PromotePanel.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 w-full max-w-md rounded-[24px] border border-white/10 bg-[var(--panel)] shadow-2xl px-7 py-6 space-y-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/60",
                                children: "Promote to Ledger"
                            }, void 0, false, {
                                fileName: "[project]/components/promote/PromotePanel.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            postureLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-[9px] font-bold tracking-widest ${postureColor}`,
                                children: postureLabel
                            }, void 0, false, {
                                fileName: "[project]/components/promote/PromotePanel.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/promote/PromotePanel.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[9px] font-bold tracking-[0.25em] uppercase text-[var(--muted)] block mb-1.5",
                                children: "Summary"
                            }, void 0, false, {
                                fileName: "[project]/components/promote/PromotePanel.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: summary,
                                onChange: (e)=>setSummary(e.target.value),
                                rows: 4,
                                className: "w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[13px] text-[var(--text-blue)] focus:outline-none focus:border-white/25 transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/components/promote/PromotePanel.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/promote/PromotePanel.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[9px] font-bold tracking-[0.25em] uppercase text-[var(--muted)] block mb-1.5",
                                        children: "Type"
                                    }, void 0, false, {
                                        fileName: "[project]/components/promote/PromotePanel.tsx",
                                        lineNumber: 104,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: type,
                                        onChange: (e)=>setType(e.target.value),
                                        className: "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-[var(--text-blue)] focus:outline-none focus:border-white/25",
                                        children: ITEM_TYPES.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: t,
                                                className: "bg-[#0f141b]",
                                                children: t.charAt(0).toUpperCase() + t.slice(1)
                                            }, t, false, {
                                                fileName: "[project]/components/promote/PromotePanel.tsx",
                                                lineNumber: 113,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/promote/PromotePanel.tsx",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/promote/PromotePanel.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[9px] font-bold tracking-[0.25em] uppercase text-[var(--muted)] block mb-1.5",
                                        children: "Authority Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/components/promote/PromotePanel.tsx",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: authorityMode,
                                        onChange: (e)=>setAuthorityMode(e.target.value),
                                        className: "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-[var(--text-blue)] focus:outline-none focus:border-white/25",
                                        children: availableAuthorityModes.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: m,
                                                className: "bg-[#0f141b]",
                                                children: m.replace(/_/g, " ")
                                            }, m, false, {
                                                fileName: "[project]/components/promote/PromotePanel.tsx",
                                                lineNumber: 130,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/promote/PromotePanel.tsx",
                                        lineNumber: 124,
                                        columnNumber: 13
                                    }, this),
                                    truthPosture === "unknown" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[9px] text-[var(--muted)]/60 mt-1",
                                        children: "agent_autonomous unavailable — unknown posture"
                                    }, void 0, false, {
                                        fileName: "[project]/components/promote/PromotePanel.tsx",
                                        lineNumber: 136,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/promote/PromotePanel.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/promote/PromotePanel.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[9px] font-bold tracking-[0.25em] uppercase text-[var(--muted)] block mb-1.5",
                                children: "Tags (comma-separated, optional)"
                            }, void 0, false, {
                                fileName: "[project]/components/promote/PromotePanel.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: tags,
                                onChange: (e)=>setTags(e.target.value),
                                placeholder: "e.g. vendor, q2, risk",
                                className: "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-[var(--text-blue)] placeholder:text-[var(--muted)]/40 focus:outline-none focus:border-white/25"
                            }, void 0, false, {
                                fileName: "[project]/components/promote/PromotePanel.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/promote/PromotePanel.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] text-red-400",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/promote/PromotePanel.tsx",
                        lineNumber: 158,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3 pt-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handlePromote,
                                disabled: promoting || !summary.trim(),
                                className: "flex-1 rounded-full bg-white px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-black disabled:opacity-40 soft-elevate hover:bg-white/90 transition-opacity",
                                children: promoting ? "Sealing…" : "Seal to Ledger"
                            }, void 0, false, {
                                fileName: "[project]/components/promote/PromotePanel.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/components/promote/PromotePanel.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/promote/PromotePanel.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/promote/PromotePanel.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/promote/PromotePanel.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this));
}
_s(PromotePanel, "99RfxDQ5mT3jsDeLEpLZeywl0WU=");
_c = PromotePanel;
var _c;
__turbopack_context__.k.register(_c, "PromotePanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/messages/MessageFeed.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MessageFeed",
    ()=>MessageFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useMessages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useMessages.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$promote$2f$PromotePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/promote/PromotePanel.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function PostureIndicator({ posture }) {
    if (!posture) return null;
    const config = {
        known: {
            symbol: "●",
            label: "KNOWN",
            color: "text-emerald-400/70",
            tooltip: "Grounded in Core Memory"
        },
        inferred: {
            symbol: "◐",
            label: "INFERRED",
            color: "text-amber-400/70",
            tooltip: "Reasoned from context"
        },
        unknown: {
            symbol: "○",
            label: "UNKNOWN",
            color: "text-white/30",
            tooltip: "Explicitly uncertain"
        }
    }[posture];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `ml-2 text-[9px] font-bold tracking-widest ${config.color} cursor-default`,
        title: config.tooltip,
        "aria-label": config.tooltip,
        children: [
            config.symbol,
            " ",
            config.label
        ]
    }, void 0, true, {
        fileName: "[project]/components/messages/MessageFeed.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = PostureIndicator;
function MessageFeed({ projectId, runId, trackId, ttsEnabled = false, onSpeak }) {
    _s();
    const messages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useMessages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMessages"])(projectId, runId, trackId);
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [promoteTarget, setPromoteTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sealedIds, setSealedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [speakingId, setSpeakingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const lastSpokenIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessageFeed.useEffect": ()=>{
            bottomRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["MessageFeed.useEffect"], [
        messages
    ]);
    // Auto-speak newest agent message when TTS is on.
    // Pre-warm: fire speak() as soon as the message arrives (parallel to rendering)
    // so playback starts as close to message appearance as possible.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MessageFeed.useEffect": ()=>{
            if (!ttsEnabled || !onSpeak || messages.length === 0) return;
            const lastMsg = messages[messages.length - 1];
            if (lastMsg.authorType !== "agent") return;
            if (lastMsg.id === lastSpokenIdRef.current) return;
            lastSpokenIdRef.current = lastMsg.id;
            setSpeakingId(lastMsg.id);
            // Call immediately — don't wait for any animation frame or render cycle
            onSpeak(lastMsg.text);
            const wordCount = lastMsg.text.split(/\s+/).length;
            const ms = Math.max(2000, wordCount * 80);
            const t = setTimeout({
                "MessageFeed.useEffect.t": ()=>setSpeakingId(null)
            }["MessageFeed.useEffect.t"], ms);
            return ({
                "MessageFeed.useEffect": ()=>clearTimeout(t)
            })["MessageFeed.useEffect"];
        }
    }["MessageFeed.useEffect"], [
        messages,
        ttsEnabled,
        onSpeak
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 overflow-y-auto px-10 py-6 space-y-6 custom-scrollbar bg-transparent",
        children: [
            messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center min-h-[200px] text-center px-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[12px] font-medium tracking-[0.2em] uppercase text-[var(--text-blue)]/50",
                        children: "The room is quiet"
                    }, void 0, false, {
                        fileName: "[project]/components/messages/MessageFeed.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] text-[var(--muted)] mt-1 max-w-[260px]",
                        children: "Start a conversation or select an agent below."
                    }, void 0, false, {
                        fileName: "[project]/components/messages/MessageFeed.tsx",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/messages/MessageFeed.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, this) : messages.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex ${m.authorType === "human" ? "justify-end" : "justify-start"}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `max-w-[75%] ${m.authorType === "human" ? "text-right" : "text-left"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 mb-2",
                                children: [
                                    m.authorType === "agent" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-bold tracking-[0.25em] uppercase text-[var(--text-blue)]/70",
                                                children: m.agentJobTitle || m.authorName || "Agent"
                                            }, void 0, false, {
                                                fileName: "[project]/components/messages/MessageFeed.tsx",
                                                lineNumber: 88,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PostureIndicator, {
                                                posture: m.truthPosture
                                            }, void 0, false, {
                                                fileName: "[project]/components/messages/MessageFeed.tsx",
                                                lineNumber: 91,
                                                columnNumber: 21
                                            }, this),
                                            speakingId === m.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-2 flex items-end gap-[2px] h-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-[2px] rounded-full bg-emerald-400/70 animate-[bounce_0.6s_ease-in-out_infinite]",
                                                        style: {
                                                            height: "60%",
                                                            animationDelay: "0ms"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/messages/MessageFeed.tsx",
                                                        lineNumber: 94,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-[2px] rounded-full bg-emerald-400/70 animate-[bounce_0.6s_ease-in-out_infinite]",
                                                        style: {
                                                            height: "100%",
                                                            animationDelay: "0.1s"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/messages/MessageFeed.tsx",
                                                        lineNumber: 95,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-[2px] rounded-full bg-emerald-400/70 animate-[bounce_0.6s_ease-in-out_infinite]",
                                                        style: {
                                                            height: "40%",
                                                            animationDelay: "0.2s"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/messages/MessageFeed.tsx",
                                                        lineNumber: 96,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-[2px] rounded-full bg-emerald-400/70 animate-[bounce_0.6s_ease-in-out_infinite]",
                                                        style: {
                                                            height: "80%",
                                                            animationDelay: "0.15s"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/messages/MessageFeed.tsx",
                                                        lineNumber: 97,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/messages/MessageFeed.tsx",
                                                lineNumber: 93,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    m.authorType === "human" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold tracking-[0.25em] uppercase text-[var(--text-blue)]/70 ml-auto",
                                        children: "YOU"
                                    }, void 0, false, {
                                        fileName: "[project]/components/messages/MessageFeed.tsx",
                                        lineNumber: 103,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/messages/MessageFeed.tsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `px-5 py-4 rounded-2xl border soft-elevate text-[15px] leading-relaxed whitespace-pre-wrap ${m.authorType === "human" ? "bg-white/10 text-[var(--text-blue)] border-white/10 rounded-tr-none" : "bg-[var(--panel)] text-[var(--text-blue)] border-white/10 rounded-tl-none"} ${m.truthPosture === "unknown" ? "border-white/5" : ""} ${speakingId === m.id ? "border-emerald-500/20" : ""}`,
                                children: [
                                    m.text,
                                    m.actionsApplied && m.actionsApplied.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 flex flex-wrap gap-1",
                                        children: m.actionsApplied.map((a, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[var(--muted)]",
                                                children: a
                                            }, i, false, {
                                                fileName: "[project]/components/messages/MessageFeed.tsx",
                                                lineNumber: 125,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/messages/MessageFeed.tsx",
                                        lineNumber: 123,
                                        columnNumber: 19
                                    }, this),
                                    (m.inputTruncated || m.maxTurnsPerMeeting != null) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 flex flex-wrap gap-1",
                                        children: [
                                            m.inputTruncated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[9px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400/70 cursor-default",
                                                title: "Your message was truncated to fit within the input token limit",
                                                children: "INPUT TRUNCATED"
                                            }, void 0, false, {
                                                fileName: "[project]/components/messages/MessageFeed.tsx",
                                                lineNumber: 139,
                                                columnNumber: 23
                                            }, this),
                                            m.maxTurnsPerMeeting != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[var(--muted)] cursor-default",
                                                title: `This conversation has a turn limit of ${m.maxTurnsPerMeeting} turns`,
                                                children: [
                                                    "TURN LIMIT: ",
                                                    m.maxTurnsPerMeeting
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/messages/MessageFeed.tsx",
                                                lineNumber: 147,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/messages/MessageFeed.tsx",
                                        lineNumber: 137,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/messages/MessageFeed.tsx",
                                lineNumber: 110,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `mt-1.5 ${m.authorType === "human" ? "text-right" : "text-left"}`,
                                children: sealedIds.has(m.id) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[9px] font-bold tracking-widest uppercase text-emerald-400/60",
                                    children: "SEALED"
                                }, void 0, false, {
                                    fileName: "[project]/components/messages/MessageFeed.tsx",
                                    lineNumber: 161,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setPromoteTarget(m),
                                    className: "text-[9px] font-bold tracking-widest uppercase text-[var(--muted)]/50 hover:text-[var(--text-blue)]/70 transition-colors",
                                    children: "PROMOTE"
                                }, void 0, false, {
                                    fileName: "[project]/components/messages/MessageFeed.tsx",
                                    lineNumber: 165,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/messages/MessageFeed.tsx",
                                lineNumber: 159,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/messages/MessageFeed.tsx",
                        lineNumber: 83,
                        columnNumber: 13
                    }, this)
                }, m.id, false, {
                    fileName: "[project]/components/messages/MessageFeed.tsx",
                    lineNumber: 79,
                    columnNumber: 11
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: bottomRef,
                className: "h-2"
            }, void 0, false, {
                fileName: "[project]/components/messages/MessageFeed.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            promoteTarget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$promote$2f$PromotePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PromotePanel"], {
                message: promoteTarget,
                projectId: projectId,
                runId: runId,
                onClose: ()=>setPromoteTarget(null),
                onSealed: ()=>{
                    setSealedIds((prev)=>new Set([
                            ...prev,
                            promoteTarget.id
                        ]));
                    setPromoteTarget(null);
                }
            }, void 0, false, {
                fileName: "[project]/components/messages/MessageFeed.tsx",
                lineNumber: 181,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/messages/MessageFeed.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s(MessageFeed, "tin87pbJOaJKEQpBprWOOeowrl4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useMessages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMessages"]
    ];
});
_c1 = MessageFeed;
var _c, _c1;
__turbopack_context__.k.register(_c, "PostureIndicator");
__turbopack_context__.k.register(_c1, "MessageFeed");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/input/BottomInputBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BottomInputBar",
    ()=>BottomInputBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const MODELS = [
    "gpt-4o",
    "gpt-4o-mini",
    "gpt-5.2",
    "claude-3.5-sonnet",
    "gemini-1.5-pro"
];
function BottomInputBar({ agents, selectedAgentId, selectedModel, onAgentChange, onModelChange, onSend, isRunning, placeholder = "Message…", ttsEnabled = false, ttsSupported = false, ttsSpeaking = false, onTTSToggle }) {
    _s();
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [principlesOpen, setPrinciplesOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const selectedAgent = agents.find((a)=>a.id === selectedAgentId) ?? agents[0];
    const handleSubmit = ()=>{
        const text = input.trim();
        if (!text || isRunning) return;
        setInput("");
        setPrinciplesOpen(false);
        onSend(text);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-t border-white/10 px-8 py-4 flex flex-col gap-3 bg-transparent",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${principlesOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`,
                children: selectedAgent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-xl border border-white/10 bg-[var(--panel)] px-5 py-4 mb-2 space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--text-blue)]/50 mb-1",
                                    children: "Internal Identity"
                                }, void 0, false, {
                                    fileName: "[project]/components/input/BottomInputBar.tsx",
                                    lineNumber: 61,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[13px] text-[var(--text-blue)] leading-relaxed",
                                    children: selectedAgent.persona
                                }, void 0, false, {
                                    fileName: "[project]/components/input/BottomInputBar.tsx",
                                    lineNumber: 64,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/input/BottomInputBar.tsx",
                            lineNumber: 60,
                            columnNumber: 13
                        }, this),
                        selectedAgent.allowedActions?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[9px] font-bold tracking-[0.3em] uppercase text-[var(--text-blue)]/50 mb-1",
                                    children: "Non-Negotiables / Allowed Actions"
                                }, void 0, false, {
                                    fileName: "[project]/components/input/BottomInputBar.tsx",
                                    lineNumber: 68,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-1",
                                    children: selectedAgent.allowedActions.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[var(--muted)]",
                                            children: a
                                        }, a, false, {
                                            fileName: "[project]/components/input/BottomInputBar.tsx",
                                            lineNumber: 73,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/input/BottomInputBar.tsx",
                                    lineNumber: 71,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/input/BottomInputBar.tsx",
                            lineNumber: 67,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/input/BottomInputBar.tsx",
                    lineNumber: 59,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/input/BottomInputBar.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: selectedAgentId,
                        onChange: (e)=>onAgentChange(e.target.value),
                        className: "rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] focus:outline-none focus:border-white/30 transition-colors",
                        children: agents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "",
                            children: "No agents"
                        }, void 0, false, {
                            fileName: "[project]/components/input/BottomInputBar.tsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this) : agents.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: a.id,
                                className: "bg-[#0f141b]",
                                children: [
                                    a.name,
                                    " / ",
                                    a.jobTitle
                                ]
                            }, a.id, true, {
                                fileName: "[project]/components/input/BottomInputBar.tsx",
                                lineNumber: 99,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/input/BottomInputBar.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: selectedModel,
                        onChange: (e)=>onModelChange(e.target.value),
                        className: "rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] focus:outline-none focus:border-white/30 transition-colors",
                        children: MODELS.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: m,
                                className: "bg-[#0f141b]",
                                children: m.toUpperCase()
                            }, m, false, {
                                fileName: "[project]/components/input/BottomInputBar.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/input/BottomInputBar.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1"
                    }, void 0, false, {
                        fileName: "[project]/components/input/BottomInputBar.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setPrinciplesOpen((p)=>!p),
                        className: `rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${principlesOpen ? "border-white/30 bg-white/10 text-[var(--text-bright)]" : "border-white/10 bg-white/5 text-[var(--text-blue)]"}`,
                        children: "Principles"
                    }, void 0, false, {
                        fileName: "[project]/components/input/BottomInputBar.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    ttsSupported && onTTSToggle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onTTSToggle,
                        title: ttsEnabled ? "Agent audio on — click to mute" : "Click to hear agents speak",
                        className: `rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5 ${ttsEnabled ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" : "border-white/10 bg-white/5 text-[var(--muted)]"}`,
                        children: [
                            ttsSpeaking ? /* Animated bars when actively speaking */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-end gap-[2px] h-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-[2px] rounded-full bg-current animate-[bounce_0.6s_ease-in-out_infinite]",
                                        style: {
                                            height: "60%",
                                            animationDelay: "0ms"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/input/BottomInputBar.tsx",
                                        lineNumber: 147,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-[2px] rounded-full bg-current animate-[bounce_0.6s_ease-in-out_infinite]",
                                        style: {
                                            height: "100%",
                                            animationDelay: "0.1s"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/input/BottomInputBar.tsx",
                                        lineNumber: 148,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-[2px] rounded-full bg-current animate-[bounce_0.6s_ease-in-out_infinite]",
                                        style: {
                                            height: "40%",
                                            animationDelay: "0.2s"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/input/BottomInputBar.tsx",
                                        lineNumber: 149,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-[2px] rounded-full bg-current animate-[bounce_0.6s_ease-in-out_infinite]",
                                        style: {
                                            height: "80%",
                                            animationDelay: "0.15s"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/input/BottomInputBar.tsx",
                                        lineNumber: 150,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/input/BottomInputBar.tsx",
                                lineNumber: 146,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "12",
                                height: "12",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2.5",
                                strokeLinecap: "round",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                        points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
                                    }, void 0, false, {
                                        fileName: "[project]/components/input/BottomInputBar.tsx",
                                        lineNumber: 154,
                                        columnNumber: 17
                                    }, this),
                                    ttsEnabled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M15.54 8.46a5 5 0 0 1 0 7.07"
                                            }, void 0, false, {
                                                fileName: "[project]/components/input/BottomInputBar.tsx",
                                                lineNumber: 157,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M19.07 4.93a10 10 0 0 1 0 14.14"
                                            }, void 0, false, {
                                                fileName: "[project]/components/input/BottomInputBar.tsx",
                                                lineNumber: 158,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "23",
                                        y1: "9",
                                        x2: "17",
                                        y2: "15"
                                    }, void 0, false, {
                                        fileName: "[project]/components/input/BottomInputBar.tsx",
                                        lineNumber: 161,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/input/BottomInputBar.tsx",
                                lineNumber: 153,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: ttsEnabled ? "Audio On" : "Audio Off"
                            }, void 0, false, {
                                fileName: "[project]/components/input/BottomInputBar.tsx",
                                lineNumber: 165,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/input/BottomInputBar.tsx",
                        lineNumber: 135,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/input/BottomInputBar.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-end gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: input,
                        onChange: (e)=>setInput(e.target.value),
                        onKeyDown: (e)=>{
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit();
                            }
                        },
                        placeholder: isRunning ? "Agent is thinking…" : placeholder,
                        disabled: isRunning,
                        rows: 1,
                        className: "flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[14px] text-[var(--text-blue)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-white/25 disabled:opacity-50 transition-colors",
                        style: {
                            minHeight: "44px",
                            maxHeight: "120px"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/input/BottomInputBar.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSubmit,
                        disabled: isRunning || !input.trim(),
                        className: "rounded-full bg-white px-6 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-black disabled:opacity-40 soft-elevate hover:bg-white/90 transition-opacity",
                        children: isRunning ? "…" : "Send"
                    }, void 0, false, {
                        fileName: "[project]/components/input/BottomInputBar.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/input/BottomInputBar.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/input/BottomInputBar.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(BottomInputBar, "WrltYZZ4dV3ycHX7ZDkcbcjHvt8=");
_c = BottomInputBar;
var _c;
__turbopack_context__.k.register(_c, "BottomInputBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useCompanionStatus.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COMPANION_BASE",
    ()=>COMPANION_BASE,
    "useCompanionStatus",
    ()=>useCompanionStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const COMPANION_BASE = typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_COMPANION_URL ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_COMPANION_URL.replace(/\/$/, "") : "http://localhost:3001";
function useCompanionStatus() {
    _s();
    const [connected, setConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [allowed, setAllowed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [root, setRoot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCompanionStatus.useEffect": ()=>{
            let cancelled = false;
            fetch(`${COMPANION_BASE}/api/scope`, {
                method: "GET"
            }).then({
                "useCompanionStatus.useEffect": (res)=>res.json()
            }["useCompanionStatus.useEffect"]).then({
                "useCompanionStatus.useEffect": (data)=>{
                    if (cancelled) return;
                    setConnected(true);
                    setAllowed(Boolean(data?.allowed));
                    setRoot(typeof data?.root === "string" ? data.root : null);
                    setError(null);
                }
            }["useCompanionStatus.useEffect"]).catch({
                "useCompanionStatus.useEffect": ()=>{
                    if (!cancelled) {
                        setConnected(false);
                        setAllowed(false);
                        setRoot(null);
                        setError("Companion not reachable");
                    }
                }
            }["useCompanionStatus.useEffect"]);
            return ({
                "useCompanionStatus.useEffect": ()=>{
                    cancelled = true;
                }
            })["useCompanionStatus.useEffect"];
        }
    }["useCompanionStatus.useEffect"], []);
    return {
        connected,
        allowed,
        root,
        error
    };
}
_s(useCompanionStatus, "E3yIbZ03J61o8uqrkWnHTVMEhps=");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/CompanionStatus.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompanionStatus",
    ()=>CompanionStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useCompanionStatus.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function CompanionStatus() {
    _s();
    const { connected, allowed, root } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanionStatus"])();
    if (!connected) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center gap-1.5 text-[10px] text-emerald-400/90",
        title: root ?? undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_s(CompanionStatus, "xkpLjsFdxR3MhDLm9B5UIP+DcRs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanionStatus"]
    ];
});
_c = CompanionStatus;
var _c;
__turbopack_context__.k.register(_c, "CompanionStatus");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/companion.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Client for ProjectBuild Companion API (localhost:3001).
 * Used by FileTree, CodeEditor, and Builder components.
 */ const COMPANION_BASE = typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_COMPANION_URL ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_COMPANION_URL.replace(/\/$/, "") : "http://localhost:3001";
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/builder/FileTree.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FileTree",
    ()=>FileTree
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$companion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/companion.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useCompanionStatus.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CompanionStatus$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CompanionStatus.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function FileTreeEntry({ entry, basePath, depth, onFileSelect, activePath }) {
    _s();
    const fullPath = basePath ? `${basePath}/${entry.name}` : entry.name;
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [children, setChildren] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isActive = activePath === fullPath;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FileTreeEntry.useEffect": ()=>{
            if (!expanded || !entry.isDirectory) return;
            setLoading(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$companion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["companionList"])(fullPath).then(setChildren).catch({
                "FileTreeEntry.useEffect": ()=>setChildren([])
            }["FileTreeEntry.useEffect"]).finally({
                "FileTreeEntry.useEffect": ()=>setLoading(false)
            }["FileTreeEntry.useEffect"]);
        }
    }["FileTreeEntry.useEffect"], [
        expanded,
        fullPath,
        entry.isDirectory
    ]);
    if (entry.isDirectory) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "select-none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>setExpanded((e)=>!e),
                    className: "flex items-center gap-1.5 w-full px-2 py-1 text-left text-[12px] text-[var(--text-blue)] hover:bg-white/5 rounded transition-colors",
                    style: {
                        paddingLeft: `${depth * 12 + 8}px`
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] text-[var(--muted)] w-3",
                            children: expanded ? "▾" : "▸"
                        }, void 0, false, {
                            fileName: "[project]/components/builder/FileTree.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-2 py-1 text-[11px] text-[var(--muted)]/60",
                        style: {
                            paddingLeft: `${(depth + 1) * 12 + 8}px`
                        },
                        children: "loading…"
                    }, void 0, false, {
                        fileName: "[project]/components/builder/FileTree.tsx",
                        lineNumber: 60,
                        columnNumber: 15
                    }, this) : (children ?? []).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FileTreeEntry, {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: ()=>onFileSelect(fullPath),
        className: `flex items-center gap-1.5 w-full px-2 py-1 text-left text-[12px] rounded transition-colors truncate ${isActive ? "bg-amber-500/20 text-amber-400/90 border-l-2 border-amber-400/60" : "text-[var(--text-blue)] hover:bg-white/5"}`,
        style: {
            paddingLeft: `${depth * 12 + 20}px`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] text-[var(--muted)] w-3",
                children: "·"
            }, void 0, false, {
                fileName: "[project]/components/builder/FileTree.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_s(FileTreeEntry, "0Xq365CRtBUBuy3PNdXfl6rYidA=");
_c = FileTreeEntry;
function FileTree({ onFileSelect, activePath }) {
    _s1();
    const { connected, allowed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanionStatus"])();
    const [rootEntries, setRootEntries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FileTree.useEffect": ()=>{
            if (!connected || !allowed) {
                setRootEntries([]);
                setError(null);
                return;
            }
            setError(null);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$companion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["companionList"])("").then(setRootEntries).catch({
                "FileTree.useEffect": (e)=>{
                    setError(e instanceof Error ? e.message : "Failed to list");
                    setRootEntries([]);
                }
            }["FileTree.useEffect"]);
        }
    }["FileTree.useEffect"], [
        connected,
        allowed
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full border-r border-white/10 bg-black/20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 py-2 border-b border-white/10 flex items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[9px] font-bold uppercase tracking-[0.35em] text-[var(--text-blue)]/50",
                        children: "Files"
                    }, void 0, false, {
                        fileName: "[project]/components/builder/FileTree.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CompanionStatus$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompanionStatus"], {}, void 0, false, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto custom-scrollbar py-2",
                children: [
                    !connected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "px-4 py-3 text-[11px] text-[var(--muted)]/60",
                        children: "Start Companion to browse files."
                    }, void 0, false, {
                        fileName: "[project]/components/builder/FileTree.tsx",
                        lineNumber: 131,
                        columnNumber: 11
                    }, this),
                    connected && !allowed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "px-4 py-3 text-[11px] text-amber-400/80",
                        children: "Set folder scope (COMPANION_ROOT or POST /api/scope)."
                    }, void 0, false, {
                        fileName: "[project]/components/builder/FileTree.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this),
                    connected && allowed && error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "px-4 py-3 text-[11px] text-red-400/80",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/builder/FileTree.tsx",
                        lineNumber: 141,
                        columnNumber: 11
                    }, this),
                    connected && allowed && !error && rootEntries.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "px-4 py-3 text-[11px] text-[var(--muted)]/60",
                        children: "Empty folder."
                    }, void 0, false, {
                        fileName: "[project]/components/builder/FileTree.tsx",
                        lineNumber: 144,
                        columnNumber: 11
                    }, this),
                    connected && allowed && !error && rootEntries.map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FileTreeEntry, {
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
_s1(FileTree, "1byHQr5iPDqWs1YxviJX5vDmIoM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanionStatus"]
    ];
});
_c1 = FileTree;
var _c, _c1;
__turbopack_context__.k.register(_c, "FileTreeEntry");
__turbopack_context__.k.register(_c1, "FileTree");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/builder/CodeEditor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CodeEditor",
    ()=>CodeEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * CodeEditor — public entry point.
 * Wraps CodeEditorInner in a dynamic import with ssr:false to prevent
 * SSR issues with CodeMirror (it reads the DOM on mount).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useCompanionStatus.ts [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const CodeEditorInner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/components/builder/CodeEditorInner.tsx [app-client] (ecmascript, next/dynamic entry, async loader)").then((m)=>m.CodeEditorInner), {
    loadableGenerated: {
        modules: [
            "[project]/components/builder/CodeEditorInner.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full items-center justify-center text-[11px] text-[var(--muted)]/50",
            children: "Loading editor…"
        }, void 0, false, {
            fileName: "[project]/components/builder/CodeEditor.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
});
_c = CodeEditorInner;
function CodeEditor({ filePath }) {
    _s();
    const { connected, allowed } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanionStatus"])();
    const companionConnected = connected && allowed;
    if (!companionConnected) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-9 shrink-0 flex items-center px-4 border-b border-white/10 bg-black/30",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CodeEditorInner, {
        filePath: filePath,
        companionConnected: companionConnected
    }, void 0, false, {
        fileName: "[project]/components/builder/CodeEditor.tsx",
        lineNumber: 47,
        columnNumber: 10
    }, this);
}
_s(CodeEditor, "MOKLg7NVM06uupycHtctJmDqTWk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCompanionStatus"]
    ];
});
_c1 = CodeEditor;
var _c, _c1;
__turbopack_context__.k.register(_c, "CodeEditorInner");
__turbopack_context__.k.register(_c1, "CodeEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/builder/blocks/TextBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextBlock",
    ()=>TextBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function TextBlock({ content, isStreaming }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: `text-[12px] leading-relaxed whitespace-pre-wrap text-[var(--text-blue)] ${isStreaming ? "after:content-['▋'] after:text-amber-400/60 after:animate-pulse" : ""}`,
        children: content
    }, void 0, false, {
        fileName: "[project]/components/builder/blocks/TextBlock.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = TextBlock;
var _c;
__turbopack_context__.k.register(_c, "TextBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/builder/blocks/TodoListBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TodoListBlock",
    ()=>TodoListBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function TaskIcon({ status }) {
    if (status === "done") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-amber-400 text-[11px] leading-none select-none",
            children: "✓"
        }, void 0, false, {
            fileName: "[project]/components/builder/blocks/TodoListBlock.tsx",
            lineNumber: 12,
            columnNumber: 7
        }, this);
    }
    if (status === "in_progress") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "inline-block w-2 h-2 rounded-full bg-amber-400/70 animate-pulse"
        }, void 0, false, {
            fileName: "[project]/components/builder/blocks/TodoListBlock.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this);
    }
    // pending
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-block w-2 h-2 rounded-full border border-[var(--muted)]/30"
    }, void 0, false, {
        fileName: "[project]/components/builder/blocks/TodoListBlock.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c = TaskIcon;
function TodoListBlock({ tasks }) {
    if (tasks.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        className: "space-y-1.5",
        children: tasks.map((task)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "shrink-0 w-3 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TaskIcon, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_c1 = TodoListBlock;
var _c, _c1;
__turbopack_context__.k.register(_c, "TaskIcon");
__turbopack_context__.k.register(_c1, "TodoListBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/builder/blocks/FileExploredBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FileExploredBlock",
    ()=>FileExploredBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function FileExploredBlock({ files, label }) {
    _s();
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setExpanded((v)=>!v),
                className: "flex items-center gap-1.5 text-[10px] text-[var(--muted)]/50 hover:text-[var(--muted)]/70 transition-colors",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-amber-400/40 text-[10px]",
                        children: expanded ? "▾" : "▸"
                    }, void 0, false, {
                        fileName: "[project]/components/builder/blocks/FileExploredBlock.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            expanded && files.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "pl-4 space-y-0.5 border-l border-white/8",
                children: files.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
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
_s(FileExploredBlock, "DuL5jiiQQFgbn7gBKAyxwS/H4Ek=");
_c = FileExploredBlock;
var _c;
__turbopack_context__.k.register(_c, "FileExploredBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/builder/blocks/DiffBlock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DiffBlock",
    ()=>DiffBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function DiffBlock({ filePath, before, after }) {
    _s();
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("after");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg border border-white/10 overflow-hidden text-[11px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-3 py-1.5 bg-black/30 border-b border-white/8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[10px] text-amber-400/60 truncate",
                        children: filePath
                    }, void 0, false, {
                        fileName: "[project]/components/builder/blocks/DiffBlock.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-1 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setView("after"),
                                className: `text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded transition-colors ${view === "after" ? "bg-amber-500/20 text-amber-400/80" : "text-[var(--muted)]/40 hover:text-[var(--muted)]/60"}`,
                                children: "After"
                            }, void 0, false, {
                                fileName: "[project]/components/builder/blocks/DiffBlock.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                className: "overflow-x-auto px-3 py-2.5 font-mono text-[11px] leading-relaxed max-h-48 custom-scrollbar bg-black/20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
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
_s(DiffBlock, "ESl89/LZ05KJASUF26HW2RsEdZU=");
_c = DiffBlock;
var _c;
__turbopack_context__.k.register(_c, "DiffBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/builder/blocks/BlockRenderer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BlockRenderer",
    ()=>BlockRenderer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$blocks$2f$TextBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/blocks/TextBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$blocks$2f$TodoListBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/blocks/TodoListBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$blocks$2f$FileExploredBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/blocks/FileExploredBlock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$blocks$2f$DiffBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/blocks/DiffBlock.tsx [app-client] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: sorted.map((block, i)=>{
            switch(block.type){
                case "file_explored":
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$blocks$2f$FileExploredBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileExploredBlock"], {
                        files: block.files,
                        label: block.label
                    }, i, false, {
                        fileName: "[project]/components/builder/blocks/BlockRenderer.tsx",
                        lineNumber: 44,
                        columnNumber: 15
                    }, this);
                case "todo_list":
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$blocks$2f$TodoListBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TodoListBlock"], {
                        tasks: block.tasks
                    }, i, false, {
                        fileName: "[project]/components/builder/blocks/BlockRenderer.tsx",
                        lineNumber: 51,
                        columnNumber: 20
                    }, this);
                case "text":
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$blocks$2f$TextBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextBlock"], {
                        content: block.content,
                        // Only animate the cursor on the last text block while streaming
                        isStreaming: isStreaming && i === sorted.length - 1
                    }, i, false, {
                        fileName: "[project]/components/builder/blocks/BlockRenderer.tsx",
                        lineNumber: 54,
                        columnNumber: 15
                    }, this);
                case "diff":
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$blocks$2f$DiffBlock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DiffBlock"], {
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
_c = BlockRenderer;
var _c;
__turbopack_context__.k.register(_c, "BlockRenderer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/builder/BuilderBubble.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BuilderBubble",
    ()=>BuilderBubble
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$blocks$2f$BlockRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/blocks/BlockRenderer.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function BuilderBubble({ message, onPromote, promoted = false, isStreaming = false }) {
    _s();
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isAgent = message.authorType === "agent";
    // Resolve blocks — use structured blocks if present, fall back to plain text
    const blocks = message.blocks && message.blocks.length > 0 ? message.blocks : [
        {
            type: "text",
            content: message.text
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `group flex flex-col gap-1 ${isAgent ? "items-start" : "items-end"}`,
        onMouseEnter: ()=>setHovered(true),
        onMouseLeave: ()=>setHovered(false),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--muted)]/50 px-1",
                children: isAgent ? message.agentJobTitle || message.authorName || "Agent" : "You"
            }, void 0, false, {
                fileName: "[project]/components/builder/BuilderBubble.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative max-w-full px-3 py-2.5 rounded-xl border transition-colors ${isAgent ? "bg-white/5 border-white/8 rounded-tl-none" : "bg-amber-500/8 border-amber-500/15 rounded-tr-none"} ${isStreaming ? "border-amber-500/20" : ""}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$blocks$2f$BlockRenderer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockRenderer"], {
                        blocks: blocks,
                        isStreaming: isStreaming
                    }, void 0, false, {
                        fileName: "[project]/components/builder/BuilderBubble.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    !isStreaming && message.actionsApplied && message.actionsApplied.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1.5 flex flex-wrap gap-1",
                        children: message.actionsApplied.map((a, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            isAgent && !isStreaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `px-1 transition-opacity duration-150 ${hovered ? "opacity-100" : "opacity-0"}`,
                children: promoted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[9px] font-bold tracking-widest uppercase text-emerald-400/50",
                    children: "queued"
                }, void 0, false, {
                    fileName: "[project]/components/builder/BuilderBubble.tsx",
                    lineNumber: 82,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
_s(BuilderBubble, "V8YbV+gTZxGliGj1g0fftBlvsq4=");
_c = BuilderBubble;
var _c;
__turbopack_context__.k.register(_c, "BuilderBubble");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/builder/BuilderAgentChat.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BuilderAgentChat",
    ()=>BuilderAgentChat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useMessages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useMessages.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderBubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/BuilderBubble.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
    _s();
    const messages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useMessages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMessages"])(projectId, runId);
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [promotedIds, setPromotedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BuilderAgentChat.useEffect": ()=>{
            bottomRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["BuilderAgentChat.useEffect"], [
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 flex items-center justify-center min-h-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 overflow-y-auto min-h-0 px-3 py-3 space-y-4 custom-scrollbar",
        children: [
            messages.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderBubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BuilderBubble"], {
                    message: m,
                    onPromote: handlePromote,
                    promoted: promotedIds.has(m.id)
                }, m.id, false, {
                    fileName: "[project]/components/builder/BuilderAgentChat.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this)),
            streamingMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderBubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BuilderBubble"], {
                message: makeStreamingMessage(streamingMsg),
                onPromote: ()=>{},
                promoted: false,
                isStreaming: true
            }, "__streaming__", false, {
                fileName: "[project]/components/builder/BuilderAgentChat.tsx",
                lineNumber: 88,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s(BuilderAgentChat, "IvRZk662sgMVwXso89/AaAtzS4s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useMessages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMessages"]
    ];
});
_c = BuilderAgentChat;
var _c;
__turbopack_context__.k.register(_c, "BuilderAgentChat");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/builder/BuilderPromoteModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BuilderPromoteModal",
    ()=>BuilderPromoteModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$companion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/companion.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
    _s();
    const [scope, setScope] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("team");
    const [authority, setAuthority] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("human-led");
    const [summary, setSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(message.text.slice(0, 500));
    const [branch, setBranch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("unknown");
    const [promoting, setPromoting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Fetch current branch from Companion on open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BuilderPromoteModal.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$companion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["companionBranch"])().then({
                "BuilderPromoteModal.useEffect": (b)=>{
                    if (b) setBranch(b);
                }
            }["BuilderPromoteModal.useEffect"]);
        }
    }["BuilderPromoteModal.useEffect"], []);
    // Reset authority to human-led when leaving ledger scope
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BuilderPromoteModal.useEffect": ()=>{
            if (scope !== "ledger") setAuthority("human-led");
        }
    }["BuilderPromoteModal.useEffect"], [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 z-60 flex items-center justify-center bg-black/60 rounded-xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full max-w-sm mx-4 rounded-2xl border border-white/10 bg-[var(--panel)] shadow-2xl px-6 py-5 space-y-5",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/60",
                            children: "Promote"
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-[9px] font-bold tracking-[0.25em] uppercase text-[var(--muted)] block",
                            children: "Destination"
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                "personal",
                                "team",
                                "ledger"
                            ].map((s)=>{
                                const cfg = SCOPE_LABELS[s];
                                const active = scope === s;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setScope(s),
                                    className: `text-left rounded-xl border px-3 py-2.5 transition-colors ${active ? `${cfg.color} bg-white/5` : "border-white/8 text-[var(--muted)]/50 hover:border-white/15 hover:text-[var(--muted)]/70"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `text-[11px] font-bold ${active ? "" : ""}`,
                                            children: cfg.label
                                        }, void 0, false, {
                                            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                                            lineNumber: 158,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                scope === "ledger" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-[9px] font-bold tracking-[0.25em] uppercase text-[var(--muted)] block mb-1.5",
                            children: "Authority"
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                            lineNumber: 173,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                "human-led",
                                "hitl",
                                "agent-autonomous"
                            ].map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-[9px] font-bold tracking-[0.25em] uppercase text-[var(--muted)] block mb-1.5",
                            children: "Summary"
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
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
                activeFilePath && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[9px] text-[var(--muted)]/40 uppercase tracking-wider",
                            children: "File"
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                            lineNumber: 211,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[11px] text-red-400/80",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/components/builder/BuilderPromoteModal.tsx",
                    lineNumber: 217,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2 pt-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
_s(BuilderPromoteModal, "KIyCIzrXQt/d5/cWxQrYcKJ22Xc=");
_c = BuilderPromoteModal;
var _c;
__turbopack_context__.k.register(_c, "BuilderPromoteModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/builder/useCognitivePreload.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useCompanionStatus.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useCognitivePreload(projectId) {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Track whether preamble has been used — only inject on the first message
    const usedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCognitivePreload.useEffect": ()=>{
            let cancelled = false;
            async function load() {
                try {
                    // Fetch scope (includes root) and branch in parallel
                    const [scopeRes, branchRes] = await Promise.allSettled([
                        fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMPANION_BASE"]}/api/scope`).then({
                            "useCognitivePreload.useEffect.load": (r)=>r.json()
                        }["useCognitivePreload.useEffect.load"]),
                        fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useCompanionStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMPANION_BASE"]}/api/git/branch`).then({
                            "useCognitivePreload.useEffect.load": (r)=>r.json()
                        }["useCognitivePreload.useEffect.load"])
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
            return ({
                "useCognitivePreload.useEffect": ()=>{
                    cancelled = true;
                }
            })["useCognitivePreload.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["useCognitivePreload.useEffect"], [
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
_s(useCognitivePreload, "wiO8IgesIM9+bwfku/+QInOTuUg=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/builder/BuilderShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BuilderShell",
    ()=>BuilderShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CompanionStatus$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CompanionStatus.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$FileTree$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/FileTree.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$CodeEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/CodeEditor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderAgentChat$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/BuilderAgentChat.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderPromoteModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/BuilderPromoteModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$useCognitivePreload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/builder/useCognitivePreload.ts [app-client] (ecmascript)");
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
const FILETREE_WIDTH_KEY = "pb_builder_filetree_width";
const FILETREE_DEFAULT = 220;
const FILETREE_MIN = 140;
const FILETREE_MAX = 400;
function readStoredWidth() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const raw = window.localStorage.getItem(FILETREE_WIDTH_KEY);
    const parsed = raw ? parseInt(raw, 10) : NaN;
    return isNaN(parsed) ? FILETREE_DEFAULT : Math.min(FILETREE_MAX, Math.max(FILETREE_MIN, parsed));
}
function BuilderShell({ projectId, runId, onClose }) {
    _s();
    const [activeFilePath, setActiveFilePath] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [promoteTarget, setPromoteTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Cognitive preload — fires once on open, branch + root fetched from Companion
    const { ready: contextReady, loading: contextLoading, buildPreamble } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$useCognitivePreload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCognitivePreload"])(projectId);
    // File tree width — initialised from localStorage, updated on drag
    const [fileTreeWidth, setFileTreeWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(readStoredWidth);
    const latestWidth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(fileTreeWidth);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-[5%] z-50 flex flex-col rounded-xl border border-amber-500/30 bg-[var(--panel)] shadow-2xl overflow-hidden",
        style: {
            minWidth: 800,
            minHeight: 500
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "h-14 shrink-0 flex items-center justify-between px-4 border-b border-white/10 bg-black/30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--text-blue)]/50",
                                children: "builder"
                            }, void 0, false, {
                                fileName: "[project]/components/builder/BuilderShell.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-[var(--muted)]/60",
                                children: "·"
                            }, void 0, false, {
                                fileName: "[project]/components/builder/BuilderShell.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CompanionStatus$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompanionStatus"], {}, void 0, false, {
                                fileName: "[project]/components/builder/BuilderShell.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-[var(--muted)]/60",
                                children: "·"
                            }, void 0, false, {
                                fileName: "[project]/components/builder/BuilderShell.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-[9px] font-bold tracking-widest uppercase transition-colors ${contextLoading ? "text-amber-400/40 animate-pulse" : contextReady ? "text-emerald-400/50" : "text-[var(--muted)]/30"}`,
                                title: contextReady ? "Builder context loaded — branch and scope ready" : "Loading context…",
                                children: contextLoading ? "context…" : contextReady ? "context ready" : "no context"
                            }, void 0, false, {
                                fileName: "[project]/components/builder/BuilderShell.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/builder/BuilderShell.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onClose,
                        className: "rounded-full border border-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors",
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/components/builder/BuilderShell.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/BuilderShell.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex min-h-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "shrink-0 flex flex-col bg-black/20",
                        style: {
                            width: fileTreeWidth
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-h-0 overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$FileTree$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileTree"], {
                                onFileSelect: setActiveFilePath,
                                activePath: activeFilePath
                            }, void 0, false, {
                                fileName: "[project]/components/builder/BuilderShell.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderShell.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/builder/BuilderShell.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onMouseDown: handleDragStart,
                        className: "w-1 shrink-0 cursor-col-resize bg-white/5 hover:bg-amber-500/30 active:bg-amber-500/50 transition-colors",
                        title: "Drag to resize",
                        role: "separator",
                        "aria-orientation": "vertical"
                    }, void 0, false, {
                        fileName: "[project]/components/builder/BuilderShell.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0 flex flex-col border-r border-white/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-h-0 overflow-hidden bg-black/30",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$CodeEditor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeEditor"], {
                                filePath: activeFilePath
                            }, void 0, false, {
                                fileName: "[project]/components/builder/BuilderShell.tsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/builder/BuilderShell.tsx",
                            lineNumber: 135,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/builder/BuilderShell.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-[20%] min-w-[200px] max-w-[320px] flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderAgentChat$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BuilderAgentChat"], {
                                projectId: projectId,
                                runId: runId,
                                onPromote: setPromoteTarget,
                                buildPreamble: buildPreamble
                            }, void 0, false, {
                                fileName: "[project]/components/builder/BuilderShell.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "shrink-0 h-24 border-t border-white/10 bg-black/20 px-3 py-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-[11px] text-[var(--muted)]/50",
                                    children: "Agent bar (agent picker, model, input, send)"
                                }, void 0, false, {
                                    fileName: "[project]/components/builder/BuilderShell.tsx",
                                    lineNumber: 151,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/builder/BuilderShell.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/builder/BuilderShell.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/builder/BuilderShell.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            promoteTarget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderPromoteModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BuilderPromoteModal"], {
                message: promoteTarget,
                projectId: projectId,
                userId: "local",
                activeFilePath: activeFilePath,
                onClose: ()=>setPromoteTarget(null),
                onQueued: (_artifactId, _scope)=>setPromoteTarget(null)
            }, void 0, false, {
                fileName: "[project]/components/builder/BuilderShell.tsx",
                lineNumber: 160,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/builder/BuilderShell.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_s(BuilderShell, "ojnztaXe9k0aaX1q3VH+yn1QAcg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$builder$2f$useCognitivePreload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCognitivePreload"]
    ];
});
_c = BuilderShell;
var _c;
__turbopack_context__.k.register(_c, "BuilderShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/builder/BuilderButtonAndShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BuilderButtonAndShell",
    ()=>BuilderButtonAndShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/BuilderShell.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const RUN_ID_KEY = (projectId)=>`pb_builder_runId_${projectId}`;
_c = RUN_ID_KEY;
function createBuilderRunId(projectId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Resume existing builder run for this project, or create a new one.
    // Only called when Builder is actually opened — not on page load.
    const stored = window.localStorage.getItem(RUN_ID_KEY(projectId));
    if (stored) return stored;
    const newId = `builder_${projectId}_${Date.now()}`;
    window.localStorage.setItem(RUN_ID_KEY(projectId), newId);
    return newId;
}
function BuilderButtonAndShell({ projectId, runId: runIdProp }) {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // builderRunId is null until first open — no orphaned records on page load.
    const [builderRunId, setBuilderRunId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    function handleOpen() {
        if (!builderRunId) {
            // Lazy creation: only create/retrieve runId when Builder is actually opened.
            setBuilderRunId(runIdProp ?? createBuilderRunId(projectId));
        }
        setIsOpen(true);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleOpen,
                className: "rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-amber-400/90 hover:bg-amber-500/20 transition-colors",
                children: "Builder"
            }, void 0, false, {
                fileName: "[project]/components/builder/BuilderButtonAndShell.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            isOpen && builderRunId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-40 bg-black/50",
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/components/builder/BuilderButtonAndShell.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-50 flex items-center justify-center p-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BuilderShell"], {
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
_s(BuilderButtonAndShell, "z9/ONh7hIT4NFxrO9qGIMPPHN8c=");
_c1 = BuilderButtonAndShell;
var _c, _c1;
__turbopack_context__.k.register(_c, "RUN_ID_KEY");
__turbopack_context__.k.register(_c1, "BuilderButtonAndShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/room/ProjectRoom.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProjectRoom",
    ()=>ProjectRoom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useTracks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useTracks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useTTS$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useTTS.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$ProjectSurfaceShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/ProjectSurfaceShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$messages$2f$MessageFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/messages/MessageFeed.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$input$2f$BottomInputBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/input/BottomInputBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderButtonAndShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/builder/BuilderButtonAndShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
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
;
;
;
const RUN_ID_KEY = (projectId)=>`pb_runId_${projectId}`;
_c = RUN_ID_KEY;
function getOrCreateRunId(projectId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = window.localStorage.getItem(RUN_ID_KEY(projectId));
    if (stored) return stored;
    const newId = `run_${projectId}_${Date.now()}`;
    window.localStorage.setItem(RUN_ID_KEY(projectId), newId);
    return newId;
}
function ProjectRoom({ projectId }) {
    _s();
    const tracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useTracks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTracks"])(projectId);
    const [agents, setAgents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedAgentId, setSelectedAgentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedModel, setSelectedModel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("gpt-4o");
    const [isRunning, setIsRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [runId, setRunId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [runError, setRunError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { supported: ttsSupported, enabled: ttsEnabled, speaking: ttsSpeaking, speak, toggle: toggleTTS } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useTTS$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTTS"])({
        rate: 1,
        pitch: 1
    });
    // Load run ID client-side (avoids SSR mismatch)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectRoom.useEffect": ()=>{
            setRunId(getOrCreateRunId(projectId));
        }
    }["ProjectRoom.useEffect"], [
        projectId
    ]);
    // Load agents from Core via our API proxy
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectRoom.useEffect": ()=>{
            fetch(`/api/agents/list?projectId=${projectId}`).then({
                "ProjectRoom.useEffect": (r)=>r.json()
            }["ProjectRoom.useEffect"]).then({
                "ProjectRoom.useEffect": (d)=>{
                    const items = d.items ?? [];
                    setAgents(items);
                    if (items.length > 0) setSelectedAgentId(items[0].id);
                }
            }["ProjectRoom.useEffect"]).catch({
                "ProjectRoom.useEffect": ()=>{}
            }["ProjectRoom.useEffect"]);
        }
    }["ProjectRoom.useEffect"], [
        projectId
    ]);
    const handleSend = async (text)=>{
        if (!runId) return;
        setIsRunning(true);
        setRunError(null);
        // Write human message to Firestore immediately
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "pb_messages"), {
            projectId,
            runId,
            text,
            authorType: "human",
            authorName: "You",
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
        try {
            const res = await fetch("/api/agent/run", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    agentId: selectedAgentId,
                    message: text,
                    memoryScope: "working",
                    runId,
                    projectId
                })
            });
            const data = await res.json();
            // 429 = turn cap or rate limit — surface the reason explicitly
            if (res.status === 429) {
                const reason = data.error ?? "Turn limit reached. Start a new conversation or contact your admin to adjust limits.";
                setRunError(reason);
                setIsRunning(false);
                return;
            }
            if (data.reply) {
                // Collect applied board actions for display in the bubble
                const boardActions = (data.actions ?? []).filter((a)=>"clientExecute" in a && a.ok === true);
                const actionsApplied = boardActions.map((a)=>{
                    if (a.type === "create_board_task") return `Created task: ${a.payload.title}`;
                    if (a.type === "move_board_task") return `Moved task`;
                    if (a.type === "assign_board_task") return `Assigned task`;
                    return a.type;
                });
                // Write agent reply to Firestore
                const guardrails = data.trace?.guardrails ?? {};
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "pb_messages"), {
                    projectId,
                    runId,
                    text: data.reply,
                    authorType: "agent",
                    agentId: selectedAgentId,
                    agentJobTitle: agents.find((a)=>a.id === selectedAgentId)?.jobTitle ?? "Agent",
                    truthPosture: data.truthPosture ?? "inferred",
                    actionsApplied,
                    ...guardrails.inputTruncated && {
                        inputTruncated: true
                    },
                    ...guardrails.maxTurnsPerMeeting != null && {
                        maxTurnsPerMeeting: guardrails.maxTurnsPerMeeting
                    },
                    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                });
                // Apply board actions if any
                if (boardActions.length > 0) {
                    // Board hook lives on the board page — post a custom event so board can react
                    window.dispatchEvent(new CustomEvent("pb:boardActions", {
                        detail: boardActions
                    }));
                }
            }
        } catch (e) {
            console.error("[Room] run failed:", e);
            setRunError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
        } finally{
            setIsRunning(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$ProjectSurfaceShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProjectSurfaceShell"], {
        projectId: projectId,
        breadcrumb: "Room",
        headerActions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$builder$2f$BuilderButtonAndShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BuilderButtonAndShell"], {
                    projectId: projectId,
                    runId: runId
                }, void 0, false, {
                    fileName: "[project]/components/room/ProjectRoom.tsx",
                    lineNumber: 146,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: `/projects/${projectId}/ledger`,
                    className: "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors",
                    children: "Ledger"
                }, void 0, false, {
                    fileName: "[project]/components/room/ProjectRoom.tsx",
                    lineNumber: 147,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: `/projects/${projectId}/board`,
                    className: "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors",
                    children: "PM Board"
                }, void 0, false, {
                    fileName: "[project]/components/room/ProjectRoom.tsx",
                    lineNumber: 153,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: `/projects/${projectId}/tracks/new`,
                    className: "bg-white text-black px-6 py-2 rounded-full font-bold text-[10px] tracking-widest uppercase soft-elevate",
                    children: "New Track"
                }, void 0, false, {
                    fileName: "[project]/components/room/ProjectRoom.tsx",
                    lineNumber: 159,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true),
        center: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                isRunning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-12 pt-4 shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[11px] text-[var(--muted)] animate-pulse",
                        children: [
                            agents.find((a)=>a.id === selectedAgentId)?.jobTitle ?? "Agent",
                            " is thinking…"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/room/ProjectRoom.tsx",
                        lineNumber: 171,
                        columnNumber: 15
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/components/room/ProjectRoom.tsx",
                    lineNumber: 170,
                    columnNumber: 13
                }, void 0),
                runError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-12 mt-4 shrink-0 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 flex items-start justify-between gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[12px] text-amber-300/80 leading-relaxed",
                            children: runError
                        }, void 0, false, {
                            fileName: "[project]/components/room/ProjectRoom.tsx",
                            lineNumber: 179,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setRunError(null),
                            className: "shrink-0 text-[10px] text-[var(--muted)] hover:text-[var(--text-blue)] transition-colors",
                            children: "X"
                        }, void 0, false, {
                            fileName: "[project]/components/room/ProjectRoom.tsx",
                            lineNumber: 180,
                            columnNumber: 15
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/room/ProjectRoom.tsx",
                    lineNumber: 178,
                    columnNumber: 13
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-12 pt-4 text-xs uppercase tracking-[0.28em] text-[var(--text-blue)]",
                    children: "Room / Project conversation"
                }, void 0, false, {
                    fileName: "[project]/components/room/ProjectRoom.tsx",
                    lineNumber: 189,
                    columnNumber: 11
                }, void 0),
                runId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$messages$2f$MessageFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageFeed"], {
                    projectId: projectId,
                    runId: runId,
                    ttsEnabled: ttsEnabled,
                    onSpeak: speak
                }, void 0, false, {
                    fileName: "[project]/components/room/ProjectRoom.tsx",
                    lineNumber: 194,
                    columnNumber: 13
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-12 pb-10 flex flex-col gap-6 pt-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$input$2f$BottomInputBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BottomInputBar"], {
                        agents: agents,
                        selectedAgentId: selectedAgentId,
                        selectedModel: selectedModel,
                        onAgentChange: setSelectedAgentId,
                        onModelChange: setSelectedModel,
                        onSend: handleSend,
                        isRunning: isRunning,
                        placeholder: "Message the room…",
                        ttsEnabled: ttsEnabled,
                        ttsSupported: ttsSupported,
                        ttsSpeaking: ttsSpeaking,
                        onTTSToggle: toggleTTS
                    }, void 0, false, {
                        fileName: "[project]/components/room/ProjectRoom.tsx",
                        lineNumber: 203,
                        columnNumber: 13
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/components/room/ProjectRoom.tsx",
                    lineNumber: 202,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true),
        right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-5 pt-5 pb-3 border-b border-white/10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/60",
                                    children: "Tracks"
                                }, void 0, false, {
                                    fileName: "[project]/components/room/ProjectRoom.tsx",
                                    lineNumber: 224,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/projects/${projectId}/tracks/new`,
                                    className: "text-[9px] font-bold tracking-widest uppercase text-[var(--muted)] hover:text-[var(--text-blue)] transition-colors",
                                    children: "+ New"
                                }, void 0, false, {
                                    fileName: "[project]/components/room/ProjectRoom.tsx",
                                    lineNumber: 227,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/room/ProjectRoom.tsx",
                            lineNumber: 223,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1",
                            children: tracks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] text-[var(--muted)]/60",
                                children: "No tracks yet."
                            }, void 0, false, {
                                fileName: "[project]/components/room/ProjectRoom.tsx",
                                lineNumber: 236,
                                columnNumber: 17
                            }, void 0) : tracks.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/projects/${projectId}/tracks/${t.id}`,
                                    className: "block px-3 py-2 rounded-lg text-[12px] text-[var(--text-blue)] hover:bg-white/5 transition-colors truncate",
                                    children: t.name
                                }, t.id, false, {
                                    fileName: "[project]/components/room/ProjectRoom.tsx",
                                    lineNumber: 239,
                                    columnNumber: 19
                                }, void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/room/ProjectRoom.tsx",
                            lineNumber: 234,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/room/ProjectRoom.tsx",
                    lineNumber: 222,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-5 py-4 border-b border-white/10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/60 block mb-2",
                            children: "Board"
                        }, void 0, false, {
                            fileName: "[project]/components/room/ProjectRoom.tsx",
                            lineNumber: 252,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: `/projects/${projectId}/board`,
                            className: "text-[11px] text-[var(--muted)] hover:text-[var(--text-blue)] transition-colors",
                            children: "Open board →"
                        }, void 0, false, {
                            fileName: "[project]/components/room/ProjectRoom.tsx",
                            lineNumber: 255,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/room/ProjectRoom.tsx",
                    lineNumber: 251,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-5 py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/60 block mb-2",
                            children: "Ledger"
                        }, void 0, false, {
                            fileName: "[project]/components/room/ProjectRoom.tsx",
                            lineNumber: 264,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: `/projects/${projectId}/ledger`,
                            className: "text-[11px] text-[var(--muted)] hover:text-[var(--text-blue)] transition-colors",
                            children: "Open ledger →"
                        }, void 0, false, {
                            fileName: "[project]/components/room/ProjectRoom.tsx",
                            lineNumber: 267,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/room/ProjectRoom.tsx",
                    lineNumber: 263,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/components/room/ProjectRoom.tsx",
            lineNumber: 221,
            columnNumber: 9
        }, void 0)
    }, void 0, false, {
        fileName: "[project]/components/room/ProjectRoom.tsx",
        lineNumber: 141,
        columnNumber: 5
    }, this);
}
_s(ProjectRoom, "vAb7woSFIVE2cubUqXVwj8ScVBc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useTracks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTracks"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useTTS$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTTS"]
    ];
});
_c1 = ProjectRoom;
var _c, _c1;
__turbopack_context__.k.register(_c, "RUN_ID_KEY");
__turbopack_context__.k.register(_c1, "ProjectRoom");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_fb81406e._.js.map