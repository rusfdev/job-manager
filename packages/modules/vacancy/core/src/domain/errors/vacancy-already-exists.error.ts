import { AppError, type AppErrorOptions, ERROR_KIND } from "@repo/shared/errors";

export class VacancyAlreadyExistsError extends AppError {
  readonly kind = ERROR_KIND.CONFLICT;
  readonly code = "VACANCY_ALREADY_EXISTS";

  constructor(options?: AppErrorOptions) {
    super("Vacancy already exists", options);
  }
}
