import { ConsoleLogger, Inject, Injectable, Scope } from "@nestjs/common";
import { INQUIRER } from "@nestjs/core";
import type { LoggerModuleOptions } from "./logger.interfaces.js";
import { MODULE_OPTIONS_TOKEN } from "./logger.module-definition.js";

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
  constructor(
    @Inject(INQUIRER) parentClass: object | undefined,
    @Inject(MODULE_OPTIONS_TOKEN) options: LoggerModuleOptions,
  ) {
    super({
      context:
        parentClass && !(parentClass instanceof Logger) ? parentClass.constructor.name : undefined,
      logLevels: options.logLevels,
      prefix: options.prefix,
      redact: ["password", "token", "authorization", "cookie"],
    });
  }
}
