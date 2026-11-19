import { Query } from "@nestjs/cqrs";
import type { UserId } from "@repo/shared/domain";
import type { VacancyDto } from "@repo/contracts/vacancy";

export class ListVacancyQuery extends Query<VacancyDto[]> {
  constructor(readonly ownerId: UserId) {
    super();
  }
}
