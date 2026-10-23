---
title: "Cost and caching"
tags: [cost, caching, tokens]
related: [fundamentals/tokens-and-context, models/claude, fundamentals/reasoning-models]
last_reviewed: 2026-10-23
---

## Overview

LLM costs are driven by tokens: input, output (including thinking), and cached input.
Most savings come from not reprocessing the same context, choosing the right effort and
model for each task, and batching work that is not urgent.

## Key concepts

- **Price per million tokens:** input and output priced separately; output costs more.
- **Prompt caching:** stable prefixes (tools, system prompt, documents, history) are
  reused at a much lower read price. Requires an exact prefix match.
- **Batch processing:** asynchronous jobs at about 50% off.
- **Effort:** lower effort means fewer thinking tokens and tool calls.
- **Model tier:** smaller models cost less, but may need more retries.
- **Cost per completed task:** the real metric. A cheaper request that fails is not cheaper.
- **Context hygiene:** trimming large tool results and stale history reduces every later request.

## How to use it

Free wins first, then trade-offs:

1. Turn on prompt caching; keep timestamps and per-request data out of the cached prefix.
2. Batch non-urgent work.
3. Trim tool outputs and drop stale context.
4. Lower effort where quality holds (chat, classification, subagents).
5. Only then consider cheaper models or multi-model cascades, and measure them with
   [evals](evals.md).

Other levers:

- **Time-of-day pricing:** some providers charge less outside peak hours. DeepSeek's
  off-peak rates are half its peak rates, so scheduling flexible work matters.
- **Long-context surcharges and introductory prices:** check where price tiers change.
  OpenAI charges more above 272K input tokens, Google's Gemini 4 Argon prices double
  after 2026-11-30, and Gemini 3.8 Flash prices double on 2027-01-01. Google's Pro models also charge more above 200K input tokens.
  Claude Haiku 5.5 costs 5x more above 100K prompt tokens, while other current Claude
  models charge one rate across their 1M window.
- **Cache read discounts differ by model:** most providers charge about 10% of input for
  cache reads, but Claude Opus 5.5 and Sonnet 5.5 charge 5% and Fable 5.1 2.5% (as of
  2026-10-08). The deeper the discount, the more a stable prefix is worth. Not every
  model offers explicit caching: Gemini 4 Argon supports only implicit (automatic)
  caching (as of 2026-10-15).
- **Cache lifetime matters for idle sessions:** once a cache expires, the next request
  pays full input price for the whole context. Claude Code (2.1.299, 2026-10-14) compacts
  conversations over 200K tokens after about 54 idle minutes, just before the one-hour
  cache expires, trading one compaction for a full uncached re-read. Since 2.1.300 it
  reports 5-minute and 1-hour cache writes separately in OpenTelemetry, which helps
  check whether caching is working.
- **Longer cache lifetimes cost more to write:** Claude offers 5-minute and 1-hour
  caches. Since 2026-10-20 OpenAI's Responses API offers a 12-hour cache
  (`prompt_cache_options.ttl: "12h"`, GPT-5.6 and later). A 12-hour write costs 2.5x
  input, compared with 1.25x for the 30-minute default, and reads cost the same (0.1x, or
  0.05x on GPT-6.1 Sol). It pays off once a prefix is reused about twice across a long
  gap, such as a daily job or an agent idle overnight.
- **Classification-only endpoints:** for routing and yes/no checks, OpenAI's Decisions API
  charges only for input ($0.10 per 1M tokens on `gpt-6-luna`, as of 2026-10-07) and
  returns probabilities instead of generated text. Since GA (2026-10-22), shared input is
  cached across requests and one request can ask up to 400 questions. Ollama's d3 models
  (2B–27B, 2026-10-23) do the same job locally at no per-token cost.
- **Watch the cache state:** the Ribbon plugin for Claude Code shows whether the prompt
  cache is warm or cold and estimates the cost of the next message, so you can send
  follow-ups before the cache expires.
- **Paying for speed:** the same model can be bought at higher speed for a higher price.
  Claude Opus 5.5 fast mode costs 2x (generally available since 2026-10-15). OpenAI's
  Fast tier costs 2x, and its `ultrafast` tier on GPT-6 Astra and GPT-6.1 Sol costs 6x
  Standard (checked 2026-10-21). Use them only where latency matters to users. Falling back from Claude fast mode to standard speed misses
  the prompt cache, because the two speeds do not share cached prefixes.
- **Subscription-included API credits:** Claude Max and Team plans include monthly
  Claude API credits ($100 to $500, as of 2026-10-20). They expire each billing cycle and
  do not cover Claude Code, so they suit small Agent SDK or Managed Agents workloads.
  Give each project its own workspace with a spend limit, because all keys share the
  balance.

## Reference prices

Per 1M tokens, input / cached input (cache read) / output, standard paid tier. Checked
on the date shown; prices change often, so recheck before relying on them.

| Model | Price | Notes | Checked |
|---|---|---|---|
| Claude Fable 5.1 | $10 / $0.25 / $50 | | 2026-10-08 |
| Claude Opus 5.5 | $4 / $0.20 / $20 | Fast mode $8 / $40 (GA since 2026-10-15) | 2026-10-20 |
| Claude Sonnet 5.5 | $2 / $0.10 / $10 | Cache reads cut from $0.20, around 2026-10-07 per Simon Willison (the docs give no date) | 2026-10-08 |
| Claude Haiku 5.5 | $0.10 / $0.01 / $0.50 | Prompts ≤100K; 5x above. Batch halves both tiers | 2026-10-08 |
| GPT-6 Astra | $10 / $1.00 / $50 | Above 272K input: input 2x, output 1.5x (all GPT-6). Fast $20 / $2 / $100; Ultrafast $60 / $6 / $300; Batch and Flex $5 / $0.50 / $25 | 2026-10-21 |
| GPT-6.1 Sol | $2 / $0.10 / $10 | Fast $4 / $0.20 / $20; Ultrafast $12 / $0.60 / $60; Batch and Flex $1 / $0.05 / $5 | 2026-10-21 |
| GPT-6 Luna | $0.10 / $0.01 / $0.50 | Decisions API: $0.10 input only | 2026-10-07 |
| Gemini 4 Argon | $2 / $0.10 / $10 | Introductory; $4 / $20 after 2026-11-30 (same as Opus 5.5). Cached price applies to implicit cache hits only. 1M shared input-output limit | 2026-10-15 |
| Gemini 3.1 Pro Preview | $2.00 / $0.20 / $12.00 | Above 200K: $4.00 / $0.40 / $18.00 | 2026-10-07 |
| Gemini 2.5 Pro | $1.25 / $0.125 / $10.00 | Above 200K: $2.50 / $0.25 / $15.00 | 2026-10-07 |
| Gemini 3.8 Flash | $0.75 / $0.075 / $3.75 | Doubles to $1.50 / $0.15 / $7.50 on 2027-01-01; cache storage $0.50 per 1M per hour (rising to $1.00) | 2026-10-06 |
| Gemini 3.5 Flash | $1.50 / $0.15 / $9.00 | | 2026-10-07 |
| Gemini 2.5 Flash | $0.30 / $0.03 / $2.50 | Audio input costs more | 2026-10-07 |
| Gemini 2.5 Flash-Lite | $0.10 / $0.01 / $0.40 | Audio input costs more | 2026-10-07 |
| DeepSeek `deepseek-flash` (V4.1-Flash) | $0.30 / $0.006 / $1.20 | Peak rate; off-peak is half | 2026-10-05 |
| DeepSeek `deepseek-v4-pro` | $1.32 / $0.044 / $3.96 | Peak rate; off-peak is half | 2026-10-05 |

DeepSeek peak hours are 01:00–04:00 and 06:00–10:00 UTC on weekdays. Haiku 4.5, now
legacy, costs $1 / $5.

## Current state

- **2026-10-22:** The OpenAI Decisions API went GA with prompt-cache discounts on shared
  input and 400 questions per request. Ribbon (new Claude Code plugin) shows cache
  warmth and usage left above the prompt
  (`/plugin install ribbon --marketplace robonuggets/ribbon`).
- **2026-10-21:** Checked OpenAI's Ultrafast prices. They are 6x Standard (3x Fast) for
  both GPT-6 Astra and GPT-6.1 Sol (table above). Sources disagree on access: the current
  guide says Ultrafast is open to all API users, while an older API reference page and
  the Fast mode FAQ still call it access-controlled with an `OpenAI-Service-Tier` header.
- **2026-10-20:** OpenAI added a 12-hour prompt cache lifetime to the Responses API
  (details above).
- **2026-10-15:** Claude Opus 5.5 fast mode became generally available, with default
  rate limits in the Start, Build, and Scale tiers. Its price is unchanged.
- **2026-10-07:** Claude Max and Team plans started including monthly API credits
  (details above).
- **2026-10-13:** Gemini 4 Argon launched at introductory prices equal to GPT-6.1 Sol
  ($2 / $10), doubling after 2026-11-30.
- **2026-10-08:** OpenAI extended the Ultrafast service tier to GPT-6.1 Sol.
- **2026-10-07:** Claude Haiku 5.5 launched with prompt-length pricing (table above).

## Open questions

- Prices for Gemini 3.5 Flash-Lite and 3.6 Flash. Partly answered on 2026-10-07: the
  pricing page lists Pro prices (3.1 Pro Preview, 2.5 Pro) and 2.5 Flash-Lite, but has no
  3.x Flash-Lite price.
- OpenAI Ultrafast prices: answered 2026-10-21 (6x Standard). Still unknown: how much
  faster it is. OpenAI gives no tokens-per-second figure.

## Sources

- [Prompt caching docs](../../sources/2026/10/2026-10-04-claude-prompt-caching-docs.md)
- [Claude models overview](../../sources/2026/10/2026-10-04-claude-models-overview.md)
- [DeepSeek API: models and pricing](../../sources/2026/10/2026-10-05-deepseek-api-pricing.md)
- [OpenAI API models and pricing: GPT-6 family](../../sources/2026/10/2026-10-06-openai-gpt-6-models-and-pricing.md)
- [Gemini 3.8 Flash model page and pricing](../../sources/2026/10/2026-10-06-gemini-3-8-flash-model-page.md)
- [Gemini Developer API pricing](../../sources/2026/10/2026-10-07-gemini-api-pricing.md)
- [OpenAI Decisions API guide](../../sources/2026/10/2026-10-07-openai-decisions-api.md)
- [Claude Haiku 5.5](../../sources/2026/10/2026-10-08-claude-haiku-5-5.md)
- [Claude API pricing](../../sources/2026/10/2026-10-08-claude-api-pricing-docs.md)
- [OpenAI Ultrafast mode guide](../../sources/2026/10/2026-10-09-openai-ultrafast-mode.md)
- [Gemini 4 Argon: Built to solve your hardest problems](../../sources/2026/10/2026-10-14-gemini-4-argon-public-launch.md)
- [Gemini 4 Argon model page](../../sources/2026/10/2026-10-15-gemini-4-argon-model-page.md)
- [Claude Code releases 2.1.299 and 2.1.300](../../sources/2026/10/2026-10-15-claude-code-2-1-299-300.md)
- [Fast mode (Claude API docs)](../../sources/2026/10/2026-10-20-claude-opus-5-5-fast-mode-ga.md)
- [API credits for Max and Team plans](../../sources/2026/10/2026-10-20-claude-api-credits-max-team.md)
- [OpenAI Decisions API generally available](../../sources/2026/10/2026-10-23-openai-decisions-api-ga.md)
- [Ribbon](../../sources/2026/10/2026-10-23-ribbon-claude-code-usage-band.md)
- [Prompt caching: 12-hour lifetime (OpenAI API docs)](../../sources/2026/10/2026-10-21-openai-12-hour-prompt-caching.md)
