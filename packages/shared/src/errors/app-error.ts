import { type ErrorKind } from "./error-kind.js";

export interface AppErrorOptions extends ErrorOptions {}

export abstract class AppError extends Error {
  abstract readonly kind: ErrorKind;
  abstract readonly code: string;

  constructor(message: string, options?: AppErrorOptions) {
    super(message, options);
    this.name = new.target.name;
  }
}
