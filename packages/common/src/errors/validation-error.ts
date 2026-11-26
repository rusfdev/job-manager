import { CustomError } from "./custom-error.js";
import { ErrorKind } from "./error-kind.js";

export class ValidationError extends CustomError {
  readonly kind = ErrorKind.VALIDATION;
  readonly code = "VALIDATION";
}
