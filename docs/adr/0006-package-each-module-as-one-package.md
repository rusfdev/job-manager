# 0006. Package each module as one package

## Status

proposed

Date: 2026-11-24

## Context

A module has code for several roles: domain and use cases, the API entry
point, and the worker entry point. The roles share the domain but differ in
their dependencies (HTTP, MCP and throttling for the API; queues and
schedules for the worker).

Splitting a module into packages per role keeps each role's dependencies
and rebuilds apart, but multiplies the number of packages. Keeping a module
in one package keeps it in one place, but lets dependencies and rebuilds of
one role reach the other.

The project has one developer and aims for long-lived, high-quality code.
The options were scored against weighted criteria (see the evaluation in
`docs/architecture-evaluation`).

## Considered Options

- **Packages per role.** `api` and `worker` are separate packages; `core` is
  a separate package when two or more roles need it. Each package declares
  only its role's dependencies, and a change to one role does not rebuild the
  others. A module spans several packages, and their number grows with the
  roles it serves.
- **One package per module.** Roles are subpaths (`/core`, `/api`,
  `/worker`). A module lives in one package whatever runs it. The package
  carries the dependencies of every role, and a change to one role rebuilds
  every application that uses the package.

## Decision

Each module is one package with the subpaths `/core`, `/api` and `/worker`.
Unused dependencies of other roles in an application cost less than a
module split across packages.

- Each role is a separate NestJS module. Providers needed by one role only
  live in that role's NestJS module, so an application never has to provide
  them.
- `@nestjs/*` packages are peer dependencies, so every application shares
  one instance. Other dependencies are regular dependencies.
- Dependencies heavy enough to matter (for example, a headless browser for
  parsing) live in separate adapter packages, imported only by the role that
  needs them.
- `/api` and `/worker` may import only `/core` of their own module; `/core`
  imports no entry point. A lint rule enforces this in CI, and a violation
  fails the build.
- Applications import the role they run and stay thin.

## Consequences

- A module stays in one place; a new role adds a subpath, not a package.
- Applications stay thin: they import a role and configure it.
- Each application installs the light dependencies of every role. Node loads
  only imported files and NestJS creates only imported modules, so unused
  roles are never loaded; the cost is image size.
- A change to one role rebuilds and retests every application that uses the
  package. Turborepo's cache reduces this but does not remove it.
- Internal boundaries are enforced by the lint rule, not by the package
  graph.
- The decision is reversible: splitting the package into `core`, `api` and
  `worker` later moves files and changes import paths, nothing else.
