import { AuthenticationModule } from "@nestjs/authentication";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { DrizzleModule } from "@nestjs/drizzle";
import { appConfig } from "./config/app.config.js";
import { authenticationConfig } from "./config/authentication.config.js";
import { databaseConfig } from "./config/database.config.js";
import { AuthModule } from "./modules/auth/auth.module.js";
import { UserModule } from "./modules/user/index.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig],
    }),
    DrizzleModule.forRootAsync(databaseConfig.asProvider()),
    AuthenticationModule.forRootAsync(authenticationConfig.asProvider()),
    CqrsModule.forRoot(),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
