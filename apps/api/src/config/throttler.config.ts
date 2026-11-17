import { registerAs } from "@nestjs/config";
import type { ThrottlerModuleOptions } from "@nestjs/throttler";
import { z } from "zod";

const throttlerEnvSchema = z.object({
  THROTTLE_TTL_MS: z.coerce.number().positive().int(),
  THROTTLE_LIMIT: z.coerce.number().positive().int(),
});

export const throttlerConfig = registerAs<ThrottlerModuleOptions>("throttler", () => {
  const env = throttlerEnvSchema.parse(process.env);

  return {
    throttlers: [
      {
        ttl: env.THROTTLE_TTL_MS,
        limit: env.THROTTLE_LIMIT,
      },
    ],
  };
});
