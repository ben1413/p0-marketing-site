import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import { builderPromoteSchema } from "@/lib/builder/builderPromoteSchema";
import { promoteToLedger, ensureEvaluation } from "@/lib/p0/coreClient";

/**
 * POST /api/v1/builder/promote
 *
 * Routes the promote to the correct target based on scope:
 *   personal  → pb_builder_personal  (user's own draft bucket)
 *   team      → pb_builder_team      (shared visibility bucket)
 *   ledger    → Core /api/v1/ledger/promote (formal approval flow)
 *
 * All scopes write a checkpoint to pb_builder_checkpoints
 * keyed by projectId|userId|branch, recording checkpointTo.
 *
 * Auth: The P0_CORE_API_KEY used by coreClient must be a managed key
 * created with role: "agent_runner" via POST /api/v1/keys.
 * Core enforces the role on arrival — this route validates the payload only.
 *
 * Returns: { ok: true, promoteArtifactId: string } on success (201)
 */
export async function POST(req: NextRequest) {
  // 1. Parse and validate payload
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = builderPromoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const payload = parsed.data;
  const { projectId, userId, branch, scope, authority, summary, filePaths,
          preparedByAgent, checkpointFrom, checkpointTo, evaluationId, agent } = payload;

  try {
    let promoteArtifactId: string;

    if (scope === "personal" || scope === "team") {
      // 2a. Soft bucket write — Firestore only, no Core call
      const collection = scope === "personal" ? "pb_builder_personal" : "pb_builder_team";
      const ref = adminDb.collection(collection).doc();
      await ref.set({
        projectId,
        userId,
        branch,
        scope,
        authority,
        summary,
        filePaths,
        preparedByAgent,
        checkpointFrom,
        checkpointTo,
        createdAt: FieldValue.serverTimestamp(),
      });
      promoteArtifactId = ref.id;

    } else {
      // 2b. Ledger scope — goes through Core
      // Resolve evaluationId: use provided value or auto-create one for the project
      const resolvedEvalId = evaluationId ?? await ensureEvaluation(projectId);

      const result = await promoteToLedger({
        evaluationId: resolvedEvalId,
        summary,
        authorityMode: authority === "hitl" ? "human_in_the_loop"
          : authority === "agent-autonomous" ? "agent_autonomous"
          : "human_led",
        actor: preparedByAgent
          ? { type: "agent" as const, id: agent ?? "agent" }
          : { type: "human" as const, id: userId },
        type: "code",
        tags: [branch, ...filePaths.slice(0, 3)],
        projectId,
        truthPosture: "inferred",
      });

      if (!result.ok) {
        return NextResponse.json(
          { ok: false, error: result.error ?? "Core promote failed" },
          { status: 502 }
        );
      }

      promoteArtifactId = result.id ?? resolvedEvalId;
    }

    // 3. Write checkpoint — always, for all scopes
    // Composite key: projectId|userId|branch — two engineers on the same project
    // on different branches get independent checkpoints.
    const checkpointKey = `${projectId}|${userId}|${branch}`;
    await adminDb.collection("pb_builder_checkpoints").doc(checkpointKey).set(
      {
        projectId,
        userId,
        branch,
        checkpointTo,
        lastScope: scope,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true, promoteArtifactId }, { status: 201 });

  } catch (err) {
    const msg = err instanceof Error ? err.message : "Promote failed";
    console.error("[builder/promote]", err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
