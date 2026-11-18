import { z } from "zod";
import { vacancyIdSchema, vacancyStatusSchema } from "../../domain/index.js";

export const vacancySchema = z
  .object({
    id: vacancyIdSchema,
    url: z.httpUrl(),
    status: vacancyStatusSchema,
    position: z.string(),
    description: z.string(),
  })
  .meta({ id: "VacancyDto" });

export type VacancyDto = z.infer<typeof vacancySchema>;
