# @repo/shared/contracts

Objects exchanged between layers and applications: request and response
bodies, the authenticated principal, error and (later) pagination shapes.
The values inside them come from [`../domain`](../domain/README.md).

## Rules

- A DTO is a Zod schema; its type is inferred with `z.infer`, never written by
  hand.
- One folder per domain. No `types.ts`, `common.ts` or `utils.ts`.
- `index.ts` is the only entry point and the only barrel. Files import
  each other directly, not through it.
- Names: schema `<name>Schema`; type `<Name>Dto` for an object, `<Name>` for a
  value.
- Every schema has `.meta({ id })` equal to its type name; it is the schema
  name in Swagger. A branded schema uses the same name in `.brand()`.
- Values (`emailSchema`, `userIdSchema`, `vacancyStatusSchema`, ...) come
  from [`../domain`](../domain/README.md); they are not declared here.

## Example

```ts
// entity/entity-name.ts — a value
export const entityNameSchema = z.string().brand("EntityName").meta({ id: "EntityName" });

export type EntityName = z.infer<typeof entityNameSchema>;

// entity/entity.ts — an object
import { entityIdSchema } from "../../domain/index.js";
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

// index.ts
export * from "./entity/create-entity.js";
export * from "./entity/entity-name.js";
export * from "./entity/entity.js";
```
