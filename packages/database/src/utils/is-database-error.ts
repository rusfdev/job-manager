import { DrizzleQueryError } from "drizzle-orm";
import { DatabaseError } from "pg";

export function isDatabaseError(e: unknown): e is DatabaseError {
  return e instanceof DrizzleQueryError && !!e.cause && e.cause instanceof DatabaseError;
}
