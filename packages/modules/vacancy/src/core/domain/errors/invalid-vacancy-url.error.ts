import { CustomError, type CustomErrorOptions, ErrorKind } from "@repo/common/errors";

export class InvalidVacancyUrlError extends CustomError {
  readonly kind = ErrorKind.VALIDATION;
  readonly code = "INVALID_VACANCY_URL";

  constructor(options?: CustomErrorOptions) {
    super("Vacancy URL must be an absolute https URL", options);
  }
}
