"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { TrailEvent, TrailEventType, DecisionType } from "./types";

// ---------------------------------------------------------------------------
// Event templates — realistic ops events that could plausibly fire
// ---------------------------------------------------------------------------

type EventTemplate = {
  type: TrailEventType;
  domain: DecisionType;
  actor: string;
  description: string;
};

const EVENT_POOL: EventTemplate[] = [
  { type: "proposed", domain: "economy", actor: "Ana (Analyst Agent)", description: "Proposed daily login reward increase — veteran retention declining 2.4% WoW." },
  { type: "proposed", domain: "matchmaking", actor: "Ana (Analyst Agent)", description: "Proposed ranked queue expansion to Platinum tier during off-peak hours." },
  { type: "proposed", domain: "content", actor: "Marcus (Designer Agent)", description: "Proposed early unlock for Season 3 battle pass tier 42 challenge." },
  { type: "proposed", domain: "economy", actor: "Marcus (Designer Agent)", description: "Proposed crafting material exchange rate adjustment — 3:1 to 2:1." },
  { type: "simulated", domain: "economy", actor: "Simulation runner", description: "Simulation passed — composite 0.78, revenue +1.2%, retention +3.1%." },
  { type: "simulated", domain: "matchmaking", actor: "Simulation runner", description: "Simulation passed — composite 0.71, queue time -12%, match quality +4%." },
  { type: "simulated", domain: "content", actor: "Simulation runner", description: "Simulation passed — composite 0.82, engagement +6.3%, risk 0.09." },
  { type: "simulated", domain: "economy", actor: "Simulation runner", description: "Simulation flagged — composite 0.54, revenue risk elevated. Confidence 0.61." },
  { type: "approved", domain: "content", actor: "Dev Patel (human_led)", description: "Approved. Deploy window opens at next maintenance cycle." },
  { type: "approved", domain: "economy", actor: "Sarah Chen (human_led)", description: "Approved with note: monitor conversion rate for 48h post-deploy." },
  { type: "deployed", domain: "economy", actor: "Deployment gate", description: "Deploy authorized. Simulation hash verified. Outcome tracking initiated." },
  { type: "deployed", domain: "content", actor: "Deployment gate", description: "Deploy authorized. Rolling out to 100% of players." },
  { type: "outcome_recorded", domain: "economy", actor: "Measurement system", description: "Outcome measured — retention +3.2% vs predicted +2.8%. Revenue neutral." },
  { type: "outcome_recorded", domain: "content", actor: "Measurement system", description: "Outcome measured — engagement +5.1% vs predicted +4.0%. Pass completion up." },
  { type: "outcome_recorded", domain: "matchmaking", actor: "Measurement system", description: "Outcome measured — queue time -8% vs predicted -12%. Within tolerance." },
  { type: "blocked", domain: "matchmaking", actor: "Deployment gate", description: "Blocked — simulation stale (47m, threshold 30m). Re-run required." },
  { type: "proposed", domain: "moderation", actor: "Kai (Operator Agent)", description: "Proposed chat filter threshold adjustment — false positive rate at 4.2%." },
  { type: "simulated", domain: "moderation", actor: "Simulation runner", description: "Simulation passed — composite 0.69, confidence 0.72. Moderate risk." },
];

let _eventCounter = 0;

function generateEvent(): TrailEvent & { domain: DecisionType } {
  const template = EVENT_POOL[Math.floor(Math.random() * EVENT_POOL.length)]!;
  _eventCounter++;
  return {
    id: `live-${Date.now()}-${_eventCounter}`,
    type: template.type,
    actor: template.actor,
    description: template.description,
    timestamp: new Date().toISOString(),
    domain: template.domain,
  };
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export type LiveEvent = TrailEvent & { domain: DecisionType };

type DemoEmitterState = {
  events: LiveEvent[];
  domainActivity: Record<string, number>;
};

const DemoEmitterContext = createContext<DemoEmitterState>({
  events: [],
  domainActivity: {},
});

export function useDemoEvents() {
  return useContext(DemoEmitterContext);
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

const INTERVAL_MIN = 8_000;
const INTERVAL_MAX = 20_000;
const MAX_EVENTS = 50;

function randomInterval() {
  return INTERVAL_MIN + Math.random() * (INTERVAL_MAX - INTERVAL_MIN);
}

export function DemoEmitterProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoEmitterState>({
    events: [],
    domainActivity: {},
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tick = useCallback(() => {
    const ev = generateEvent();
    setState((prev) => {
      const events = [ev, ...prev.events].slice(0, MAX_EVENTS);
      const domainActivity = { ...prev.domainActivity };
      domainActivity[ev.domain] = Date.now();
      return { events, domainActivity };
    });

    timerRef.current = setTimeout(tick, randomInterval());
  }, []);

  useEffect(() => {
    // Fire first event quickly so the product feels alive immediately
    timerRef.current = setTimeout(tick, 3_000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [tick]);

  return (
    <DemoEmitterContext.Provider value={state}>
      {children}
    </DemoEmitterContext.Provider>
  );
}
