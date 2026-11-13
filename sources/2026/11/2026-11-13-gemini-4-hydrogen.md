---
title: "Introducing Gemini 4 Hydrogen"
url: https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/
archived:
type: article
author: Google DeepMind (Koray Kavukcuoglu)
date_published: 2026-11-12
date_added: 2026-11-13
tags: [google, llm, reasoning, cost, coding-agents]
topics: [models/gemini, practices/cost-and-caching]
---

## Summary

Gemini 4 Hydrogen (`gemini-4-hydrogen`, GA 2026-11-12) is the cheapest and fastest member
of the Gemini 4 family, built for fast execution rather than long deep reasoning. It costs
$1.50 / $7.50 per million input/output tokens, has a 1M-token context window, and adds an
`xhigh` thinking level. Google positions it as the upgrade from Gemini 3.8 Flash and as a
worker model alongside Carbon. Facts below come from the announcement and the Gemini API
changelog (2026-11-12); benchmarks are Google's own.

## Key points

- **Price (2026-11-12):** $1.50 input, $0.075 cached input, $7.50 output per 1M tokens,
  flat across the context window; also on the free tier. Carbon and Argon cost $2 / $10
  until 2026-11-30 and $4 / $20 from 2026-12-01.
- **Limits:** 1M input tokens, up to 1M output tokens (per the announcement).
- **Thinking levels:** `low`, `medium`, `high` (default), and new `xhigh`.
- **Availability:** Gemini API (AI Studio), Android Studio, Antigravity (paid AI Pro and
  Ultra), Gemini for business, Gemini app, Google Search, and Gemini in Sheets. It is the
  default model of the Antigravity agent in Gemini Managed Agents. The announcement does
  not mention Vertex AI.
- **Benchmarks (Google):** Artificial Analysis Intelligence Index 51 at `high` (Argon 50),
  54 at `xhigh`; Terminal-Bench 4.1 57% versus 18.2% for 3.8 Flash; fabricated claims down
  more than 5x and tasks about 2.5x faster than 3.8 Flash.
- **Pairing with Carbon:** in Antigravity's Orchestrator, switching between Carbon and
  Hydrogen reached near-Carbon success on Terminal-Bench 4.0 with about 24% less quota and
  19% less time; Carbon can coordinate parallel agents with Hydrogen as worker or verifier.
- Migration notes from 3.8 Flash are on the "What's new in Gemini 4 Hydrogen" docs page.

## Why it matters

It answers the open question of when a smaller Gemini 4 model would arrive and gives a
cheap Gemini 4-generation option for agent workers and high-volume tasks, which will be
about 75% cheaper than Argon after the 2026-12-01 price rise.
