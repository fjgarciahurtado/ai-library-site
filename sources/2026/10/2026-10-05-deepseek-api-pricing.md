---
title: "DeepSeek API: models and pricing"
url: https://api-docs.deepseek.com/quick_start/pricing
archived:
type: docs
author: DeepSeek
date_published: 2026-09-10
date_added: 2026-10-05
tags: [other-provider, cost, caching]
topics: [models/open-weight, practices/cost-and-caching]
---

## Summary

DeepSeek's official price and limits page, checked on 2026-10-05. It lists two API
models, both with 1M-token context and 384K maximum output, and peak and off-peak rates
that differ by time of day. The publication date given is the last price change
(2026-09-10).

## Key points

- `deepseek-flash` (DeepSeek-V4.1-Flash), per 1M tokens, off-peak / peak: cache-hit
  input $0.003 / $0.006, cache-miss input $0.15 / $0.30, output $0.60 / $1.20. Supports
  vision. Concurrency limit 2,500.
- `deepseek-v4-pro` (DeepSeek-V4-Pro-0813): cache-hit input $0.022 / $0.044, cache-miss
  input $0.66 / $1.32, output $1.98 / $3.96. Text only. Concurrency limit 500.
- Off-peak rates are half the peak rates. Peak hours are 01:00–04:00 and 06:00–10:00 UTC,
  Monday to Friday, excluding Chinese public holidays.
- Both models support thinking mode, JSON output, tool calls, and an Anthropic-compatible
  API.

## Why it matters

Cached input at fractions of a cent per million tokens, plus time-of-day pricing, shows
that cache-aware and schedule-aware use now has a large effect on cost.
