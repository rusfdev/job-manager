# @repo/primitives

Primitives are the project's smallest typed values: `UserId`, `Email`,
`Password`. At runtime each is a plain string or number; a brand makes it a
distinct type, so a `UserId` cannot be passed where an `Email` is expected.

## Rules

- Runs in any runtime: Node and the browser. No Node, DOM or framework APIs.
- No runtime-specific dependencies, and no heavy ones.
- A primitive is a Zod schema with `.brand()`; its type is inferred with
  `z.infer`, never written by hand.
- Every primitive has `.meta({ id })` equal to its type name. Swagger needs it
  to show the primitive as a named schema instead of an anonymous string.
