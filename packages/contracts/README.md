# @repo/contracts

Zod schemas for every shape that crosses an application boundary
([ADR 0004](../../docs/adr/0004-keep-contracts-as-zod-schemas.md)).
The only runtime dependency is `zod`.

## Rules

- Every shape is a schema `<Name>Schema`; its type is
  `z.infer<typeof <Name>Schema>` and is never written by hand.
- Entity: `PostSchema` → `Post`. Collection: `PostListSchema` → `PostList`.
- Request body: `Dto` suffix. `CreatePostDtoSchema` → `CreatePostDto`.
- Query parameters: `Query` suffix, named by action.
  `GetPostListQuerySchema` → `GetPostListQuery`.
- Primitives with domain meaning are branded, identifiers first of all:
  `PostIdSchema = z.uuid().brand("PostId")` → `PostId`. A domain value is
  never a plain `string` or `number`.
- Derived schemas come from the entity schema via `omit`, `partial`,
  `extend`.
- Names use the entity in singular
  ([ADR 0003](../../docs/adr/0003-name-code-by-domain-in-singular.md)).
- One entity, one file: `src/<entity>/<entity>.schema.ts`.
  Shared shapes (pagination, response envelope): `src/shared/<topic>.schema.ts`.
- `src/index.ts` re-exports every file. Files only declare and export:
  the package is `sideEffects: false`.
- Not here: HTTP paths, database schemas, application config.

## Example: `src/post/post.schema.ts`

```ts
import { z } from "zod";

export const PostIdSchema = z.uuid().brand("PostId");

export type PostId = z.infer<typeof PostIdSchema>;

export const PostSchema = z.object({
  id: PostIdSchema,
  title: z.string().min(1),
  url: z.url(),
  createdAt: z.iso.datetime(),
});

export type Post = z.infer<typeof PostSchema>;

export const PostListSchema = z.array(PostSchema);

export type PostList = z.infer<typeof PostListSchema>;

export const CreatePostDtoSchema = PostSchema.omit({ id: true, createdAt: true });

export type CreatePostDto = z.infer<typeof CreatePostDtoSchema>;

export const UpdatePostDtoSchema = CreatePostDtoSchema.partial();

export type UpdatePostDto = z.infer<typeof UpdatePostDtoSchema>;

export const GetPostQuerySchema = z.object({ id: PostIdSchema });

export type GetPostQuery = z.infer<typeof GetPostQuerySchema>;

export const GetPostListQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

export type GetPostListQuery = z.infer<typeof GetPostListQuerySchema>;
```
