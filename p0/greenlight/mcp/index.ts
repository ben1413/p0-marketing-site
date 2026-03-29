#!/usr/bin/env node
/**
 * Greenlight MCP Server — governed gaming live ops for MCP-compatible agents.
 *
 * 12 tools covering the full live ops pipeline:
 *   set_game → propose → simulate → approve → deploy → outcomes → rollback
 *   + incidents, moderation, experiments
 *
 * Session state tracks active game, active proposal, simulation status,
 * and recent actions — agents focus on the change, not the plumbing.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { resolveAuth, getApiKey } from "./auth.js";
import { allTools } from "./tools/index.js";
import { checkMcpRateLimit, checkGlobalRateLimit } from "./rateLimit.js";

getApiKey();

const server = new McpServer(
  { name: "greenlight", version: "0.1.0" },
  { capabilities: { tools: {} } }
);

for (const tool of allTools) {
  const shape: Record<string, z.ZodTypeAny> = {};
  const props = (
    tool.definition.inputSchema as {
      properties?: Record<string, {
        type?: string;
        description?: string;
        enum?: string[];
        items?: { type: string };
      }>;
      required?: string[];
    }
  ).properties;
  const required = new Set(
    (tool.definition.inputSchema as { required?: string[] }).required || []
  );

  if (props) {
    for (const [key, prop] of Object.entries(props)) {
      let schema: z.ZodTypeAny;
      if (prop.type === "number") {
        schema = z.number().describe(prop.description || "");
      } else if (prop.type === "boolean") {
        schema = z.boolean().describe(prop.description || "");
      } else if (prop.type === "array") {
        schema = z.array(z.string()).describe(prop.description || "");
      } else if (prop.enum) {
        schema = z.enum(prop.enum as [string, ...string[]]).describe(prop.description || "");
      } else {
        schema = z.string().describe(prop.description || "");
      }
      shape[key] = required.has(key) ? schema : schema.optional();
    }
  }

  server.tool(
    tool.definition.name,
    tool.definition.description,
    shape,
    async (params: Record<string, unknown>) => {
      checkGlobalRateLimit();
      checkMcpRateLimit(tool.definition.name);
      await resolveAuth();
      return tool.execute(params);
    }
  );
}

const transport = new StdioServerTransport();
await server.connect(transport);
