import { safeStringify } from "./safe-stringify.js";

export function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${safeStringify(value)}`);
}
