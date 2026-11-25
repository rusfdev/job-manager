import { randomUUIDv7 } from "node:crypto";
import { CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
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

    if (await this.vacancyRepo.existsByUrl(cmd.ownerId, url.value)) {
      return err(new VacancyAlreadyExistsError());
    }

    const vacancy = Vacancy.create({
      id: VacancyId.parse(randomUUIDv7()),
      ownerId: cmd.ownerId,
      url: url.value,
      position: cmd.position,
      description: cmd.description,
    });

    await this.vacancyRepo.save(vacancy);

    return ok(vacancy.id);
  }
}
