/**
 * conclave_propose — Submit a governed change proposal.
 *
 * This is the start of the Conclave pipeline:
 * propose → simulate → approve → execute → outcomes → rollback if needed
 *
 * Sets the active proposal in session state. Subsequent tools
 * (simulate, approve, reject, execute) auto-use it.
 */

import { z } from "zod";
import { coreRequest } from "../auth.js";
import { throwCoreError, mcpJson } from "../errors.js";
import { requireGameId, setActiveProposal, session, recordAction } from "../session.js";

export const definition = {
  name: "conclave_propose",
  description: `Submit a governed change proposal for the active game. Covers economy changes, balance tweaks, content pushes, matchmaking adjustments, moderation policy, or emergency changes. The proposal becomes the active proposal — conclave_simulate and conclave_approve will auto-use it. Always simulate before approving critical changes.`,
  inputSchema: {
    type: "object" as const,
    properties: {
      title: { type: "string", description: "Short title for this proposal (e.g. 'Increase sword damage 15%')" },
      type: {
        type: "string",
        enum: ["economy", "content", "matchmaking", "moderation", "experiment", "emergency"],
        description: "Type of change",
      },
      description: { type: "string", description: "What this change does and why" },
      governanceTier: {
        type: "string",
        enum: ["promoted", "critical"],
        description: "promoted: standard governed change. critical: high-stakes — blocks agent_autonomous, requires stronger review.",
      },
      proposedActions: {
        type: "string",
        description: "JSON string of the specific actions/config changes being proposed (e.g. '{\"damage\": 115}')",
      },
    },
    required: ["title", "type"],
  },
};

const inputSchema = z.object({
  title: z.string().min(1),
  type: z.enum(["economy", "content", "matchmaking", "moderation", "experiment", "emergency"]),
  description: z.string().optional(),
  governanceTier: z.enum(["promoted", "critical"]).optional(),
  proposedActions: z.string().optional(),
});

export async function execute(args: Record<string, unknown>) {
  const input = inputSchema.parse(args);
  const gameId = requireGameId();

  let parsedActions: Record<string, unknown> = {};
  if (input.proposedActions) {
    try {
      parsedActions = JSON.parse(input.proposedActions);
    } catch {
      parsedActions = { raw: input.proposedActions };
    }
  }

  const { status, data } = await coreRequest<{
    ok: boolean;
    decisionProposalId?: string;
    error?: string;
  }>("POST", "/api/v1/gaming/decisions/propose", {
    gameId,
    title: input.title,
    type: input.type,
    description: input.description,
    governanceTier: input.governanceTier ?? "promoted",
    proposedActions: parsedActions,
    proposedBy: { type: "agent", id: "conclave-mcp" },
    recommendedAuthorityMode: session.authorityMode ?? "human_led",
  });

  if (status !== 200 && status !== 201) {
    throwCoreError(status, data);
  }

  const proposalId = data.decisionProposalId!;
  setActiveProposal(proposalId, input.title);
  recordAction({ tool: "conclave_propose", summary: input.title, id: proposalId, timestamp: new Date().toISOString() });

  return mcpJson({
    proposed: true,
    proposalId,
    title: input.title,
    type: input.type,
    governanceTier: input.governanceTier ?? "promoted",
    gameId,
    next: input.governanceTier === "critical"
      ? "Critical change: call conclave_simulate before approving. Simulation is strongly recommended."
      : "Call conclave_simulate to score this proposal, or conclave_approve to proceed without simulation.",
  });
}
