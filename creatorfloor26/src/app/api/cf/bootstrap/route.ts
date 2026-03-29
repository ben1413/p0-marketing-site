import { NextResponse } from "next/server";
import { runGameInit } from "@/lib/init/gameInit";
import type { CreatorKitId, GamePlatform } from "@/lib/init/types";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const bearerFromHeader =
      authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";

    const body = (await req.json().catch(() => ({}))) as {
      name?: string;
      platform?: GamePlatform;
      kit?: CreatorKitId;
    };

    const name =
      typeof body.name === "string" && body.name.trim()
        ? body.name.trim()
        : "Untitled game";
    const platform: GamePlatform =
      body.platform === "uefn" ? "uefn" : "roblox";
    const kit: CreatorKitId =
      body.kit &&
      [
        "tycoon",
        "obby",
        "rpg",
        "simulator",
        "social",
        "starter",
      ].includes(body.kit)
        ? body.kit
        : "starter";

    const bearerToken =
      bearerFromHeader ||
      process.env.P0_CORE_BEARER_TOKEN?.trim() ||
      "";

    if (!bearerToken) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Missing Core auth. Send Authorization: Bearer <Firebase ID token> or set P0_CORE_BEARER_TOKEN in .env.local.",
        },
        { status: 401 }
      );
    }

    const result = await runGameInit({
      name,
      platform,
      kit,
      bearerToken,
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "Bootstrap failed",
      },
      { status: 500 }
    );
  }
}
