export const ERROR_KIND = {
  NOT_FOUND: "not_found",
  UNAUTHENTICATED: "unauthenticated",
  FORBIDDEN: "forbidden",
  VALIDATION: "validation",
  CONFLICT: "conflict",
  RATE_LIMIT: "rate_limit",
  TIMEOUT: "timeout",
  UNAVAILABLE: "unavailable",
  CANCELLED: "cancelled",
  INTERNAL: "internal",
} as const;

export type ErrorKind = (typeof ERROR_KIND)[keyof typeof ERROR_KIND];
