---
title: "Gemini API deprecations (October 2026)"
url: https://ai.google.dev/gemini-api/docs/deprecations
archived:
type: docs
author: Google
date_published: 2026-10-08
date_added: 2026-10-12
tags: [google, llm, deployment]
topics: [models/gemini]
---

## Summary

Google's deprecations page for the Gemini API lists each model's release date, earliest
shutdown date, and replacement. On 2026-10-08 the Gemini API changelog deprecated
Gemini 3.7 Flash and 3.5 Flash, which are now silently routed to newer models, and set a
shutdown date for the December 2025 Deep Research agent. No web archive snapshot existed
on 2026-10-12.

## Key points

- `gemini-3.7-flash` (released 2026-08-13) is deprecated; requests are automatically
  routed to `gemini-3.8-flash`. No shutdown date.
- `gemini-3.5-flash` (released 2026-05-19) is deprecated; requests are routed to
  `gemini-3.6-flash`. No shutdown date.
- `deep-research-pro-preview-12-2025` shuts down on 2026-10-23; migrate by changing the
  `agent` parameter of `interactions.create` to `deep-research-preview-04-2026` or
  `deep-research-max-preview-04-2026`.
- Other October shutdowns: `antigravity-preview-05-2026` (2026-10-05); the Veo 3.1
  preview models and `gemini-omni-flash-preview` (2026-10-22), replaced by
  `gemini-omni-1.1-flash`.
- Google says listed shutdown dates are the earliest possible, with advance notice of
  the exact date.

## Why it matters

Automatic routing means code that pins `gemini-3.7-flash` or `gemini-3.5-flash` now gets
a different model (and possibly different behaviour and price) without changing anything.
It also gives the release date of 3.7 Flash, which the library was missing.
