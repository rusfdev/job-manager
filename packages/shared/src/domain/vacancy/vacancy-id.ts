import type { z } from "zod";
import { createBrandIdSchema } from "../common/id.js";

export const vacancyIdSchema = createBrandIdSchema("VacancyId");

export type VacancyId = z.infer<typeof vacancyIdSchema>;
