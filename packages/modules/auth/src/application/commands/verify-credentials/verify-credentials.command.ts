import { Command } from "@nestjs/cqrs";
import type { Result } from "@repo/common/result";
import type { Email } from "@repo/contracts";
import type { UserId } from "@repo/contracts/auth";
import type { InvalidCredentialsError } from "../../../domain/errors/invalid-credentials.error.js";

export class VerifyCredentialsCommand extends Command<Result<UserId, InvalidCredentialsError>> {
  constructor(
    readonly email: Email,
    readonly password: string,
  ) {
    super();
  }
}
