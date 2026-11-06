# @repo/database

Database schema, relations and SQL migrations for PostgreSQL with Drizzle.

## Rules

- The package does not depend on Nest and has no module. It exports
  `createDatabase(config)` and the `Database` type; the application builds
  the client from its own config (`apps/api/src/config/database.config.ts`)
  and registers it with `DrizzleModule`. Consumers inject it with
  `InjectDrizzle()` from `@nestjs/drizzle` and import operators from
  `drizzle-orm`.
- `src/` does not read the environment and never creates a client at module
  level.
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
