import { Global, Module } from "@nestjs/common";
import { Logger } from "./logger.js";
import { ConfigurableModuleClass } from "./logger.module-definition.js";

@Global()
@Module({
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule extends ConfigurableModuleClass {}
