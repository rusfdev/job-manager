import { CustomError } from "./custom-error.js";
import { ErrorKind } from "./error-kind.js";

export class ConflictError extends CustomError {
  readonly kind = ErrorKind.CONFLICT;
  readonly code = "CONFLICT";
}
