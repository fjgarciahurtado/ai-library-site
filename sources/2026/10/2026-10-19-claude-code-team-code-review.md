---
title: "How the Claude Code team does code review"
url: https://claude.dev/blog/solving-code-review-at-anthropic
archived:
type: article
author: Addy Osmani, Morgan Westlee Lunt, Qing Wang (Anthropic)
date_published: 2026-10-15
date_added: 2026-10-19
tags: [anthropic, coding-agents, multi-agent, evals]
topics: [tooling/coding-agents, agents/agent-patterns]
---

## Summary

The Claude Code team writes about 90% of its code with Claude, so it set out to use the
least human review time that does not raise revert or incident rates. Review is mostly
automated: self-checks before the PR, a multi-agent AI reviewer and a security pass on
every PR, then human approval scaled to risk. From June to September 2026 merged PRs more
than doubled, while the share reverted fell by over 40%.

## Key points

- Before the PR, Claude runs tests, builds, and linters and shows the output; a subagent
  reviews the diff in fresh context. A `REVIEW.md` written by code owners says what
  failure looks like, caps nits, and requires file-and-line evidence.
- The AI reviewer runs several bug-hunting agents in parallel; a separate group votes on
  each finding, and only confirmed findings are posted (Important, Nit, Pre-existing).
  Substantive comments on internal PRs rose from 16% to 54%.
- Human approvals by risk tier, set by a classifier from the change, not the author: low
  risk (docs, flagged additive changes) needs none, ordinary changes need one person, the
  riskiest paths need two. An agent's approval never counts as a human's; the person who
  prompted the agent counts as a required reviewer.
- Past incident- and revert-causing PRs form a daily eval set for any change to the
  reviewer's prompts, tools, or model.
- Review must converge: about 59% of repeated findings were old code. A three-round cap,
  diff-only re-review, and no repeat findings raised first-round passes from 65% to 78%
  and cut PRs needing five or more rounds from 8.9% to 1.5%.
- Humans keep decisions on direction, risky code (billing, auto-updater, CI), copied
  architecture, and own every shipped change.

## Why it matters

It is the first detailed account in the library of reviewing agent-written code at scale
with outcome data (revert rates), not just volume. All figures are Anthropic's own and
cover its internal repositories.
