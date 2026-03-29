import "server-only";

import { adminDb } from "@/lib/firebase/admin";

type ProjectInitDoc = {
  initialization?: {
    cognitivePreload?: {
      projectName?: string;
      projectDescription?: string;
      industry?: string | null;
      spine?: { name?: string; stack?: string; included?: string[] };
      agents?: Array<{ name?: string; role?: string; jobTitle?: string }>;
    };
  };
};

export async function prependProjectCognitiveContext(
  message: string,
  projectId?: string
): Promise<string> {
  if (!projectId) return message;

  try {
    const snap = await adminDb.collection("pb_projects").doc(projectId).get();
    if (!snap.exists) return message;

    const data = (snap.data() ?? {}) as ProjectInitDoc;
    const preload = data.initialization?.cognitivePreload;
    if (!preload) return message;

    const lines: string[] = [
      "[Project Initialization Context]",
      `Project: ${preload.projectName ?? projectId}`,
    ];

    if (preload.projectDescription) {
      lines.push(`Brief: ${preload.projectDescription}`);
    }
    if (preload.industry) {
      lines.push(`Industry: ${preload.industry}`);
    }
    if (preload.spine?.name) {
      lines.push(`Spine: ${preload.spine.name}`);
    }
    if (preload.spine?.stack) {
      lines.push(`Stack: ${preload.spine.stack}`);
    }
    if (Array.isArray(preload.agents) && preload.agents.length > 0) {
      const roster = preload.agents
        .map((agent) => agent.name || agent.jobTitle || agent.role)
        .filter(Boolean)
        .join(", ");
      if (roster) {
        lines.push(`Agent roster: ${roster}`);
      }
    }

    lines.push("---\n");
    return `${lines.join("\n")}\n${message}`;
  } catch {
    return message;
  }
}
