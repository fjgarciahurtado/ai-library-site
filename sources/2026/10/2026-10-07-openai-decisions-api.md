---
title: "OpenAI Decisions API guide"
url: https://developers.openai.com/api/docs/guides/decisions
archived:
type: docs
author: OpenAI
date_published: 2026-10-06
date_added: 2026-10-07
tags: [openai, structured-output, cost, multimodal]
topics: [models/gpt, practices/cost-and-caching]
---

## Summary

OpenAI released the Decisions API in public beta on 2026-10-06 (per the API changelog).
It is a separate endpoint, `POST /v1/decisions`, that returns typed answers to questions
about text or images instead of generating free text. OpenAI says it is about 10x faster
than the Responses API. It runs only on `gpt-6-luna`.

## Key points

- A request has a model, an input (text, or a user message with text and inline base64
  images), and a list of questions.
- Three question types: **predicate** (probability 0–1), **choice** (one value from a
  fixed set plus a confidence), and **score** (probability-weighted average over ordered
  levels).
- Intended uses: classification, routing, prioritisation, and picking an agent's next
  action.
- Price: $0.10 per 1M input tokens, with no output or cache charges (as of 2026-10-07).
  Regional processing premiums and long-context multipliers still apply.
- Hosted image URLs and file IDs are not supported as input.
- Supports Zero Data Retention and HIPAA eligibility; available in the US and Europe
  (EEA and Switzerland). OpenAI expects general availability "in the coming weeks".
- Secondary coverage dates the announcement to DevDay on 2026-09-29 with ~150 ms latency
  claims; the changelog dates the beta release to 2026-10-06.

## Why it matters

Classifier-style calls (routing, moderation, triage) have usually been done with full
generation plus structured outputs. A dedicated endpoint that returns probabilities and
charges only for input makes these calls much cheaper and faster.
