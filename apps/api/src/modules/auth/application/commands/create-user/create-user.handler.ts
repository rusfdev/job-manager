import { PasswordHasher } from "@nestjs/authentication";
import { CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import type { UserId } from "@repo/shared/domain";
import { ok, type Result } from "@repo/shared/result";
import { IdGenerator } from "@repo/id-generator";
import { Logger } from "@repo/logger";
import type { EmailAlreadyExistsError } from "../../../domain/errors/email-already-exists.error.js";
import { User } from "../../../domain/user.aggregate.js";
import { UserRepository } from "../../../domain/user.repository.js";
import { CreateUserCommand } from "./create-user.command.js";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly idGenerator: IdGenerator,
    private readonly passwordHasher: PasswordHasher,
    private readonly logger: Logger,
  ) {}

  async execute({
    email,
    password,
  }: CreateUserCommand): Promise<Result<UserId, EmailAlreadyExistsError>> {
    const passwordHash = await this.passwordHasher.hash(password);

    const user = User.create({
      id: this.idGenerator.generate(),
      email,
      passwordHash,
    });

    const res = await this.userRepo.add(user);
    if (!res.isOk) return res;

    this.logger.log("User created", { userId: user.id });

    return ok(user.id);
  }
}
