import { err, ok, type Result } from "@repo/common/result";
import { InvalidVacancyUrlError } from "./errors/invalid-vacancy-url.error.js";

export class VacancyUrl {
  readonly #value: string;

  private constructor(value: string) {
    this.#value = value;
  }

  static create(value: string): Result<VacancyUrl, InvalidVacancyUrlError> {
    const url = URL.parse(value);

    if (!url || url.protocol !== "https:") {
      return err(new InvalidVacancyUrlError());
    }

    url.hostname = url.hostname.replace(/^www\./u, "");
    url.pathname = url.pathname.replace(/\/+$/u, "");
    url.hash = "";
    url.search = "";

    const vacancyUrl = new VacancyUrl(url.toString());

    return ok(vacancyUrl);
  }

  get value(): string {
    return this.#value;
  }

  equals(other: VacancyUrl): boolean {
    return this.#value === other.#value;
  }
}
