import { unwrapResult } from "@repo/common/result";
import type { UserId } from "@repo/contracts/auth";
import type { VacancyId, VacancyStatus } from "@repo/contracts/vacancy";
import type { InsertVacancy, SelectVacancy } from "@repo/database/schema";
import { VacancyUrl } from "../domain/vacancy-url.js";
import { Vacancy } from "../domain/vacancy.aggregate.js";

export class VacancyMapper {
  static toDomain(record: SelectVacancy): Vacancy {
    return Vacancy.restore({
      id: record.id as VacancyId,
      ownerId: record.ownerId as UserId,
      url: unwrapResult(VacancyUrl.create(record.url)),
      position: record.position,
      description: record.description,
      status: record.status as VacancyStatus,
    });
  }

  static toPersistence(vacancy: Vacancy): InsertVacancy {
    return {
      id: vacancy.id,
      ownerId: vacancy.ownerId,
      url: vacancy.url.value,
      position: vacancy.position,
      description: vacancy.description,
      status: vacancy.status,
    };
  }
}
