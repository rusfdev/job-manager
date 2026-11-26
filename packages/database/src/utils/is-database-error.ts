import { DatabaseError } from "pg";

export function isDatabaseError(e: unknown): e is DatabaseError {
  return e instanceof DatabaseError;
}
