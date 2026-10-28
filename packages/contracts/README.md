# @repo/contracts

Schemas, types and constants needed by both the backend and the frontend,
split by domain. The package has no backend or frontend dependencies, only
`zod`.

## Structure

- The package is split by domain concept.
- Every domain folder has an `index.ts` barrel that exports the group of the
  domain.
- The package exports in `package.json` are defined through these barrels.
- Domains import each other only by a relative import.
- `types.ts`, `common.ts` and `utils.ts` must not be created. Group files by
  concept.

## Swagger metadata (required)

- Every schema must have `.meta({ id })`. Other meta fields are added only
  when necessary and are never generated automatically.
- `id` and the brand, if the schema is branded, are identical and unique. The
  name of the TypeScript type derived from the schema matches the brand name
  and `id`.

## Identifiers

- Every entity identifier must be a branded type.
