---
title: "Effort (Claude API docs): levels and per-model defaults"
url: https://platform.claude.com/docs/en/build-with-claude/effort
archived:
type: docs
author: Anthropic
date_published:
date_added: 2026-11-26
tags: [reasoning, cost, anthropic]
topics: [fundamentals/reasoning-models, models/claude]
---

## Summary

Anthropic's documentation page for the `effort` parameter, which trades reasoning depth
against cost and latency. Read on 2026-11-26 to confirm the default effort of each
current Claude model; the page has no publication date.

## Key points

- Levels: `low`, `medium`, `high`, `xhigh`, `max`; all five current models support all five.
- Defaults on the Claude API (as of 2026-11-26): Fable 5.2 `high` ("The API default is
  `high`."), Sonnet 5.5 `high`, Opus 5.5 `medium`, Haiku 5.5 `medium`.
- "Most Claude models default to high effort"; Opus 5.5 and Haiku 5.5 are the exceptions.
  A request without `effort` runs one level lower on Opus 5.5 than on Opus 5 (`high`).
- Setting effort to the model's default behaves exactly like omitting the parameter.

## Why it matters

Answers an open question in the library (Fable 5.2's default) and shows that the
default differs across the current family, so a request moved between models can change
cost and depth unless `effort` is set explicitly.
