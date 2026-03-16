/**
 * Firestore schema for Builder Mode (projectbuild-app owned).
 *
 * Personal and Team are soft buckets — mutable working memory.
 * Ledger hits Core promote — institutional record.
 *
 * Checkpoint: last promote timestamp per user, per branch, per project.
 * Two engineers on the same project on different branches need independent checkpoints.
 */

export const BUILDER_COLLECTIONS = {
  /** Personal promote bucket — user's own working memory */
  PERSONAL: "pb_builder_personal",
  /** Team promote bucket — shared visibility, low commitment */
  TEAM: "pb_builder_team",
  /** Last promote checkpoint: projectId + userId + branch → timestamp */
  CHECKPOINTS: "pb_builder_checkpoints",
} as const;

export type CheckpointDoc = {
  projectId: string;
  userId: string;
  branch: string;
  timestamp: number; // unix ms
  updatedAt: unknown;
};
