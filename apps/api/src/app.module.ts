/* oxlint-disable import/max-dependencies */
import { AuthenticationModule } from "@nestjs/authentication";
import { Module, StandardSchemaValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_GUARD, APP_PIPE } from "@nestjs/core";
import { CqrsModule } from "@nestjs/cqrs";
import { DrizzleModule } from "@nestjs/drizzle";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { LoggerModule } from "@repo/logger";
import { AuthApiModule } from "@repo/auth-api";
import { appConfig } from "./config/app.config.js";
import { authenticationConfig } from "./config/authentication.config.js";
import { drizzleConfig } from "./config/drizzle.config.js";
import { loggerConfig } from "./config/logger.config.js";
import { throttlerConfig } from "./config/throttler.config.js";
import { CatchAllFilter } from "./filters/catch-all.filter.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [appConfig],
    }),
    CqrsModule.forRoot(),
    LoggerModule.forRootAsync(loggerConfig.asProvider()),
    DrizzleModule.forRootAsync(drizzleConfig.asProvider()),
    ThrottlerModule.forRootAsync(throttlerConfig.asProvider()),
    AuthenticationModule.forRootAsync(authenticationConfig.asProvider()),
    AuthApiModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_PIPE, useClass: StandardSchemaValidationPipe },
    { provide: APP_FILTER, useClass: CatchAllFilter },
  ],
})
export class AppModule {}
