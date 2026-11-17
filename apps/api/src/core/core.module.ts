import { AuthenticationModule } from "@nestjs/authentication";
import { Module, StandardSchemaValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { CqrsModule } from "@nestjs/cqrs";
import { DrizzleModule } from "@nestjs/drizzle";
import { appConfig } from "./config/app.config.js";
import { authenticationConfig } from "./config/authentication.config.js";
import { databaseConfig } from "./config/database.config.js";
import { CatchAllFilter } from "./filters/catch-all.filter.js";

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
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: StandardSchemaValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: CatchAllFilter,
    },
  ],
})
export class CoreModule {}
