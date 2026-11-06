import { z } from "zod";
import { userIdSchema } from "./user-id.js";

export const userSchema = z
  .object({
    id: userIdSchema,
    email: z.email(),
  })
  .meta({ id: "User" });

export type User = z.infer<typeof userSchema>;
