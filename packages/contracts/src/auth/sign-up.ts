import { z } from "zod";
import { emailSchema, passwordSchema } from "@repo/shared/primitives";

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .meta({ id: "SignUpDto" });

export type SignUpDto = z.infer<typeof signUpSchema>;
