import type z from "zod";
import { defineId } from "@repo/common/domain";

export const VacancyId = defineId("VacancyId");

export type VacancyId = z.infer<typeof VacancyId>;
