# @repo/common

Shared code reused by backend and frontend; where possible, not tied to a
single domain.

## Rules

- No Node-only, browser-only or framework APIs: the code runs in Node and the
  browser.
- Import from a folder subpath, e.g. `@repo/common/utils`; `@repo/common`
  itself exports nothing.
- A new folder needs an `index.ts` and its own entry in `package.json`
  `exports`.

## Structure

- `src/domain` — Shared domain primitives such as value objects, types, schemas and
  base classes.
- `src/contracts` — Shared dto types and schemas.
- `src/errors` — Base class for domain errors, plus shared persistence errors.
- `src/utils` — Shared utilities.
