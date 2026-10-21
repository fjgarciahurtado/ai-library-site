---
title: "Prompt caching: 12-hour lifetime (OpenAI API docs)"
url: https://developers.openai.com/api/docs/guides/prompt-caching
archived:
type: docs
author: OpenAI
date_published: 2026-10-20
date_added: 2026-10-21
tags: [openai, caching, cost]
topics: [practices/cost-and-caching, models/gpt]
---

## Summary

On 2026-10-20 OpenAI added a 12-hour prompt cache lifetime to the Responses API,
according to its API changelog. Setting `prompt_cache_options.ttl` to `"12h"` keeps a
cached prefix for at least 12 hours instead of the default 30 minutes. Cache writes cost
more, and cache reads cost the same.

## Key points

- **Enable it:** set `prompt_cache_options: {ttl: "12h"}` on a Responses API request.
  The default is `"30m"`. You can override the lifetime per breakpoint with
  `prompt_cache_breakpoint.ttl`. Other values return `400 invalid_request_error`.
- **Models:** GPT-5.6 and later, Responses API only.
- **Prices (as of 2026-10-21):** a 12-hour write costs 2.5x the uncached input rate,
  compared with 1.25x for 30 minutes. These are total rates, not surcharges. Reads cost
  0.1x input on most models and 0.05x on GPT-6.1 Sol, whatever the lifetime.
- Upgrading cached tokens from 30 minutes to 12 hours bills a new 12-hour write, with no
  credit for the earlier write. A 30-minute read on a 12-hour entry does not restart the
  12-hour clock.
- The minimum cacheable prefix is 1,024 visible input tokens.
- OpenAI suggests `"12h"` for stable instructions or reference material reused across
  long gaps, and `"30m"` for context reused frequently.

## Why it matters

Workloads with long idle gaps, such as daily batch jobs, sporadic agents, or support
bots with quiet hours, can now keep a large prefix warm across a working day. The cache
pays for itself after about two reads at 2.5x write cost and 0.1x read cost, compared
with resending uncached. Anthropic's longest cache lifetime is 1 hour.
