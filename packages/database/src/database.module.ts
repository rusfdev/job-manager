import { Global, Module } from "@nestjs/common";
import { DrizzleModule } from "@nestjs/drizzle";
import { ConfigModule } from "@nestjs/config";
import { databaseConfig, type DatabaseConfig } from "./database.config.js";
import { createDatabase } from "./database.js";

@Global()
@Module({
  imports: [
    DrizzleModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      inject: [databaseConfig.KEY],
      useFactory: (config: DatabaseConfig) => ({
        db: createDatabase(config),
        autoCloseConnection: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
