import { Module } from "@nestjs/common";
import { AuthCoreModule } from "@repo/auth-core";
import { AuthController } from "./auth.controller.js";

@Module({
  imports: [AuthCoreModule],
  controllers: [AuthController],
})
export class AuthApiModule {}
