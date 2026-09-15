import { pgEnum } from "drizzle-orm/pg-core";

/** Why a statutes_current/regulations_current row was last written. */
export const updateReasonEnum = pgEnum("update_reason", [
  "initial_ingestion",
  "scheduled_reconciliation",
  "webhook_update",
  "manual_correction",
]);

/**
 * - `relates_to`: a genuine cross-reference between two citations (from
 *   cross_references_usc/cfr).
 * - `recodified_to`: citation-level replacement — one citation number
 *   replacing another entirely, distinct from the same citation's text
 *   being amended.
 */
export const relationshipTypeEnum = pgEnum("relationship_type", [
  "relates_to",
  "recodified_to",
]);

/** A derived best guess on the statutes current status */
export const derivedStatusEnum = pgEnum("derived_status", [
  "active",
  "repealed",
]);

/**
 * Status for anything that's a genuine async job lifecycle
 */
export const processStatusEnum = pgEnum("process_status", [
  "pending",
  "in_progress",
  "completed",
  "failed",
]);

export const entityTypeEnum = pgEnum("entity_type", ["statute", "regulation"]);
