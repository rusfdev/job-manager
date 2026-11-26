import type { ErrorKind } from "./error-kind.js";

export interface CustomErrorOptions extends ErrorOptions {}

export abstract class CustomError extends Error {
  abstract readonly kind: ErrorKind;
  abstract readonly code: string;

  constructor(message: string, options?: CustomErrorOptions) {
    super(message, options);
    this.name = new.target.name;
  }
}
