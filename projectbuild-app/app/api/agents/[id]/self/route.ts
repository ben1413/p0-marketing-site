import { NextRequest, NextResponse } from "next/server";
import { getAgentSelf } from "@/lib/p0/coreClient";

export const runtime = "nodejs";

/**
 * GET /api/agents/[id]/self
 *
 * BFF proxy → Core GET /api/v1/agents/{id}/self.
 * Returns the agent self-awareness payload used for contextual opening messages.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ ok: false, error: "Missing agent id" }, { status: 400 });
    }

    const result = await getAgentSelf(id);
    if (!result) {
      return NextResponse.json({ ok: false, error: "Agent self not available" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to fetch agent self";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
