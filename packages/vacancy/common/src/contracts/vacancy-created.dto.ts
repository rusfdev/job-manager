import { z } from "zod";
import { VacancyId } from "../domain/vacancy-id.js";

export const VacancyCreatedDto = z
  .object({
    id: VacancyId,
  })
  .meta({
    id: "VacancyCreatedDto",
  });

export type VacancyCreatedDto = z.infer<typeof VacancyCreatedDto>;
