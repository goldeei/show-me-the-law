import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, integer, text, timestamp } from "drizzle-orm/pg-core";
import { jurisdictionLevelEnum } from "./shared/enums.js";

export const statutes = pgTable("statutes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  /**
   * = Vaquill's act_id. Prefer this over `citation` for matching/deduping.
   */
  sourceId: text().notNull().unique(),

  /** Human readable and descriptive citation */
  citation: text().notNull(),

  /** Government tier — federal, state, dc (district), or pr (territory) */
  jurisdictionLevel: jurisdictionLevelEnum().notNull(),

  /**
   * = Vaquill's `state` field, NOT its own `jurisdiction` field (always the
   * literal "US"). Specific place code (`ca`, `dc`, `pr`), null for federal.
   */
  location: text(),

  createdAt: timestamp().notNull().defaultNow(),
});

export type Statute = InferSelectModel<typeof statutes>;
export type NewStatute = InferInsertModel<typeof statutes>;
