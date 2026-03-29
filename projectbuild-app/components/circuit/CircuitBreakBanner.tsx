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
    "Halted by an administrator. Cannot respond until manually resumed.",
  AGENT_SUSPENDED:
    "Suspended pending review. A team member needs to resume this agent.",
  AGENT_DISABLED:
    "Currently disabled.",
  AGENT_COOLING_DOWN:
    "Cooling down after a circuit break. Will auto-recover shortly, or an admin can resume immediately.",
  AGENT_TOKEN_CAP_EXCEEDED:
    "Exceeded session token limit. Stopped to prevent runaway costs.",
  AGENT_RATE_LIMITED:
    "Too many requests in a short period. Try again in a minute.",
  AGENT_GOVERNANCE_BLOCKED:
    "Blocked by a governance rule. Check project governance settings.",
  AGENT_EVAL_SCORE_TOO_LOW:
    "Evaluation score dropped below safe threshold. Human review needed.",
  AGENT_CASCADING_RISK:
    "A teammate agent was recently stopped for safety. Downstream work paused until reviewed.",
};

function humanReadable(code?: string, reason?: string): string {
  if (code && PLAIN_MESSAGES[code]) return PLAIN_MESSAGES[code];
  if (reason) return reason;
  return "Agent run was stopped by the circuit breaker.";
}

export function CircuitBreakBanner({ code, reason, agentName, onDismiss }: CircuitBreakBannerProps) {
  const message = humanReadable(code, reason);
  const label = agentName || "Agent";

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
