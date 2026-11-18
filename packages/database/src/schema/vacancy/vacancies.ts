import { index, snakeCase, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { users } from "../auth/users.js";

export const VACANCIES_OWNER_ID_URL_UNIQUE = "vacancies_owner_id_url_unique";

export const vacancies = snakeCase.table(
  "vacancies",
  {
    id: uuid().primaryKey(),
    ownerId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    url: text().notNull(),
    position: text().notNull(),
    description: text().notNull(),
    status: text().notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    unique(VACANCIES_OWNER_ID_URL_UNIQUE).on(table.ownerId, table.url),
    index("vacancies_owner_id_created_at_idx").on(table.ownerId, table.createdAt),
  ],
);

export type SelectVacancy = typeof vacancies.$inferSelect;
export type InsertVacancy = typeof vacancies.$inferInsert;
