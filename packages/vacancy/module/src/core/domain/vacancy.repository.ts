import type { VacancyId } from "@repo/vacancy-common";
import type { Vacancy } from "./vacancy.aggregate.js";

export abstract class VacancyRepository {
  abstract save(vacancy: Vacancy): Promise<void>;
  abstract findById(id: VacancyId): Promise<Vacancy | undefined>;
}
