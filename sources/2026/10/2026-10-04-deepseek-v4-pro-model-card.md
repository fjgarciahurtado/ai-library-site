---
title: "DeepSeek-V4-Pro model card"
url: https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro
archived:
type: release
author: DeepSeek
date_published: 2026-04-24
date_added: 2026-10-04
tags: [open-source, llm, other-provider, transformers]
topics: [models/open-weight, fundamentals/transformers]
---

## Summary

DeepSeek's official Hugging Face model card for DeepSeek-V4-Pro, its largest open-weight
model: a 1.6-trillion-parameter mixture-of-experts model with a 1M-token context,
released under the MIT licence. A smaller sibling, DeepSeek-V4-Flash, shares the
architecture. DeepSeek's own news page could not be fetched on 2026-10-04, so the
release date (24 April 2026) comes from news reports; the card links a technical report.

## Key points

- V4-Pro: 1.6T total parameters, 49B active per token; V4-Flash: 284B total, 13B active
  (Flash figures from news reports).
- 1M-token context window; weights published as Base and post-trained checkpoints in
  mixed FP4/FP8 precision.
- Licence: MIT, so commercial use is permitted.
- Hybrid attention: Compressed Sparse Attention (CSA) plus Heavily Compressed Attention
  (HCA). At 1M tokens DeepSeek reports 27% of the per-token inference FLOPs and 10% of
  the KV cache of DeepSeek-V3.2.
- Self-reported scores include 87.5 on MMLU-Pro, 93.5 pass@1 on LiveCodeBench, and a
  Codeforces rating of 3,206.
- News reports give API prices of $1.74 / $3.48 per 1M input/output tokens for V4-Pro and
  $0.14 / $0.28 for V4-Flash (not confirmed from DeepSeek's pricing page).

## Why it matters

As of mid-2026 the largest open-weight model by parameter count, and an example of
labs changing attention itself to make million-token contexts affordable.
