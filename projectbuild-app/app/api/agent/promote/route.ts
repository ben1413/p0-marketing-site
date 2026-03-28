import { NextRequest, NextResponse } from "next/server";
import { promoteToLedger, ensureEvaluation } from "@/lib/p0/coreClient";
import type { PromotePayload } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<PromotePayload> & { projectId?: string };

    if (!body.summary?.trim()) {
      return NextResponse.json({ ok: false, error: "summary is required" }, { status: 400 });
    }
    const actorRaw = body.actor;
    const actorValid =
      (typeof actorRaw === "string" && actorRaw.trim().length > 0) ||
      (typeof actorRaw === "object" && actorRaw !== null && typeof (actorRaw as { id?: string }).id === "string");
    if (!actorValid) {
      return NextResponse.json({ ok: false, error: "actor is required" }, { status: 400 });
    }

    // Block agent_autonomous + unknown (client-side guard + server belt-and-suspenders)
    if (body.authorityMode === "agent_autonomous" && body.truthPosture === "unknown") {
      return NextResponse.json(
        { ok: false, error: "agent_autonomous is not allowed when truth posture is unknown." },
        { status: 422 }
      );
    }

    let evaluationId = body.evaluationId;
    if (!evaluationId && body.projectId) {
      evaluationId = await ensureEvaluation(body.projectId);
    }
    if (!evaluationId) {
      return NextResponse.json({ ok: false, error: "evaluationId is required" }, { status: 400 });
    }

    const payload: PromotePayload = {
      evaluationId,
      summary: body.summary!,
      authorityMode: body.authorityMode ?? "human_led",
      actor: body.actor!,
      type: body.type,
      tags: body.tags,
      projectId: body.projectId,
      runId: body.runId,
      truthPosture: body.truthPosture,
    };

    const result = await promoteToLedger(payload);
    return NextResponse.json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Promote failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
