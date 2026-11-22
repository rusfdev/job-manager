import { z } from "zod";
import { userIdSchema } from "../domain/user-id.js";

export const principalSchema = z
  .object({
    id: userIdSchema,
  })
  .readonly()
  .meta({
    id: "Principal",
  });

export type Principal = z.infer<typeof principalSchema>;
