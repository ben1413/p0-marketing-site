import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import { builderPromoteSchema } from "@/lib/builder/builderPromoteSchema";
import {
  ensureEvaluationAsUser,
  gamingDecisionsProposeAsUser,
  promoteToLedgerAsUser,
} from "@/lib/core/ledgerClient";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
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
  const authHeader = req.headers.get("authorization");
  const {
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
    evaluationId,
    agent,
    gameId,
    governanceTier,
    relatedGamingDecisionId,
    gamingDecisionType,
    designerMode,
    runId,
    canvasElementCount,
    canvasSnapshot,
    contentType,
    ledgerType,
  } = payload;

  try {
    let promoteArtifactId: string;

    if (scope === "personal" || scope === "team") {
      try {
        const collection =
          scope === "personal" ? "cf_builder_personal" : "cf_builder_team";
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
          designerMode: designerMode ?? false,
          runId: runId ?? null,
          canvasElementCount: canvasElementCount ?? null,
          canvasSnapshot: canvasSnapshot ?? null,
          contentType: contentType ?? null,
          createdAt: FieldValue.serverTimestamp(),
        });
        promoteArtifactId = ref.id;
      } catch (e) {
        return NextResponse.json(
          {
            ok: false,
            error:
              e instanceof Error
                ? e.message
                : "Firestore write failed — configure Firebase Admin for soft promotes",
          },
          { status: 503 }
        );
      }
    } else if (scope === "gaming") {
      const gid = gameId?.trim();
      if (!gid) {
        return NextResponse.json(
          { ok: false, error: "gameId is required for gaming scope" },
          { status: 422 }
        );
      }
      const tier = governanceTier ?? "promoted";
      const type = gamingDecisionType ?? "content";
      const proposedActions: Record<string, unknown> = {
        summary,
        branch,
        filePaths,
        source: "creatorfloor_builder",
      };
      if (relatedGamingDecisionId?.trim()) {
        proposedActions.relatedGamingDecisionId = relatedGamingDecisionId.trim();
      }
      const proposeBody = {
        gameId: gid,
        projectId,
        type,
        title: summary.slice(0, 200),
        description: summary,
        proposedActions,
        governanceTier: tier,
        recommendedAuthorityMode:
          authority === "hitl"
            ? "human_in_the_loop"
            : authority === "agent-autonomous"
              ? "agent_autonomous"
              : "human_led",
        proposedBy: { type: "human" as const, id: userId },
      };
      const result = await gamingDecisionsProposeAsUser(authHeader, proposeBody);
      if (!result.ok) {
        return NextResponse.json(
          { ok: false, error: result.error },
          { status: result.status >= 400 ? result.status : 502 }
        );
      }
      const proposal = result.proposal as { id?: string } | undefined;
      promoteArtifactId = proposal?.id ?? `gaming_${Date.now()}`;

      try {
        const ref = adminDb.collection("cf_builder_team").doc();
        await ref.set({
          projectId,
          userId,
          branch,
          scope: "gaming",
          gamingDecisionProposalId: promoteArtifactId,
          summary,
          filePaths,
          createdAt: FieldValue.serverTimestamp(),
        });
      } catch {
        /* optional mirror */
      }
    } else {
      const resolvedEvalId =
        evaluationId ?? (await ensureEvaluationAsUser(authHeader, projectId));

      const result = await promoteToLedgerAsUser(authHeader, {
        evaluationId: resolvedEvalId,
        summary,
        authorityMode:
          authority === "hitl"
            ? "human_in_the_loop"
            : authority === "agent-autonomous"
              ? "agent_autonomous"
              : "human_led",
        actor: preparedByAgent ? (agent ?? "agent") : userId,
        type: ledgerType ?? "code",
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

    const checkpointKey = `${projectId}|${userId}|${branch}`;
    try {
      await adminDb.collection("cf_builder_checkpoints").doc(checkpointKey).set(
        {
          projectId,
          userId,
          branch,
          checkpointTo,
          promoteArtifactId,
          scope,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    } catch {
      /* checkpoints optional without admin */
    }

    return NextResponse.json({ ok: true, promoteArtifactId }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "Promote failed",
      },
      { status: 500 }
    );
  }
}
