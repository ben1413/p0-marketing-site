/**
 * Spine commands — list and install deployable architecture stacks.
 * See: docs/ENGINEERING_SPEC_SPINE_INSTALLER.md
 */
/** Registry of available spines. Eventually: fetch from API or config. */
const SPINE_REGISTRY = [
    {
        name: "starter",
        description: "Next.js + Firebase + Vercel + Stripe + Project0 Core",
        source: "local",
    },
    // Future: { name: "creator", description: "Creator workflow stack", source: "github:project0/spine-creator" },
];
export async function spineList() {
    console.log("\nAvailable spines:\n");
    for (const spine of SPINE_REGISTRY) {
        console.log(`  ${spine.name.padEnd(12)} ${spine.description}`);
    }
    console.log("\nUsage: p0 spine install <name>\n");
}
export async function spineInstall(name) {
    const spine = SPINE_REGISTRY.find((s) => s.name === name);
    if (!spine) {
        console.error(`Unknown spine: ${name}`);
        console.error("Run 'p0 spine list' to see available spines.");
        process.exit(1);
    }
    console.log(`\nInstalling spine: ${spine.name}`);
    console.log(spine.description);
    console.log("\n[WIP] Full install flow: authenticate → provision → deploy → init Core");
    console.log("\nManual install:\n");
    console.log("  1. Copy the spine:");
    console.log("     cp -r <path-to-spines>/spines/starter ./my-project");
    console.log("  2. Start the app:");
    console.log("     cd my-project/app");
    console.log("     cp .env.example .env.local");
    console.log("     npm install && npm run dev");
    console.log("\n  Set P0_CORE_BASE_URL in .env.local to your Core instance.\n");
}
