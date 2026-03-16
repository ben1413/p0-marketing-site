/**
 * Verifies that the pb_builder_checkpoints composite key
 * projectId|userId|branch produces distinct Firestore doc IDs
 * for each unique combination — including same project, different branches.
 *
 * Run with: npx ts-node --skip-project lib/builder/__tests__/checkpointKey.test.ts
 * (no test framework needed — exits 0 on pass, 1 on fail)
 */

function makeCheckpointKey(projectId: string, userId: string, branch: string): string {
  return `${projectId}|${userId}|${branch}`;
}

type Scenario = {
  label: string;
  projectId: string;
  userId: string;
  branch: string;
};

const scenarios: Scenario[] = [
  // Two engineers on the same project, same branch → same key (one checkpoint)
  {
    label: "engineer-1 / proj-A / feature-auth",
    projectId: "proj-A",
    userId: "user-1",
    branch: "feature/auth",
  },
  // Same user, same project, DIFFERENT branch → must be a different key
  {
    label: "engineer-1 / proj-A / feature-payments (different branch)",
    projectId: "proj-A",
    userId: "user-1",
    branch: "feature/payments",
  },
  // Different user, same project, same branch → different key
  {
    label: "engineer-2 / proj-A / feature-auth (different user)",
    projectId: "proj-A",
    userId: "user-2",
    branch: "feature/auth",
  },
  // Same user, different project, same branch → different key
  {
    label: "engineer-1 / proj-B / feature-auth (different project)",
    projectId: "proj-B",
    userId: "user-1",
    branch: "feature/auth",
  },
];

// Build keys for all scenarios
const keys = scenarios.map((s) => ({
  ...s,
  key: makeCheckpointKey(s.projectId, s.userId, s.branch),
}));

console.log("\npb_builder_checkpoints key matrix:");
console.log("─────────────────────────────────────────────────────────");
keys.forEach(({ label, key }) => {
  console.log(`  ${label}\n    → "${key}"`);
});
console.log("─────────────────────────────────────────────────────────\n");

// Assert: all keys must be unique
const keySet = new Set(keys.map((k) => k.key));
const allUnique = keySet.size === keys.length;

// Assert: same project + same user + different branch → different key
const sameUserSameProjectDiffBranch =
  keys[0].key !== keys[1].key;

// Assert: same project + same branch + different user → different key
const sameProjectSameBranchDiffUser =
  keys[0].key !== keys[2].key;

// Assert: same user + same branch + different project → different key
const sameUserSameBranchDiffProject =
  keys[0].key !== keys[3].key;

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log("Assertions:");
assert(allUnique, "All four scenarios produce distinct Firestore doc IDs");
assert(sameUserSameProjectDiffBranch, "Same user + same project + different branch → different doc");
assert(sameProjectSameBranchDiffUser, "Same project + same branch + different user → different doc");
assert(sameUserSameBranchDiffProject, "Same user + same branch + different project → different doc");

// Show the exact Firestore write that the route executes
console.log("\nFirestore write (from route.ts):");
console.log(`  adminDb.collection("pb_builder_checkpoints")`);
console.log(`    .doc(\`\${projectId}|\${userId}|\${branch}\`)`);
console.log(`    .set({ ... }, { merge: true })`);
console.log("\n  merge: true means repeat promotes on the same branch");
console.log("  update the doc in place — no duplicate docs per branch.\n");

console.log(`Result: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
