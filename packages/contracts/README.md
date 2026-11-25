# @repo/contracts

Everything that crosses a module boundary: DTOs, primitives, events and
errors. Runs in Node, the browser and the worker.
See [ADR 0004](../../docs/adr/0004-keep-contracts-in-one-package.md).

## Usage

```ts
import { ApiErrorDto } from "@repo/contracts";
import { SignInDto } from "@repo/contracts/auth";
import { VacancyDto } from "@repo/contracts/vacancy";
```

## Rules

- Add only what other modules or the frontend need.
- No Node, browser or framework APIs.
- Give each schema `.meta({ id })` with its name, so OpenAPI shows it as a
  named component instead of an inline copy.

## Structure

- `src/common` — shared by all modules, exported from `@repo/contracts`.
- `src/<module>` — one module, exported from `@repo/contracts/<module>`.

Example of a module folder. Add other folders when needed:

- `dto/` — request and response types & schemas
- `model/` — IDs, enums, value objects
- `events/` — events between modules
- `errors/` — error classes, error codes, etc.

Each module has one barrel: `src/<module>/index.ts`.
A new module also needs an entry in `exports`.
