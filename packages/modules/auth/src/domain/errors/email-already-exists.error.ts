import { ConflictError, type CustomErrorOptions } from "@repo/common/errors";

export class EmailAlreadyExistsError extends ConflictError {
  readonly code = "EMAIL_ALREADY_EXISTS";

  constructor(options?: CustomErrorOptions) {
    super("Email already exists", options);
  }
}
