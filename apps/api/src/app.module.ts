/* oxlint-disable import/max-dependencies */
import { Module, StandardSchemaValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { CqrsModule } from "@nestjs/cqrs";
import { DrizzleModule } from "@nestjs/drizzle";
import { LoggerModule } from "@repo/logger";
import { appConfig } from "./config/app.config.js";
import { drizzleConfig } from "./config/drizzle.config.js";
import { loggerConfig } from "./config/logger.config.js";
import { CatchAllFilter } from "./filters/catch-all.filter.js";
import { AuthModule } from "./modules/auth/index.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [appConfig],
    }),
    CqrsModule.forRoot(),
    LoggerModule.forRootAsync(loggerConfig.asProvider()),
    DrizzleModule.forRootAsync(drizzleConfig.asProvider()),
    AuthModule,
  ],
  providers: [
    { provide: APP_PIPE, useClass: StandardSchemaValidationPipe },
    { provide: APP_FILTER, useClass: CatchAllFilter },
  ],
})
export class AppModule {}
