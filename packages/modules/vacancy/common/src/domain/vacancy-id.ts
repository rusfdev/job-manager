import { defineId } from "@repo/common/domain";

export const VacancyId = defineId("VacancyId");

export type VacancyId = ReturnType<typeof VacancyId.parse>;
