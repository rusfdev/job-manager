import { isDatabaseError } from "./is-database-error.js";
import { isDrizzleQueryError } from "./is-drizzle-query-error.js";

export function isUniqueViolationError(e: unknown): boolean {
  return isDrizzleQueryError(e) && isDatabaseError(e.cause) && e.cause.code === "23505";
}
