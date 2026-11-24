import { ConfigurableModuleBuilder } from "@nestjs/common";
import type { LoggerModuleOptions } from "./logger.interfaces.js";

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<LoggerModuleOptions>().setClassMethodName("forRoot").build();
