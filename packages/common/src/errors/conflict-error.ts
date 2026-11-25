import { CustomError } from "./custom-error.js";
import { ErrorKind } from "./error-kind.js";

export abstract class ConflictError extends CustomError {
  readonly kind = ErrorKind.CONFLICT;
}
