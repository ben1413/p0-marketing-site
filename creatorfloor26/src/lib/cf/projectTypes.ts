import type { CreatorKitId, GamePlatform } from "@/lib/init/types";

export type CfProjectStatus = "building" | "live" | "archived";

/** Firestore document in `cf_projects` — one row per CreatorFloor project. */
export type CfProjectDoc = {
  name: string;
  platform: GamePlatform;
  kit: CreatorKitId;
  /** P0 Core project id from init */
  coreProjectId: string;
  /** Roblox universe/place or UEFN game identifier for live ops */
  gameId?: string;
  userId: string;
  teamId?: string;
  agentIds?: {
    studio: string;
    design: string;
    game: string;
    codeReview: string;
  };
  status: CfProjectStatus;
  createdAt: string;
  updatedAt: string;
};
