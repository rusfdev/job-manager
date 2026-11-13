import { CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { ok } from "@repo/shared/result";
import { IdGenerator } from "@repo/nestjs-id-generator";
import { User } from "../../../domain/user.aggregate.js";
import { UserRepository } from "../../../domain/user.repository.js";
import { CreateUserCommand } from "./create-user.command.js";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly idGenerator: IdGenerator,
  ) {}

  async execute({ email, passwordHash }: CreateUserCommand) {
    const user = User.create({
      id: this.idGenerator.generate(),
      email,
      passwordHash,
    });

    const res = await this.userRepo.add(user);

    return res.isOk ? ok(user.id) : res;
  }
}
