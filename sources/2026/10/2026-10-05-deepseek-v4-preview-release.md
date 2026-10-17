---
title: "DeepSeek V4 Preview Release"
url: https://api-docs.deepseek.com/news/news260424
archived:
type: release
author: DeepSeek
date_published: 2026-04-24
date_added: 2026-10-05
tags: [open-source, llm, other-provider, reasoning]
topics: [models/open-weight]
---

## Summary

DeepSeek's own announcement of the V4 series, published in its API docs news section. It
launched two models at once, DeepSeek-V4-Pro and DeepSeek-V4-Flash, as a preview, with
open weights on Hugging Face and API access on the same day. It is the primary source for
the V4 release date, which earlier notes in this library took from news reports.

## Key points

- Date: 2026-04-24, for both V4-Pro and V4-Flash.
- V4-Pro: 1.6T total parameters, 49B active. V4-Flash: 284B total, 13B active.
- Both have a 1M-token context, which DeepSeek now treats as the standard length across
  its services.
- Weights were published the same day (the licence, MIT, is stated on the model cards,
  not in the announcement).
- Both run in thinking and non-thinking modes and are served through OpenAI-compatible
  Chat Completions and Anthropic-compatible APIs.
- DeepSeek's later news items: V4-Pro general availability on 2026-08-13 (reasoning
  effort levels, native OpenAI Responses API support, peak/off-peak pricing from
  2026-08-16), V4-Flash-Vision-Exp on 2026-08-21, and V4.1-Flash on 2026-09-10.

## Why it matters

Settles the date conflict noted on the open-weight page: V4-Flash came out with V4-Pro on
2026-04-24, not on 2026-07-31 as one news report claimed.
