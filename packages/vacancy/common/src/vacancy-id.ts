import { z } from "zod";

export const VacancyId = z.uuid().brand("VacancyId").meta({ id: "VacancyId" });

export type VacancyId = ReturnType<typeof VacancyId.parse>;
