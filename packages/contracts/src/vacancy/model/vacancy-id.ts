import { defineId } from "../../common/model/id.js";

export const VacancyId = defineId("VacancyId");

export type VacancyId = ReturnType<typeof VacancyId.parse>;
