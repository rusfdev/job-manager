# @repo/shared

Zod primitives, value objects, entity identifiers and constants used by both
the backend and the frontend. Generic helpers with no domain live in
[`@repo/utils`](../utils/README.md).

## Rules

- The only dependency is `zod`. No other workspace packages, no NestJS, no
  database, no DOM.
- `common/` holds primitives with no domain; other folders are domains, named
  in singular ([ADR 0003](../../docs/adr/0003-name-code-by-domain-in-singular.md)).
- The single entry point is `src/index.ts`. Folders have no `index.ts`.
  Consumers import only from `@repo/shared`.
- Files import each other by a relative path to the file.
- No `types.ts`, `common.ts` or `utils.ts` files.
- Every schema has `.meta({ id })`. The brand, if any, and the inferred type
  share the same name as `id`.
- Types are inferred with `z.infer`, never declared by hand.
- Entity identifiers are branded UUIDs.
