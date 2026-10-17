---
title: "DeepSeek-V4.1-Flash: Smarter, Faster, More Efficient"
url: https://api-docs.deepseek.com/news/news260910
archived:
type: release
author: DeepSeek
date_published: 2026-09-10
date_added: 2026-10-05
tags: [open-source, llm, other-provider, multimodal, transformers, reasoning]
topics: [models/open-weight, fundamentals/transformers]
---

## Summary

DeepSeek's announcement of V4.1-Flash, a natively multimodal open-weight model that,
by DeepSeek's own benchmarks, beats its larger flagship V4-Pro. It drops the decoder-only
design for a "causal encoder-decoder" mixture-of-experts architecture and cuts KV-cache
memory again. Weights are on Hugging Face
([model card](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)) under MIT.

## Key points

- 552B parameters in total. It activates 8B parameters per token when reading input
  (prefill) and 16B when generating (decode).
- Architecture: a 20-layer causal encoder followed by a 20-layer decoder, both MoE.
  Uses Compressed Sparse Attention 2 (CSA2) and an FP4 KV cache.
- KV cache uses about a quarter of the HBM and an eighth of the SSD storage of V4-Flash.
- Pre-trained on about 45T multimodal tokens. It has its own vision encoder
  (DeepSeek-ViT) and accepts images and text.
- Reasoning effort is adjustable on a 1–100 scale. Speculative decoding uses "DSpark".
- 1M-token context. In the API it is the `deepseek-flash` model, and since 2026-09-14
  `deepseek-v4-pro` requests are routed to it. Prices were cut from 2026-09-10.

## Why it matters

The largest open-weight lab has moved its newest model away from decoder-only transformers,
and a mid-sized model now beats its 1.6T flagship. The open-weight frontier is no longer
simply the largest model.
