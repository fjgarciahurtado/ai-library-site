---
title: "Gemini 4 Argon: Built to solve your hardest problems"
url: https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/
archived: http://web.archive.org/web/20261013160825/https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/
type: article
author: Koray Kavukcuoglu (Google DeepMind)
date_published: 2026-10-13
date_added: 2026-10-14
tags: [google, llm, reasoning, cost, robotics]
topics: [models/gemini, practices/cost-and-caching]
---

## Summary

Google's announcement of the public release of Gemini 4 Argon on 2026-10-13, two weeks
after it was first given only to cybersecurity partners. The model is now on the paid
Gemini API tier as `gemini-4-argon`, in the Gemini app for Pro and Ultra subscribers, and
in Google Antigravity, at introductory prices that double after 2026-11-30.

## Key points

- Availability: Gemini API paid tier (AI Studio, Android Studio), Gemini for business,
  Antigravity (Ultra subscribers), Gemini app and AI Mode in Search (Pro and Ultra).
- Context: 1M tokens, a unified limit shared by input and output on the Gemini API.
- Price per 1M tokens: $2 input / $10 output until 2026-11-30, then $4 / $20; cached
  input is 95% off.
- Google claims #1 on the Vals Index, 87% on ERQA (embodied reasoning), 57% on RareBench
  and 52.2% on LabBench (the last two from private evaluations).
- Built for long autonomous work, with a new "continuation protocol" for long decodes;
  Google says it hedges less and follows style instructions more closely.
- Internal results: over 35% more agentic code submissions and nearly a third fewer
  rollbacks inside Google; a 2.85x vLLM inference speedup for Gemma 4 E2B on an A100.
- 10,000 scientists can apply for 6 months of free top-tier Antigravity access; the
  Fairwind Program for cyber defenders (no cyber guardrails) is expanding.

## Why it matters

Google's top model is now publicly available, at a launch price equal to GPT-6 Sol and
below Claude Opus 5.5. The doubling after 2026-11-30 makes the introductory price a
temporary comparison point.
