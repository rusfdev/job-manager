import type { LogLevel } from "@nestjs/common";

export interface LoggerModuleOptions {
  logLevels?: LogLevel[];
  prefix?: string;
}
