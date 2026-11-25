import { UnauthenticatedError, type CustomErrorOptions } from "@repo/common/errors";

export class InvalidCredentialsError extends UnauthenticatedError {
  readonly code = "INVALID_CREDENTIALS";

  constructor(options?: CustomErrorOptions) {
    super("Invalid email or password", options);
  }
}
