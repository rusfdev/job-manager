import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "@repo/database";
import { AuthModule } from "@repo/auth";
import { appConfig } from "./config/app.config.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig],
    }),
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule {}
