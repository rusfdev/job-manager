# @repo/common

The lowest layer. Every other package can import it.

## Rules

- Imports no other package, so there are no dependency cycles.
- Knows nothing about the platform or the domain, so it runs anywhere.
- Import from a subpath, e.g. `@repo/common/result`. The root exports
  nothing.

## Structure

Folders are grouped by purpose. Add others when needed:

- `result/` — success or error results
- `errors/` — base error classes, error kinds, etc.
- `assert/` — runtime checks

Each folder has one `index.ts` and an entry in `exports`.
