import type { VacancyId } from "@repo/contracts/vacancy";
import type { Vacancy } from "./vacancy.aggregate.js";

export abstract class VacancyRepository {
  abstract findById(id: VacancyId): Promise<Vacancy | null>;
  abstract save(vacancy: Vacancy): Promise<void>;
}
