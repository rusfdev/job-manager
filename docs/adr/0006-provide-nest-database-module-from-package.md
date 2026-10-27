# 0006. Move the Nest database module and its config to the database package

## Status

accepted

Date: 2026-10-27

Supersedes [ADR 0005](0005-store-data-in-postgresql-with-drizzle.md).

## Context

Every application would repeat the same database module and config. ADR 0005
kept both in applications and forbade `packages/database` to read the
environment or create a client.

## Considered Options

- Keep them in each application.
- A separate package for the Nest module.

## Decision

- `DatabaseModule` and its config move from `apps/api/src/database` to
  `packages/database` and are exported from its main entry. The package reads
  `DATABASE_URL`; an application only imports the module.
- The client is created in the module's `DrizzleModule.forRootAsync` factory,
  per application, never at module level.
- Kept from ADR 0005: PostgreSQL; Drizzle and drizzle-kit `1.0.0-rc.4`
  pinned; driver `pg`; `@nestjs/drizzle` `0.0.2`; migrations generated into
  `packages/database/drizzle` and applied by a separate `drizzle-kit migrate`,
  never on startup; schema changes backward compatible within one release.

## Consequences

- Every consumer of `@repo/database` now loads the Nest packages.
