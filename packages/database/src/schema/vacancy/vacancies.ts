import { index, snakeCase, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import type { UserId } from "@repo/contracts/auth";
import type { VacancyId, VacancyStatus } from "@repo/contracts/vacancy";
import { users } from "../auth/users.js";

export const vacancies = snakeCase.table(
  "vacancies",
  {
    id: uuid().$type<VacancyId>().primaryKey(),
    ownerId: uuid()
      .$type<UserId>()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    url: text().notNull(),
    position: text().notNull(),
    description: text().notNull(),
    status: text().$type<VacancyStatus>().notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    unique("vacancies_owner_id_url_unique").on(table.ownerId, table.url),
    index("vacancies_owner_id_created_at_idx").on(table.ownerId, table.createdAt),
  ],
);

export type SelectVacancy = typeof vacancies.$inferSelect;
export type InsertVacancy = typeof vacancies.$inferInsert;
