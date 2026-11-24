import { Module } from "@nestjs/common";
import { IdGeneratorModule } from "@repo/id-generator";
import { CreateUserHandler } from "./application/commands/create-user/create-user.handler.js";
import { VerifyCredentialsHandler } from "./application/commands/verify-credentials/verify-credentials.handler.js";
import { UserRepository } from "./domain/user.repository.js";
import { DrizzleSessionStore } from "./infrastructure/drizzle-session.store.js";
import { DrizzleUserRepository } from "./infrastructure/drizzle-user.repository.js";
import { SessionAuth } from "./infrastructure/session-auth.provider.js";

@Module({
  imports: [IdGeneratorModule],
  providers: [
    CreateUserHandler,
    VerifyCredentialsHandler,
    {
      provide: UserRepository,
      useClass: DrizzleUserRepository,
    },
    DrizzleSessionStore,
    SessionAuth,
  ],
})
export class AuthCoreModule {}
