import { emailSchema, passwordSchema } from "@repo/primitives";
import { z } from "zod";

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .meta({ id: "SignUpDto" });

export type SignUpDto = z.infer<typeof signUpSchema>;
