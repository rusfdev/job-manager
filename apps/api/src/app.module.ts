import { Module } from "@nestjs/common";
import { DrizzleModule } from "@nestjs/drizzle";
import { createDatabase } from "@repo/database";
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
        db: createDatabase({ connection: config.databaseUrl }),
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
