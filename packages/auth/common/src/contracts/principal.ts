import { z } from "zod";
import { UserId } from "../domain/user-id.js";

export const Principal = z
  .object({
    id: UserId,
  })
  .readonly()
  .meta({
    id: "Principal",
  });

export type Principal = z.infer<typeof Principal>;
