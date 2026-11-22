import { PasswordHasher } from "@nestjs/authentication";
import { CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { err, ok, type Result } from "@repo/shared/result";
import type { UserId } from "@repo/auth-common/domain";
import { InvalidCredentialsError } from "../../../domain/errors/invalid-credentials.error.js";
import { UserRepository } from "../../../domain/user.repository.js";
import { VerifyCredentialsCommand } from "./verify-credentials.command.js";

@CommandHandler(VerifyCredentialsCommand)
export class VerifyCredentialsHandler implements ICommandHandler<VerifyCredentialsCommand> {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute({
    email,
    password,
  }: VerifyCredentialsCommand): Promise<Result<UserId, InvalidCredentialsError>> {
    const user = await this.userRepo.findByEmail(email);
    const isValid = await this.passwordHasher.verify(password, user?.passwordHash);

    if (!user || !isValid) {
      return err(new InvalidCredentialsError());
    }

    if (this.passwordHasher.needsRehash(user.passwordHash)) {
      const passwordHash = await this.passwordHasher.hash(password);
      user.changePasswordHash(passwordHash);
      await this.userRepo.save(user);
    }

    return ok(user.id);
  }
}
