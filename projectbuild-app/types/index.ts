// Core domain types for ProjectBuild
// Build owns: Project, Room, Track, Thread, Board items
// Core owns: Agent, Run, LedgerItem (referenced via API, not duplicated here)

export type Project = {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: unknown;
  isCore?: boolean;
};

export type Track = {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  createdAt: unknown;
};

// ── Structured message blocks (Builder + Designer Mode) ───────────────────

export type TodoTask = {
  id: string;
  label: string;
  status: "pending" | "in_progress" | "done";
};

export type MessageBlock =
  | { type: "text"; content: string }
  | { type: "todo_list"; tasks: TodoTask[] }
  | { type: "file_explored"; files: string[]; label: string }
  | { type: "diff"; before: string; after: string; filePath: string }
  | { type: "canvas_update"; elements: CanvasElement[]; description?: string };

// ── Designer Mode — canvas state ──────────────────────────────────────────

export type DesignerMode = "wireframe" | "render" | "prototype";

export type DesignerTool =
  | "select"
  | "frame"
  | "rect"
  | "text"
  | "arrow"
  | "pen"
  | "note";

export type CanvasElement = {
  id: string;
  type: "frame" | "rect" | "text" | "arrow" | "pen" | "note";
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;    // text body for text/note types
  name?: string;       // label for frame types
  createdBy: "human" | "agent";
  layerGroup?: string;
  // Arrow-specific
  points?: number[];   // [x1,y1, x2,y2] for arrow; full polyline for pen
  fromId?: string;
  toId?: string;
  // Annotation state
  expanded?: boolean;
  annotationNumber?: number;
  agentName?: string;
  // Style overrides
  fill?: string;
  stroke?: string;
};

// ── Thread message ─────────────────────────────────────────────────────────

export type ThreadMessage = {
  id: string;
  projectId: string;
  trackId?: string;          // null = room-level message
  runId: string;
  text: string;              // plain text — always present for backward compat
  blocks?: MessageBlock[];   // structured blocks — present when builderMode:true
  authorType: "human" | "agent";
  authorName?: string;
  agentId?: string;
  agentJobTitle?: string;
  truthPosture?: "known" | "inferred" | "unknown";
  actionsApplied?: string[];
  // Guardrails from trace — surfaced when limits apply
  inputTruncated?: boolean;
  maxTurnsPerMeeting?: number;
  createdAt?: { seconds: number; nanoseconds: number };
};

export type BoardColumnId = "tasks" | "decisions" | "risks" | "done";

export type BoardItem = {
  id: string;
  title: string;
  description?: string;
  columnId: BoardColumnId;
  createdBy: string;         // human userId or agentId
  createdByType: "human" | "agent";
  assignedTo?: string;
  createdAt?: unknown;
};

export type BoardDoc = {
  items: BoardItem[];
  updatedAt?: unknown;
};

// Agent as returned by Core GET /api/v1/agents/list
export type Agent = {
  id: string;
  name: string;
  jobTitle: string;
  persona: string;
  status: "active" | "suspended" | "halted";
  allowedActions: string[];
  authorityMode?: string;
  llm?: { model: string; provider: string };
};

// Run response from Core
export type TraceGuardrails = {
  maxTurnsPerMeeting?: number;
  inputTruncated?: boolean;
};

export type RunSimpleResponse = {
  ok?: boolean;
  reply?: string;
  blocks?: MessageBlock[];   // present when builderMode:true
  agentId?: string;
  truthPosture?: "known" | "inferred" | "unknown";
  actions?: BoardAction[];
  actionsRequested?: unknown[];
  memoryUsed?: { count: number; ids: string[] };
  trace?: { guardrails?: TraceGuardrails; modelTier?: string; [key: string]: unknown };
  requestId?: string;
  error?: string;
};

// Board action returned by Core with clientExecute: true
export type BoardAction =
  | { type: "create_board_task"; ok: true; clientExecute: true; payload: { title: string; description?: string; chapterId?: string; runId?: string } }
  | { type: "move_board_task"; ok: true; clientExecute: true; payload: { taskId: string; targetChapterId: string } }
  | { type: "assign_board_task"; ok: true; clientExecute: true; payload: { taskId: string; assigneeId: string } }
  | { type: string; ok: false; reason?: string };

// Promote
export type AuthorityMode = "human_led" | "human_in_the_loop" | "agent_autonomous";
export type LedgerItemType = "decision" | "artifact" | "task" | "note" | "code";
export type TruthPosture = "known" | "inferred" | "unknown";

export type PromotePayload = {
  evaluationId: string;
  summary: string;
  authorityMode: AuthorityMode;
  actor: string | { type: string; id: string };
  type?: LedgerItemType;
  tags?: string[];
  projectId?: string;
  runId?: string;
  truthPosture?: TruthPosture;
};
