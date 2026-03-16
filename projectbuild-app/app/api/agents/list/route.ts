import { NextRequest, NextResponse } from "next/server";
import { listAgents } from "@/lib/p0/coreClient";
import { adminDb } from "@/lib/firebase/admin";
import type { Agent } from "@/types";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const projectId = req.nextUrl.searchParams.get("projectId") ?? "";
    const result = await listAgents(projectId);

    if (!projectId) {
      return NextResponse.json(result);
    }

    const projectSnap = await adminDb.collection("pb_projects").doc(projectId).get();
    const data = projectSnap.data() as
      | { initialization?: { agentIds?: unknown } }
      | undefined;
    const initAgentIds = data?.initialization?.agentIds;

    if (!Array.isArray(initAgentIds) || initAgentIds.length === 0) {
      return NextResponse.json(result);
    }

    const allow = new Set(
      initAgentIds.filter((value): value is string => typeof value === "string" && value.length > 0)
    );
    const filtered = result.items.filter((agent: Agent) => allow.has(agent.id));
    return NextResponse.json({ items: filtered });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to list agents";
    return NextResponse.json({ ok: false, error: msg, items: [] }, { status: 500 });
  }
}
