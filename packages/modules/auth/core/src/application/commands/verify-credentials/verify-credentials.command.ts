import { Command } from "@nestjs/cqrs";
import type { Result } from "@repo/common/utils";
import type { Email, UserId } from "@repo/auth-common/domain";
import type { InvalidCredentialsError } from "../../../domain/errors/invalid-credentials.error.js";

export class VerifyCredentialsCommand extends Command<Result<UserId, InvalidCredentialsError>> {
  constructor(
    readonly email: Email,
    readonly password: string,
  ) {
    super();
  }
}
