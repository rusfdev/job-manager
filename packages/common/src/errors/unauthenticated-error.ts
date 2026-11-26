import { CustomError } from "./custom-error.js";
import { ErrorKind } from "./error-kind.js";

export class UnauthenticatedError extends CustomError {
  readonly kind = ErrorKind.UNAUTHENTICATED;
  readonly code = "UNAUTHENTICATED";
}
