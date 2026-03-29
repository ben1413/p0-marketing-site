/**
 * Map Core API errors to MCP-standard JSON-RPC error codes.
 */

import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export function throwCoreError(
  status: number,
  data: { error?: string; code?: string; message?: string }
): never {
  const msg = data.error || data.message || "P0 operation failed";

  switch (status) {
    case 400:
      throw new McpError(ErrorCode.InvalidParams, msg);
    case 401:
      throw new McpError(ErrorCode.InvalidRequest, `P0 authentication failed: ${msg}`);
    case 403:
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Insufficient authority: ${msg}`
      );
    case 404:
      throw new McpError(ErrorCode.InvalidParams, `Not found: ${msg}`);
    case 409:
      throw new McpError(ErrorCode.InvalidRequest, msg);
    case 429:
      throw new McpError(ErrorCode.InvalidRequest, "P0 rate limit exceeded");
    default:
      throw new McpError(ErrorCode.InternalError, msg);
  }
}

/**
 * Standard success response for MCP tool calls.
 */
export function mcpText(text: string): CallToolResult {
  return {
    content: [{ type: "text", text }],
  };
}

/**
 * Standard JSON success response.
 */
export function mcpJson(data: unknown): CallToolResult {
  return mcpText(JSON.stringify(data, null, 2));
}
