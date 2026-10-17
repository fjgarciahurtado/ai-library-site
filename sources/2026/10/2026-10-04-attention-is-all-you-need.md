---
title: "Attention Is All You Need"
url: https://arxiv.org/abs/1706.03762
archived:
type: paper
author: Vaswani et al. (Google Brain, Google Research)
date_published: 2017-06-12
date_added: 2026-10-04
tags: [transformers, llm, research]
topics: [fundamentals/transformers, fundamentals/llms]
---

## Summary

Introduces the Transformer, a sequence model built entirely on attention, with no
recurrence or convolution. It set new machine-translation results while training much
faster, because attention over a whole sequence can be computed in parallel.

## Key points

- Self-attention lets every token look at every other token in one step.
- Multi-head attention runs several attention patterns in parallel.
- Positional encodings add word-order information that attention lacks on its own.
- Encoder-decoder design; later LLMs mostly keep only the decoder half.

## Why it matters

Every major LLM today (Claude, GPT, Gemini, Llama, Qwen) is a descendant of this
architecture.
