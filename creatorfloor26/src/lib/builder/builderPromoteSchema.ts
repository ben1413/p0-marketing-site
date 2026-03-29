import { z } from "zod";

/**
 * POST /api/v1/builder/promote — CreatorFloor BFF.
 * personal/team → Firestore soft buckets; ledger → Core; gaming → decisions/propose.
 */
export const builderPromoteSchema = z.object({
  projectId: z.string().min(1),
  userId: z.string().min(1),
  branch: z.string().min(1),

  scope: z.enum(["personal", "team", "ledger", "gaming"]),
  authority: z.enum(["human-led", "hitl", "agent-autonomous"]),

  summary: z.string().min(1).max(2000),
  filePaths: z.array(z.string()).default([]),

  preparedByAgent: z.boolean().default(false),

  checkpointFrom: z.string().datetime({ offset: true }),
  checkpointTo: z.string().datetime({ offset: true }),

  evaluationId: z.string().optional(),
  ledgerType: z.enum(["note", "decision", "task", "artifact", "code"]).optional(),
  agent: z.string().optional(),

  designerMode: z.boolean().optional(),
  runId: z.string().min(1).optional(),
  canvasElementCount: z.number().int().nonnegative().optional(),
  canvasSnapshot: z.string().optional(),

  gameId: z.string().optional(),
  governanceTier: z.enum(["logged", "promoted", "critical"]).optional(),
  relatedGamingDecisionId: z.string().optional(),
  gamingDecisionType: z
    .enum(["economy", "content", "matchmaking", "moderation", "experiment", "emergency"])
    .optional(),
  contentType: z
    .enum(["hud", "menu", "store", "event_banner", "notification"])
    .optional(),
}).superRefine((data, ctx) => {
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
  if (
    data.scope === "gaming" &&
    data.authority === "agent-autonomous" &&
    (data.governanceTier ?? "promoted") === "critical"
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["authority"],
      message: "critical governance tier cannot use agent-autonomous",
    });
  }
});

export type BuilderPromotePayload = z.infer<typeof builderPromoteSchema>;
