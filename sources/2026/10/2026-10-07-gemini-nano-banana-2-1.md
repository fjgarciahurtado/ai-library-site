---
title: "Gemini Nano Banana 2.1 model page"
url: https://ai.google.dev/gemini-api/docs/models/gemini-nano-banana-2.1
archived:
type: docs
author: Google
date_published: 2026-10-06
date_added: 2026-10-07
tags: [google, multimodal]
topics: [models/gemini]
---

## Summary

Google made Gemini Nano Banana 2.1 (`gemini-nano-banana-2.1`) generally available on
2026-10-06, according to the Gemini API changelog. It is Google's high-efficiency image
generation and conversational image-editing model. It replaces `gemini-3.1-flash-image`
(Nano Banana 2), which is now deprecated with no shutdown date.

## Key points

- Google claims better visual quality, prompt adherence, multi-turn character consistency,
  and text rendering at "Flash-level" speed and cost.
- New panoramic aspect ratios: 1:4, 4:1, 1:8, 8:1. Output at 1K, 2K, or 4K for every
  aspect ratio.
- Limits: 131,072 input tokens, 32,768 output tokens. Inputs: text, image, video, PDF.
  Outputs: image and text.
- Supports thinking (minimal, medium, high), Google web and image search grounding, the
  Batch API, and up to 14 reference images.
- No caching, function calling, structured outputs, or Live API.
- The model page did not list prices when read on 2026-10-07.

## Why it matters

This is Google's current image model in the API. Apps that use `gemini-3.1-flash-image`
should plan to migrate.
