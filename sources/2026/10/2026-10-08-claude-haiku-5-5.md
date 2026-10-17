---
title: "Claude Haiku 5.5"
url: https://www.anthropic.com/claude-haiku-5-5
archived:
type: release
author: Anthropic
date_published: 2026-10-07
date_added: 2026-10-08
tags: [anthropic, llm, cost, reasoning, computer-use]
topics: [models/claude, practices/cost-and-caching]
---

## Summary

Anthropic released Claude Haiku 5.5 on 2026-10-07, completing the Claude 5.5 family that
Opus 5.5 (2026-09-22) and Sonnet 5.5 (2026-09-28) started. It is the smallest and fastest
model in the lineup, aimed at high-volume, cost-sensitive work such as classification,
extraction, and routing. It is the first Haiku with an adjustable effort setting, and its
price depends on prompt length: prompts over 100,000 tokens cost five times as much.

## Key points

- API ID `claude-haiku-5-5`; on the Claude API, Claude Platform on AWS, Amazon Bedrock,
  Google Cloud, and Microsoft Foundry.
- Prices per 1M tokens (as of 2026-10-08): $0.10 input / $0.50 output for prompts up to
  100K tokens; $0.50 / $2.50 above that. Cache reads $0.01 (≤100K) or $0.05 (>100K).
  Haiku 4.5 costs $1 / $5, so short prompts are 10x cheaper than on the previous Haiku.
- 1M-token context window, 128K max output, reliable knowledge cutoff June 2026
  (models overview, checked 2026-10-08). Retirement not before 2027-10-07.
- Adaptive thinking with effort levels `low` to `max`; default effort `medium`.
- Uses the newer tokenizer of the Claude 4.7+ generation. Simon Willison measured about
  1.25x more tokens than Haiku 4.5 for the same text.
- Supports computer use and browser use.
- Anthropic's reported scores: OSWorld 2.1 (offline subset) 72.4%, GDPval-AA v2.1 1,620
  Elo, Humanity's Last Exam 45.9% (no tools) / 57.4% (with tools), Terminal-Bench 4.0
  39.2%, FrontierCode 1.1 46.4%. The page as fetched also lists Chartography at 46.4%;
  the identical figure may be a page or extraction error.
- Claude Code 2.1.293 made Haiku 5.5 its default Haiku model.

## Why it matters

Haiku 5.5 brings the 1M context window, effort control, and computer use of the larger
5.5 models down to a price below most small models. The tiered price is new for Claude:
until now Claude 4.6+ models charged the same rate across the whole 1M window. Cost
estimates for long-document work on Haiku 5.5 must account for the higher tier.
