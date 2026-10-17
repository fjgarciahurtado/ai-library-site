---
title: "Qwen3.8-Flash-Next model card"
url: https://huggingface.co/Qwen/Qwen3.8-Flash-Next
archived:
type: release
author: Alibaba Qwen team
date_published: 2026-08-26
date_added: 2026-10-05
tags: [open-source, llm, other-provider, multimodal, transformers]
topics: [models/open-weight, fundamentals/transformers]
---

## Summary

The official model card for Qwen3.8-Flash-Next, an open-weight multimodal MoE model that
the Qwen team calls an experimental preview of the Qwen4 architecture. It combines linear
attention (Gated DeltaNet) with a new Qwen Sparse Attention (QSA). Unlike Qwen3.5, it is
released under the custom "Qwen Community 1.0" licence rather than Apache 2.0. The card
gives only "August 2026"; the day (2026-08-26) comes from news reports.

## Key points

- 125B parameters, 6B active, plus 51B of n-gram embeddings and a 4B multi-token
  prediction module.
- 48 layers in a 12×4 hybrid layout of Gated DeltaNet and QSA blocks. 512 experts
  (10 routed, 1 shared) and gated residual streams with four branches.
- Context of 262,144 tokens natively, up to 1M with RoPE scaling.
- Accepts text, image, and video input.
- Self-reported scores: SWE-bench Pro 62.5%, GPQA Diamond 91.7%, AndroidWorld 84.5%.
- Runs on Transformers, vLLM, SGLang, TokenSpeed, and llama.cpp. Community projects run
  it on a single RTX 4090.

## Why it matters

Shows the direction of Qwen4: sparse attention on top of hybrid linear attention, with
few active parameters. The move away from Apache 2.0 needs watching.
