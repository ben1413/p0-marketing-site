import starterSpineJson from "@/data/spines/starter-spine.json";

export type IndustryOption =
  | "Gaming / Live Services"
  | "Fintech / Payments"
  | "Insurtech"
  | "Healthtech"
  | "Legal Tech"
  | "Other";

export type AgentRoleKey =
  | "systems-architect"
  | "developer"
  | "product-lead"
  | "code-reviewer";

export type AgentDefinition = {
  role: AgentRoleKey;
  name: string;
  jobTitle: string;
  persona: string;
};

export type StarterSpine = {
  id: "starter-spine";
  name: string;
  stack: string;
  included: string[];
  source: string;
};

export const INDUSTRY_OPTIONS: IndustryOption[] = [
  "Gaming / Live Services",
  "Fintech / Payments",
  "Insurtech",
  "Healthtech",
  "Legal Tech",
  "Other",
];

export const STARTER_SPINE: StarterSpine = {
  id: "starter-spine",
  name: starterSpineJson.name,
  stack: starterSpineJson.stack,
  included: starterSpineJson.included,
  source: "data/spines/starter-spine.json",
};

export const AGENT_BANK_DEFAULTS: AgentDefinition[] = [
  {
    role: "systems-architect",
    name: "Systems Architect",
    jobTitle: "Systems Architect",
    persona:
      "Senior systems thinker. Reads the full codebase before responding. Flags conflicts and structural issues before they become problems. Thinks in systems, not features.",
  },
  {
    role: "developer",
    name: "Developer",
    jobTitle: "Developer",
    persona:
      "Senior full-stack engineer. Writes clean, production-grade code. Pairs with humans in Builder Mode. Implements what the architect designs.",
  },
  {
    role: "product-lead",
    name: "Product Lead",
    jobTitle: "Product Lead",
    persona:
      "PM and designer hybrid. Tracks tasks, decisions, and risks. Thinks about UX and product direction alongside engineering. Keeps the board current.",
  },
  {
    role: "code-reviewer",
    name: "Code Reviewer",
    jobTitle: "Code Reviewer",
    persona:
      "Quality gate. Reviews every diff before promote. Flags anything that doesn't meet production standard. Makes juniors ship like seniors.",
  },
];

export function isSingleSentence(input: string): boolean {
  const trimmed = input.trim();
  if (!trimmed) return false;
  const sentenceTerminatorCount = (trimmed.match(/[.!?](\s|$)/g) ?? []).length;
  return sentenceTerminatorCount <= 1;
}
