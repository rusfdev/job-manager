import { z } from "zod";
import { vacancyIdSchema, vacancyStatusSchema } from "@repo/shared/domain";

export const vacancySchema = z
  .object({
    id: vacancyIdSchema,
    url: z.url(),
    status: vacancyStatusSchema,
    position: z.string(),
    description: z.string(),
  })
  .meta({
    id: "VacancyDto",
  });

export type VacancyDto = z.infer<typeof vacancySchema>;
