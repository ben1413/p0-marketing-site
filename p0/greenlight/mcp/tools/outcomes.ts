/**
 * conclave_outcomes — Check what actually happened after a deploy.
 * Retrieves the predicted vs actual outcome for a deployment.
 */

import { z } from "zod";
import { coreRequest } from "../auth.js";
import { throwCoreError, mcpJson } from "../errors.js";

export const definition = {
  name: "conclave_outcomes",
  description: `Check the post-deploy outcome for a deployment — predicted vs actual results. Use the deploymentId returned by conclave_deploy. Shows whether the change performed as expected and feeds back into the simulation calibration engine.`,
  inputSchema: {
    type: "object" as const,
    properties: {
      deploymentId: {
        type: "string",
        description: "The deploymentId from conclave_deploy",
      },
    },
    required: ["deploymentId"],
  },
};

const inputSchema = z.object({
  deploymentId: z.string().min(1),
});

export async function execute(args: Record<string, unknown>) {
  const input = inputSchema.parse(args);

  const { status, data } = await coreRequest<{
    ok: boolean;
    outcome?: {
      status?: string;
      predicted?: Record<string, unknown>;
      actual?: Record<string, unknown>;
      delta?: Record<string, unknown>;
      worseThanExpected?: boolean;
    };
    error?: string;
  }>("GET", "/api/v1/gaming/outcomes", undefined, {
    deploymentId: input.deploymentId,
  });

  if (status !== 200) {
    throwCoreError(status, data);
  }

  const outcome = data.outcome;
  const worseThanExpected = outcome?.worseThanExpected === true;

  return mcpJson({
    deploymentId: input.deploymentId,
    outcome,
    ...(worseThanExpected
      ? { alert: "Outcome worse than predicted. Consider rollback via conclave_rollback." }
      : {}),
    hint: !outcome
      ? "No outcome data yet. The measurement loop may still be processing."
      : outcome.status === "pending"
      ? "Outcome is still pending — check again in a few minutes."
      : "Outcome evaluated. Review delta to assess whether this change should be kept or rolled back.",
  });
}
