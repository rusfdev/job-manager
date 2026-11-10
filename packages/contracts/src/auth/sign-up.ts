import { emailSchema } from "@repo/shared";
import { z } from "zod";
import { passwordSchema } from "./password.js";

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .meta({ id: "SignUpDto" });

export type SignUpDto = z.infer<typeof signUpSchema>;
