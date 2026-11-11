import { z } from "zod";
import { emailSchema, userIdSchema } from "@repo/primitives";

export const userSchema = z
  .object({
    id: userIdSchema,
    email: emailSchema,
  })
  .meta({ id: "UserDto" });

export type UserDto = z.infer<typeof userSchema>;
