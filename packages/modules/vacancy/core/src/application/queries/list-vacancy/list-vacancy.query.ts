import { Query } from "@nestjs/cqrs";
import type { UserId } from "@repo/auth-common/domain";
import type { VacancyDto } from "@repo/vacancy-common/contracts";

export class ListVacancyQuery extends Query<VacancyDto[]> {
  constructor(readonly ownerId: UserId) {
    super();
  }
}
