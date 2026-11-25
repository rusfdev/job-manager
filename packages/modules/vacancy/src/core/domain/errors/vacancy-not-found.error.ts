import { NotFoundError, type CustomErrorOptions } from "@repo/common/errors";

export class VacancyNotFoundError extends NotFoundError {
  readonly code = "VACANCY_NOT_FOUND";

  constructor(options?: CustomErrorOptions) {
    super("Vacancy not found", options);
  }
}
