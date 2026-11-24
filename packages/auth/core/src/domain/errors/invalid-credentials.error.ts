import { AppError, type AppErrorOptions, ERROR_KIND } from "@repo/common/errors";

export class InvalidCredentialsError extends AppError {
  readonly kind = ERROR_KIND.UNAUTHENTICATED;
  readonly code = "INVALID_CREDENTIALS";

  constructor(options?: AppErrorOptions) {
    super("Invalid email or password", options);
  }
}
