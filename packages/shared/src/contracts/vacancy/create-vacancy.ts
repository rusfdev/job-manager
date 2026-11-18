import { z } from "zod";

export const createVacancySchema = z
  .object({
    url: z.url(),
    position: z.string().trim().min(1),
    description: z.string().trim(),
  })
  .meta({
    id: "CreateVacancyDto",
  });

export type CreateVacancyDto = z.infer<typeof createVacancySchema>;
