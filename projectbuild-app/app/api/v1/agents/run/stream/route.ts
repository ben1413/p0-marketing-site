import { NextRequest, NextResponse } from "next/server";
import { runAgentStream } from "@/lib/p0/coreClient";
import type { RunInput } from "@/lib/p0/coreClient";
import { prependProjectCognitiveContext } from "@/lib/p0/projectCognitiveContext";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/v1/agents/run/stream
 *
 * Proxies Core's SSE stream to the browser.
 * Events arrive as: data: {type, ...}\n\n
 * Terminated by:    data: [DONE]\n\n
 *
 * The client (useBuilderStream) consumes this via fetch + ReadableStream —
 * EventSource is GET-only so can't be used here.
 */
export async function POST(req: NextRequest) {
  let body: RunInput;
  try {
    body = (await req.json()) as RunInput;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.message?.trim()) {
    return NextResponse.json({ ok: false, error: "message is required" }, { status: 400 });
  }

  let coreRes: Response;
  try {
    coreRes = await runAgentStream({
      ...body,
      message: await prependProjectCognitiveContext(body.message, body.projectId),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Stream request failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 502 });
  }

  if (!coreRes.ok || !coreRes.body) {
    return NextResponse.json(
      { ok: false, error: `Core stream returned ${coreRes.status}` },
      { status: 502 }
    );
  }

  // Proxy the SSE body straight through — no buffering
  return new Response(coreRes.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no", // disable nginx buffering in prod
    },
  });
}
