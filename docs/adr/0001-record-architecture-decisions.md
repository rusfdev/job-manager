# 0001. Record architecture decisions

## Status

accepted

Date: 2026-10-10

## Context

The project is a monorepo being built from scratch. Decisions about repository
layout, stack, storage and testing are being made now and will be hard to
reconstruct later. Both the author and AI agents working in this repository
need a single place to learn what was decided and why, and a rule for what
happens when a decision no longer holds.

## Considered Options

- No formal record, decisions live in commit messages and chat history —
  no overhead, but the rationale is lost and agents cannot discover it.
- Architecture Decision Records (ADR), one file per decision — small, fixed
  format, lives next to the code, easy to read before changing anything;
  requires discipline to keep writing them.
- A single living design document — one place to read, but history of
  changes and the reasoning behind reversals is lost on every edit.

## Decision

Keep ADRs in `docs/adr/`, one file per decision, 40–70 lines each.

File name: a zero-padded sequence number and a present-tense imperative
phrase, lowercase with dashes, e.g. `0002-use-monorepo-with-turborepo.md`.

Template: Nygard (Status, Context, Decision, Consequences) extended with a
Considered Options section from MADR, each option with its pros and cons.
Status is one of: proposed, accepted, superseded by NNNN, rejected,
deprecated, and is followed by the decision date.

An accepted ADR is never edited. If a decision changes, a new ADR is written
and the old one is marked superseded with a link to the new one.

Agents must read `docs/adr/` before changing architecture, package structure,
data schema or API, and must propose a draft ADR before introducing a new
architectural decision.

## Consequences

- Easier: onboarding of agents and future self, reviewing why something is
  the way it is, spotting a task that contradicts an accepted decision.
- Harder: every significant decision costs a short document; the list of
  ADRs must be scanned before architectural changes.
- Decisions expected next: monorepo tooling, stack, storage, testing approach.
