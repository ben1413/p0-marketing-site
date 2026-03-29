import "server-only";

import { fetchCore } from "@/lib/core/serverClient";
import type { CreatorKitId, GamePlatform } from "./types";
import { buildCombinedContext } from "./kitContext";

type RegisterAgentBody = {
  name: string;
  persona: string;
  jobTitle: string;
  description: string;
  allowedActions: string[];
  llm: { provider: string; model: string };
};

const DEFAULT_LLM = { provider: "openai", model: "gpt-4o-mini" };

function agentDefs(
  kitLabel: string,
  platformLabel: string,
  baseContext: string
): RegisterAgentBody[] {
  const prefix = `[CreatorFloor | ${platformLabel} | ${kitLabel}]\n${baseContext}\n\n`;
  return [
    {
      name: "Studio",
      persona: "Project orchestrator",
      jobTitle: "Studio Agent",
      description:
        prefix +
        "You scope work, clarify goals, break down milestones, and keep the team aligned with the CreatorKit architecture.",
      allowedActions: ["read_brain", "write_brain"],
      llm: DEFAULT_LLM,
    },
    {
      name: "Design",
      persona: "Systems & economy designer",
      jobTitle: "Design Agent",
      description:
        prefix +
        "You design loops, economy, UX flows, and monetization that fit this kit and platform.",
      allowedActions: ["read_brain", "write_brain"],
      llm: DEFAULT_LLM,
    },
    {
      name: "Game",
      persona: "Feel & pacing",
      jobTitle: "Game Agent",
      description:
        prefix +
        "You tune difficulty, session pacing, onboarding, and player-facing clarity.",
      allowedActions: ["read_brain", "write_brain"],
      llm: DEFAULT_LLM,
    },
    {
      name: "Code Review",
      persona: "Code reviewer",
      jobTitle: "Code Review Agent",
      description:
        prefix +
        "You review code for this platform (Luau or Verse), performance, security, and kit conventions.",
      allowedActions: ["read_brain", "write_brain"],
      llm: DEFAULT_LLM,
    },
  ];
}

export type GameInitResult = {
  projectId: string;
  agentIds: { studio: string; design: string; game: string; codeReview: string };
};

/**
 * Create Core project (init), register kit-aware agents, seed brain. Requires Bearer accepted by Core init (Firebase JWT recommended).
 */
export async function runGameInit(params: {
  name: string;
  platform: GamePlatform;
  kit: CreatorKitId;
  bearerToken: string;
}): Promise<GameInitResult> {
  const { name, platform, kit, bearerToken } = params;
  if (!bearerToken.trim()) {
    throw new Error("Missing bearer token for Core init");
  }

  const platformLabel = platform === "roblox" ? "Roblox" : "UEFN";
  const kitLabel = kit.charAt(0).toUpperCase() + kit.slice(1);
  const combined = buildCombinedContext(platform, kit, name);

  const initRes = await fetchCore("/api/v1/init/project", {
    method: "POST",
    bearerToken,
    body: JSON.stringify({ name }),
  });
  const initJson = (await initRes.json().catch(() => ({}))) as {
    ok?: boolean;
    project?: { id: string };
    error?: string;
    hint?: string;
  };
  if (!initRes.ok || !initJson.project?.id) {
    throw new Error(
      initJson.error ||
        initJson.hint ||
        `Init failed (${initRes.status})`
    );
  }

  const projectId = initJson.project.id;

  // Subsequent calls must use auth scoped to this project. Firebase JWT: user_profiles updated by init.
  // API keys: may still point at old project — document JWT path for bootstrap.

  const agents = agentDefs(kitLabel, platformLabel, combined);
  const ids: string[] = [];

  for (const body of agents) {
    const res = await fetchCore("/api/v1/agents/register", {
      method: "POST",
      bearerToken,
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as {
      agentId?: string;
      id?: string;
      agent?: { id: string };
      error?: string;
    };
    const agentId = data.agentId || data.id || data.agent?.id;
    if (!res.ok || !agentId) {
      throw new Error(data.error || `Agent register failed (${res.status})`);
    }
    ids.push(agentId);
  }

  const brainPayload = {
    key: `cf_kit_${kit}_bootstrap`,
    content: combined,
    memoryType: "core" as const,
    persona: "CreatorFloor",
    jobTitle: "Init",
  };

  const brainRes = await fetchCore("/api/v1/brain/put", {
    method: "POST",
    bearerToken,
    body: JSON.stringify(brainPayload),
  });
  if (!brainRes.ok) {
    const err = await brainRes.json().catch(() => ({}));
    throw new Error(
      (err as { error?: string }).error || `Brain seed failed (${brainRes.status})`
    );
  }

  return {
    projectId,
    agentIds: {
      studio: ids[0]!,
      design: ids[1]!,
      game: ids[2]!,
      codeReview: ids[3]!,
    },
  };
}
