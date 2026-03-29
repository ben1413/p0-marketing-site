import { NextResponse } from "next/server";
import {
  fetchWithCoreFallback,
  getCoreBaseUrl,
  getDevBypassProjectId,
} from "@/lib/core/config";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(req: Request) {
  try {
    const baseUrl = getCoreBaseUrl();
    if (!baseUrl) {
      return NextResponse.json(
        { ok: false, error: "P0_CORE_BASE_URL is not set" },
        { status: 500 }
      );
    }

    const targetUrl = `${baseUrl}/api/v1/agents/run/simple`;
    const body = await req.json();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const incomingAuth = req.headers.get("authorization");
    if (incomingAuth?.startsWith("Bearer ")) {
      headers["Authorization"] = incomingAuth;
    } else {
      const apiKey = process.env.P0_CORE_API_KEY;
      if (apiKey) {
        headers["Authorization"] = `Bearer ${apiKey}`;
      } else if (
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
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Run failed" },
      { status: 500 }
    );
  }
}
