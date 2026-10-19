---
title: "gpt-oss-120b & gpt-oss-20b Model Card"
url: https://arxiv.org/abs/2508.10925
archived:
type: paper
author: OpenAI
date_published: 2025-08-08
date_added: 2026-10-19
tags: [open-source, openai, llm, reasoning, tool-use]
topics: [models/open-weight]
---

## Summary

OpenAI's model card for gpt-oss-120b and gpt-oss-20b, its open-weight reasoning models
released in August 2025. Both are mixture-of-experts transformers trained with
large-scale distillation and reinforcement learning, tuned for agentic use (browsing,
Python, developer functions). Weights, inference code, tool environments, and tokenizer
are under Apache 2.0. The announcement page
(<https://openai.com/index/introducing-gpt-oss/>) blocks automated fetches, so details
here come from the paper's abstract and the Hugging Face model cards.

## Key points

- gpt-oss-120b: 117B total, 5.1B active parameters; fits one 80 GB GPU (H100, MI300X).
- gpt-oss-20b: 21B total, 3.6B active; runs in 16 GB of memory.
- MoE weights are post-trained in MXFP4 4-bit quantisation, which is what makes those
  memory figures possible.
- Reasoning effort low, medium, or high, set in the system prompt ("Reasoning: high").
- Must be used with OpenAI's "harmony" response format; otherwise it does not work
  correctly.
- Built-in support for function calling, web browsing, Python execution, and structured
  outputs.
- Model cards: [gpt-oss-120b](https://huggingface.co/openai/gpt-oss-120b),
  [gpt-oss-20b](https://huggingface.co/openai/gpt-oss-20b). Context length is not stated
  on those pages.

## Why it matters

gpt-oss was OpenAI's first open-weight language model since GPT-2, and it is still one of
the few permissively licensed open models from a US frontier lab. Shipping MoE weights
already in 4-bit made a strong reasoning model practical on a single GPU or laptop.
