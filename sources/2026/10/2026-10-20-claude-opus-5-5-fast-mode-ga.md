---
title: "Fast mode (Claude API docs): generally available on Opus 5.5"
url: https://platform.claude.com/docs/en/build-with-claude/fast-mode
archived:
type: docs
author: Anthropic
date_published: 2026-10-15
date_added: 2026-10-20
tags: [anthropic, deployment, cost]
topics: [models/claude, practices/cost-and-caching]
---

## Summary

On 2026-10-15 Anthropic took fast mode out of research preview for Claude Opus 5.5:
no beta header or access request is needed, and the Start, Build, and Scale tiers get a
default fast mode rate limit. Fast mode runs the same model with a faster inference setup
for up to 2.5x higher output tokens per second, at double the price. The same release
notes added a `between_tools` thinking capability flag to the Models API.

## Key points

- Enable it per request with `speed: "fast"` on `claude-opus-5-5`. The response's
  `usage.speed` says whether `fast` or `standard` was used.
- Price (checked 2026-10-20): Opus 5.5 $8 / $40 per 1M input / output tokens; Opus 5 and
  Opus 4.8 $10 / $50. Caching and data-residency multipliers stack on top.
- Opus 5 and Opus 4.8 stay in research preview and still need the
  `fast-mode-2026-02-01` beta header (requests without it return 400). Sending the header
  to Opus 5.5 still works.
- Fast mode has its own rate limit with `anthropic-fast-*` response headers. A 429 means
  waiting (SDKs retry twice) or falling back to standard speed, which misses the prompt
  cache because speeds do not share cached prefixes.
- Available on the Claude API (including Managed Agents) and, for Opus 5.5, on Microsoft
  Foundry deployments hosted on Azure. Not available with the Batch API or a Priority
  Tier commitment.
- The speed-up is in output tokens per second, not time to first token.
- Same release notes: `GET /v1/models` now reports
  `capabilities.thinking.types.between_tools`, so code can check which models accept
  `thinking: {type: "between_tools"}`.

## Why it matters

Fast mode on Opus 5.5 is now a normal, self-serve option for latency-sensitive work such
as interactive coding agents. The cache miss on fallback means a fast-to-standard
fallback costs more than it looks.
