import { NextRequest, NextResponse } from "next/server";
import {
  fetchWithCoreFallback,
  getCoreBaseUrl,
  getDevBypassProjectId,
} from "@/lib/core/config";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const baseUrl = getCoreBaseUrl();
    if (!baseUrl) {
      return NextResponse.json(
        { ok: false, error: "P0_CORE_BASE_URL is not set" },
        { status: 500 }
      );
    }

    const targetUrl = `${baseUrl}/api/v1/agents/run/simple/stream`;
    const body = await req.text();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    };

    const incomingAuth = req.headers.get("authorization");
    if (incomingAuth?.startsWith("Bearer ")) {
      headers["Authorization"] = incomingAuth;
    } else {
      const apiKey = process.env.P0_CORE_API_KEY;
      if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
      else if (
        process.env.NODE_ENV === "development" &&
        process.env.DEV_BYPASS_SECRET
      ) {
        headers["x-dev-bypass"] = process.env.DEV_BYPASS_SECRET;
        headers["x-dev-bypass-project"] = getDevBypassProjectId();
      }
    }

    const res = await fetchWithCoreFallback(targetUrl, {
      method: "POST",
      headers,
      body,
      cache: "no-store",
    });

    return new NextResponse(res.body, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("Content-Type") || "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Stream failed" },
      { status: 500 }
    );
  }
}
