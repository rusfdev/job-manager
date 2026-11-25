export const ErrorKind = {
  VALIDATION: "validation",
  UNAUTHENTICATED: "unauthenticated",
  FORBIDDEN: "forbidden",
  NOT_FOUND: "not_found",
  CONFLICT: "conflict",
} as const;

export type ErrorKind = (typeof ErrorKind)[keyof typeof ErrorKind];
