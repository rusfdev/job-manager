import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { ConfigModule } from "./config/config.module.js";
import { DatabaseModule } from "./database/database.module.js";

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [AppController],
})
export class AppModule {}
