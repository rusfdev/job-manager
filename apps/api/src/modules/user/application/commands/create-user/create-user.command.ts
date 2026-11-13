import { Command } from "@nestjs/cqrs";
import type { Email, UserId } from "@repo/shared/primitives";
import type { Result } from "@repo/shared/result";
import type { UserAlreadyExistsError } from "../../../domain/errors/user-already-exists.error.js";

export class CreateUserCommand extends Command<Result<UserId, UserAlreadyExistsError>> {
  constructor(
    readonly email: Email,
    readonly passwordHash: string,
  ) {
    super();
  }
}
