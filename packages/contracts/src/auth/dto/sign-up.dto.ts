import { z } from "zod";
import { Email } from "../model/email.js";
import { Password } from "../model/password.js";

export const SignUpDto = z
  .object({
    email: Email,
    password: Password,
  })
  .meta({
    id: "SignUpDto",
  });

export type SignUpDto = z.infer<typeof SignUpDto>;
