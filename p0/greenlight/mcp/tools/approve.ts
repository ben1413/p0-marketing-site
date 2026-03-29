/**
 * conclave_approve — Approve the active proposal.
 * Guardrail: warns if no simulation has been run this session for critical proposals.
 * Requires admin role.
 */

import { z } from "zod";
import { coreRequest } from "../auth.js";
import { throwCoreError, mcpJson } from "../errors.js";
import { requireProposalId, session, recordAction } from "../session.js";

export const definition = {
  name: "conclave_approve",
  description: `Approve the active proposal. Requires admin role. If no simulation was run this session, a warning is returned for critical proposals. After approval, call conclave_deploy to execute.`,
  inputSchema: {
    type: "object" as const,
    properties: {
      proposalId: {
        type: "string",
        description: "Override: specific proposal ID. Uses active proposal if not set.",
      },
    },
    required: [],
  },
};

const inputSchema = z.object({
  proposalId: z.string().optional(),
});

export async function execute(args: Record<string, unknown>) {
  const input = inputSchema.parse(args);
  const proposalId = input.proposalId ?? requireProposalId();

  const { status, data } = await coreRequest<{
    ok: boolean;
    error?: string;
  }>("POST", `/api/v1/gaming/decisions/${proposalId}/approve`, {});

  if (status !== 200) {
    throwCoreError(status, data);
  }

  recordAction({
    tool: "conclave_approve",
    summary: `Approved proposal ${session.activeProposalTitle ?? proposalId}`,
    id: proposalId,
    timestamp: new Date().toISOString(),
  });

  const simulationWarning = !session.activeSimulationId
    ? "No simulation was run this session. Simulation is strongly recommended before deploying, especially for critical changes."
    : null;

  return mcpJson({
    approved: true,
    proposalId,
    ...(simulationWarning ? { warning: simulationWarning } : {}),
    next: "Call conclave_deploy to execute this approved proposal.",
  });
}
