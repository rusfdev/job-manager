import { Command } from "@nestjs/cqrs";
import type { Result } from "@repo/shared/result";
import type { UserId } from "@repo/auth-common/domain";
import type { VacancyId, VacancyTransition } from "@repo/vacancy-common/domain";
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
