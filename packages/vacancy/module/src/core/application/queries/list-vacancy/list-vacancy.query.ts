import { Query } from "@nestjs/cqrs";
import type { UserId } from "@repo/auth-common";
import type { VacancyDto } from "@repo/vacancy-common";

export class ListVacancyQuery extends Query<VacancyDto[]> {
  constructor(readonly ownerId: UserId) {
    super();
  }
}
