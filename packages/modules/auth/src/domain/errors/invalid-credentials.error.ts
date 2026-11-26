import { CustomError, type CustomErrorOptions, ErrorKind } from "@repo/common/errors";

export class InvalidCredentialsError extends CustomError {
  readonly kind = ErrorKind.UNAUTHENTICATED;
  readonly code = "INVALID_CREDENTIALS";

  constructor(options?: CustomErrorOptions) {
    super("Invalid email or password", options);
  }
}
