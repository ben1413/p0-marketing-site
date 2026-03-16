import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const baseUrl = process.env.P0_CORE_BASE_URL;
  if (!baseUrl) {
    return NextResponse.json({ ok: false, error: "P0_CORE_BASE_URL not configured" }, { status: 503 });
  }

  const headers: Record<string, string> = { "x-request-id": crypto.randomUUID() };
  const apiKey = process.env.P0_CORE_API_KEY;
  const bypass = process.env.DEV_BYPASS_SECRET;
  if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
  else if (bypass) headers["x-dev-bypass"] = bypass;

  const url = new URL(`${baseUrl}/api/v1/ledger`);
  // Forward supported query params
  ["projectId", "limit", "offset", "type", "tags", "authorityMode", "runId"].forEach((k) => {
    const v = searchParams.get(k);
    if (v) url.searchParams.set(k, v);
  });

  try {
    const res = await fetch(url.toString(), { headers });
    const data = await res.json();
    return NextResponse.json({ ok: res.ok, ...data }, { status: res.status });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "Internal error" }, { status: 500 });
  }
}
