import { NextRequest, NextResponse } from "next/server";
import { registerAgent } from "@/lib/p0/coreClient";

type RegisterBody = {
  projectId?: string;
  role?: string;
  name?: string;
  jobTitle?: string;
  persona?: string;
  principles?: string;
  scope?: "project";
  llm?: { provider?: string; model?: string; version?: string };
};

const DEFAULT_ALLOWED_ACTIONS = [
  "read_brain",
  "write_brain",
  "promote_brain",
  "read_ledger",
  "promote_ledger",
  "read_artifacts",
  "create_artifact",
  "create_board_task",
  "move_board_task",
  "assign_board_task",
];

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterBody;

    if (!body.name?.trim() || !body.jobTitle?.trim() || !body.persona?.trim()) {
      return NextResponse.json(
        { ok: false, error: "name, jobTitle, and persona are required" },
        { status: 400 }
      );
    }

    const result = await registerAgent({
      name: body.name.trim(),
      jobTitle: body.jobTitle.trim(),
      persona: body.persona.trim(),
      description:
        body.principles && body.scope === "project" && body.projectId
          ? `[ProjectBuild Init]\nprojectId=${body.projectId}\nrole=${body.role ?? body.jobTitle}\nscope=${body.scope}\nprinciples=${body.principles}`
          : body.principles ?? undefined,
      allowedActions: DEFAULT_ALLOWED_ACTIONS,
      llm: {
        provider: body.llm?.provider ?? "openai",
        model: body.llm?.model ?? "gpt-4o-mini",
        version: body.llm?.version,
      },
    });

    if (!result.ok || !result.agentId) {
      return NextResponse.json(
        { ok: false, error: result.error ?? "Failed to register agent" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, agentId: result.agentId }, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to register agent";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
