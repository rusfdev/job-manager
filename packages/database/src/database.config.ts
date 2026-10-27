import { registerAs, type ConfigType } from "@nestjs/config";
import { z } from "zod";

const databaseEnvSchema = z.object({
  DATABASE_URL: z.url(),
});

export const databaseConfig = registerAs("database", () => {
  const env = databaseEnvSchema.parse(process.env);

  return {
    url: env.DATABASE_URL,
  };
});

export type DatabaseConfig = ConfigType<typeof databaseConfig>;
