# @repo/utils

Small general-purpose helpers that run in any runtime: backend, frontend,
workers.

## Rules

- Runs in any runtime: Node and the browser. No Node, DOM or framework APIs.
- No runtime-specific dependencies, and no heavy ones.
- No domain knowledge.
- Entry points are split by purpose: one folder per purpose, imported by
  subpath, e.g. `@repo/utils/result`. There is no root entry point.
