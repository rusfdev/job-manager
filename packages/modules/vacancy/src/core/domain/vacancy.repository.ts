import type { UserId } from "@repo/contracts/auth";
import type { VacancyId } from "@repo/contracts/vacancy";
import type { VacancyUrl } from "./vacancy-url.js";
import type { Vacancy } from "./vacancy.aggregate.js";

export abstract class VacancyRepository {
  abstract save(vacancy: Vacancy): Promise<void>;
  abstract findById(id: VacancyId): Promise<Vacancy | undefined>;
  abstract existsByUrl(ownerId: UserId, url: VacancyUrl): Promise<boolean>;
}
