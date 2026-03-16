"use client";

import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import {
  AGENT_BANK_DEFAULTS,
  STARTER_SPINE,
  type AgentRoleKey,
  type IndustryOption,
} from "@/lib/projectInit/config";

type CreateProjectInput = {
  name: string;
  description: string;
  industry?: IndustryOption;
  selectedRoles: AgentRoleKey[];
};

export type InitProgressKey =
  | "create_workspace"
  | "load_spine_context"
  | "brief_agents"
  | "seed_project_memory";

export type InitProgressState = "pending" | "in_progress" | "done";

type ProgressUpdate = (key: InitProgressKey, state: InitProgressState) => void;

type RegisterAgentResponse = { ok?: boolean; agentId?: string; error?: string };

function buildCognitivePreload(input: CreateProjectInput) {
  return {
    projectName: input.name,
    projectDescription: input.description,
    industry: input.industry ?? null,
    spine: STARTER_SPINE,
    agents: AGENT_BANK_DEFAULTS.filter((agent) => input.selectedRoles.includes(agent.role)),
    seededAt: new Date().toISOString(),
  };
}

async function registerProjectAgent(projectId: string, role: AgentRoleKey, projectName: string) {
  const def = AGENT_BANK_DEFAULTS.find((agent) => agent.role === role);
  if (!def) {
    throw new Error(`Unknown agent role: ${role}`);
  }

  const res = await fetch("/api/agents/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      projectId,
      role,
      name: `${def.name} · ${projectName}`,
      jobTitle: def.jobTitle,
      persona: def.persona,
      principles: def.persona,
      scope: "project",
      llm: { provider: "openai", model: "gpt-4o-mini" },
    }),
  });

  const payload = (await res.json()) as RegisterAgentResponse;
  if (!res.ok || !payload.agentId) {
    throw new Error(payload.error ?? "Failed to register agent");
  }
  return { id: payload.agentId, ...def };
}

export async function createProjectWithInitialization(
  input: CreateProjectInput,
  onProgress: ProgressUpdate
): Promise<string> {
  const projectRef = doc(collection(db, "pb_projects"));
  const projectId = projectRef.id;

  onProgress("create_workspace", "in_progress");
  await setDoc(projectRef, {
    projectId,
    name: input.name.trim(),
    description: input.description.trim(),
    industry: input.industry ?? null,
    spineId: STARTER_SPINE.id,
    createdBy: "user",
    createdAt: serverTimestamp(),
    isCore: false,
    initialization: {
      status: "creating",
      selectedRoles: input.selectedRoles,
      createdFrom: "project-init-flow",
    },
  });
  onProgress("create_workspace", "done");

  onProgress("load_spine_context", "in_progress");
  await updateDoc(projectRef, {
    spine: STARTER_SPINE,
    "initialization.spineLoadedAt": serverTimestamp(),
  });
  onProgress("load_spine_context", "done");

  onProgress("brief_agents", "in_progress");
  const registeredAgents = [];
  for (const role of input.selectedRoles) {
    // Sequential registration keeps the UI progress deterministic.
    const agent = await registerProjectAgent(projectId, role, input.name.trim());
    registeredAgents.push(agent);
  }
  onProgress("brief_agents", "done");

  onProgress("seed_project_memory", "in_progress");
  const preload = buildCognitivePreload(input);
  await updateDoc(projectRef, {
    "initialization.status": "ready",
    "initialization.completedAt": serverTimestamp(),
    "initialization.agentIds": registeredAgents.map((agent) => agent.id),
    "initialization.agents": registeredAgents,
    "initialization.cognitivePreload": preload,
    "initialization.welcomeSeededAt": null,
  });
  onProgress("seed_project_memory", "done");

  return projectId;
}
