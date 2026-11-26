import { CustomError, type CustomErrorOptions, ErrorKind } from "@repo/common/errors";

export class EmailAlreadyExistsError extends CustomError {
  readonly kind = ErrorKind.CONFLICT;
  readonly code = "EMAIL_ALREADY_EXISTS";

  constructor(options?: CustomErrorOptions) {
    super("Email already exists", options);
  }
}
