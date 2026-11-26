import { CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { err, ok } from "@repo/common/result";
import { VacancyNotFoundError } from "../../../domain/errors/vacancy-not-found.error.js";
import { VacancyRepository } from "../../../domain/vacancy.repository.js";
import { TransitionVacancyCommand } from "./transition-vacancy.command.js";

@CommandHandler(TransitionVacancyCommand)
export class TransitionVacancyHandler implements ICommandHandler<TransitionVacancyCommand> {
  constructor(private readonly vacancyRepo: VacancyRepository) {}

  async execute(cmd: TransitionVacancyCommand) {
    const vacancy = await this.vacancyRepo.findById(cmd.vacancyId);

    if (!vacancy || !vacancy.isOwnedBy(cmd.ownerId)) {
      return err(new VacancyNotFoundError());
    }

    const transition = vacancy.transition(cmd.transition);
    if (!transition.isOk) return err(transition.error);

    await this.vacancyRepo.save(vacancy);

    return ok();
  }
}
