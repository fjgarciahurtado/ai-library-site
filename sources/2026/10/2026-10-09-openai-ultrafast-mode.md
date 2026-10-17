---
title: "OpenAI Ultrafast mode guide (GPT-6.1 Sol support)"
url: https://developers.openai.com/api/docs/guides/ultrafast-mode
archived:
type: docs
author: OpenAI
date_published: 2026-10-08
date_added: 2026-10-09
tags: [openai, deployment, cost]
topics: [models/gpt, practices/cost-and-caching]
---

## Summary

Ultrafast is OpenAI's fastest API service tier, meant for applications where lower
latency between output tokens is worth a higher price. OpenAI's API changelog of
2026-10-08 added GPT-6.1 Sol to it; GPT-6 Astra already had it (since 2026-09-29). The
guide is undated; the publication date here is the changelog entry.

## Key points

- Supported models (as of 2026-10-09): GPT-6 Astra and GPT-6.1 Sol in full, GPT-5.6 Sol
  as a preview.
- Enable per request in the Responses API with `service_tier: "ultrafast"` and model
  `gpt-6-astra` or `gpt-6.1-sol`.
- Separate rate limits from the Standard and Fast tiers; check them before scaling.
- Data residency: GPT-6.1 Sol supports global processing plus US and EU residency;
  GPT-6 Astra only global and US.
- OpenAI "strongly recommend[s] WebSockets, especially for agentic applications" to cut
  network overhead.
- Prices are on a separate Ultrafast pricing table (input, cached input, cache write,
  output); the guide gives no speed figures.

## Why it matters

Output speed is becoming a priced option on the same model, like Anthropic's fast mode
for Opus. For interactive agents, latency can now be bought rather than obtained only by
switching to a smaller model.
