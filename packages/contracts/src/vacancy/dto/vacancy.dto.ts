import { z } from "zod";
import { VacancyId } from "../model/vacancy-id.js";
import { VacancyStatus } from "../model/vacancy-status.js";

export const VacancyDto = z
  .object({
    id: VacancyId,
    url: z.url(),
    status: VacancyStatus,
    position: z.string(),
    description: z.string(),
  })
  .meta({
    id: "VacancyDto",
  });

export type VacancyDto = z.infer<typeof VacancyDto>;
