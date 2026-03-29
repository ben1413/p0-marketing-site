/**
 * conclave_status — Inspect session state. Zero API calls.
 * Shows active game, active proposal, simulation status, recent actions.
 */

import { mcpJson } from "../errors.js";
import { session } from "../session.js";

export const definition = {
  name: "conclave_status",
  description: `Show the current live ops session state: active game, active proposal, simulation status, authority mode, and recent actions. Zero API calls — instant.`,
  inputSchema: {
    type: "object" as const,
    properties: {},
    required: [],
  },
};

export async function execute(_args: Record<string, unknown>) {
  return mcpJson({
    game: session.gameId
      ? { id: session.gameId, name: session.gameName }
      : null,
    proposal: session.activeProposalId
      ? { id: session.activeProposalId, title: session.activeProposalTitle }
      : null,
    simulation: session.activeSimulationId
      ? { id: session.activeSimulationId }
      : null,
    authorityMode: session.authorityMode,
    recentActions: session.recentActions.slice(0, 5),
    hint: !session.gameId
      ? "No game set. Call conclave_set_game first."
      : !session.activeProposalId
      ? "No active proposal. Call conclave_propose to start a change."
      : "Proposal in flight. Call conclave_simulate or conclave_approve to progress it.",
  });
}
