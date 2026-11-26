import { CustomError } from "./custom-error.js";
import { ErrorKind } from "./error-kind.js";

export class UniqueConstraintError extends CustomError {
  readonly kind = ErrorKind.CONFLICT;
  readonly code = "UNIQUE_CONSTRAINT";

  constructor(options?: ErrorOptions) {
    super("Unique constraint violated", options);
  }
}
