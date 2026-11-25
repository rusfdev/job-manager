import { Command } from "@nestjs/cqrs";
import type { Result } from "@repo/common/result";
import type { Email, Password, UserId } from "@repo/auth-common";
import type { EmailAlreadyExistsError } from "../../../domain/errors/email-already-exists.error.js";

export class CreateUserCommand extends Command<Result<UserId, EmailAlreadyExistsError>> {
  constructor(
    readonly email: Email,
    readonly password: Password,
  ) {
    super();
  }
}
