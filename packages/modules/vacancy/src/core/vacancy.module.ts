import { Module } from "@nestjs/common";
import { CreateVacancyHandler } from "./application/commands/create-vacancy/create-vacancy.handler.js";
import { TransitionVacancyHandler } from "./application/commands/transition-vacancy/transition-vacancy.handler.js";
import { ListVacancyHandler } from "./application/queries/list-vacancy/list-vacancy.handler.js";
import { VacancyRepository } from "./domain/vacancy.repository.js";
import { DrizzleVacancyRepository } from "./infrastructure/drizzle-vacancy.repository.js";

@Module({
  providers: [
    CreateVacancyHandler,
    TransitionVacancyHandler,
    ListVacancyHandler,
    { provide: VacancyRepository, useClass: DrizzleVacancyRepository },
  ],
})
export class VacancyModule {}
