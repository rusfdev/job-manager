import { randomUUIDv7 } from "node:crypto";
import { PasswordHasher } from "@nestjs/authentication";
import { CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { UniqueConstraintError } from "@repo/common/errors";
import { err, ok } from "@repo/common/result";
import { UserId } from "@repo/contracts/auth";
import { EmailAlreadyExistsError } from "../../../domain/errors/email-already-exists.error.js";
import { User } from "../../../domain/user.aggregate.js";
import { UserRepository } from "../../../domain/user.repository.js";
import { CreateUserCommand } from "./create-user.command.js";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute({ email, password }: CreateUserCommand) {
    const exists = await this.userRepo.existsByEmail(email);
    if (exists) return err(new EmailAlreadyExistsError());

    const user = User.create({
      id: UserId.parse(randomUUIDv7()),
      email,
      passwordHash: await this.passwordHasher.hash(password),
    });

    try {
      await this.userRepo.save(user);
    } catch (e) {
      if (e instanceof UniqueConstraintError) {
        return err(new EmailAlreadyExistsError());
      }
      throw e;
    }

    return ok(user.id);
  }
}
