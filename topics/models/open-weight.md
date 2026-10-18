---
title: "Open-weight models"
tags: [open-source, llm, deployment, fine-tuning]
related: [fundamentals/training-and-fine-tuning, practices/cost-and-caching]
last_reviewed: 2026-10-18
---

## Overview

Open-weight models publish their trained weights, so anyone can download, run,
fine-tune, and self-host them. "Open-weight" is more accurate than "open-source": training
data and code are usually not released, and licences range from fully permissive
(Apache 2.0, MIT) to custom licences with usage limits.

## Key concepts

- **Main families:** Qwen (Alibaba), DeepSeek, Llama (Meta), Mistral, Gemma (Google),
  and others such as Kimi, GLM, and OpenAI's gpt-oss.
- **Mixture of experts:** most large open models are MoE, quoted as total and active
  parameters (for example "675B total, 41B active").
- **Licences:** check commercial-use terms, user limits, and attribution rules per model.
- **Running locally:** tools such as Ollama, llama.cpp, and LM Studio run quantised
  models on laptops and desktops; vLLM and SGLang serve them on GPUs.
- **Hosted inference:** many providers serve open models over an API.

## How to use it

- Choose open weights for data control, offline use, fine-tuning, or lowest cost at scale.
- Expect frontier closed models to remain ahead on the hardest agentic tasks; test on
  your own workload.
- Quantised 4-bit versions trade a little quality for large memory savings.

## Main families

As of 2026-10-07, checked against official model cards and announcements:

| Model | Released | Parameters (total / active) | Context | Licence |
|---|---|---|---|---|
| DeepSeek-V4.1-Flash | 2026-09-10 | 552B / 8B prefill, 16B decode (encoder-decoder MoE) | 1M | MIT |
| DeepSeek-V4-Pro | 2026-04-24 | 1.6T / 49B (MoE) | 1M | MIT |
| DeepSeek-V4-Flash | 2026-04-24 | 284B / 13B (MoE) | 1M | MIT |
| Qwen3.8-Flash-Next | 2026-08 | 125B / 6B (MoE), plus 51B n-gram embeddings | 262K native, 1M with RoPE scaling | Qwen Community 1.0 (custom) |
| Qwen3.5-397B-A17B | 2026-02-16 | 397B / 17B (MoE) | 262K native, ~1M with YaRN | Apache 2.0 |
| Gemma 4 (E2B to 31B) | 2026-04-03 | 2.3B effective to 31B dense; 26B A4B MoE | 128K–256K | Apache 2.0 |
| Mistral Large 4 (weights due end of Oct 2026) | 2026-10-06 (API preview) | 1T / 49B (MoE) | not stated | not stated |
| Mistral Large 3 | 2025-12-02 | ~675B / 41B (MoE) | 256K | Apache 2.0 |
| Llama 4 Scout / Maverick | 2025-04-05 | 109B / 17B; 400B / 17B (MoE) | Scout 10M | Llama 4 licence (custom) |

DeepSeek-V4-Pro is the largest open-weight model in the library. The newer, smaller
V4.1-Flash beats it on DeepSeek's own benchmarks, and since 2026-09-14 DeepSeek's API
routes `deepseek-v4-pro` requests to V4.1-Flash. DeepSeek's own news pages give the V4
timeline: V4-Pro and V4-Flash preview with open weights on 2026-04-24, V4-Pro general
availability on 2026-08-13, V4-Flash-Vision-Exp on 2026-08-21, and V4.1-Flash on
2026-09-10. (A news report gave 2026-07-31 for V4-Flash; DeepSeek's date is used here.)
Qwen3.8-Flash-Next previews the Qwen4 architecture. Licences are moving in opposite
directions: Gemma 4 moved from Google's custom terms to Apache 2.0, while Qwen moved from
Apache 2.0 (Qwen3.5) to a custom community licence for Qwen3.8-Flash-Next. Qwen3.5 uses
linear attention in most layers, and Qwen3.8-Flash-Next adds sparse attention to that
(see [transformers](../fundamentals/transformers.md)).

Open weights are also spreading to non-language foundation models. Mistral's Timestral
(2026-10-15) is its first family of time-series forecasting models: four sizes (5M, 28M,
123M, 209M) on Hugging Face under a Modified MIT licence, with 32K-step context and
21-quantile probabilistic forecasts, running zero-shot on a CPU. Mistral says the 209M
model leads pre-trained zero-shot models on GIFT-Eval, TIME, and fev-bench, ahead of
Chronos-2 and TimesFM-3 (vendor claims). Google's EmbeddingGemma 2 (2026-10-06, 740M
parameters, Apache 2.0) is an open multimodal embedding model small enough for phones;
see [embeddings](../fundamentals/embeddings.md).

Meta has not released open weights since Llama 4. Its newer Muse models are API-only:
Muse Spark 1.1 (2026-07-09) and Muse Wonder / Muse Wonder Full (2026-10-12), its
strongest agent models, with cross-session "Active Memory". Muse Wonder is on the Meta
Model API and Muse Code; Wonder Full is for Muse Code subscribers only. Meta published no
licence or prices and deferred benchmark scores to a separate report.

Sources disagree on Gemma 4: it was announced on 2026-04-03, but the model card cites a
July 2026 technical report and lists a 12B size that launch coverage did not mention.

Prices for hosted open models can change quickly and may vary by time of day. DeepSeek's
own API, as of 2026-10-05, per 1M tokens at peak: V4.1-Flash costs $0.30 for input and
$1.20 for output, and V4-Pro costs $1.32 for input and $3.96 for output. Off-peak rates are
half of those. See [cost and caching](../practices/cost-and-caching.md).

## Current state

- **2026-10-15:** Mistral released Timestral, open time-series models (see above).
- **2026-10-14:** Google DeepMind and Singapore's government announced an on-device scam
  detector built on a fine-tuned lightweight Gemma, an example of small open models
  adapted for private, on-device use. The fine-tuned model itself is not being released.
- **2026-10-12:** Meta released Muse Wonder, again without open weights (see above).
- **2026-10-06:** Mistral Large 4 (1T total / 49B active, multimodal MoE) entered API
  preview as `mistral-large-4-0` at $1.36 / $4.18 per 1M tokens. Mistral promises open
  weights at the end of October 2026, but has not stated the licence or context length.
  Mistral reports strong cyber and agentic scores, including 93% on Cybench.

## Open questions

- Will leading labs keep releasing their largest models as open weights? DeepSeek still
  does (MIT). Meta's newest line is API-only. Qwen still releases weights, but under a
  custom licence. Mistral promises Large 4 weights; check at the end of October 2026
  whether they ship and under which licence (Large 3 was Apache 2.0).
- What does the Qwen Community 1.0 licence allow for commercial use? It has not been read
  yet.
- Did Llama 4 Behemoth ever ship? No primary source has been found.
- Did Alibaba's Qwen 3.7 Max (May 2026) ship as API-only, without weights? Only a
  secondary report says so (noted 2026-10-04); no primary source has been found.
- Add primary sources for Kimi, GLM, and gpt-oss.

## Sources

- [DeepSeek-V4-Pro model card](../../sources/2026/10/2026-10-04-deepseek-v4-pro-model-card.md)
- [Qwen3.5-397B-A17B model card](../../sources/2026/10/2026-10-04-qwen3-5-397b-model-card.md)
- [Gemma 4 model card](../../sources/2026/10/2026-10-04-gemma-4-model-card.md)
- [Introducing Mistral 3](../../sources/2026/10/2026-10-04-introducing-mistral-3.md)
- [The Llama 4 herd](../../sources/2026/10/2026-10-04-llama-4-herd.md)
- [DeepSeek V4 Preview Release](../../sources/2026/10/2026-10-05-deepseek-v4-preview-release.md)
- [DeepSeek-V4.1-Flash](../../sources/2026/10/2026-10-05-deepseek-v4-1-flash.md)
- [DeepSeek API: models and pricing](../../sources/2026/10/2026-10-05-deepseek-api-pricing.md)
- [Qwen3.8-Flash-Next model card](../../sources/2026/10/2026-10-05-qwen3-8-flash-next-model-card.md)
- [Introducing Muse Spark 1.1](../../sources/2026/10/2026-10-05-meta-muse-spark-1-1.md)
- [Introducing Mistral Large 4](../../sources/2026/10/2026-10-07-mistral-large-4.md)
- [EmbeddingGemma 2](../../sources/2026/10/2026-10-08-embeddinggemma-2.md)
- [Muse Wonder](../../sources/2026/10/2026-10-13-meta-muse-wonder.md)
- [On-device scam detection with a fine-tuned Gemma](../../sources/2026/10/2026-10-15-gemma-on-device-scam-detection.md)
- [Introducing Timestral](../../sources/2026/10/2026-10-16-mistral-timestral-time-series-models.md)
