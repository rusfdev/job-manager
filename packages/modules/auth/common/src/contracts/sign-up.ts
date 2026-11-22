import { z } from "zod";
import { emailSchema } from "../domain/email.js";
import { passwordSchema } from "../domain/password.js";

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .meta({
    id: "SignUpDto",
  });

export type SignUpDto = z.infer<typeof signUpSchema>;
