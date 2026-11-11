import type { z } from "zod";
import { createIdSchema } from "../common/id.js";

export const userIdSchema = createIdSchema("UserId");

export type UserId = z.infer<typeof userIdSchema>;
