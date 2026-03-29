/**
 * conclave_simulate — Run simulation trust scoring on the active proposal.
 *
 * Produces a simulation report with pass/fail, score, and risk assessment.
 * When GAMING_SIMULATION_GATE_ENFORCED=1, a passing simulation is required
 * before deploy. Always simulate critical changes.
 */

import { z } from "zod";
import { coreRequest } from "../auth.js";
import { throwCoreError, mcpJson } from "../errors.js";
import { requireProposalId, setActiveSimulation, session, recordAction } from "../session.js";

export const definition = {
  name: "conclave_simulate",
  description: `Run simulation trust scoring on the active proposal. Returns a score, risk assessment, and pass/fail verdict. When simulation enforcement is on, a passing simulation is required before deploy. Always simulate critical changes. Uses the active proposal automatically — no proposalId needed.`,
  inputSchema: {
    type: "object" as const,
    properties: {
      proposalId: {
        type: "string",
        description: "Override: specific proposal ID to simulate. Uses active proposal if not set.",
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
    simulationId?: string;
    simulation?: {
      status?: string;
      passed?: boolean;
      summary?: string;
      score?: { composite?: number; risk?: number; revenue?: number; retention?: number };
    };
    error?: string;
  }>("POST", `/api/v1/gaming/decisions/${proposalId}/simulate`, {});

  if (status !== 200 && status !== 201) {
    throwCoreError(status, data);
  }

  if (data.simulationId) setActiveSimulation(data.simulationId);
  recordAction({
    tool: "conclave_simulate",
    summary: `Simulation ${data.simulation?.passed ? "PASSED" : "FAILED"} — score: ${data.simulation?.score?.composite ?? "n/a"}`,
    id: data.simulationId,
    timestamp: new Date().toISOString(),
  });

  const passed = data.simulation?.passed;

  return mcpJson({
    simulated: true,
    simulationId: data.simulationId,
    proposalId,
    result: data.simulation,
    verdict: passed === true ? "PASSED" : passed === false ? "FAILED — do not deploy without review" : "PENDING",
    next: passed === true
      ? "Simulation passed. Call conclave_approve to proceed."
      : passed === false
      ? "Simulation failed. Review the results before approving. Deploying a failed simulation may be blocked if enforcement is on."
      : "Simulation in progress. Check status with conclave_status.",
    activeProposal: session.activeProposalTitle,
  });
}
