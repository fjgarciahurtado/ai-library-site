---
title: "OpenAI Decisions API generally available"
url: https://openai.com/index/decisions-api
archived:
type: release
author: OpenAI
date_published: 2026-10-22
date_added: 2026-10-23
tags: [openai, structured-output, caching, cost, multimodal]
topics: [models/gpt, practices/cost-and-caching]
---

## Summary

OpenAI's API changelog entry for 2026-10-22 makes the Decisions API (`POST /v1/decisions`
on `gpt-6-luna`) generally available, after a public beta that began on 2026-10-06. GA
adds prompt-cache discounts for shared input, images in question instructions, direct
JSON input, and twice as many questions per request. The URL above is OpenAI's
announcement post, but it returned 403 to the fetcher. The facts here come only from the
[API changelog](https://developers.openai.com/api/docs/changelog) entry for 2026-10-22.

## Key points

- **Status:** GA with `gpt-6-luna`.
- **Caching:** shared input can be cached across requests, so prompt-cache discounts
  apply.
- **Images:** an individual question's instructions can include images.
- **`input_json`:** structured data can be passed directly instead of as text.
- **Limit:** up to 400 questions per request, up from 200 in the beta.
- Pydantic AI 2.60 (same day) added native Responses input items for its
  `OpenAIDecisionsModel`, so framework support is keeping up.

## Why it matters

Running many classification checks over the same document is now cheaper (cached input)
and needs fewer calls (400 questions per request). That makes the API more attractive
for routing, moderation, and eval-style checks.
