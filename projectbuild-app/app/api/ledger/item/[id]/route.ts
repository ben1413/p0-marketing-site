import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const baseUrl = process.env.P0_CORE_BASE_URL;
  if (!baseUrl) {
    return NextResponse.json({ ok: false, error: "P0_CORE_BASE_URL not configured" }, { status: 503 });
  }

  const headers: Record<string, string> = { "x-request-id": crypto.randomUUID() };
  const apiKey = process.env.P0_CORE_API_KEY;
  const bypass = process.env.DEV_BYPASS_SECRET;
  if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
  else if (bypass) headers["x-dev-bypass"] = bypass;

  try {
    const res = await fetch(`${baseUrl}/api/v1/ledger/${id}`, { headers });
    const data = await res.json();
    return NextResponse.json({ ok: res.ok, ...data }, { status: res.status });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "Internal error" }, { status: 500 });
  }
}
