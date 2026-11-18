import { Command } from "@nestjs/cqrs";
import type { Email, Password, UserId } from "@repo/shared/domain";
import type { Result } from "@repo/shared/result";
import type { EmailAlreadyExistsError } from "../../../domain/errors/email-already-exists.error.js";

export class CreateUserCommand extends Command<Result<UserId, EmailAlreadyExistsError>> {
  constructor(
    readonly email: Email,
    readonly password: Password,
  ) {
    super();
  }
}
