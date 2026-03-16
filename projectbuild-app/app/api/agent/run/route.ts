import { NextRequest, NextResponse } from "next/server";
import { runAgentSimple } from "@/lib/p0/coreClient";
import type { RunInput } from "@/lib/p0/coreClient";
import { prependProjectCognitiveContext } from "@/lib/p0/projectCognitiveContext";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RunInput;
    if (!body.message?.trim()) {
      return NextResponse.json({ ok: false, error: "message is required" }, { status: 400 });
    }
    const result = await runAgentSimple({
      ...body,
      message: await prependProjectCognitiveContext(body.message, body.projectId),
    });
    return NextResponse.json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Run failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
