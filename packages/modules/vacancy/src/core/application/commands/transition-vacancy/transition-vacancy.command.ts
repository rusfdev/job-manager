import { Command } from "@nestjs/cqrs";
import type { Result } from "@repo/common/result";
import type { UserId } from "@repo/contracts/auth";
import type { VacancyId, VacancyTransition } from "@repo/contracts/vacancy";
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
