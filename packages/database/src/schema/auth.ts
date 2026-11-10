import { index, text, timestamp, uuid, snakeCase } from "drizzle-orm/pg-core";
import { user } from "./user.js";

export const session = snakeCase.table(
  "session",
  {
    id: text().primaryKey(),
    userId: uuid()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp({ withTimezone: true }).notNull(),
    expiresAt: timestamp({ withTimezone: true }).notNull(),
    lastActiveAt: timestamp({ withTimezone: true }).notNull(),
  },
  (table) => [
    index("session_user_id_idx").on(table.userId),
    index("session_expires_at_idx").on(table.expiresAt),
  ],
);
