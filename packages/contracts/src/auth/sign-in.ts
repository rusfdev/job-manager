import { emailSchema } from "@repo/shared";
import { z } from "zod";

export const signInSchema = z
  .object({
    email: emailSchema,
    password: z.string(),
  })
  .meta({ id: "SignInDto" });

export type SignInDto = z.infer<typeof signInSchema>;
