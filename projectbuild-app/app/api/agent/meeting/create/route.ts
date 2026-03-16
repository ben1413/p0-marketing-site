import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { participantAgentIds, name, projectId } = body as {
      participantAgentIds?: string[];
      name?: string;
      projectId?: string;
    };

    if (!participantAgentIds || participantAgentIds.length === 0) {
      return NextResponse.json({ error: "participantAgentIds required" }, { status: 400 });
    }

    const baseUrl = process.env.P0_CORE_BASE_URL;
    if (!baseUrl) {
      return NextResponse.json({ error: "P0_CORE_BASE_URL not configured" }, { status: 503 });
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-request-id": crypto.randomUUID(),
    };
    const apiKey = process.env.P0_CORE_API_KEY;
    const bypass = process.env.DEV_BYPASS_SECRET;
    if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
    else if (bypass) headers["x-dev-bypass"] = bypass;

    const res = await fetch(`${baseUrl}/api/v1/meetings`, {
      method: "POST",
      headers,
      body: JSON.stringify({ participantAgentIds, name, projectId }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data?.error ?? "Failed to create meeting" }, { status: res.status });
    }

    return NextResponse.json({ ok: true, meetingId: data?.meeting?.id ?? data?.id });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Internal error" }, { status: 500 });
  }
}
