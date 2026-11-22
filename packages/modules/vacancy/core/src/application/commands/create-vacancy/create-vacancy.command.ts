import { Command } from "@nestjs/cqrs";
import type { VacancyId } from "@repo/vacancy-shared/domain";
import type { UserId } from "@repo/shared/domain";
import type { Result } from "@repo/shared/result";
import type { InvalidVacancyUrlError } from "../../../domain/errors/invalid-vacancy-url.error.js";
import type { VacancyAlreadyExistsError } from "../../../domain/errors/vacancy-already-exists.error.js";

export class CreateVacancyCommand extends Command<
  Result<VacancyId, InvalidVacancyUrlError | VacancyAlreadyExistsError>
> {
  constructor(
    readonly ownerId: UserId,
    readonly url: string,
    readonly position: string,
    readonly description: string,
  ) {
    super();
  }
}
