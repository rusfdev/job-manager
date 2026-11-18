import type { VacancyUrl } from "@repo/shared/domain";

export function normalizeVacancyUrl(url: VacancyUrl): VacancyUrl {
  const parsed = new URL(url);

  parsed.hostname = parsed.hostname.replace(/^www\./u, "");
  parsed.hash = "";
  parsed.search = "";

  const normalized = parsed.toString() as VacancyUrl;

  return normalized;
}
