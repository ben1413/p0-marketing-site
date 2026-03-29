/**
 * conclave_set_game — Set the active game context for this session.
 * All subsequent tools automatically scope to this gameId.
 */

import { z } from "zod";
import { mcpJson } from "../errors.js";
import { setGame, session } from "../session.js";

export const definition = {
  name: "conclave_set_game",
  description: `Set the active game for this live ops session. All subsequent tools (proposals, deploys, incidents, experiments, moderation) automatically scope to this gameId — you don't need to pass it on every call. Call this first at the start of any live ops session.`,
  inputSchema: {
    type: "object" as const,
    properties: {
      gameId: { type: "string", description: "The game ID to operate on" },
      gameName: { type: "string", description: "Optional human-readable name for this game" },
      authorityMode: {
        type: "string",
        enum: ["human_led", "human_in_the_loop", "agent_autonomous"],
        description: "Default authority mode for governed operations. Defaults to human_led.",
      },
    },
    required: ["gameId"],
  },
};

const inputSchema = z.object({
  gameId: z.string().min(1),
  gameName: z.string().optional(),
  authorityMode: z.enum(["human_led", "human_in_the_loop", "agent_autonomous"]).optional(),
});

export async function execute(args: Record<string, unknown>) {
  const input = inputSchema.parse(args);
  setGame(input.gameId, input.gameName);
  if (input.authorityMode) session.authorityMode = input.authorityMode;

  return mcpJson({
    gameSet: true,
    gameId: session.gameId,
    gameName: session.gameName,
    authorityMode: session.authorityMode,
    hint: "Game context set. Use conclave_propose to start a change proposal.",
  });
}
