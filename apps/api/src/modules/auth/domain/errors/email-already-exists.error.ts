import { AppError, type AppErrorOptions, ERROR_KIND } from "@repo/shared/errors";

export class EmailAlreadyExistsError extends AppError {
  readonly kind = ERROR_KIND.CONFLICT;
  readonly code = "EMAIL_ALREADY_EXISTS";

  constructor(options?: AppErrorOptions) {
    super("Email already exists", options);
  }
}
