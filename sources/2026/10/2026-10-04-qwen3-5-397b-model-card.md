---
title: "Qwen3.5-397B-A17B model card"
url: https://huggingface.co/Qwen/Qwen3.5-397B-A17B
archived:
type: release
author: Alibaba Qwen team
date_published: 2026-02-16
date_added: 2026-10-04
tags: [open-source, llm, other-provider, multimodal, transformers]
topics: [models/open-weight, fundamentals/transformers]
---

## Summary

The official model card for Qwen3.5-397B-A17B, the first open-weight model in Alibaba's
Qwen3.5 series (February 2026). It is a natively multimodal (vision and language)
mixture-of-experts model that replaces most attention layers with linear-attention
Gated DeltaNet layers. Released under Apache 2.0.

## Key points

- 397B total parameters, 17B active; 512 experts, 11 active per token (10 routed, 1 shared).
- Hybrid layout: 60 layers in 15 groups, each with three Gated DeltaNet + MoE blocks and
  one gated full-attention + MoE block.
- Context: 262,144 tokens native, up to about 1M with YaRN scaling. The hosted
  Qwen3.5-Plus offers 1M by default.
- Supports 201 languages and dialects (up from 119 in Qwen3).
- Thinks by default before answering; runs on Transformers, vLLM, SGLang, and KTransformers.
- Licence: Apache 2.0.

## Why it matters

A leading open-weight model that is mostly linear attention, showing that hybrid
architectures are already in production at frontier scale.
