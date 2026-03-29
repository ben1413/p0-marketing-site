/**
 * Conclave MCP tool registry.
 *
 * 12 tools. Session-aware. Covers the full governed live ops pipeline.
 *
 * Setup:
 *   conclave_set_game     — set active game + authority mode
 *   conclave_status       — inspect session state (zero API calls)
 *
 * Proposal pipeline (propose → simulate → approve → deploy → outcomes → rollback):
 *   conclave_propose      — submit a governed change proposal
 *   conclave_simulate     — run simulation trust scoring
 *   conclave_approve      — approve the proposal (admin)
 *   conclave_reject       — reject with reason
 *   conclave_deploy       — one-call deploy authorize + sealed Ledger promote
 *   conclave_rollback     — roll back a deployment (sealed Ledger promote)
 *   conclave_outcomes     — check predicted vs actual post-deploy
 *
 * Live operations:
 *   conclave_incident     — create / update / resolve incidents (resolve seals to Ledger)
 *   conclave_moderation   — moderate players (actions seal to Ledger)
 *   conclave_experiment   — A/B experiments: create, start, stop, assign, results
 */

import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import * as setGame from "./setGame.js";
import * as status from "./status.js";
import * as propose from "./propose.js";
import * as simulate from "./simulate.js";
import * as approve from "./approve.js";
import * as reject from "./reject.js";
import * as deploy from "./deploy.js";
import * as rollback from "./rollback.js";
import * as outcomes from "./outcomes.js";
import * as incident from "./incident.js";
import * as moderation from "./moderation.js";
import * as experiment from "./experiment.js";

export type ToolModule = {
  definition: {
    name: string;
    description: string;
    inputSchema: Record<string, unknown>;
  };
  execute: (args: Record<string, unknown>) => Promise<CallToolResult>;
};

export const allTools: ToolModule[] = [
  setGame,
  status,
  propose,
  simulate,
  approve,
  reject,
  deploy,
  rollback,
  outcomes,
  incident,
  moderation,
  experiment,
];
