/**
 * conclave_moderation — Moderate a player. Create case, assign, take action, handle appeal.
 * Actions (ban, warn, restrict, etc.) seal to the Ledger.
 */

import { z } from "zod";
import { coreRequest } from "../auth.js";
import { throwCoreError, mcpJson } from "../errors.js";
import { requireGameId, session, recordAction } from "../session.js";

export const definition = {
  name: "conclave_moderation",
  description: `Manage player moderation for the active game. Create cases, assign to moderators, take actions (ban, warn, mute, restrict, dismiss, resolve, escalate), or handle appeals. Moderation actions seal to the Ledger — permanent record of what was done, who did it, and why.`,
  inputSchema: {
    type: "object" as const,
    properties: {
      action: {
        type: "string",
        enum: ["create_case", "take_action", "assign", "appeal", "get_queue"],
        description: "What moderation operation to perform",
      },
      caseId: { type: "string", description: "Required for take_action, assign, appeal" },
      playerId: { type: "string", description: "Required for create_case" },
      moderationAction: {
        type: "string",
        enum: ["ban", "temp_ban", "unban", "warn", "mute", "restrict", "dismiss", "resolve", "escalate"],
        description: "Required for take_action",
      },
      note: { type: "string", description: "Note or reason for the action" },
      assignTo: { type: "string", description: "Required for assign — moderator ID" },
      reportType: { type: "string", description: "Required for create_case — type of report" },
    },
    required: ["action"],
  },
};

const inputSchema = z.object({
  action: z.enum(["create_case", "take_action", "assign", "appeal", "get_queue"]),
  caseId: z.string().optional(),
  playerId: z.string().optional(),
  moderationAction: z.enum(["ban", "temp_ban", "unban", "warn", "mute", "restrict", "dismiss", "resolve", "escalate"]).optional(),
  note: z.string().optional(),
  assignTo: z.string().optional(),
  reportType: z.string().optional(),
});

export async function execute(args: Record<string, unknown>) {
  const input = inputSchema.parse(args);
  const gameId = requireGameId();

  if (input.action === "get_queue") {
    const { status, data } = await coreRequest<{ ok: boolean; items?: unknown[]; error?: string }>(
      "GET", "/api/v1/gaming/moderation/queue", undefined, { gameId }
    );
    if (status !== 200) throwCoreError(status, data);
    return mcpJson({ queue: data.items ?? [], count: (data.items ?? []).length });
  }

  if (input.action === "create_case") {
    if (!input.playerId) throw new Error("playerId is required to create a moderation case.");
    const { status, data } = await coreRequest<{ ok: boolean; caseId?: string; error?: string }>(
      "POST", "/api/v1/gaming/moderation/cases",
      { gameId, playerId: input.playerId, reportType: input.reportType ?? "manual", reportedBy: "conclave-mcp", reportedContent: input.note }
    );
    if (status !== 200 && status !== 201) throwCoreError(status, data);
    recordAction({ tool: "conclave_moderation", summary: `Created case for player ${input.playerId}`, id: data.caseId, timestamp: new Date().toISOString() });
    return mcpJson({ created: true, caseId: data.caseId, playerId: input.playerId });
  }

  if (input.action === "assign") {
    if (!input.caseId || !input.assignTo) throw new Error("caseId and assignTo are required.");
    const { status, data } = await coreRequest<{ ok: boolean; error?: string }>(
      "POST", `/api/v1/gaming/moderation/cases/${input.caseId}/assign`, { assignTo: input.assignTo }
    );
    if (status !== 200) throwCoreError(status, data);
    return mcpJson({ assigned: true, caseId: input.caseId, assignedTo: input.assignTo });
  }

  if (input.action === "appeal") {
    if (!input.caseId || !input.note) throw new Error("caseId and note are required for appeal.");
    const { status, data } = await coreRequest<{ ok: boolean; error?: string }>(
      "POST", `/api/v1/gaming/moderation/cases/${input.caseId}/appeal`, { reason: input.note }
    );
    if (status !== 200) throwCoreError(status, data);
    return mcpJson({ appealed: true, caseId: input.caseId });
  }

  // take_action
  if (!input.caseId || !input.moderationAction) throw new Error("caseId and moderationAction are required.");

  const { status, data } = await coreRequest<{ ok: boolean; ledgerItemId?: string; error?: string }>(
    "POST", `/api/v1/gaming/moderation/cases/${input.caseId}/action`,
    { action: input.moderationAction, note: input.note, authorityMode: session.authorityMode ?? "human_led" }
  );
  if (status !== 200) throwCoreError(status, data);

  recordAction({
    tool: "conclave_moderation",
    summary: `${input.moderationAction} on case ${input.caseId}${input.note ? `: ${input.note.slice(0, 60)}` : ""}`,
    id: input.caseId,
    timestamp: new Date().toISOString(),
  });

  return mcpJson({
    actioned: true,
    caseId: input.caseId,
    action: input.moderationAction,
    ledgerItemId: data.ledgerItemId,
    note: data.ledgerItemId ? "Action sealed to Ledger." : undefined,
  });
}
