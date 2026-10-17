---
title: "Gemini Developer API pricing"
url: https://ai.google.dev/gemini-api/docs/pricing
archived:
type: docs
author: Google
date_published: 2026-10-07
date_added: 2026-10-07
tags: [google, cost, caching]
topics: [practices/cost-and-caching, models/gemini]
---

## Summary

Google's Gemini API pricing page, last updated 2026-10-07, lists paid-tier prices for the
current Gemini text models. The newest Pro model on the page is Gemini 3.1 Pro Preview.
The only Flash-Lite model with a price listed is Gemini 2.5 Flash-Lite. All prices below
are standard paid-tier rates per 1M tokens, as of 2026-10-07.

## Key points

| Model | Input | Output | Cached input |
|---|---|---|---|
| `gemini-3.8-flash` | $0.75 ($1.50 from 2027) | $3.75 ($7.50) | $0.075 ($0.15) |
| `gemini-3.7-flash` | $0.75 ($1.50 from 2027) | $3.75 ($7.50) | $0.075 ($0.15) |
| `gemini-3.5-flash` | $1.50 | $9.00 | $0.15 |
| `gemini-3.1-pro-preview` | $2.00 (>200K: $4.00) | $12.00 (>200K: $18.00) | $0.20 (>200K: $0.40) |
| `gemini-2.5-pro` | $1.25 (>200K: $2.50) | $10.00 (>200K: $15.00) | $0.125 (>200K: $0.25) |
| `gemini-2.5-flash` | $0.30 (audio $1.00) | $2.50 | $0.03 (audio $0.10) |
| `gemini-2.5-flash-lite` | $0.10 (audio $0.30) | $0.40 | $0.01 (audio $0.03) |

- Pro models charge more when the prompt exceeds 200K tokens.
- Gemini 3.8 and 3.7 Flash have introductory prices that double on 2027-01-01.
- The page had no prices for Gemini 3.5 Flash-Lite or 3.6 Flash, both released on
  2026-07-21.

## Why it matters

This adds Google's Pro and Flash-Lite prices to the library's cost comparison. Gemini
3.1 Pro Preview ($2 / $12) costs about the same as GPT-6.1 Sol ($2 / $10) and Claude
Sonnet 5.5 ($2 / $10). Gemini 3.8 Flash is cheaper than the older 3.5 Flash.
