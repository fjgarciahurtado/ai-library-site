---
title: "Wait for pull request events with GitHub CLI"
url: https://github.blog/changelog/2026-11-18-wait-for-pull-request-events-with-github-cli
archived:
type: release
author: GitHub
date_published: 2026-11-18
date_added: 2026-11-19
tags: [cli, coding-agents, agents]
topics: [tooling/coding-agents]
---

## Summary

GitHub CLI v2.105.0 adds `gh event listen`, which subscribes to GitHub Event Streams
for a pull request and blocks until something happens, instead of polling in a loop.
GitHub pitches it for scripts and coding agents that open a PR and then wait for a
review or CI. Both the commands and Event Streams are in preview.

## Key points

- **Install:** upgrade to `gh` 2.105.0 or later. Event Streams is a preview on
  GitHub.com; join the waitlist at gh.io/event-streams-signup. See `gh event --help`.
- **Use:** `gh event listen <PR URL>` with the events to watch: submitted reviews, PR
  state and head changes, merge conflicts, and completed check suites. It prints each
  event as one line of JSON and by default exits after the first one, which suits agent
  loops.
- **Flags:** `--count` (wait for several events), `--follow` (keep listening),
  `--timeout`, and `--jq` / `--template` to extract fields.
- **Subscriptions:** `gh event subscription create|list|view|delete`.
- `gh pr create`, `gh pr view`, `gh run view`, `gh run watch`, and `gh api` now suggest
  `gh event listen` instead of polling.
- The post does not show full syntax for choosing event types; check the manual before
  scripting it.

## Why it matters

A coding agent can open a PR, run one command, and resume when the review or CI result
arrives, without burning turns and tokens on `sleep` and polling loops. Worth adding to
a skill or `CLAUDE.md` once you have Event Streams access.
