# @repo/shared

Code shared by frontend and backend, split by purpose, not by kind.

## Rules

- Runs in Node and the browser: no Node, DOM or framework APIs.
- No heavy dependencies.
- One folder in `src/` per purpose, imported by subpath:
  `@repo/shared/<purpose>`. No root entry point.
- A folder with its own rules keeps them in its README, linked below.

## Structure

- [`src/assert`](src/assert/) — runtime assertions.
- [`src/contracts`](src/contracts/) — contracts used by every domain: API
  error response.
- [`src/domain`](src/domain/README.md) — domain values: ids, enum-like
  values, typed scalars.
- [`src/errors`](src/errors/) — application errors.
- [`src/result`](src/result/) — explicit success or failure values.

Values and contracts of a business domain live in its own package in
`packages/modules/<domain>`.
