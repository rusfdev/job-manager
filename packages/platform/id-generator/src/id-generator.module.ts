import { Module } from "@nestjs/common";
import { IdGenerator } from "./id-generator.js";

@Module({
  providers: [IdGenerator],
  exports: [IdGenerator],
})
export class IdGeneratorModule {}
