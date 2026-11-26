import { CustomError } from "./custom-error.js";
import { ErrorKind } from "./error-kind.js";

export class ForbiddenError extends CustomError {
  readonly kind = ErrorKind.FORBIDDEN;
  readonly code = "FORBIDDEN";
}
