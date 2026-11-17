import { Module } from "@nestjs/common";
import { CoreModule } from "./core/core.module.js";
import { AuthModule } from "./modules/auth/index.js";

@Module({
  imports: [CoreModule, AuthModule],
})
export class AppModule {}
