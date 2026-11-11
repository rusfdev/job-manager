function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}

export function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${safeStringify(value)}`);
}
