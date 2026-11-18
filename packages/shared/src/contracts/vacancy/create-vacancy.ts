import { z } from "zod";

export const createVacancySchema = z
  .object({
    url: z.httpUrl(),
    position: z.string().trim().nonempty(),
    description: z.string().trim().nonempty(),
  })
  .meta({
    id: "CreateVacancyDto",
  });

export type CreateVacancyDto = z.infer<typeof createVacancySchema>;
