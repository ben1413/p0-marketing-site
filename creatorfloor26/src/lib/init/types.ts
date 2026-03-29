export type GamePlatform = "roblox" | "uefn";

export type CreatorKitId =
  | "tycoon"
  | "obby"
  | "rpg"
  | "simulator"
  | "social"
  | "starter";

export const CREATOR_KITS: {
  id: CreatorKitId;
  name: string;
  blurb: string;
}[] = [
  {
    id: "tycoon",
    name: "Tycoon Kit",
    blurb:
      "Currency, rebirth, buildings, idle income, prestige — the boring 80% of a tycoon.",
  },
  {
    id: "obby",
    name: "Obby Kit",
    blurb:
      "Checkpoints, leaderboards, stages, skip monetization — obby infra you should not rebuild.",
  },
  {
    id: "rpg",
    name: "RPG Kit",
    blurb: "Inventory, quests, combat shell, NPCs, loot tables — RPG scaffolding.",
  },
  {
    id: "simulator",
    name: "Simulator Kit",
    blurb: "Collection, pets, upgrades, rebirths, eggs — simulator genre rails.",
  },
  {
    id: "social",
    name: "Social / Hangout Kit",
    blurb: "Rooms, avatar hooks, chat, minigame frame — social experiences.",
  },
  {
    id: "starter",
    name: "Generic Starter Kit",
    blurb:
      "DataStores, RemoteEvents, UI frame, GamePasses / DevProducts, analytics hooks.",
  },
];
