import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "@repo/auth";
import { appConfig } from "./config/app.config.js";
import { DrizzleModule } from "@nestjs/drizzle";
import { databaseConfig } from "./config/database.config.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig],
    }),
    DrizzleModule.forRootAsync(databaseConfig.asProvider()),
    AuthModule,
  ],
})
export class AppModule {}
