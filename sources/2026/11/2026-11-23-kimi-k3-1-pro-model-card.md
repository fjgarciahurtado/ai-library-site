---
title: "Kimi K3.1 Pro model card and licence (Hugging Face)"
url: https://huggingface.co/moonshotai/Kimi-K3.1-Pro
archived:
type: docs
author: Moonshot AI
date_published: 2026-11-02
date_added: 2026-11-23
tags: [open-source, other-provider, llm, multimodal]
topics: [models/open-weight]
---

## Summary

Moonshot published the Kimi K3.1 Pro weights on Hugging Face, which keeps the promise
made at launch (2026-10-23) to release them by 2026-11-04. The model card gives the
architecture, and the custom licence is MIT-style with conditions for large API hosts
and very large products. The page shows no exact publish date: the LICENSE commit was
"21 days ago" when read on 2026-11-23, so 2026-11-02 is an estimate.

## Key points

- **Architecture:**
  - Mixture of experts with 2.8T total and 104B active parameters.
  - 93 layers (1 dense) and 896 experts, of which 16 are routed and 2 shared per token.
  - Attention mixes 69 KDA layers and 24 Gated DSA layers.
  - 1,048,576-token context, 160K vocabulary, and a 401M MoonViT-V2 vision encoder
    (text and image input).
- **Precision:** quantization-aware training with MXFP4 weights and MXFP8 activations.
- **Licence ("Kimi K3.1-Pro License"):**
  - Permissive and MIT-style.
  - A model-as-a-service business with more than US$20M revenue in any 12 months must
    sign a separate agreement before commercial use.
  - Products with more than 100M monthly active users or more than US$20M monthly
    revenue must show "Kimi K3.1-Pro" prominently in the UI.
  - Internal use is exempt.
- **Serving:** recommended engines are vLLM, SGLang, and TokenSpeed. A separate
  `Kimi-K3` repo was updated around 2026-11-20.

## Why it matters

It is the largest open-weight model in the library (2.8T parameters), and its terms are
open except for big competing API hosts, the same pattern as GLM-5.3 and Mistral Large
4.
