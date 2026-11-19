# @repo/contracts

Objects exchanged between layers and applications: request and response
bodies, the authenticated principal, error and (later) pagination shapes.
The values inside them come from
[`@repo/shared/domain`](../shared/src/domain/README.md).

## Rules

- Runs in Node and the browser: no Node, DOM or framework APIs. Runtime
  dependencies are `zod` (peer, from the catalog) and `@repo/shared`.
- A DTO is a Zod schema; its type is inferred with `z.infer`, never written by
  hand.
- One folder in `src/` per business domain, singular (ADR 0003), imported by
  subpath: `@repo/contracts/<domain>`. No `types.ts`, `common.ts` or
  `utils.ts`.
- Contracts used by every domain (API error, later pagination) live in the
  root of `src/` and are imported from `@repo/contracts`.
- A domain folder may import the root files, never another domain folder.
  The root never imports a domain folder.
- `index.ts` (root or `<domain>/`) is the only entry point and the only
  barrel of its level. Files import each other directly, not through it.
- Names: schema `<name>Schema`; type `<Name>Dto` for an object, `<Name>` for a
  value.
- Every schema has `.meta({ id })` equal to its type name; it is the schema
  name in Swagger. A branded schema uses the same name in `.brand()`.
- Values (`emailSchema`, `userIdSchema`, `vacancyStatusSchema`, ...) come
  from `@repo/shared/domain`; they are not declared here.

## Structure

- `src/` root — API error response.
- `src/auth` — principal, sign-in, sign-up.
- `src/vacancy` — vacancy, create-vacancy.

## Example

```ts
// entity/entity-name.ts — a value
export const entityNameSchema = z.string().brand("EntityName").meta({ id: "EntityName" });

export type EntityName = z.infer<typeof entityNameSchema>;

// entity/entity.ts — an object
import { entityIdSchema } from "@repo/shared/domain";
import { entityNameSchema } from "./entity-name.js";

export const entitySchema = z
  .object({ id: entityIdSchema, name: entityNameSchema })
  .meta({ id: "EntityDto" });

export type EntityDto = z.infer<typeof entitySchema>;

// entity/create-entity.ts — an object
import { entityNameSchema } from "./entity-name.js";

export const createEntitySchema = z
  .object({ name: entityNameSchema })
  .meta({ id: "CreateEntityDto" });

export type CreateEntityDto = z.infer<typeof createEntitySchema>;

// entity/index.ts
export * from "./create-entity.js";
export * from "./entity-name.js";
export * from "./entity.js";
```

A new domain folder also gets its subpath in `exports` of `package.json`.
