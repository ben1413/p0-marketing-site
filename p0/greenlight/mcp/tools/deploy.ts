/**
 * conclave_deploy — Execute an approved proposal via one-call deploy authorize.
 *
 * Uses POST /gaming/execution/deploy — the sealed, one-call path that:
 * - Creates the deploy gate config
 * - Runs the sealed Ledger promote
 * - Returns a deploymentId for outcome correlation
 *
 * Guardrail: warns if simulation gate may block deploy when enforcement is on.
 */

import { z } from "zod";
import { coreRequest } from "../auth.js";
import { throwCoreError, mcpJson } from "../errors.js";
import { requireGameId, requireProposalId, session, recordAction } from "../session.js";

export const definition = {
  name: "conclave_deploy",
  description: `Execute an approved proposal using the one-call deploy authorize path. Creates the deploy gate, runs the sealed Ledger promote, and returns a deploymentId for outcome tracking — all in one call. The proposal must be approved first via conclave_approve. If simulation enforcement is on, a passing simulation is required. Returns a deploymentId — save it for conclave_outcomes.`,
  inputSchema: {
    type: "object" as const,
    properties: {
      proposalId: {
        type: "string",
        description: "Override: specific proposal ID. Uses active proposal if not set.",
      },
      authorityMode: {
        type: "string",
        enum: ["human_led", "human_in_the_loop", "agent_autonomous"],
        description: "Authority mode for the sealed Ledger promote. Defaults to session authority (human_led).",
      },
      dryRun: {
        type: "boolean",
        description: "Simulate the deploy without executing. Returns what would happen.",
      },
    },
    required: [],
  },
};

const inputSchema = z.object({
  proposalId: z.string().optional(),
  authorityMode: z.enum(["human_led", "human_in_the_loop", "agent_autonomous"]).optional(),
  dryRun: z.boolean().optional().default(false),
});

export async function execute(args: Record<string, unknown>) {
  const input = inputSchema.parse(args);
  const gameId = requireGameId();
  const proposalId = input.proposalId ?? requireProposalId();
  const authorityMode = input.authorityMode ?? session.authorityMode ?? "human_led";

  const { status, data } = await coreRequest<{
    ok: boolean;
    deploymentId?: string;
    configId?: string;
    ledgerItemId?: string;
    evaluationId?: string;
    error?: string;
    code?: string;
  }>("POST", "/api/v1/gaming/execution/deploy", {
    gameId,
    decisionProposalId: proposalId,
    authorityMode,
    branch: `proposal/${proposalId}`,
    summary: `Deploy for proposal ${session.activeProposalTitle ?? proposalId}`,
    ...(input.dryRun ? { dryRun: true } : {}),
  });

  if (status !== 200 && status !== 201) {
    // Simulation gate blocked
    if (data.code === "SIMULATION_GATE_BLOCKED") {
      return mcpJson({
        deployed: false,
        blocked: true,
        reason: "SIMULATION_GATE_BLOCKED",
        detail: (data as Record<string, unknown>).error,
        hint: "A passing simulation is required before deploy. Call conclave_simulate first.",
      });
    }
    throwCoreError(status, data);
  }

  recordAction({
    tool: "conclave_deploy",
    summary: `Deployed ${session.activeProposalTitle ?? proposalId} — deploymentId: ${data.deploymentId}`,
    id: data.deploymentId,
    timestamp: new Date().toISOString(),
  });

  return mcpJson({
    deployed: true,
    deploymentId: data.deploymentId,
    proposalId,
    ledgerItemId: data.ledgerItemId,
    evaluationId: data.evaluationId,
    authorityMode,
    next: `Deployed. Use conclave_outcomes with deploymentId: ${data.deploymentId} to check results. Use conclave_rollback to undo.`,
  });
}
