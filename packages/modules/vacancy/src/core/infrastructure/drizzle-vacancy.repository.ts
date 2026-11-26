import { Injectable } from "@nestjs/common";
import { InjectDrizzle } from "@nestjs/drizzle";
import { eq } from "drizzle-orm";
import { UniqueConstraintError } from "@repo/common/errors";
import type { VacancyId } from "@repo/contracts/vacancy";
import type { Database } from "@repo/database";
import { vacancies } from "@repo/database/schema";
import { isUniqueViolation } from "@repo/database/utils";
import type { Vacancy } from "../domain/vacancy.aggregate.js";
import { VacancyRepository } from "../domain/vacancy.repository.js";
import { VacancyMapper } from "./vacancy.mapper.js";

@Injectable()
export class DrizzleVacancyRepository implements VacancyRepository {
  constructor(@InjectDrizzle() private readonly db: Database) {}

  async findById(id: VacancyId): Promise<Vacancy | null> {
    const [row] = await this.db.select().from(vacancies).where(eq(vacancies.id, id));
    return row ? VacancyMapper.toDomain(row) : null;
  }

  async save(vacancy: Vacancy): Promise<void> {
    const row = VacancyMapper.toPersistence(vacancy);
    const { url, position, description, status } = row;

    try {
      await this.db.insert(vacancies).values(row).onConflictDoUpdate({
        target: vacancies.id,
        set: { url, position, description, status },
      });
    } catch (e) {
      if (isUniqueViolation(e)) {
        throw new UniqueConstraintError({ cause: e });
      }
      throw e;
    }
  }
}
