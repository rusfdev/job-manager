import { AppError, type AppErrorOptions, ERROR_KIND } from "@repo/shared/errors";

export class UserAlreadyExistsError extends AppError {
  readonly kind = ERROR_KIND.CONFLICT;
  readonly code = "USER_ALREADY_EXISTS";

  constructor(options?: AppErrorOptions) {
    super("User already exists", options);
  }
}
