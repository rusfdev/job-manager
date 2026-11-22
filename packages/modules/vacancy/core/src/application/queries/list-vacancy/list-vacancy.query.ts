import { Query } from "@nestjs/cqrs";
import type { UserId } from "@repo/shared/domain";
import type { VacancyDto } from "@repo/vacancy-shared/contracts";

export class ListVacancyQuery extends Query<VacancyDto[]> {
  constructor(readonly ownerId: UserId) {
    super();
  }
}
