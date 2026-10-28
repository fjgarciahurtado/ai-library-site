---
title: "GLM-5.3 model card (Z.ai)"
url: https://huggingface.co/zai-org/GLM-5.3
archived:
type: docs
author: Z.ai
date_published: 2026-08-29
date_added: 2026-10-28
tags: [open-source, other-provider, coding-agents, llm]
topics: [models/open-weight]
---

## Summary

Z.ai's model card for GLM-5.3, its newest open-weight model as of 2026-10-28. It is a
753B-parameter mixture-of-experts model on the same base as GLM-5.2, with all gains from
post-training, aimed at long-horizon software engineering and agentic work. The weights
come under Z.ai's own GLM-5.3 licence, which is MIT-style except for a security review for
the very largest API providers. The card gives no release date; the model was announced on
2026-08-14 and a secondary report (GIGAZINE) puts the weights on 2026-08-29, which is the
date used above.

## Key points

- **Size:** 753B total parameters, model type `glm_moe_dsa`; the card does not give the
  active parameter count or a single context limit (its benchmark notes use 300K, 400K,
  and 1M tokens).
- **Licence (GLM-5.3 License):** free use, modification, redistribution, fine-tuning, and
  commercial use, keeping the copyright notice. One exception: a company that offers the
  model as a service (API inference or fine-tuning for third parties) and has more than
  US$10 billion in revenue with its affiliates over 12 months must pass a Z.ai security
  review before commercial use. Products that embed the model in features are not
  affected.
- **Benchmarks (Z.ai's own figures):** Terminal-Bench 2.1 88.2, Terminal-Bench 3.0 28.3,
  DeepSWE v1.1 66.9, CyberGym 84.5, Toolathlon Verified 73.0, HLE with tools 62.5, and
  50% better than GLM-5.2 on its in-house Z.ai Code Bench.
- **Running it:** SGLang, vLLM, Transformers, KTransformers, Unsloth, and Ascend NPU
  back-ends. Thinking depth is set with `reasoning_effort` (`low`, `high`, or `max`;
  default `max`).
- **Lineage:** GLM-5 (2026-02, technical report arXiv 2602.15763), GLM-5.1 (2026-04),
  GLM-5.2 (2026-06, MIT licence per secondary reports), GLM-5.3 (2026-08).

## Why it matters

GLM is one of the main Chinese open-weight families next to DeepSeek, Qwen, and Kimi. Its
licence sits between MIT (DeepSeek) and Qwen's custom licence: open for almost everyone,
with a review only for hyperscale API providers.
