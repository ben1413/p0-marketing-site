export type CoreJson = Record<string, unknown>;

export type InitProjectResponse = {
  ok?: boolean;
  project?: { id: string; name?: string };
  resumed?: boolean;
  error?: string;
  hint?: string;
};

export type AgentListResponse = {
  ok?: boolean;
  agents?: Array<{ id: string; name?: string; jobTitle?: string }>;
  error?: string;
};

export type RunSimpleResponse = {
  ok?: boolean;
  reply?: string;
  error?: string;
  code?: string;
  requestId?: string;
};
