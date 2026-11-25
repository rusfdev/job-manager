import { ConflictError, type CustomErrorOptions } from "@repo/common/errors";

export class VacancyAlreadyExistsError extends ConflictError {
  readonly code = "VACANCY_ALREADY_EXISTS";

  constructor(options?: CustomErrorOptions) {
    super("Vacancy already exists", options);
  }
}
