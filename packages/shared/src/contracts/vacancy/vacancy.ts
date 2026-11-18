import { z } from "zod";
import { vacancyIdSchema, vacancyStatusSchema, vacancyUrlSchema } from "../../domain/index.js";

export const vacancySchema = z
  .object({
    id: vacancyIdSchema,
    url: vacancyUrlSchema,
    status: vacancyStatusSchema,
    position: z.string(),
    description: z.string(),
  })
  .meta({ id: "VacancyDto" });

export type VacancyDto = z.infer<typeof vacancySchema>;
