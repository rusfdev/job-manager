import { z } from "zod";
import { emailSchema } from "../../primitives/index.js";

export const signInSchema = z
  .object({
    email: emailSchema,
    password: z.string().nonempty(),
  })
  .meta({ id: "SignInDto" });

export type SignInDto = z.infer<typeof signInSchema>;
