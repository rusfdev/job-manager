import type { z } from "zod";
import { defineId } from "../common/id.js";

export const userIdSchema = defineId("UserId");

export type UserId = z.infer<typeof userIdSchema>;
