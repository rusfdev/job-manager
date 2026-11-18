import { Injectable } from "@nestjs/common";
import { InjectDrizzle } from "@nestjs/drizzle";
import { DrizzleQueryError, eq } from "drizzle-orm";
import type { VacancyId } from "@repo/shared/domain";
import { err, ok, type Result } from "@repo/shared/result";
import type { Database } from "@repo/database";
import { VACANCIES_OWNER_ID_URL_UNIQUE, vacancies } from "@repo/database/schema";
import { VacancyAlreadyExistsError } from "../domain/errors/vacancy-already-exists.error.js";
import type { Vacancy } from "../domain/vacancy.aggregate.js";
import { VacancyRepository } from "../domain/vacancy.repository.js";
import { VacancyMapper } from "./vacancy.mapper.js";

function isUrlConflict(error: unknown): boolean {
  if (!(error instanceof DrizzleQueryError)) return false;

  const cause = error.cause as { code?: string; constraint?: string } | undefined;

  return cause?.code === "23505" && cause.constraint === VACANCIES_OWNER_ID_URL_UNIQUE;
}

@Injectable()
export class DrizzleVacancyRepository implements VacancyRepository {
  constructor(@InjectDrizzle() private readonly db: Database) {}

  async save(vacancy: Vacancy): Promise<Result<void, VacancyAlreadyExistsError>> {
    const record = VacancyMapper.toPersistence(vacancy);

    try {
      await this.db
        .insert(vacancies)
        .values(record)
        .onConflictDoUpdate({ target: vacancies.id, set: record });
      return ok();
    } catch (error) {
      if (isUrlConflict(error)) {
        return err(new VacancyAlreadyExistsError({ cause: error }));
      }
      throw error;
    }
  }

  async findById(id: VacancyId): Promise<Vacancy | undefined> {
    const [record] = await this.db.select().from(vacancies).where(eq(vacancies.id, id));
    return record ? VacancyMapper.toDomain(record) : undefined;
  }
}
