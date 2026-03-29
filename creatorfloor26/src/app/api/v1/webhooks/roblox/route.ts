import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Roblox / platform webhook receiver — extend to validate signatures and route to
 * auto-Promote or telemetry (see CREATORFLOOR_DIRECTION.md).
 */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  return NextResponse.json({
    ok: true,
    received: true,
    hint: "Wire platform events to Core gaming APIs or cf_telemetry_events",
    sample: body,
  });
}
