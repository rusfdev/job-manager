import type { VacancyStatus, VacancyTransition } from "@repo/vacancy-shared/domain";
import { AppError, type AppErrorOptions, ERROR_KIND } from "@repo/shared/errors";

export class InvalidVacancyTransitionError extends AppError {
  readonly kind = ERROR_KIND.CONFLICT;
  readonly code = "INVALID_VACANCY_TRANSITION";

  constructor(
    readonly transition: VacancyTransition,
    readonly status: VacancyStatus,
    options?: AppErrorOptions,
  ) {
    super(`Cannot [${transition}] a vacancy in status [${status}]`, options);
  }
}
