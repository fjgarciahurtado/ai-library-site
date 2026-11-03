---
title: "Gemini API changelog: Gemini 2.5 Pro and 2.5 Flash deprecated"
url: https://aistudio.google.com/docs/changelog
archived:
type: release
author: Google
date_published: 2026-11-02
date_added: 2026-11-03
tags: [google, llm, cost, deployment]
topics: [models/gemini, practices/cost-and-caching]
---

## Summary

On 2026-11-02 Google deprecated `gemini-2.5-pro` and `gemini-2.5-flash`. They can no
longer be selected in Google AI Studio, and from 2026-12-01 API requests to them are
routed automatically to newer models and billed at the newer models' rates. The Gemini
API docs now live on aistudio.google.com (ai.google.dev redirects there).

## Key points

- `gemini-2.5-pro` routes to `gemini-3.8-flash` from 2026-12-01, billed at 3.8 Flash
  rates. A Flash model replaces a Pro model.
- `gemini-2.5-flash` routes to `gemini-3.5-flash-lite` from 2026-12-01, billed at 3.5
  Flash-Lite rates.
- The deprecations page lists 2026-12-01 as both the routing and shutdown date and calls
  the dates the earliest possible. API access was already limited to existing users.
- Breaking changes to plan for: function calling and `thought_signature` validation,
  `thinking_level` replacing `thinking_budget`, removed sampling parameters, and no
  prefilled model turns.
- Checked on the same day: the pricing page (2026-11-03) bills Computer Use "as regular
  tokens per model pricing" and does not offer it on the free tier. The page no longer
  lists `gemini-3.5-flash`, and the deprecations page still does not say how its traffic
  routed to 3.6 Flash is billed.

## Why it matters

Code still pinned to 2.5 will silently switch model and price on 2026-12-01, and may
break on the API changes; migrate explicitly before then.
