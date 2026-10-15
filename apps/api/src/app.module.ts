import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DrizzleModule } from "@nestjs/drizzle";
import { relations } from "@repo/db";
import { drizzle } from "drizzle-orm/node-postgres";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { envSchema } from "./config/env.schema.js";

@Module({
  imports: [
    ConfigModule.forRoot({ validationSchema: envSchema }),
    DrizzleModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        drizzle,
        connection: configService.getOrThrow<string>("DATABASE_URL"),
        relations,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
