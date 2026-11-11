import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller.js";
import { AuthRepository } from "./auth.repository.js";
import { CredentialsService } from "./credentials.service.js";
import { DrizzleAuthenticationStore } from "./drizzle-authentication.store.js";
import { SessionAuth } from "./session-auth.provider.js";

@Module({
  controllers: [AuthController],
  providers: [AuthRepository, CredentialsService, DrizzleAuthenticationStore, SessionAuth],
})
export class AuthModule {}
