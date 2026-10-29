import { registerAs, type ConfigType } from "@nestjs/config";
import { z } from "zod";

const appEnvSchema = z.object({
  PORT: z.coerce.number().positive().int(),
});

export const appConfig = registerAs("app", () => {
  const env = appEnvSchema.parse(process.env);

  return {
    port: env.PORT,
  };
});

export type AppConfig = ConfigType<typeof appConfig>;
