import { CustomError } from "./custom-error.js";
import { ErrorKind } from "./error-kind.js";

export class NotFoundError extends CustomError {
  readonly kind = ErrorKind.NOT_FOUND;
  readonly code = "NOT_FOUND";
}
