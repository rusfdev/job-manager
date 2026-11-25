import { CustomError } from "./custom-error.js";
import { ErrorKind } from "./error-kind.js";

export abstract class ValidationError extends CustomError {
  readonly kind = ErrorKind.VALIDATION;
}
