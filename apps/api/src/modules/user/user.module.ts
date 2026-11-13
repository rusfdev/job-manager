import { Module } from "@nestjs/common";
import { IdGeneratorModule } from "@repo/nestjs-id-generator";
import { CreateUserHandler } from "./application/commands/create-user/create-user.handler.js";
import { UserRepository } from "./domain/user.repository.js";
import { DrizzleUserRepository } from "./infrastructure/drizzle-user.repository.js";

@Module({
  imports: [IdGeneratorModule],
  providers: [
    CreateUserHandler,
    {
      provide: UserRepository,
      useClass: DrizzleUserRepository,
    },
  ],
})
export class UserModule {}
