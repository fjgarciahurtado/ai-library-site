---
title: "Gemini 4 Neon (Gemini API changelog and What's new guide)"
url: https://aistudio.google.com/docs/whats-new-gemini-4-neon
archived:
type: docs
author: Google
date_published: 2026-11-18
date_added: 2026-11-19
tags: [google, llm, reasoning, multimodal, cost]
topics: [models/gemini, practices/cost-and-caching]
---

## Summary

Google made Gemini 4 Neon (`gemini-4-neon`) generally available on the paid Gemini API
tier on 2026-11-18. It sits between Hydrogen and Carbon, for frequent but complex work
in software engineering, knowledge work, and science. The same changelog entry lets the
API take Office and OpenDocument files directly and slice documents, spreadsheets,
video, and audio so you pay only for the part you need. No Google blog post was found;
this note uses the changelog and the "What's new in Gemini 4 Neon" guide.

## Key points

- **Price (2026-11-18):** $3 / $15 per 1M input / output tokens, flat across 1M context;
  implicit-cache hits $0.15. Explicit caching is not supported. No free tier.
- **Limits:** 1,048,576-token context shared by input, thinking, and output; 65,536
  output tokens per synchronous request; long decode up to the full context through
  background mode or client-side continuation.
- **Thinking:** `low`, `medium`, `high` (default), `xhigh`. `minimal` is rejected.
  Carbon and Argon default to `medium`, so the same prompt may cost more on Neon.
- **Tools:** function calling, structured outputs, Search grounding (billed per query),
  Interactions API and `generateContent`, and the Antigravity agent in Gemini Managed
  Agents. The guide lists no computer use or code execution.
- **Positioning (Google):** Carbon for the hardest problems; Hydrogen stays the default
  for everyday coding and agent work; 3.5 Flash-Lite for high volume. No benchmark
  figures are given.
- **Migration:** from other Gemini 4 models, change the model ID. From 3.8 Flash or
  older: remove sampling parameters (out-of-range values return 400), `cached_content`,
  and low `max_output_tokens` caps; declare tools natively; raise client timeouts to
  15 minutes. The `gemini-api-dev` coding-agent skill can do the upgrade.
- **Availability:** Gemini API paid tier, AI Studio on Pro and Ultra plans; also in
  GitHub Copilot (Pro+, Max, Business, Enterprise) at provider list prices. Not on
  Gemini Enterprise Agent Platform as of 2026-11-19.
- **File slicing (same day):** pass Word, PowerPoint, Excel, and OpenDocument files;
  select page ranges, worksheet tabs, cell ranges, time intervals, or content layers
  (page images, text, formulas, transcripts) in prompts and function responses.

## Why it matters

Neon fills the gap between cheap Hydrogen and expensive Carbon, but at $3 / $15 it costs
more than Carbon and Argon until their 2026-11-30 price rise. File slicing can cut costs
for long documents and recordings on any Gemini model that supports it.
