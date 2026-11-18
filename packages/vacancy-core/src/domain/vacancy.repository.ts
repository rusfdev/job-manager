import type { VacancyId } from "@repo/shared/domain";
import type { Result } from "@repo/shared/result";
import type { VacancyAlreadyExistsError } from "./errors/vacancy-already-exists.error.js";
import type { Vacancy } from "./vacancy.aggregate.js";

export abstract class VacancyRepository {
  abstract save(vacancy: Vacancy): Promise<Result<void, VacancyAlreadyExistsError>>;
  abstract findById(id: VacancyId): Promise<Vacancy | undefined>;
}
