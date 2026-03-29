/**
 * Conclave MCP session state.
 *
 * Tracks the active game, pending proposal, and authority context
 * so agents don't thread gameId and proposalId through every call.
 * One game is "active" at a time. One proposal can be "in flight."
 */

export type RecentAction = {
  tool: string;
  summary: string;
  id?: string;
  timestamp: string;
};

export type ConclaveSession = {
  gameId: string | null;
  gameName: string | null;
  activeProposalId: string | null;
  activeProposalTitle: string | null;
  activeSimulationId: string | null;
  authorityMode: "human_led" | "human_in_the_loop" | "agent_autonomous" | null;
  recentActions: RecentAction[];
};

function fresh(): ConclaveSession {
  return {
    gameId: null,
    gameName: null,
    activeProposalId: null,
    activeProposalTitle: null,
    activeSimulationId: null,
    authorityMode: "human_led",
    recentActions: [],
  };
}

export const session: ConclaveSession = fresh();

export function requireGameId(): string {
  if (!session.gameId) {
    throw new Error(
      "No active game. Call conclave_set_game first to set the game context."
    );
  }
  return session.gameId;
}

export function requireProposalId(): string {
  if (!session.activeProposalId) {
    throw new Error(
      "No active proposal. Call conclave_propose first, or pass proposalId explicitly."
    );
  }
  return session.activeProposalId;
}

export function setGame(gameId: string, gameName?: string): void {
  session.gameId = gameId;
  session.gameName = gameName ?? gameId;
  session.activeProposalId = null;
  session.activeProposalTitle = null;
  session.activeSimulationId = null;
  session.recentActions = [];
}

export function setActiveProposal(id: string, title: string): void {
  session.activeProposalId = id;
  session.activeProposalTitle = title;
  session.activeSimulationId = null;
}

export function setActiveSimulation(id: string): void {
  session.activeSimulationId = id;
}

export function recordAction(action: RecentAction): void {
  session.recentActions.unshift(action);
  if (session.recentActions.length > 20) session.recentActions.pop();
}
