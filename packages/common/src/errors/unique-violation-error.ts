export class UniqueViolationError extends Error {
  constructor(options?: ErrorOptions) {
    super("Unique constraint violated", options);
    this.name = new.target.name;
  }
}
