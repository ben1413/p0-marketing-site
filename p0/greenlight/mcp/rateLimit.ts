/**
 * MCP-layer rate limiter. First line of defense before Core's own rate limiting.
 * Sliding window per tool name. Configurable via P0_MCP_RATE_LIMIT_PER_MINUTE.
 */

import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

const DEFAULT_RPM = 60;

const windows = new Map<string, number[]>();

function getLimit(): number {
  const env = process.env.P0_MCP_RATE_LIMIT_PER_MINUTE;
  if (env) {
    const n = parseInt(env, 10);
    if (!isNaN(n) && n > 0) return n;
  }
  return DEFAULT_RPM;
}

/**
 * Check rate limit for a tool call. Throws McpError if exceeded.
 * Sliding window: tracks timestamps of calls in the last 60 seconds.
 */
export function checkMcpRateLimit(toolName: string): void {
  const limit = getLimit();
  const now = Date.now();
  const windowMs = 60_000;
  const cutoff = now - windowMs;

  let timestamps = windows.get(toolName);
  if (!timestamps) {
    timestamps = [];
    windows.set(toolName, timestamps);
  }

  // Evict expired entries
  while (timestamps.length > 0 && timestamps[0]! < cutoff) {
    timestamps.shift();
  }

  if (timestamps.length >= limit) {
    throw new McpError(
      ErrorCode.InvalidRequest,
      `MCP rate limit exceeded for ${toolName}. Max ${limit} calls/minute.`
    );
  }

  timestamps.push(now);
}

/**
 * Global rate limit across all tools combined.
 */
const GLOBAL_KEY = "__global__";
const GLOBAL_RPM = 300;

export function checkGlobalRateLimit(): void {
  const now = Date.now();
  const cutoff = now - 60_000;

  let timestamps = windows.get(GLOBAL_KEY);
  if (!timestamps) {
    timestamps = [];
    windows.set(GLOBAL_KEY, timestamps);
  }

  while (timestamps.length > 0 && timestamps[0]! < cutoff) {
    timestamps.shift();
  }

  if (timestamps.length >= GLOBAL_RPM) {
    throw new McpError(
      ErrorCode.InvalidRequest,
      `MCP global rate limit exceeded. Max ${GLOBAL_RPM} calls/minute across all tools.`
    );
  }

  timestamps.push(now);
}
