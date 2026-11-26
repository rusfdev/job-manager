import { DrizzleQueryError } from "drizzle-orm";

const PG_UNIQUE_VIOLATION = "23505";

export function isUniqueViolation(e: unknown): boolean {
  const cause = e instanceof DrizzleQueryError ? e.cause : e;
  return (
    typeof cause === "object" &&
    cause !== null &&
    "code" in cause &&
    cause.code === PG_UNIQUE_VIOLATION
  );
}
