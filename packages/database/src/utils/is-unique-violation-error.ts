import type { DatabaseError } from "pg";
import { isDatabaseError } from "./is-database-error.js";

export function isUniqueViolationError(e: unknown): e is DatabaseError {
  if (!isDatabaseError(e)) return false;
  return e.code === "23505";
}
