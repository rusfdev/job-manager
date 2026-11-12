# @repo/shared/primitives

Primitives are the project's smallest typed values. At runtime each is a
plain string or number; a brand makes it a distinct type, so one primitive
cannot be passed where another is expected.

## Rules

- A primitive is a Zod schema with `.brand()`; its type is inferred with
  `z.infer`, never written by hand.
- Every primitive has `.meta({ id })` equal to its type name. Swagger needs it
  to show the primitive as a named schema instead of an anonymous string.
