import { Command } from "@nestjs/cqrs";
import type { Result } from "@repo/common/result";
import type { Email } from "@repo/contracts";
import type { Password, UserId } from "@repo/contracts/auth";
import type { EmailAlreadyExistsError } from "../../../domain/errors/email-already-exists.error.js";

export class CreateUserCommand extends Command<Result<UserId, EmailAlreadyExistsError>> {
  constructor(
    readonly email: Email,
    readonly password: Password,
  ) {
    super();
  }
}
