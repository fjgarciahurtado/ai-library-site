---
title: "Claude API pricing"
url: https://platform.claude.com/docs/en/about-claude/pricing
archived:
type: docs
author: Anthropic
date_published: 2026-10-07
date_added: 2026-10-08
tags: [anthropic, cost, caching]
topics: [practices/cost-and-caching, models/claude]
---

## Summary

Anthropic's pricing reference for every Claude model and paid feature, read on
2026-10-08 after the Haiku 5.5 launch. Besides adding Haiku 5.5, it shows cache reads on
Opus 5.5 and Sonnet 5.5 at 5% of the base input price instead of the usual 10%. The page
has no date of its own; `date_published` is the Haiku 5.5 launch day, when it was last
known to change.

## Key points

- Cache read multipliers: 0.1x base input on most models, 0.05x on Opus 5.5 and Sonnet
  5.5 ($0.20 and $0.10 per 1M), 0.025x on Fable 5.1 and Mythos 5.1 ($0.25 per 1M).
  Cache writes stay at 1.25x (5 minutes) and 2x (1 hour).
- Simon Willison reports that the Sonnet 5.5 cache read price was halved alongside the
  Haiku 5.5 launch; the docs do not give the date of the change.
- Haiku 5.5 is the only current model with long-context pricing: over 100K prompt tokens
  everything costs 5x. Other Claude 4.6+ models bill the full 1M window at one rate.
- Sonnet 5's $2 / $10 introductory price is now permanent; the planned rise to $3 / $15
  on 2026-09-01 did not happen.
- Batch API: 50% off input and output. US-only inference (`inference_geo: "us"`): 1.1x.
- Fast mode (research preview, Claude API only): Opus 5.5 at $8 / $40 per 1M.
- Managed Agents: tokens at model rates plus $0.08 per session-hour of running time.
- Web search $10 per 1,000 searches; web fetch has no extra charge; code execution is
  free when used with the 2026-02-09 or later web search or fetch tools.

## Why it matters

Cheaper cache reads on the two main workhorse models make long, cached agent sessions
noticeably cheaper. Haiku 5.5's tiered price breaks the simple "one price for the whole
window" rule that held for recent Claude models.
