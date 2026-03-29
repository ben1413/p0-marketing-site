import { NextRequest, NextResponse } from "next/server";
import {
  fetchExperienceStub,
  getOpenCloudConfigFromEnv,
} from "@/lib/roblox/openCloud";

export const runtime = "nodejs";

/** GET /api/roblox/universe/:id — stub Open Cloud passthrough when ROBLOX_API_KEY is set. */
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const config = getOpenCloudConfigFromEnv();
  if (!config) {
    return NextResponse.json(
      {
        ok: false,
        error: "ROBLOX_API_KEY not configured",
        hint: "Set in .env.local for Open Cloud calls",
      },
      { status: 503 }
    );
  }
  const result = await fetchExperienceStub(id, config);
  try {
    const json = JSON.parse(result.body) as unknown;
    return NextResponse.json(json, { status: result.status });
  } catch {
    return NextResponse.json(
      { ok: result.ok, status: result.status, raw: result.body.slice(0, 2000) },
      { status: result.status }
    );
  }
}
