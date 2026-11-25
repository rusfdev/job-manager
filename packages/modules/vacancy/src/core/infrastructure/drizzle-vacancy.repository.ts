import { Injectable } from "@nestjs/common";
import { InjectDrizzle } from "@nestjs/drizzle";
import { and, eq } from "drizzle-orm";
import type { UserId } from "@repo/contracts/auth";
import type { VacancyId } from "@repo/contracts/vacancy";
import type { Database } from "@repo/database";
import { vacancies } from "@repo/database/schema";
import type { VacancyUrl } from "../domain/vacancy-url.js";
import type { Vacancy } from "../domain/vacancy.aggregate.js";
import { VacancyRepository } from "../domain/vacancy.repository.js";
import { VacancyMapper } from "./vacancy.mapper.js";

@Injectable()
export class DrizzleVacancyRepository implements VacancyRepository {
  constructor(@InjectDrizzle() private readonly db: Database) {}

  async save(vacancy: Vacancy): Promise<void> {
    const record = VacancyMapper.toPersistence(vacancy);

    await this.db
      .insert(vacancies)
      .values(record)
      .onConflictDoUpdate({ target: vacancies.id, set: record });
  }

  async findById(id: VacancyId): Promise<Vacancy | undefined> {
    const [record] = await this.db.select().from(vacancies).where(eq(vacancies.id, id));
    return record ? VacancyMapper.toDomain(record) : undefined;
  }

  async existsByUrl(ownerId: UserId, url: VacancyUrl): Promise<boolean> {
    const [record] = await this.db
      .select({ id: vacancies.id })
      .from(vacancies)
      .where(and(eq(vacancies.ownerId, ownerId), eq(vacancies.url, url.value)))
      .limit(1);

    return record !== undefined;
  }
}
