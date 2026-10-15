import { z } from "zod";

// Variables listed here are validated at boot; undeclared ones are not checked.
export const envSchema = z.object({
  DATABASE_URL: z.url(),
});
