# 0003. Name code by domain entity in singular, REST paths in plural

## Status

accepted

Date: 2026-10-10

## Context

The backend, the shared network-schema package and the FSD frontend all slice
code by domain entity. Their ecosystems disagree on grammatical number:
NestJS examples use plural module folders (`cats/`), FSD slices are singular
(`entities/post`). Without one rule the same entity becomes `postings/` in
one workspace and `posting/` in another.

REST URLs are a separate convention: collections are plural (`/postings`,
`/postings/42`), and a URL never becomes a folder or class name.

## Considered Options

- Plural everywhere — matches NestJS examples and URLs; contradicts FSD.
- Singular everywhere, URLs included — breaks the REST convention for no
  gain.
- Singular in code, plural in URLs — one word per domain across workspaces,
  standard URLs; the NestJS generator's singular route needs a manual fix.

## Decision

Code is named by domain entity in singular. HTTP paths follow REST and name
collections in plural.

- Domain folder: entity in singular, kebab-case, identical in every
  workspace: `posting/`, `source/`, `cover-letter/`.
- Files and classes follow the folder: `posting.controller.ts`,
  `PostingService`, `PostingModule`. A collection query is named by its
  action, not pluralised: `list-posting`.
- REST paths are plural: `@Controller('postings')`, `GET /postings/:id`.
  The URL is the only place the plural form appears.
- After `nest g resource posting` the route is changed to the plural form by
  hand; nothing else is renamed.

## Consequences

- Easier: one folder name per domain in backend, packages and frontend; FSD
  slices keep their customary names.
- Harder: a manual route fix after every NestJS resource generation; readers
  used to NestJS or Rails expect plural folders and need this ADR.
- Not enforced yet; a lint check on folder names is a possible follow-up.
- Follow-on ADR: the shared network-schema package is not decided here.
