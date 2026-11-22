import { AppError, type AppErrorOptions, ERROR_KIND } from "@repo/common/errors";
import type { VacancyStatus, VacancyTransition } from "@repo/vacancy-common/domain";

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
