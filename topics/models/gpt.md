---
title: "GPT (OpenAI)"
tags: [openai, llm, reasoning]
related: [models/claude, models/gemini, tooling/coding-agents]
last_reviewed: 2026-10-16
---

## Overview

OpenAI's GPT models power ChatGPT, Codex, and the OpenAI API. GPT-5 (August 2025)
merged the separate GPT and "o-series" reasoning lines into one family. A series of GPT-5.x
releases followed through 2026, and GPT-6 arrived in September 2026 in three tiers:
Astra in early September, then Sol and Luna at API prices 50% below GPT-5.6 promotional
pricing. GPT-6.1 Sol replaced GPT-6 Sol on 2026-09-29.

## Key concepts

- **GPT-6 tiers:** Astra (`gpt-6-astra`, flagship; OpenAI claims state of the art on
  computer use, browsing, software engineering, cybersecurity, and professional work),
  Sol (`gpt-6.1-sol`, near-Astra quality at lower cost), Luna (`gpt-6-luna`, cheapest
  and fastest).
- **Reasoning built in:** reasoning effort is configurable instead of being a separate model line.
- **Surfaces:** ChatGPT, Codex (coding agent), and the API (Responses API, Agents API,
  Agents SDK, and the Decisions API for typed classification answers).
- **Usage tiers (since 2026-10-06):** Free ($100 a month in eligible countries), then
  Build (after $5 of credit purchases, $500 a month), Launch (after $100, $5,000 a month),
  and Grow (after $500, $200,000 a month). These replaced the earlier five tiers.
  Organisations move up automatically as their total credit purchases grow.
- **Hosted agents:** the Responses API supports multi-agent runs (beta), and the Agents
  API has hosted computer use (both since 2026-09-29).

## How to use it

- Pick a tier by cost and difficulty, as with other vendors.
- All GPT-6 models have a 1.05M-token context window and 128K output (as of 2026-10-06),
  but inputs above 272K tokens cost 2x for input and 1.5x for output.
- Prices per 1M tokens (input / cached input / output, as of 2026-10-06):

| Model | Price | Knowledge cutoff |
|---|---|---|
| GPT-6 Astra | $10 / $1.00 / $50 | 2026-04-30 |
| GPT-6.1 Sol | $2 / $0.10 / $10 | 2026-04-30 |
| GPT-6 Luna | $0.10 / $0.01 / $0.50 | 2026-05-18 |

- For classification, routing, or yes/no checks, the Decisions API (`POST /v1/decisions`,
  `gpt-6-luna` only, beta since 2026-10-06) answers predicate, choice, or score questions
  about text and inline images. OpenAI says it is about 10x faster than the Responses
  API. It charges $0.10 per 1M input tokens and nothing for output (as of 2026-10-07).
- For lower latency between output tokens, set `service_tier: "ultrafast"` in the
  Responses API on `gpt-6-astra` or `gpt-6.1-sol` (GPT-5.6 Sol in preview). It costs more
  and has its own rate limits; OpenAI recommends WebSockets for agents. Astra's Ultrafast
  has no EU data residency (as of 2026-10-09).

## Current state

- **2026-10-15:** GPT-Live (`gpt-live-1`) now integrates natively with the Decisions
  API: it can delegate to Decisions directly, or Decisions calls can fire on transcript
  deltas, so a voice app can classify and act while the user is still speaking
  ([OpenAI API changelog](https://developers.openai.com/api/docs/changelog), entry of
  2026-10-15; no pricing or latency figures given).
- **2026-10-08:** Ultrafast mode added for GPT-6.1 Sol in the Responses API, for all API
  users, with global processing and US or EU data residency.
- **2026-10-06:** Decisions API released in beta (details above).
- **2026-10-06:** API usage tiers cut from five to three (Build, Launch, Grow).
- **2026-10-05:** Wikimedia reported unauthorised edits, exploit attempts, and heavy
  traffic from agents it attributes to OpenAI (see [security](../practices/security.md)).
- **2026-09-29:** GPT-6.1 Sol released (confirmed by OpenAI's API changelog), with cheaper
  cached input than GPT-6 Sol ($0.10 vs $0.20). GPT-6 Astra gained the `ultrafast`
  service tier the same day.
- **2026-09-25:** OpenAI fixed an image-encoding bug that had degraded image understanding
  in GPT-6 Sol and Luna; rerun image evals made before the fix.

## Open questions

- The exact release date of GPT-6 Astra; the Sol and Luna announcement says only "early
  September 2026".
- When was the Decisions API first announced? Secondary coverage says DevDay
  (2026-09-29); OpenAI's changelog gives the beta release date as 2026-10-06. Latency
  figures such as ~150 ms come only from secondary reports.

## Sources

- [Introducing GPT-6 Sol and Luna](../../sources/2026/10/2026-10-04-gpt-6-sol-and-luna.md)
- [OpenAI API changelog: GPT-6.1 Sol](../../sources/2026/10/2026-10-06-openai-api-changelog-gpt-6-1-sol.md)
- [OpenAI API models and pricing: GPT-6 family](../../sources/2026/10/2026-10-06-openai-gpt-6-models-and-pricing.md)
- [OpenAI Decisions API guide](../../sources/2026/10/2026-10-07-openai-decisions-api.md)
- [OpenAI API rate limits and usage tiers](../../sources/2026/10/2026-10-07-openai-api-usage-tiers.md)
- [OpenAI Ultrafast mode guide](../../sources/2026/10/2026-10-09-openai-ultrafast-mode.md)
