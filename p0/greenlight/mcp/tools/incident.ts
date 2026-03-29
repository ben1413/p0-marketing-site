/**
 * conclave_incident — Create, update, or resolve a live incident.
 * Resolve seals the incident to the Ledger — permanent record of what happened.
 */

import { z } from "zod";
import { coreRequest } from "../auth.js";
import { throwCoreError, mcpJson } from "../errors.js";
import { requireGameId, session, recordAction } from "../session.js";

export const definition = {
  name: "conclave_incident",
  description: `Create, update, or resolve a live incident for the active game. Resolving an incident seals it to the Ledger — a permanent, tamper-evident record of what happened, who resolved it, and under what authority. Use action: 'create' to open, 'update' to add information, 'resolve' to close and seal.`,
  inputSchema: {
    type: "object" as const,
    properties: {
      action: {
        type: "string",
        enum: ["create", "update", "resolve"],
        description: "What to do with the incident",
      },
      incidentId: {
        type: "string",
        description: "Required for update and resolve. The incident to act on.",
      },
      title: { type: "string", description: "Required for create. Incident title." },
      message: { type: "string", description: "Description, update, or resolution message" },
      severity: {
        type: "string",
        enum: ["low", "medium", "high", "critical"],
        description: "Required for create.",
      },
    },
    required: ["action"],
  },
};

const inputSchema = z.object({
  action: z.enum(["create", "update", "resolve"]),
  incidentId: z.string().optional(),
  title: z.string().optional(),
  message: z.string().optional(),
  severity: z.enum(["low", "medium", "high", "critical"]).optional(),
});

export async function execute(args: Record<string, unknown>) {
  const input = inputSchema.parse(args);
  const gameId = requireGameId();

  if (input.action === "create") {
    if (!input.title) throw new Error("title is required to create an incident.");

    const { status, data } = await coreRequest<{
      ok: boolean; incidentId?: string; error?: string;
    }>("POST", "/api/v1/gaming/incidents", {
      gameId,
      title: input.title,
      description: input.message,
      severity: input.severity ?? "medium",
    });

    if (status !== 200 && status !== 201) throwCoreError(status, data);
    recordAction({ tool: "conclave_incident", summary: `Created incident: ${input.title}`, id: data.incidentId, timestamp: new Date().toISOString() });

    return mcpJson({ created: true, incidentId: data.incidentId, title: input.title, severity: input.severity ?? "medium" });
  }

  if (input.action === "update") {
    if (!input.incidentId) throw new Error("incidentId is required to update an incident.");

    const { status, data } = await coreRequest<{ ok: boolean; error?: string }>(
      "POST", `/api/v1/gaming/incidents/${input.incidentId}/update`,
      { gameId, message: input.message }
    );

    if (status !== 200) throwCoreError(status, data);
    recordAction({ tool: "conclave_incident", summary: `Updated incident ${input.incidentId}`, id: input.incidentId, timestamp: new Date().toISOString() });
    return mcpJson({ updated: true, incidentId: input.incidentId });
  }

  // resolve
  if (!input.incidentId) throw new Error("incidentId is required to resolve an incident.");
  if (!input.message) throw new Error("message is required to resolve — it becomes the Ledger record.");

  const { status, data } = await coreRequest<{
    ok: boolean; ledgerItemId?: string; error?: string;
  }>("POST", `/api/v1/gaming/incidents/${input.incidentId}/resolve`, {
    message: input.message,
    authorityMode: session.authorityMode ?? "human_led",
  });

  if (status !== 200) throwCoreError(status, data);
  recordAction({ tool: "conclave_incident", summary: `Resolved incident ${input.incidentId}: ${input.message.slice(0, 80)}`, id: input.incidentId, timestamp: new Date().toISOString() });

  return mcpJson({
    resolved: true,
    incidentId: input.incidentId,
    ledgerItemId: data.ledgerItemId,
    note: "Resolution is sealed to the Ledger — permanent record of what happened and how it was resolved.",
  });
}
