import { emailSchema } from "@repo/primitives";
import { z } from "zod";

export const signInSchema = z
  .object({
    email: emailSchema,
    password: z.string().nonempty(),
  })
  .meta({ id: "SignInDto" });

export type SignInDto = z.infer<typeof signInSchema>;
