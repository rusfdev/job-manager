import type { z } from "zod";
import { brandIdSchema } from "../common/id.js";

export const userIdSchema = brandIdSchema("UserId");

export type UserId = z.infer<typeof userIdSchema>;
