# AGENTS.md

Personal job-posting manager: collects postings from configurable sources,
helps track and evaluate them. Details: [docs/product.md](docs/product.md)

Documentation and code are written in English.

## Commands

- First run: copy `.env.example` to `.env` in apps/api and packages/db.
- `pnpm dev` — run the apps and rebuild packages on change.
- `pnpm db:up` — start Postgres in Docker.
- `pnpm db:migrate` — apply pending migrations; needs `pnpm db:up` first.
- `pnpm db:generate` — write a migration from schema changes in packages/db.

## Where things are

- [docs/product.md](docs/product.md) — goals and non-goals
- [docs/adr/](docs/adr/) — architecture decisions, one file each, status inside
- apps/* — applications, packages/* — shared code
- [packages/contracts](packages/contracts/README.md) — Zod schemas of every
  shape crossing an app boundary; naming rules in its README
- [packages/db](packages/db/README.md) — Drizzle schema, relations and SQL
  migrations; rules in its README

## Decisions

- Architecture decisions live in [docs/adr/](docs/adr/). Only ADRs with status
  accepted are in force; superseded, rejected and deprecated are history, not
  rules.
- Read the relevant accepted ADRs before you: add a dependency; create a
  package, an application or the project skeleton; change the data schema or
  migrations; change a public API; add an import between packages; change CI
  or infrastructure.
- If a task contradicts an accepted ADR, stop, name the conflict and offer two
  paths: follow the ADR, or write a new ADR that supersedes it.
- A new architecture decision is proposed only as an ADR draft with status
  proposed. A human sets the status to accepted.
- When superseding an ADR: the new one states which ADR it supersedes; in the
  old one only the status line changes to "Superseded by [link]", the content
  stays untouched.

## Commits

- Conventional Commits: type(scope): subject; subject up to 72 characters,
  imperative mood.
- Body:
  Because: — up to 3 bullets, motivation only.
  This commit: — up to 5 bullets, what changed.
  If it does not fit in 5 bullets, say the commit is too big and propose a split.
- An architecture change references its ADR in the commit body.
- One meaningful commit per task.
- Never add AI as a co-author: no Co-Authored-By or other agent trailers.
- Never push to main. Work happens in separate branches.
- No commit, push or rebase without an explicit request. A drafted message is
  not permission to commit.

## Boundaries

- Always: do only the current task; before changing several files, show a plan.
- Always: declare versions of dependencies shared by several workspaces in
  catalog: in pnpm-workspace.yaml, not in a package's package.json.
- Ask first: anything from the list in "Decisions" unless an accepted ADR
  explicitly covers it.
- Never: import one application from another; apps/* are connected only
  through packages/*.
- Never: commit secrets or .env; delete or weaken tests to make them pass; set
  an ADR status to accepted; run destructive git operations (force push,
  reset --hard) without an explicit request.
