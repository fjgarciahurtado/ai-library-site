---
title: "Gemini 4 Argon model page (Gemini API docs)"
url: https://ai.google.dev/gemini-api/docs/models/gemini-4-argon
archived:
type: docs
author: Google
date_published: 2026-10-13
date_added: 2026-10-15
tags: [google, llm, reasoning, multimodal, caching, computer-use]
topics: [models/gemini, practices/cost-and-caching]
---

## Summary

The Gemini API documentation page for `gemini-4-argon`, checked on 2026-10-15. It labels
the model **Stable**, and the Gemini API changelog entry dated 2026-10-13 says Argon
"reached general availability". The page lists its limits and supported features; the
publication date is taken from the changelog entry, as the page itself says only
"October 2026".

## Key points

- Status: Stable (not a preview). GA on the Gemini API on 2026-10-13, per the changelog.
- Context: 1,048,576 tokens, shared between input and output.
- Output: 65,536 tokens by default for synchronous requests; up to 1,048,576 with "long
  decode".
- Inputs: text, image, video, audio, PDF. Output: text only. No Live API, image, or
  audio generation.
- Thinking levels: low, medium, high.
- Tools: function calling, structured output, code execution, file search, URL context,
  Search and Maps grounding; computer use is still a preview feature.
- Caching: implicit caching only; **explicit (context) caching is not supported**.
- Batch API, Flex, and Priority inference are supported.
- No knowledge cutoff or price is shown on this page.

## Why it matters

It settles whether Argon is a preview: it is a stable, GA model on the Gemini API. The
lack of explicit caching matters for cost planning with large, repeated contexts.
