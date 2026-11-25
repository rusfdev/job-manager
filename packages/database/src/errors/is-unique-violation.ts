import { DrizzleQueryError } from "drizzle-orm";

const UNIQUE_VIOLATION_CODE = "23505";

export function isUniqueViolation(error: unknown): boolean {
  if (!(error instanceof DrizzleQueryError)) return false;

  const cause = error.cause as { code?: string } | undefined;

  return cause?.code === UNIQUE_VIOLATION_CODE;
}
