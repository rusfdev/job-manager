import { Command } from "@nestjs/cqrs";
import type { Email, UserId } from "@repo/shared/domain";
import type { Result } from "@repo/shared/result";
import type { InvalidCredentialsError } from "../../../domain/errors/invalid-credentials.error.js";

export class VerifyCredentialsCommand extends Command<Result<UserId, InvalidCredentialsError>> {
  constructor(
    readonly email: Email,
    readonly password: string,
  ) {
    super();
  }
}
