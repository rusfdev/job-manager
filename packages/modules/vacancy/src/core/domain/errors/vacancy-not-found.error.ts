import { CustomError, type CustomErrorOptions, ErrorKind } from "@repo/common/errors";

export class VacancyNotFoundError extends CustomError {
  readonly kind = ErrorKind.NOT_FOUND;
  readonly code = "VACANCY_NOT_FOUND";

  constructor(options?: CustomErrorOptions) {
    super("Vacancy not found", options);
  }
}
