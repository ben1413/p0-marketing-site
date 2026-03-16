import { z } from "zod";

/**
 * Payload schema for POST /api/v1/builder/promote.
 *
 * scope controls where the promote lands:
 *   personal  → pb_builder_personal  (user's own working memory)
 *   team      → pb_builder_team      (shared visibility, low commitment)
 *   ledger    → Core ledger promote  (formal approval flow)
 *
 * evaluationId is required when scope is 'ledger'.
 * agent is required when scope is 'ledger' and authority is 'agent-autonomous'.
 */
export const builderPromoteSchema = z.object({
  projectId: z.string().min(1),
  userId: z.string().min(1),
  branch: z.string().min(1),

  scope: z.enum(["personal", "team", "ledger"]),
  authority: z.enum(["human-led", "hitl", "agent-autonomous"]),

  summary: z.string().min(1).max(2000),
  filePaths: z.array(z.string()).default([]),

  preparedByAgent: z.boolean().default(false),

  checkpointFrom: z.string().datetime({ offset: true }),
  checkpointTo: z.string().datetime({ offset: true }),

  // Required when scope === 'ledger'
  evaluationId: z.string().optional(),
  // Required when scope === 'ledger' and authority === 'agent-autonomous'
  agent: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.scope === "ledger" && !data.evaluationId) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["evaluationId"],
      message: "evaluationId is required when scope is 'ledger'",
    });
  }
  if (
    data.scope === "ledger" &&
    data.authority === "agent-autonomous" &&
    !data.agent
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["agent"],
      message: "agent is required when scope is 'ledger' and authority is 'agent-autonomous'",
    });
  }
});

export type BuilderPromotePayload = z.infer<typeof builderPromoteSchema>;
