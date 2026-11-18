import type { z } from "zod";
import { brandIdSchema } from "../common/id.js";

export const vacancyIdSchema = brandIdSchema("VacancyId");

export type VacancyId = z.infer<typeof vacancyIdSchema>;
