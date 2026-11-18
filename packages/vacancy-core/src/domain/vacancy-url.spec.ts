import { describe, expect, it } from "vitest";
import { vacancyUrlSchema } from "@repo/shared/domain";
import { normalizeVacancyUrl } from "./vacancy-url.js";

interface NormalizationCase {
  readonly name: string;
  readonly input: string;
  readonly expected: string;
}

const NORMALIZATION_CASES: readonly NormalizationCase[] = [
  {
    name: "removes the www prefix",
    input: "https://www.example.com/jobs/1",
    expected: "https://example.com/jobs/1",
  },
  {
    name: "keeps www inside the host name",
    input: "https://wwwexample.com/jobs/1",
    expected: "https://wwwexample.com/jobs/1",
  },
  {
    name: "lowercases the host",
    input: "https://WWW.Example.COM/jobs/1",
    expected: "https://example.com/jobs/1",
  },
  {
    name: "removes the fragment",
    input: "https://example.com/jobs/1#apply",
    expected: "https://example.com/jobs/1",
  },
  {
    name: "removes tracking query parameters",
    input: "https://example.com/jobs/1?utm_source=tg&fbclid=abc&gclid=xyz",
    expected: "https://example.com/jobs/1",
  },
  {
    name: "removes every query parameter",
    input: "https://example.com/job?id=42&page=2",
    expected: "https://example.com/job",
  },
  {
    name: "keeps the path and its trailing slash",
    input: "https://example.com/jobs/123-backend/",
    expected: "https://example.com/jobs/123-backend/",
  },
  {
    name: "drops the default port",
    input: "https://example.com:443/jobs/1",
    expected: "https://example.com/jobs/1",
  },
  {
    name: "keeps a non-default port",
    input: "https://example.com:8443/jobs/1",
    expected: "https://example.com:8443/jobs/1",
  },
  {
    name: "keeps the http scheme",
    input: "http://example.com/jobs/1",
    expected: "http://example.com/jobs/1",
  },
];

describe("normalizeVacancyUrl", () => {
  it.each(NORMALIZATION_CASES)("$name", ({ input, expected }) => {
    const url = vacancyUrlSchema.parse(input);
    const normalized = normalizeVacancyUrl(url);
    expect(normalized).toBe(expected);
  });

  it("is idempotent", () => {
    const url = vacancyUrlSchema.parse("https://www.example.com/jobs/1?id=42#apply");
    const normalized = normalizeVacancyUrl(url);
    const renormalized = normalizeVacancyUrl(normalized);
    expect(renormalized).toBe(normalized);
  });
});
