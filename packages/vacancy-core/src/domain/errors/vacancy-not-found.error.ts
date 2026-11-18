import { AppError, type AppErrorOptions, ERROR_KIND } from "@repo/shared/errors";

export class VacancyNotFoundError extends AppError {
  readonly kind = ERROR_KIND.NOT_FOUND;
  readonly code = "VACANCY_NOT_FOUND";

  constructor(options?: AppErrorOptions) {
    super("Vacancy not found", options);
  }
}
