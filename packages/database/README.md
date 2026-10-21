# @repo/database

Database schema, relations and SQL migrations for PostgreSQL with Drizzle
([ADR 0005](../../docs/adr/0005-store-data-in-postgresql-with-drizzle.md)).

## Rules

- `src/` never reads the environment and never creates a database client.
  Applications create the connection through `DrizzleModule.forRootAsync`.
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
