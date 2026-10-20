import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { envSchema } from "./env.schema.js";
import { ConfigService } from "./config.service.js";

@Module({
  imports: [
    NestConfigModule.forRoot({
      cache: true,
      validationSchema: envSchema,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
