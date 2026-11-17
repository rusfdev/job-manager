import { LOG_LEVELS } from "@nestjs/common";
import { registerAs } from "@nestjs/config";
import { z } from "zod";
import type { LoggerModuleOptions } from "@repo/logger";

const loggerEnvSchema = z.object({
  LOG_LEVELS: z
    .string()
    .transform((value) => value.split(",").map((level) => level.trim()))
    .pipe(z.array(z.enum(LOG_LEVELS)))
    .optional(),
});

export const loggerConfig = registerAs<LoggerModuleOptions>("logger", () => {
  const env = loggerEnvSchema.parse(process.env);

  return {
    prefix: "API",
    logLevels: env.LOG_LEVELS,
  };
});
