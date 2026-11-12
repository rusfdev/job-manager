import type { z } from "zod";
import { createBrandIdSchema } from "../common/id.js";

export const userIdSchema = createBrandIdSchema("UserId");

export type UserId = z.infer<typeof userIdSchema>;
