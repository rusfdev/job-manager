import type { UserId, VacancyId } from "@repo/shared/domain";
import type { Result } from "@repo/shared/result";
import type { VacancyAlreadyExistsError } from "./errors/vacancy-already-exists.error.js";
import type { Vacancy } from "./vacancy.aggregate.js";

export abstract class VacancyRepository {
  abstract add(vacancy: Vacancy): Promise<Result<void, VacancyAlreadyExistsError>>;
  abstract findById(ownerId: UserId, id: VacancyId): Promise<Vacancy | undefined>;
  abstract listByOwner(ownerId: UserId): Promise<Vacancy[]>;
  abstract save(vacancy: Vacancy): Promise<void>;
}
