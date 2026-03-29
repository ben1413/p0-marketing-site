/**
 * conclave_rollback — Roll back a deployment.
 * Creates a snapshot then restores it via the two-step rollback path.
 * The restore runs a sealed Ledger promote for the rollback.
 */

import { z } from "zod";
import { coreRequest } from "../auth.js";
import { throwCoreError, mcpJson } from "../errors.js";
import { requireGameId, session, recordAction } from "../session.js";

export const definition = {
  name: "conclave_rollback",
  description: `Roll back a deployment. Creates a rollback snapshot and restores the prior state. The restore operation runs a sealed Ledger promote — the rollback is on the record. Provide the deploymentId from conclave_deploy, or describe what to roll back.`,
  inputSchema: {
    type: "object" as const,
    properties: {
      deploymentId: {
        type: "string",
        description: "The deploymentId from conclave_deploy to roll back",
      },
      reason: {
        type: "string",
        description: "Why this rollback is happening — becomes part of the Ledger record",
      },
    },
    required: ["deploymentId", "reason"],
  },
};

const inputSchema = z.object({
  deploymentId: z.string().min(1),
  reason: z.string().min(1),
});

export async function execute(args: Record<string, unknown>) {
  const input = inputSchema.parse(args);
  const gameId = requireGameId();

  // Step 1: create snapshot
  const { status: snapStatus, data: snapData } = await coreRequest<{
    ok: boolean;
    snapshotId?: string;
    id?: string;
    error?: string;
  }>("POST", "/api/v1/gaming/execution/rollback", {
    gameId,
    reason: input.reason,
    deploymentId: input.deploymentId,
  });

  if (snapStatus !== 200 && snapStatus !== 201) {
    throwCoreError(snapStatus, snapData);
  }

  const snapshotId = snapData.snapshotId ?? snapData.id;

  // Step 2: restore
  const { status: restoreStatus, data: restoreData } = await coreRequest<{
    ok: boolean;
    ledgerItemId?: string;
    error?: string;
  }>("POST", `/api/v1/gaming/execution/rollback/${snapshotId}`, {
    gameId,
    reason: input.reason,
    authorityMode: session.authorityMode ?? "human_led",
  });

  if (restoreStatus !== 200 && restoreStatus !== 201) {
    throwCoreError(restoreStatus, restoreData);
  }

  recordAction({
    tool: "conclave_rollback",
    summary: `Rolled back deployment ${input.deploymentId}: ${input.reason}`,
    id: snapshotId,
    timestamp: new Date().toISOString(),
  });

  return mcpJson({
    rolledBack: true,
    deploymentId: input.deploymentId,
    snapshotId,
    ledgerItemId: restoreData.ledgerItemId,
    reason: input.reason,
    note: "Rollback is on the Ledger — permanently recorded with authority and reason.",
  });
}
