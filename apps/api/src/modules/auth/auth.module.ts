import { AuthenticationModule } from "@nestjs/authentication";
import { Module } from "@nestjs/common";
import { IdGeneratorModule } from "@repo/nestjs-id-generator";
import { CreateUserHandler } from "./application/commands/create-user/create-user.handler.js";
import { VerifyCredentialsHandler } from "./application/commands/verify-credentials/verify-credentials.handler.js";
import { UserRepository } from "./domain/user.repository.js";
import { DrizzleSessionStore } from "./infrastructure/drizzle-session.store.js";
import { DrizzleUserRepository } from "./infrastructure/drizzle-user.repository.js";
import { SessionAuth } from "./infrastructure/session-auth.provider.js";
import { AuthController } from "./presentation/auth.controller.js";

@Module({
  imports: [
    AuthenticationModule.forRoot({
      session: {
        absoluteTtl: "14d",
        idleTtl: "3d",
      },
    }),
    IdGeneratorModule,
  ],
  controllers: [AuthController],
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
export class AuthModule {}
