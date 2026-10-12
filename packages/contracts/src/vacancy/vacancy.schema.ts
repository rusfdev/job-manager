import { z } from "zod";

export const VacancyIdSchema = z.uuid().brand("VacancyId");

export type VacancyId = z.infer<typeof VacancyIdSchema>;

export const VacancySchema = z.object({
  id: VacancyIdSchema,
  title: z.string().min(1),
  description: z.string(),
  url: z.url(),
});

export type Vacancy = z.infer<typeof VacancySchema>;
