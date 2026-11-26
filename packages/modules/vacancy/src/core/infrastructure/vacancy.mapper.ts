import { unwrapResult } from "@repo/common/result";
import type { InsertVacancy, SelectVacancy } from "@repo/database";
import { VacancyUrl } from "../domain/vacancy-url.js";
import { Vacancy } from "../domain/vacancy.aggregate.js";

export class VacancyMapper {
  static toDomain(record: SelectVacancy): Vacancy {
    return Vacancy.restore({
      id: record.id,
      ownerId: record.ownerId,
      url: unwrapResult(VacancyUrl.create(record.url)),
      position: record.position,
      description: record.description,
      status: record.status,
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
