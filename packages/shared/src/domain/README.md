# @repo/shared/domain

Domain values: ids, enum-like values and other typed scalars used on every
layer — domain, persistence, application, transport and the frontend. Objects
built from them live in [`@repo/shared/contracts`](../contracts/).

## Rules

- Only values; no objects. At runtime a value is a plain string or number.
- A branded value is a Zod schema with `.brand()`; its type is inferred with
  `z.infer`, never written by hand.
- An enum-like value is an `as const` object in `UPPER_CASE`, a type derived
  from it and a `z.enum` schema.
- Every schema has `.meta({ id })` equal to its type name. Swagger needs it to
  show the value as a named schema instead of an anonymous string.
- One folder per domain, singular (ADR 0003); `common/` for values with no
  domain. `index.ts` is the only entry point.
- Depends on nothing but `zod`.

## Example

```ts
// vacancy/vacancy-status.ts
export const VACANCY_STATUS = { NEW: "new", APPLIED: "applied" } as const;
export type VacancyStatus = (typeof VACANCY_STATUS)[keyof typeof VACANCY_STATUS];
export const vacancyStatusSchema = z.enum(VACANCY_STATUS).meta({ id: "VacancyStatus" });
```
