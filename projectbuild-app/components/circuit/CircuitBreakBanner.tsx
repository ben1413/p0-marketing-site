"use client";

/**
 * Circuit break banner — shown when an agent is stopped by the circuit breaker.
 * Translates raw codes into plain language a buyer can understand.
 */

type CircuitBreakBannerProps = {
  code?: string;
  reason?: string;
  agentName?: string;
  onDismiss?: () => void;
};

const PLAIN_MESSAGES: Record<string, string> = {
  AGENT_HALTED:
    "This agent has been halted by an administrator and cannot respond right now.",
  AGENT_SUSPENDED:
    "This agent is suspended pending review. A team member needs to resume it before it can respond.",
  AGENT_DISABLED:
    "This agent is currently disabled.",
  AGENT_TOKEN_CAP_EXCEEDED:
    "Agent stopped — exceeded its token limit for this session. This prevents runaway costs.",
  AGENT_RATE_LIMITED:
    "Agent paused — too many requests in a short period. Try again in a minute.",
  AGENT_GOVERNANCE_BLOCKED:
    "Agent blocked by a governance rule. Check your project's governance settings for details.",
  AGENT_EVAL_SCORE_TOO_LOW:
    "Agent suspended — its evaluation score dropped below the safe threshold. A human review is needed.",
  AGENT_CASCADING_RISK:
    "Agent blocked — a teammate agent was recently stopped for safety reasons, so downstream work is paused until the situation is reviewed.",
};

function humanReadable(code?: string, reason?: string): string {
  if (code && PLAIN_MESSAGES[code]) return PLAIN_MESSAGES[code];
  if (reason) return reason;
  return "Agent run was stopped by the circuit breaker.";
}

export function CircuitBreakBanner({ code, reason, agentName, onDismiss }: CircuitBreakBannerProps) {
  const message = humanReadable(code, reason);
  const label = agentName ? `${agentName} — stopped` : "Agent stopped";

  return (
    <div className="mx-4 mt-3 shrink-0 rounded-xl border border-red-500/25 bg-red-500/5 px-4 py-3 flex items-start gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-red-400/80 mb-1">
          {label}
        </p>
        <p className="text-[12px] text-red-300/70 leading-relaxed">
          {message}
        </p>
        {code && (
          <p className="text-[9px] text-[var(--muted)]/40 mt-1 font-mono">
            {code}
          </p>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 text-[10px] text-[var(--muted)] hover:text-[var(--text-blue)] transition-colors mt-0.5"
        >
          ✕
        </button>
      )}
    </div>
  );
}
