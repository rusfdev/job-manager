import { randomUUIDv7 } from "node:crypto";
import { CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { UniqueViolationError } from "@repo/common/errors";
import { err, ok } from "@repo/common/result";
import { VacancyId } from "@repo/contracts/vacancy";
import { VacancyAlreadyExistsError } from "../../../domain/errors/vacancy-already-exists.error.js";
import { VacancyUrl } from "../../../domain/vacancy-url.js";
import { Vacancy } from "../../../domain/vacancy.aggregate.js";
import { VacancyRepository } from "../../../domain/vacancy.repository.js";
import { CreateVacancyCommand } from "./create-vacancy.command.js";

@CommandHandler(CreateVacancyCommand)
export class CreateVacancyHandler implements ICommandHandler<CreateVacancyCommand> {
  constructor(private readonly vacancyRepo: VacancyRepository) {}

  async execute(cmd: CreateVacancyCommand) {
    const url = VacancyUrl.create(cmd.url);
    if (!url.isOk) return url;

    const vacancy = Vacancy.create({
      id: VacancyId.parse(randomUUIDv7()),
      ownerId: cmd.ownerId,
      url: url.value,
      position: cmd.position,
      description: cmd.description,
    });

    try {
      await this.vacancyRepo.save(vacancy);
    } catch (error) {
      if (error instanceof UniqueViolationError) {
        return err(new VacancyAlreadyExistsError({ cause: error }));
      }

      throw error;
    }

    return ok(vacancy.id);
  }
}
