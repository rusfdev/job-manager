import { z } from "zod";

export const CreateVacancyDto = z
  .object({
    url: z.url(),
    position: z.string().trim().nonempty(),
    description: z.string().trim().nonempty(),
  })
  .meta({
    id: "CreateVacancyDto",
  });

export type CreateVacancyDto = z.infer<typeof CreateVacancyDto>;
