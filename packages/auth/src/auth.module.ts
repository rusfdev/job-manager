import { Module } from "@nestjs/common";
import { AuthenticationModule } from "@nestjs/authentication";
import { AuthRepository } from "./auth.repository.js";
import { AuthController } from "./controllers/auth.controller.js";
import { SessionController } from "./controllers/session.controller.js";
import { CredentialsService } from "./credentials.service.js";
import { DrizzleAuthenticationStore } from "./drizzle-authentication.store.js";
import { SessionAuth } from "./session-auth.provider.js";

@Module({
  imports: [
    AuthenticationModule.forRoot({
      session: {
        absoluteTtl: "14d",
        idleTtl: "3d",
      },
    }),
  ],
  controllers: [AuthController, SessionController],
  providers: [AuthRepository, CredentialsService, DrizzleAuthenticationStore, SessionAuth],
})
export class AuthModule {}
