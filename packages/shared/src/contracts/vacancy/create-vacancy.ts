import { z } from "zod";
import { vacancyUrlSchema } from "../../domain/index.js";

export const createVacancySchema = z
  .object({
    url: vacancyUrlSchema,
    position: z.string().trim().nonempty(),
    description: z.string().trim().nonempty(),
  })
  .meta({
    id: "CreateVacancyDto",
  });

export type CreateVacancyDto = z.infer<typeof createVacancySchema>;
