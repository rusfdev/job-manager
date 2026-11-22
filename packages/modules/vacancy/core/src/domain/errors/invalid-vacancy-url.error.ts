import { AppError, type AppErrorOptions, ERROR_KIND } from "@repo/common/errors";

export class InvalidVacancyUrlError extends AppError {
  readonly kind = ERROR_KIND.VALIDATION;
  readonly code = "INVALID_VACANCY_URL";

  constructor(options?: AppErrorOptions) {
    super("Vacancy URL must be an absolute https URL", options);
  }
}
