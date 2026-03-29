/**
 * Structured Game Design Document — universal layer (economy, content, player, governance).
 * Stored in Core Brain under key cf_gdd_{coreProjectId}.
 */
export type GddEconomyCurrency = {
  id: string;
  name: string;
  description?: string;
};

export type GddEconomy = {
  currencies: GddEconomyCurrency[];
  notes?: string;
};

export type GddContent = {
  levels: string[];
  events: string[];
  modes: string[];
};

export type GddPlayerState = {
  fields: string[];
  notes?: string;
};

export type GddGovernance = {
  moderationNotes?: string;
  experimentGuardrails?: string;
};

export type GameDesignDocument = {
  economy: GddEconomy;
  content: GddContent;
  player: GddPlayerState;
  governance: GddGovernance;
};

export const emptyGdd = (): GameDesignDocument => ({
  economy: { currencies: [] },
  content: { levels: [], events: [], modes: [] },
  player: { fields: [] },
  governance: {},
});
