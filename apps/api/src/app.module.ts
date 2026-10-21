import { Module } from "@nestjs/common";
import { DrizzleModule } from "@nestjs/drizzle";
import { relations } from "@repo/database";
import { drizzle } from "drizzle-orm/node-postgres";
import { AppController } from "./app.controller.js";
import { ConfigModule } from "./config/config.module.js";
import { ConfigService } from "./config/config.service.js";

@Module({
  imports: [
    ConfigModule,
    DrizzleModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        drizzle,
        connection: config.databaseUrl,
        relations,
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
