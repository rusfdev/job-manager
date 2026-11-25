import { CustomError } from "./custom-error.js";
import { ErrorKind } from "./error-kind.js";

export abstract class NotFoundError extends CustomError {
  readonly kind = ErrorKind.NOT_FOUND;
}
