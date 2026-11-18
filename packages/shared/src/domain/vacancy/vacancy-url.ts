import { z } from "zod";

export const vacancyUrlSchema = z.httpUrl().brand("VacancyUrl").meta({ id: "VacancyUrl" });

export type VacancyUrl = z.infer<typeof vacancyUrlSchema>;
