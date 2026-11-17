import { registerAs } from "@nestjs/config";
import type { DrizzleModuleOptions } from "@nestjs/drizzle";
import { z } from "zod";
import { createDatabase } from "@repo/database";

const drizzleEnvSchema = z.object({
  DATABASE_URL: z.url(),
});

export const drizzleConfig = registerAs<DrizzleModuleOptions>("drizzle", () => {
  const env = drizzleEnvSchema.parse(process.env);

  return {
    db: createDatabase({ url: env.DATABASE_URL }),
    autoCloseConnection: true,
  };
});
