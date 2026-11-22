import type { z } from "zod";
import { defineId } from "@repo/shared/domain";

export const userIdSchema = defineId("UserId");

export type UserId = z.infer<typeof userIdSchema>;
