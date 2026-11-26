import { snakeCase, text, timestamp, uuid } from "drizzle-orm/pg-core";
import type { Email } from "@repo/contracts";
import type { UserId } from "@repo/contracts/auth";

export const users = snakeCase.table("users", {
  id: uuid().$type<UserId>().primaryKey(),
  email: text().$type<Email>().notNull().unique(),
  passwordHash: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
