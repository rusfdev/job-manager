import { CustomError, type CustomErrorOptions, ErrorKind } from "@repo/common/errors";

export class VacancyAlreadyExistsError extends CustomError {
  readonly kind = ErrorKind.CONFLICT;
  readonly code = "VACANCY_ALREADY_EXISTS";

  constructor(options?: CustomErrorOptions) {
    super("Vacancy already exists", options);
  }
}
