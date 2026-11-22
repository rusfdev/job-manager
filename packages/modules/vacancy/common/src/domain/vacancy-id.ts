import type z from "zod";
import { defineId } from "@repo/shared/domain";

export const VacancyId = defineId("VacancyId");

export type VacancyId = z.infer<typeof VacancyId>;
