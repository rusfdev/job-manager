import { Module } from "@nestjs/common";
import { DatabaseModule } from "@repo/database";
import { ConfigModule } from "@nestjs/config";
import { appConfig } from "./config/app.config.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig],
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
