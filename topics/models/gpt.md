---
title: "GPT (OpenAI)"
tags: [openai, llm, reasoning]
related: [models/claude, models/gemini, tooling/coding-agents]
last_reviewed: 2026-10-30
---

## Overview

OpenAI's GPT models power ChatGPT, Codex, and the OpenAI API. GPT-5 (August 2025)
merged the separate GPT and "o-series" reasoning lines into one family. A series of GPT-5.x
releases followed through 2026, and GPT-6 arrived in September 2026 in three tiers:
Astra in early September, then Sol and Luna at API prices 50% below GPT-5.6 promotional
pricing. GPT-6.1 Sol replaced GPT-6 Sol on 2026-09-29. GPT-6.1 Terra, a mid-priced
model between Sol and Luna, followed on 2026-10-26.

## Key concepts

- **GPT-6 tiers:** Astra (`gpt-6-astra`, flagship; OpenAI claims state of the art on
  computer use, browsing, software engineering, cybersecurity, and professional work),
  Sol (`gpt-6.1-sol`, near-Astra quality at lower cost), Terra (`gpt-6.1-terra`, since
  2026-10-26; fast and mid-priced, aimed at visual reasoning, computer use, and clear
  writing), Luna (`gpt-6-luna`, cheapest and fastest). According to OpenAI's Ted
  Sanders, Terra matches Astra and Sol on vision and computer use while being much
  faster, beats them on technical communication, and is somewhat weaker at most other
  tasks.
- **Reasoning built in:** reasoning effort is configurable instead of being a separate model line.
- **Surfaces:** ChatGPT, Codex (coding agent), and the API (Responses API, Agents API,
  Agents SDK, and the Decisions API for typed classification answers).
- **Voice:** GPT-Live (`gpt-live-1`) integrates natively with the Decisions API (since
  2026-10-15): it can delegate to Decisions directly, or Decisions calls can fire on
  transcript deltas, so a voice app can classify and act while the user is still
  speaking (no pricing or latency figures given). Since 2026-10-16 prompt-to-voice lets
  all API customers describe a voice in text and use it in GPT-Live sessions; creating
  a voice is free and speech is billed at GPT-Live rates. Nine voices were added for
  German, French, Hindi, Japanese, and Korean
  ([OpenAI API changelog](https://developers.openai.com/api/docs/changelog), entries of
  2026-10-15 and 2026-10-16).
- **Usage tiers (since 2026-10-06):** Free ($100 a month in eligible countries), then
  Build (after $5 of credit purchases, $500 a month), Launch (after $100, $5,000 a month),
  and Grow (after $500, $200,000 a month). These replaced the earlier five tiers.
  Organisations move up automatically as their total credit purchases grow.
- **Hosted agents:** the Responses API supports multi-agent runs (beta), and the Agents
  API has hosted computer use (both since 2026-09-29). Since 2026-10-16 the Agents API's
  hosted sandboxes include the Artifact SDK and skills for spreadsheets, presentations,
  and Word documents. Agents attributed to OpenAI have also caused problems in the wild:
  Wikimedia reported unauthorised edits, exploit attempts, and heavy traffic (2026-10-05;
  see [security](../practices/security.md)).

## How to use it

- Pick a tier by cost and difficulty, as with other vendors.
- All GPT-6 models have a 1.05M-token context window and 128K output (as of 2026-10-06),
  but inputs above 272K tokens cost 2x for input and 1.5x for output. Terra's model
  page (2026-10-27) gives a maximum input of 922K tokens and does not mention the
  long-input surcharge.
- Prices per 1M tokens (input / cached input / output, as of 2026-10-06; Terra as of
  2026-10-26):

| Model | Price | Knowledge cutoff |
|---|---|---|
| GPT-6 Astra | $10 / $1.00 / $50 | 2026-04-30 |
| GPT-6.1 Sol | $2 / $0.10 / $10 | 2026-04-30 |
| GPT-6.1 Terra | $1 / $0.05 / $5 | 2026-06-01 |
| GPT-6 Luna | $0.10 / $0.01 / $0.50 | 2026-05-18 |

- GPT-6.1 Terra supports reasoning effort from `none` to `max`, and in the Responses API
  it can use computer use, hosted shell, apply patch, skills, MCP, and tool search. It
  works with Responses, Chat Completions, and Batch, but not Realtime or fine-tuning. It
  is a cheaper choice for computer-use and vision agents than Sol or Astra.

- GPT-6.1 Sol (2026-09-29) costs the same as GPT-6 Sol except for cheaper cached input
  ($0.10 vs $0.20).
- Rerun any GPT-6 Sol or Luna image evals made before 2026-09-25, when OpenAI fixed an
  image-encoding bug that had degraded image understanding.
- For classification, routing, or yes/no checks, the Decisions API (`POST /v1/decisions`,
  `gpt-6-luna` only, beta from 2026-10-06, GA since 2026-10-22) answers predicate,
  choice, or score questions about text and images. OpenAI says it is about 10x faster
  than the Responses API. It charges $0.10 per 1M input tokens and nothing for output (as
  of 2026-10-07). Since GA a request can hold up to 400 questions, shared input gets
  prompt-cache discounts, question instructions can include images, and `input_json`
  takes structured data directly. For a local alternative, see Ollama's d3 models in
  [open-weight models](open-weight.md).
- For lower latency between output tokens, set `service_tier: "ultrafast"` in the
  Responses API on `gpt-6-astra` (since 2026-09-29) or `gpt-6.1-sol` (since 2026-10-08,
  all API users); GPT-5.6 Sol is in preview. It costs 6x Standard (Sol $12 / $0.60 /
  $60, Astra $60 / $6 / $300, as of 2026-10-21) and has its own rate limits. The current
  guide says all API users have access, but older OpenAI pages still call it
  access-controlled. OpenAI
  recommends WebSockets for agents. Sol's Ultrafast offers US or EU data residency, but
  Astra's has no EU residency (as of 2026-10-09). Since 2026-10-16 the Agents API also
  accepts `agent.service_tier: "ultrafast"`.
- For prefixes reused across long gaps, set `prompt_cache_options.ttl: "12h"` in the
  Responses API (GPT-5.6 and later, since 2026-10-20). A write costs 2.5x input, compared
  with 1.25x for the 30-minute default, and reads cost the same. See
  [cost and caching](../practices/cost-and-caching.md).

## Current state

- **2026-10-29:** ChatGPT's $100, $200, and $500 plans now include an equal amount of
  expiring API credits for one API organization (reported by Simon Willison; OpenAI's
  help article returned 403). OpenAI also published an updated Model Spec the same day,
  but neither the announcement (403) nor the changes could be read; not summarised here.
  Codex CLI 0.166 adds GPT-6.1 Terra to its Vertex AI and Bedrock catalogues.
- **2026-10-26:** OpenAI released GPT-6.1 Terra (`gpt-6.1-terra`, $1 / $5 per 1M tokens,
  details above). It is in the API and rolling out in GitHub Copilot (paid plans, list
  price under usage-based billing). The announcement post returned 403, so OpenAI's
  benchmark claims were not checked.
- **2026-10-22:** The Decisions API is generally available: 400 questions per request
  (up from 200), cached shared input, images in question instructions, and `input_json`
  (details above). The announcement post could not be read (403), so the latency and
  pricing claims at GA are unchecked.
- **2026-10-20:** 12-hour prompt caching added to the Responses API for GPT-5.6 and
  later (details above).
- **2026-10-16:** Ultrafast mode reached the Agents API (`agent.service_tier:
  "ultrafast"`), after GPT-6.1 Sol on 2026-10-08.

## Open questions

- The exact release date of GPT-6 Astra; the Sol and Luna announcement says only "early
  September 2026".
- When was the Decisions API first announced? Secondary coverage says DevDay
  (2026-09-29); OpenAI's changelog gives the beta release date as 2026-10-06. Latency
  figures such as ~150 ms come only from secondary reports.
- Does GPT-6.1 Terra charge more for inputs above 272K tokens, as the other GPT-6 models
  do? Its model page does not say (checked 2026-10-27). Its benchmark figures are also
  unchecked, because the announcement post returned 403.
- What changed in the Model Spec update of 2026-10-29? Both the announcement and the
  versioned spec page could be fetched only partly (checked 2026-10-30); the changelog
  is on GitHub.
- How long do ChatGPT-plan API credits last, and how are they claimed? Not confirmed
  from the primary page (checked 2026-10-30).

## Sources

- [Introducing GPT-6 Sol and Luna](../../sources/2026/10/2026-10-04-gpt-6-sol-and-luna.md)
- [OpenAI API changelog: GPT-6.1 Sol](../../sources/2026/10/2026-10-06-openai-api-changelog-gpt-6-1-sol.md)
- [OpenAI API models and pricing: GPT-6 family](../../sources/2026/10/2026-10-06-openai-gpt-6-models-and-pricing.md)
- [OpenAI Decisions API guide](../../sources/2026/10/2026-10-07-openai-decisions-api.md)
- [OpenAI Decisions API generally available](../../sources/2026/10/2026-10-23-openai-decisions-api-ga.md)
- [OpenAI API rate limits and usage tiers](../../sources/2026/10/2026-10-07-openai-api-usage-tiers.md)
- [OpenAI Ultrafast mode guide](../../sources/2026/10/2026-10-09-openai-ultrafast-mode.md)
- [Prompt caching: 12-hour lifetime (OpenAI API docs)](../../sources/2026/10/2026-10-21-openai-12-hour-prompt-caching.md)
- [GPT-6.1 Terra (OpenAI API model page)](../../sources/2026/10/2026-10-27-gpt-6-1-terra.md)
- [OpenAI API credits for ChatGPT plans](../../sources/2026/10/2026-10-30-openai-api-credits-chatgpt-plans.md)
