import { DrizzleQueryError } from "drizzle-orm";

export function isDrizzleQueryError(e: unknown): e is DrizzleQueryError {
  return e instanceof DrizzleQueryError;
}
