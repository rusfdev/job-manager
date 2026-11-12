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
- [`src/errors`](src/errors/) — application errors.
- [`src/primitives`](src/primitives/README.md) — branded primitive values.
- [`src/result`](src/result/) — explicit success or failure values.
