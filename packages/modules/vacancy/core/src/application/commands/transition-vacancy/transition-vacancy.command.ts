import { Command } from "@nestjs/cqrs";
import type { VacancyId, VacancyTransition } from "@repo/vacancy-shared/domain";
import type { UserId } from "@repo/shared/domain";
import type { Result } from "@repo/shared/result";
import type { InvalidVacancyTransitionError } from "../../../domain/errors/invalid-vacancy-transition.error.js";
import type { VacancyNotFoundError } from "../../../domain/errors/vacancy-not-found.error.js";

export class TransitionVacancyCommand extends Command<
  Result<void, VacancyNotFoundError | InvalidVacancyTransitionError>
> {
  constructor(
    readonly ownerId: UserId,
    readonly vacancyId: VacancyId,
    readonly transition: VacancyTransition,
  ) {
    super();
  }
}
