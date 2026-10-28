import { z } from "zod";
import { passwordSchema } from "./password.js";

export const signUpSchema = z
  .object({
    email: z.email(),
    password: passwordSchema,
  })
  .meta({
    id: "SignUpDto",
  });

export type SignUpDto = z.infer<typeof signUpSchema>;
