import { index, snakeCase, text, timestamp, uuid } from "drizzle-orm/pg-core";
import type { UserId } from "@repo/contracts/auth";
import { users } from "./users.js";

export const sessions = snakeCase.table(
  "sessions",
  {
    id: text().primaryKey(),
    userId: uuid()
      .$type<UserId>()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp({ withTimezone: true }).notNull(),
    expiresAt: timestamp({ withTimezone: true }).notNull(),
    lastActiveAt: timestamp({ withTimezone: true }).notNull(),
  },
  (table) => [
    index("sessions_user_id_idx").on(table.userId),
    index("sessions_expires_at_idx").on(table.expiresAt),
  ],
);

export type SelectSession = typeof sessions.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;
