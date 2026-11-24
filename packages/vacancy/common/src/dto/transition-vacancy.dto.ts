import { z } from "zod";
import { VacancyTransition } from "../vacancy-transition.js";

export const TransitionVacancyDto = z
  .object({
    transition: VacancyTransition,
  })
  .meta({
    id: "TransitionVacancyDto",
  });

export type TransitionVacancyDto = z.infer<typeof TransitionVacancyDto>;
