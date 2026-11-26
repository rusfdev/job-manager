import { type IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectDrizzle } from "@nestjs/drizzle";
import { desc, eq } from "drizzle-orm";
import type { VacancyDto } from "@repo/contracts/vacancy";
import type { Database } from "@repo/database";
import { vacancies } from "@repo/database/schema";
import { ListVacancyQuery } from "./list-vacancy.query.js";

@QueryHandler(ListVacancyQuery)
export class ListVacancyHandler implements IQueryHandler<ListVacancyQuery> {
  constructor(@InjectDrizzle() private readonly db: Database) {}

  async execute({ ownerId }: ListVacancyQuery): Promise<VacancyDto[]> {
    const records = await this.db
      .select()
      .from(vacancies)
      .where(eq(vacancies.ownerId, ownerId))
      .orderBy(desc(vacancies.createdAt), desc(vacancies.id));

    return records.map((record) => ({
      id: record.id,
      url: record.url,
      status: record.status,
      position: record.position,
      description: record.description,
    }));
  }
}
