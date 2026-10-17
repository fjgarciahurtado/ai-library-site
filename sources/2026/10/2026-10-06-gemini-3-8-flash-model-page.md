---
title: "Gemini 3.8 Flash model page and pricing"
url: https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash
archived:
type: docs
author: Google
date_published: 2026-09
date_added: 2026-10-06
tags: [google, llm, cost, tokens, multimodal]
topics: [models/gemini, practices/cost-and-caching, fundamentals/tokens-and-context]
---

## Summary

Google's model page for `gemini-3.8-flash` and the Gemini API pricing page
(https://ai.google.dev/gemini-api/docs/pricing), read on 2026-10-06. The model takes
1M tokens of multimodal input and returns text. Prices are introductory until the end
of 2026 and double on 2027-01-01.

## Key points

- Input limit 1,048,576 tokens, output limit 65,536 tokens.
- Inputs: text, image, video, audio, PDF. Output: text only. No Live API, image, or
  audio generation.
- Supports caching, code execution, computer use (preview), file search, function
  calling, structured outputs, search grounding, URL context, and thinking levels
  (low, medium, high).
- Paid-tier standard prices per 1M tokens through 2026-12-31: $0.75 input, $3.75 output
  (including thinking), $0.075 cached input, $0.50 per 1M tokens per hour of cache storage.
- From 2027-01-01: $1.50 input, $7.50 output, $0.15 cached input, $1.00 storage.
- Google Search grounding: 5,000 free requests a month shared across Gemini 3.x models,
  then $14 per 1,000.

## Why it matters

Gives dated specifications and prices for Google's current GA workhorse model. The
scheduled price doubling affects cost planning for 2027.
