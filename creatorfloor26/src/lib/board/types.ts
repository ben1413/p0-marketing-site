export type BoardColumnId = "tasks" | "decisions" | "risks" | "done";

export type BoardItem = {
  id: string;
  title: string;
  column: BoardColumnId;
  kind?: "task" | "gaming_proposal" | "experiment";
  gamingProposalId?: string;
};

export type BoardDoc = {
  items: BoardItem[];
  updatedAt?: string;
};
