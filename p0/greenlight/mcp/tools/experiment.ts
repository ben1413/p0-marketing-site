/**
 * conclave_experiment — Create, start, stop an A/B experiment, assign players, read results.
 */

import { z } from "zod";
import { coreRequest } from "../auth.js";
import { throwCoreError, mcpJson } from "../errors.js";
import { requireGameId, recordAction } from "../session.js";

export const definition = {
  name: "conclave_experiment",
  description: `Manage A/B experiments for the active game. Create experiments, start/stop them, assign players to variants, and read results. All experiment lifecycle events are tracked.`,
  inputSchema: {
    type: "object" as const,
    properties: {
      action: {
        type: "string",
        enum: ["create", "start", "stop", "assign", "results", "list"],
        description: "What to do",
      },
      experimentId: { type: "string", description: "Required for start, stop, assign, results" },
      name: { type: "string", description: "Required for create" },
      playerId: { type: "string", description: "Required for assign" },
    },
    required: ["action"],
  },
};

const inputSchema = z.object({
  action: z.enum(["create", "start", "stop", "assign", "results", "list"]),
  experimentId: z.string().optional(),
  name: z.string().optional(),
  playerId: z.string().optional(),
});

export async function execute(args: Record<string, unknown>) {
  const input = inputSchema.parse(args);
  const gameId = requireGameId();

  if (input.action === "list") {
    const { status, data } = await coreRequest<{ ok: boolean; items?: unknown[]; error?: string }>(
      "GET", "/api/v1/gaming/experiments", undefined, { gameId }
    );
    if (status !== 200) throwCoreError(status, data);
    return mcpJson({ experiments: data.items ?? [], count: (data.items ?? []).length });
  }

  if (input.action === "create") {
    if (!input.name) throw new Error("name is required to create an experiment.");
    const { status, data } = await coreRequest<{ ok: boolean; experimentId?: string; error?: string }>(
      "POST", "/api/v1/gaming/experiments", { name: input.name, gameId }
    );
    if (status !== 200 && status !== 201) throwCoreError(status, data);
    recordAction({ tool: "conclave_experiment", summary: `Created experiment: ${input.name}`, id: data.experimentId, timestamp: new Date().toISOString() });
    return mcpJson({ created: true, experimentId: data.experimentId, name: input.name });
  }

  if (!input.experimentId) throw new Error(`experimentId is required for action: ${input.action}`);

  if (input.action === "start") {
    const { status, data } = await coreRequest<{ ok: boolean; error?: string }>(
      "POST", `/api/v1/gaming/experiments/${input.experimentId}/start`, {}
    );
    if (status !== 200) throwCoreError(status, data);
    recordAction({ tool: "conclave_experiment", summary: `Started experiment ${input.experimentId}`, id: input.experimentId, timestamp: new Date().toISOString() });
    return mcpJson({ started: true, experimentId: input.experimentId });
  }

  if (input.action === "stop") {
    const { status, data } = await coreRequest<{ ok: boolean; error?: string }>(
      "POST", `/api/v1/gaming/experiments/${input.experimentId}/stop`, {}
    );
    if (status !== 200) throwCoreError(status, data);
    recordAction({ tool: "conclave_experiment", summary: `Stopped experiment ${input.experimentId}`, id: input.experimentId, timestamp: new Date().toISOString() });
    return mcpJson({ stopped: true, experimentId: input.experimentId });
  }

  if (input.action === "assign") {
    if (!input.playerId) throw new Error("playerId is required for assign.");
    const { status, data } = await coreRequest<{ ok: boolean; variant?: string; error?: string }>(
      "POST", `/api/v1/gaming/experiments/${input.experimentId}/assign`, { playerId: input.playerId }
    );
    if (status !== 200) throwCoreError(status, data);
    return mcpJson({ assigned: true, experimentId: input.experimentId, playerId: input.playerId, variant: data.variant });
  }

  // results
  const { status, data } = await coreRequest<Record<string, unknown>>(
    "GET", `/api/v1/gaming/experiments/${input.experimentId}/results`
  );
  if (status !== 200) throwCoreError(status, data as { error?: string });
  return mcpJson({ experimentId: input.experimentId, results: data });
}
