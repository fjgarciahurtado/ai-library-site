---
title: "Gemma 4 model card (31B instruction-tuned)"
url: https://huggingface.co/google/gemma-4-31B-it
archived:
type: release
author: Google DeepMind
date_published: 2026-04-03
date_added: 2026-10-04
tags: [open-source, llm, google, multimodal]
topics: [models/open-weight]
---

## Summary

Google's Hugging Face model card for Gemma 4, its open-weight family built on Gemini 3
research and released under Apache 2.0. Google's launch post could not be fetched on
2026-10-04, so the announcement date (3 April 2026) comes from Google's developer forum
and news reports. The card cites a technical report dated July 2026 and lists a 12B
model that launch coverage did not mention, so it was probably added later.

## Key points

- Sizes: E2B (2.3B effective), E4B (4.5B effective), 12B, 26B A4B (MoE, about 3.8B
  active), and 31B dense.
- Context: 128K tokens for E2B/E4B; 256K for 12B, 26B A4B, and 31B.
- Modalities: text and image for all sizes, and video as frame sequences; audio input
  on E2B, E4B, and 12B.
- Attention interleaves local sliding-window layers with global layers to keep long
  contexts cheap.
- Configurable thinking modes. Self-reported scores for 31B: 85.2% on MMLU-Pro, 80.0% on
  LiveCodeBench v6.
- Licence: Apache 2.0, a change from the custom Gemma licence used for earlier
  generations.

## Why it matters

The strongest small open-weight family from a frontier lab, sized for phones, laptops,
and single GPUs, and now under a standard permissive licence.
