import { Module } from "@nestjs/common";
import { CoreModule } from "./core/core.module.js";
import { AuthModule } from "./modules/auth/auth.module.js";
import { UserModule } from "./modules/user/index.js";

@Module({
  imports: [CoreModule, AuthModule, UserModule],
})
export class AppModule {}
