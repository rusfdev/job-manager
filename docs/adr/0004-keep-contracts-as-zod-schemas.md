# 0004. Keep contracts as Zod schemas in a shared package

## Status

accepted

Date: 2026-10-10

## Context

The backend, the periodic worker and the PWA exchange the same domain
entities. [ADR 0002](0002-use-monorepo-with-turborepo.md) and
[ADR 0003](0003-name-code-by-domain-in-singular.md) both left the shared
network-schema package undecided. Without one source of truth each side
declares its own DTOs and types, and they drift apart silently: a field
renamed on the backend is caught on the frontend only at runtime.

An RPC layer was tried and removed: `packages/contract` on oRPC was deleted
because its integration with NestJS was not convenient enough. NestJS 12
added native validation by Zod schemas, which removed the need for an RPC
layer or class-based DTOs to get runtime validation on the backend.

## Considered Options

- Class-validator DTOs on the backend, hand-written types on the frontend —
  the NestJS default; two declarations of every shape that drift apart.
- oRPC on top of NestJS — end-to-end typed procedures; tried and rejected,
  the NestJS integration was not convenient enough.
- OpenAPI-first with code generation — language-neutral; adds a build step
  and a second artifact to keep in sync with the code.
- Zod schemas in a shared package — one declaration, runtime validation on
  both sides, types inferred for free; ties the contract to Zod.

## Decision

Contracts are Zod schemas in `packages/contracts`, the single source of
truth for every shape that crosses an application boundary.

- The package contains schemas of domain entities and of request and
  response bodies. Its only runtime dependency is `zod` from the catalog.
- TypeScript types are inferred from the schemas with `z.infer` and are
  never declared separately.
- The backend validates incoming data with NestJS 12 native Zod support
  using these schemas. Class-validator DTOs are not used.
- The frontend validates forms and responses with the same schemas.
- HTTP paths and methods stay in controllers
  ([ADR 0003](0003-name-code-by-domain-in-singular.md)). Database schemas
  and application config do not belong to the package.

## Consequences

- Easier: one change updates backend, worker and frontend at once; runtime
  validation on both sides comes from the same declaration; no code
  generation step.
- Harder: DTO classes produced by `nest g resource` are replaced by hand
  with schema-based validation; a breaking change in a schema breaks every
  consumer in the same commit, which is intended but must be reviewed as
  such; the contract is coupled to the Zod version pinned in the catalog.
- Follow-on ADR: storage and the database schema are not decided here.
