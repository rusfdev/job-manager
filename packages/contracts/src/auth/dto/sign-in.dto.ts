import { z } from "zod";
import { Email } from "../../common/model/email.js";

export const SignInDto = z
  .object({
    email: Email,
    password: z.string().nonempty(),
  })
  .meta({
    id: "SignInDto",
  });

export type SignInDto = z.infer<typeof SignInDto>;
