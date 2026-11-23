import { describe, expect, it } from "vitest";
import { unwrapResult } from "@repo/common/utils";
import { VacancyUrl } from "./vacancy-url.js";

interface EquivalenceGroup {
  readonly canonical: string;
  readonly variants: readonly string[];
}

interface DistinctPair {
  readonly name: string;
  readonly left: string;
  readonly right: string;
}

const EQUIVALENCE_GROUPS: readonly EquivalenceGroup[] = [
  {
    canonical: "https://example.com/jobs/1",
    variants: [
      "https://example.com/jobs/1",
      "HTTPS://example.com/jobs/1",
      "https://www.example.com/jobs/1",
      "https://EXAMPLE.com/jobs/1",
      "https://example.com/jobs/1/",
      "https://example.com/jobs/1//",
      "https://example.com/jobs/1?utm_source=tg&fbclid=abc",
      "https://example.com/jobs/1?id=42",
      "https://example.com/jobs/1#apply",
      "https://example.com:443/jobs/1",
      "HTTPS://WWW.Example.com:443/jobs/1/?utm_source=tg#apply",
    ],
  },
  {
    canonical: "https://example.com/",
    variants: [
      "https://example.com",
      "https://www.example.com/",
      "https://example.com/?ref=tg#top",
    ],
  },
  {
    canonical: "https://example.com:8443/jobs/1",
    variants: ["https://www.example.com:8443/jobs/1", "https://example.com:8443/jobs/1/"],
  },
];

const DISTINCT_PAIRS: readonly DistinctPair[] = [
  { name: "path", left: "https://example.com/jobs/1", right: "https://example.com/jobs/2" },
  { name: "path case", left: "https://example.com/jobs/1", right: "https://example.com/Jobs/1" },
  { name: "host", left: "https://example.com/jobs/1", right: "https://example.org/jobs/1" },
  {
    name: "subdomain",
    left: "https://example.com/jobs/1",
    right: "https://jobs.example.com/jobs/1",
  },
  {
    name: "www inside the host name",
    left: "https://example.com/jobs/1",
    right: "https://wwwexample.com/jobs/1",
  },
  { name: "port", left: "https://example.com/jobs/1", right: "https://example.com:8443/jobs/1" },
];

const INVALID_URLS = [
  "http://example.com/jobs/1",
  "http://www.example.com:80/jobs/1",
  "",
  "   ",
  "not a url",
  "example.com/jobs/1",
  "/jobs/1",
  "//example.com/jobs/1",
  "https//example.com",
  "https://",
  "https://exa mple.com",
  "http://[::1",
  "ftp://example.com/jobs/1",
  "ws://example.com/jobs/1",
  "file:///etc/passwd",
  "mailto:hr@example.com",
  "javascript:alert(1)",
  "data:text/html,hi",
  "chrome://settings",
];

const EQUIVALENT_VARIANTS = EQUIVALENCE_GROUPS.flatMap(({ canonical, variants }) =>
  variants.map((variant) => ({ canonical, variant })),
);

const CANONICAL_VALUES = EQUIVALENCE_GROUPS.map(({ canonical }) => canonical);

describe("VacancyUrl", () => {
  it.each(EQUIVALENT_VARIANTS)("$variant is $canonical", ({ canonical, variant }) => {
    const url = unwrapResult(VacancyUrl.create(variant));
    const expected = unwrapResult(VacancyUrl.create(canonical));
    expect(url.value).toBe(canonical);
    expect(url.equals(expected)).toBe(true);
  });

  it.each(DISTINCT_PAIRS)("keeps urls with a different $name apart", ({ left, right }) => {
    const url = unwrapResult(VacancyUrl.create(left));
    const other = unwrapResult(VacancyUrl.create(right));
    expect(url.equals(other)).toBe(false);
  });

  it.each(CANONICAL_VALUES)("keeps the stored value %s unchanged", (canonical) => {
    const url = unwrapResult(VacancyUrl.create(canonical));
    expect(url.value).toBe(canonical);
  });

  it.each(INVALID_URLS)("rejects %s", (input) => {
    const result = VacancyUrl.create(input);
    expect(result.isOk).toBe(false);
  });
});
