import { z } from "zod";
import { emailSchema } from "@repo/shared/primitives";

export const signInSchema = z
  .object({
    email: emailSchema,
    password: z.string().nonempty(),
  })
  .meta({ id: "SignInDto" });

export type SignInDto = z.infer<typeof signInSchema>;
