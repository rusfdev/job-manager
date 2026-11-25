import { Query } from "@nestjs/cqrs";
import type { UserId } from "@repo/contracts/auth";
import type { VacancyDto } from "@repo/contracts/vacancy";

export class ListVacancyQuery extends Query<VacancyDto[]> {
  constructor(readonly ownerId: UserId) {
    super();
  }
}
