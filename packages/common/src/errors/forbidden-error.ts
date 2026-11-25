import { CustomError } from "./custom-error.js";
import { ErrorKind } from "./error-kind.js";

export abstract class ForbiddenError extends CustomError {
  readonly kind = ErrorKind.FORBIDDEN;
}
