import { Command } from "@nestjs/cqrs";
import type { Result } from "@repo/common/utils";
import type { UserId } from "@repo/auth-common/domain";
import type { VacancyId } from "@repo/vacancy-common/domain";
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
