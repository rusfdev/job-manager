import { Module } from "@nestjs/common";
import { DrizzleModule } from "@nestjs/drizzle";
import { createDatabase } from "@repo/database";
import { ConfigService } from "../config/config.service.js";

@Module({
  imports: [
    DrizzleModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        db: createDatabase({
          connection: config.database.url,
        }),
      }),
    }),
  ],
})
export class DatabaseModule {}
