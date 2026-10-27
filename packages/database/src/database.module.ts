import { Global, Module } from "@nestjs/common";
import { DrizzleModule } from "@nestjs/drizzle";
import { ConfigModule } from "@nestjs/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "./relations.js";
import { databaseConfig, type DatabaseConfig } from "./database.config.js";

@Global()
@Module({
  imports: [
    DrizzleModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      inject: [databaseConfig.KEY],
      useFactory: (config: DatabaseConfig) => ({
        db: drizzle({ connection: config.url, relations }),
      }),
    }),
  ],
})
export class DatabaseModule {}
