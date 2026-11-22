# @repo/shared/domain

Domain values: ids, enum-like values and other typed scalars used on every
layer — domain, persistence, application, transport and the frontend. Objects
built from them live in [`@repo/shared/contracts`](../contracts/).

## Rules

- Only values; no objects. At runtime a value is a plain string or number.
- A branded value is a Zod schema with `.brand()`; an enum-like value is a
  `z.enum` schema. Its type is inferred with `z.infer`, never written by hand.
- The schema and its type have the same name.
- Every schema has `.meta({ id })` equal to its type name. Swagger needs it to
  show the value as a named schema instead of an anonymous string.
- One folder per domain, singular (ADR 0003); `common/` for values with no
  domain. `index.ts` is the only entry point.
- Depends on nothing but `zod`.

## Example

```ts
// vacancy-status.ts
export const VacancyStatus = z
  .enum({ NEW: "new", APPLIED: "applied" })
  .meta({ id: "VacancyStatus" });

export type VacancyStatus = z.infer<typeof VacancyStatus>;
```
