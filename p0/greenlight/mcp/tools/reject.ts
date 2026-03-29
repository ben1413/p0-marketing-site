/**
 * conclave_reject — Reject the active proposal with a reason.
 * Requires admin role. Clears the active proposal from session.
 */

import { z } from "zod";
import { coreRequest } from "../auth.js";
import { throwCoreError, mcpJson } from "../errors.js";
import { requireProposalId, session, recordAction } from "../session.js";

export const definition = {
  name: "conclave_reject",
  description: `Reject the active proposal. Requires a reason. The proposal is closed — use conclave_propose to start a new one.`,
  inputSchema: {
    type: "object" as const,
    properties: {
      reason: { type: "string", description: "Why this proposal is being rejected" },
      proposalId: { type: "string", description: "Override: specific proposal ID. Uses active proposal if not set." },
    },
    required: ["reason"],
  },
};

const inputSchema = z.object({
  reason: z.string().min(1),
  proposalId: z.string().optional(),
});

export async function execute(args: Record<string, unknown>) {
  const input = inputSchema.parse(args);
  const proposalId = input.proposalId ?? requireProposalId();

  const { status, data } = await coreRequest<{
    ok: boolean;
    error?: string;
  }>("POST", `/api/v1/gaming/decisions/${proposalId}/reject`, { reason: input.reason });

  if (status !== 200) {
    throwCoreError(status, data);
  }

  recordAction({
    tool: "conclave_reject",
    summary: `Rejected: ${input.reason}`,
    id: proposalId,
    timestamp: new Date().toISOString(),
  });

  // Clear active proposal
  session.activeProposalId = null;
  session.activeProposalTitle = null;
  session.activeSimulationId = null;

  return mcpJson({
    rejected: true,
    proposalId,
    reason: input.reason,
    next: "Proposal rejected. Use conclave_propose to start a new proposal.",
  });
}
