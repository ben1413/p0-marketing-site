import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, voice, model } = await req.json() as {
      text?: string;
      voice?: string;
      model?: string;
    };

    if (!text?.trim()) {
      return NextResponse.json({ error: "text required" }, { status: 400 });
    }

    const baseUrl = process.env.P0_CORE_BASE_URL;
    if (!baseUrl) {
      return NextResponse.json({ error: "P0_CORE_BASE_URL not configured" }, { status: 503 });
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-request-id": crypto.randomUUID(),
      // Request streaming from Core
      "X-TTS-Stream": "true",
    };
    const apiKey = process.env.P0_CORE_API_KEY;
    const bypass = process.env.DEV_BYPASS_SECRET;
    if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
    else if (bypass) headers["x-dev-bypass"] = bypass;

    const res = await fetch(`${baseUrl}/api/v1/voice/speak?stream=true`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        text,
        ...(voice && { voice }),
        ...(model && { model }),
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: (err as { error?: string }).error ?? "TTS failed" },
        { status: res.status }
      );
    }

    const contentType = res.headers.get("content-type") ?? "audio/mpeg";

    // Pipe the stream straight through — don't buffer
    return new NextResponse(res.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Internal error" },
      { status: 500 }
    );
  }
}
