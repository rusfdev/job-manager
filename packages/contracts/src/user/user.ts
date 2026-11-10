import { emailSchema, userIdSchema } from "@repo/shared";
import { z } from "zod";

export const userSchema = z
  .object({
    id: userIdSchema,
    email: emailSchema,
  })
  .meta({ id: "UserDto" });

export type UserDto = z.infer<typeof userSchema>;
