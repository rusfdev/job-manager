# @repo/database

Database schema, relations and SQL migrations for PostgreSQL with Drizzle
([ADR 0006](../../docs/adr/0006-provide-nest-database-module-from-package.md)).

## Rules

- `DatabaseModule` and its config (`src/database.config.ts`, reads
  `DATABASE_URL`) live here; applications just import the module
  ([ADR 0006](../../docs/adr/0006-provide-nest-database-module-from-package.md)).
  The client is created in the module's factory, per application, never at
  module level.
- Outside `src/database.config.ts`, `src/` does not read the environment.
- Tables are exported from `src/schema/index.ts`; relations are built from
  them in `src/relations.ts`.
- Migrations in `drizzle/` are generated, committed and never edited by
  hand. A mistake is fixed with a new migration.
- Every schema change stays backward compatible within one release.

## Commands

Copy `.env.example` to `.env` and set `DATABASE_URL`; only drizzle-kit
reads it. Run the commands from the repository root:

- `pnpm db:generate` — write a migration for schema changes.
- `pnpm db:migrate` — apply pending migrations; Postgres must be up (`pnpm db:up`).
