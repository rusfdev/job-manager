import { CustomError, type CustomErrorOptions, ErrorKind } from "@repo/common/errors";
import type { VacancyStatus, VacancyTransition } from "@repo/contracts/vacancy";

export class InvalidVacancyTransitionError extends CustomError {
  readonly kind = ErrorKind.CONFLICT;
  readonly code = "INVALID_VACANCY_TRANSITION";

  constructor(transition: VacancyTransition, status: VacancyStatus, options?: CustomErrorOptions) {
    super(`Cannot ${transition} a vacancy in status: ${status}`, options);
  }
}
