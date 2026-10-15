# 0005. Store data in PostgreSQL with Drizzle

## Status

accepted

Date: 2026-10-15

## Context

[ADR 0004](0004-keep-contracts-as-zod-schemas.md) left storage and the
database schema to a follow-on ADR. PostgreSQL and Drizzle were chosen by
the product owner when the storage work started; other databases and ORMs
were not evaluated. Several NestJS or Node instances will share one
database, so the schema and its migrations must live in shared code, and the
shared database code must stay plain code that can move to another package.

## Considered Options

- Driver `pg` (node-postgres) or `postgres` (postgres.js) — both supported
  by Drizzle; postgres.js uses prepared statements by default, which need
  `prepare: false` behind connection poolers.
- Official `@nestjs/drizzle` module or a hand-written provider with a
  `Symbol` token — the module is pre-1.0 (0.0.2); with our own provider,
  pool shutdown and error handling are ours to write.
- Migrations applied by `migrate()` on application startup or by a
  separate one-off command — startup needs no extra step, but every instance
  tries to migrate at once.

## Decision

- Drizzle ORM and drizzle-kit `1.0.0-rc.4`, pinned exactly and upgraded
  together, because v1 is a release candidate and its API may still change
  ([upgrade to v1](https://orm.drizzle.team/docs/upgrade-v1)).
- Driver `pg`, because the NestJS Drizzle chapter is written for it and
  `@nestjs/drizzle` handles errors of its pool
  ([NestJS Drizzle](https://docs.nestjs.com/data/drizzle)).
- Applications connect through `DrizzleModule.forRootAsync` with the
  connection string from `ConfigService`, because the module closes the pool
  on shutdown and each application gets its own pool.
- `packages/db` holds the schema, relations, `drizzle.config.ts` and the
  migrations. Its `src/` never reads the environment and never creates a
  client, because a module-level instance would be shared by every
  application in one process and closed by the first one to shut down.
- `drizzle-kit generate` writes SQL migrations committed in
  `packages/db/drizzle`; `drizzle-kit migrate` applies them as a separate
  step, never on application startup, because Drizzle has no migration lock
  and instances would race
  ([migrations](https://orm.drizzle.team/docs/migrations),
  [no lock](https://github.com/drizzle-team/drizzle-orm/issues/874)).
  Locally the step runs before `pnpm dev`; in CI it runs before rollout.

## Consequences

- Easier: one schema and one migration history for every service.
- Harder: during a rollout old instances run on the new schema, so every
  schema change must stay backward compatible within one release
  (expand, then contract). drizzle-kit has no down migrations
  ([drizzle-kit](https://orm.drizzle.team/docs/kit-overview)); a bad
  migration is fixed with a new one.
- Follow-up: the CI pipeline with the migration step; stable Drizzle 1.0 and
  `@nestjs/drizzle` 1.0; integration tests against a real database.
