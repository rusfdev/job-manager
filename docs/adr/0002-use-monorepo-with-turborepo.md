# 0002. Monorepo with pnpm workspaces and Turborepo

## Status
accepted

Date: 2026-10-10

## Context
The product is full-stack: a backend, a periodic worker and a PWA, all written
in TypeScript. They share data shapes, first of all the schemas that cross the
backend/frontend boundary. The repository layout has to be decided before the
first package is created, because splitting or merging repositories later is
expensive.

## Considered Options
- Separate repositories per application, shared code published as a package —
  clear ownership boundaries, but every schema change becomes a publish/bump
  cycle across repositories and co-located changes need several PRs.
- Monorepo with pnpm workspaces and Turborepo — one language, one repository,
  shared packages imported directly; Turborepo adds task orchestration and
  caching with little magic; requires a workspace layout discipline.
- Monorepo with Nx — richer generators and project graph, but a higher-level,
  more opinionated layer than this project needs.

## Decision
A single monorepo managed by pnpm workspaces with Turborepo as the task runner.

Reasons:
- TypeScript is the only language, so co-locating backend and frontend lets
  code be shared directly, at minimum the schemas between them.
- Turborepo is preferred over Nx because it has less magic and automation and
  stays close to plain package scripts.

Dependency rules:
- Applications (`apps/*`) must not know about each other. They are connected
  only through packages.
- Packages (`packages/*`) may import each other. Applications may import
  packages, never other applications.
- Versions of dependencies shared across workspaces are pinned in the pnpm
  `catalog:` in `pnpm-workspace.yaml`, not in individual package manifests.

## Consequences
- Easier: sharing schemas and types between applications, atomic changes
  across backend and frontend, one toolchain and one set of configs, one
  version of each shared dependency across the repository.
- Harder: anything two applications need must first be extracted into a
  package; the app-to-app ban needs to be enforced (lint or review), not just
  remembered; Turborepo pipeline and caching need to be configured and
  understood.
- Follow-on ADR required: the concrete workspace layout (which apps and
  packages exist and what each owns) is not fixed by this ADR.
