import { ValidationError, type CustomErrorOptions } from "@repo/common/errors";

export class InvalidVacancyUrlError extends ValidationError {
  readonly code = "INVALID_VACANCY_URL";

  constructor(options?: CustomErrorOptions) {
    super("Vacancy URL must be an absolute https URL", options);
  }
}
