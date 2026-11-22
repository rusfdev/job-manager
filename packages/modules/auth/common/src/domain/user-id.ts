import type { z } from "zod";
import { defineId } from "@repo/shared/domain";

export const UserId = defineId("UserId");

export type UserId = z.infer<typeof UserId>;
