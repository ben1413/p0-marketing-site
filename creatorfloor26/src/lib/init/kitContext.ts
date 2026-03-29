import type { CreatorKitId, GamePlatform } from "./types";
import { ROBLOX_PLATFORM_CONTEXT } from "./platforms/roblox";
import { UEFN_PLATFORM_CONTEXT } from "./platforms/uefn";
import { TYCOON_KIT_CONTEXT } from "./kits/tycoon";
import { OBBY_KIT_CONTEXT } from "./kits/obby";
import { RPG_KIT_CONTEXT } from "./kits/rpg";
import { SIMULATOR_KIT_CONTEXT } from "./kits/simulator";
import { SOCIAL_KIT_CONTEXT } from "./kits/social";
import { STARTER_KIT_CONTEXT } from "./kits/starter";

export function getPlatformContext(platform: GamePlatform): string {
  return platform === "uefn" ? UEFN_PLATFORM_CONTEXT : ROBLOX_PLATFORM_CONTEXT;
}

export function getKitContext(kit: CreatorKitId): string {
  switch (kit) {
    case "tycoon":
      return TYCOON_KIT_CONTEXT;
    case "obby":
      return OBBY_KIT_CONTEXT;
    case "rpg":
      return RPG_KIT_CONTEXT;
    case "simulator":
      return SIMULATOR_KIT_CONTEXT;
    case "social":
      return SOCIAL_KIT_CONTEXT;
    default:
      return STARTER_KIT_CONTEXT;
  }
}

export function buildCombinedContext(
  platform: GamePlatform,
  kit: CreatorKitId,
  projectName: string
): string {
  return [
    `Project name: ${projectName}`,
    getPlatformContext(platform),
    getKitContext(kit),
  ].join("\n\n");
}
