# 0005. Store data in PostgreSQL with Drizzle

## Status

accepted

Date: 2026-10-15

## Context

Several instances share one database, so the schema and its migrations must
live in shared code. PostgreSQL and Drizzle were chosen by the product owner;
other databases and ORMs were not evaluated.

## Considered Options

- Driver `pg` or `postgres`.
- `@nestjs/drizzle` or our own provider.
- Migrations on application startup or by a separate command.

## Decision

- PostgreSQL and Drizzle (product owner's choice).
- Driver `pg`: the NestJS Drizzle guide is written for it.
- `@nestjs/drizzle` instead of our own provider: it closes the pool on
  shutdown and handles pool errors, which we would otherwise write ourselves.
- `packages/database` holds the schema, relations and migrations. It does not
  read the environment or create a client: a client at module level would be
  shared by all applications in a process and closed by the first to stop.
  Each application creates its own.
- Migrations run as a separate CI step before rollout, never on application
  startup: Drizzle has no migration lock, so instances would race.

## Consequences

- One schema and one migration history for all services.
- Schema changes stay backward compatible within one release, because old
  instances run on the new schema during rollout.
- No down migrations; a bad migration is fixed with a new one.
