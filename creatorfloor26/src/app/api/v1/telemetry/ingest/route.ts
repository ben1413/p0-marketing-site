import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

export const runtime = "nodejs";

/**
 * In-experience telemetry from Roblox HttpService (or other clients).
 * Optional header: x-cf-secret must match CF_TELEMETRY_SECRET when set.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.CF_TELEMETRY_SECRET?.trim();
  if (secret) {
    const got = req.headers.get("x-cf-secret")?.trim();
    if (got !== secret) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const o = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const gameId = typeof o.gameId === "string" ? o.gameId : "";
  const event = typeof o.event === "string" ? o.event : "metric";
  if (!gameId) {
    return NextResponse.json({ ok: false, error: "gameId required" }, { status: 422 });
  }

  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json(
      {
        ok: true,
        accepted: true,
        stored: false,
        hint: "Firebase Admin not configured — event accepted but not persisted",
      },
      { status: 202 }
    );
  }

  try {
    const ref = await adminDb.collection("cf_telemetry_events").add({
      gameId,
      event,
      payload: o,
      receivedAt: FieldValue.serverTimestamp(),
    });
    return NextResponse.json({ ok: true, id: ref.id });
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "Store failed",
      },
      { status: 500 }
    );
  }
}
