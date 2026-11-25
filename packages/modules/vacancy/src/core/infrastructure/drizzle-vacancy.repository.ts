import { Injectable } from "@nestjs/common";
import { InjectDrizzle } from "@nestjs/drizzle";
import { eq } from "drizzle-orm";
import { UniqueViolationError } from "@repo/common/errors";
import type { VacancyId } from "@repo/contracts/vacancy";
import { type Database, isUniqueViolation } from "@repo/database";
import { vacancies } from "@repo/database/schema";
import type { Vacancy } from "../domain/vacancy.aggregate.js";
import { VacancyRepository } from "../domain/vacancy.repository.js";
import { VacancyMapper } from "./vacancy.mapper.js";

@Injectable()
export class DrizzleVacancyRepository implements VacancyRepository {
  constructor(@InjectDrizzle() private readonly db: Database) {}

  async save(vacancy: Vacancy): Promise<void> {
    const record = VacancyMapper.toPersistence(vacancy);

    try {
      await this.db
        .insert(vacancies)
        .values(record)
        .onConflictDoUpdate({ target: vacancies.id, set: record });
    } catch (error) {
      if (isUniqueViolation(error)) {
        throw new UniqueViolationError({ cause: error });
      }
      throw error;
    }
  }

  async findById(id: VacancyId): Promise<Vacancy | undefined> {
    const [record] = await this.db.select().from(vacancies).where(eq(vacancies.id, id));
    return record ? VacancyMapper.toDomain(record) : undefined;
  }
}
