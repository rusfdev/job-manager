import { registerAs } from "@nestjs/config";
import type { DrizzleModuleOptions } from "@nestjs/drizzle";
import { z } from "zod";
import { createDatabase } from "@repo/database";

const databaseEnvSchema = z.object({
  DATABASE_URL: z.url(),
});

export const databaseConfig = registerAs<DrizzleModuleOptions>("database", () => {
  const env = databaseEnvSchema.parse(process.env);

  return {
    db: createDatabase({ url: env.DATABASE_URL }),
    autoCloseConnection: true,
  };
});
