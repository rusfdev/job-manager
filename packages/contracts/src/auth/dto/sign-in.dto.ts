import { z } from "zod";
import { Email } from "../model/email.js";

export const SignInDto = z
  .object({
    email: Email,
    password: z.string().nonempty(),
  })
  .meta({
    id: "SignInDto",
  });

export type SignInDto = z.infer<typeof SignInDto>;
