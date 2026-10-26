---
title: "Open-weight models"
tags: [open-source, llm, deployment, fine-tuning]
related: [fundamentals/training-and-fine-tuning, practices/cost-and-caching]
last_reviewed: 2026-10-26
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

As of 2026-10-22, checked against official model cards and announcements:

| Model | Released | Parameters (total / active) | Context | Licence |
|---|---|---|---|---|
| DeepSeek-V4.1-Flash-1017 | 2026-10-17 | 763B per Hugging Face; active not stated | 1M | MIT |
| DeepSeek-V4.1-Flash | 2026-09-10 | 552B / 8B prefill, 16B decode (encoder-decoder MoE) | 1M | MIT |
| DeepSeek-V4-Pro | 2026-04-24 | 1.6T / 49B (MoE) | 1M | MIT |
| DeepSeek-V4-Flash | 2026-04-24 | 284B / 13B (MoE) | 1M | MIT |
| Qwen3.8-Flash-Next | 2026-08 | 125B / 6B (MoE), plus 51B n-gram embeddings | 262K native, 1M with RoPE scaling | Qwen Community 1.0 (custom) |
| Qwen3.5-397B-A17B | 2026-02-16 | 397B / 17B (MoE) | 262K native, ~1M with YaRN | Apache 2.0 |
| Flint (Recursive, coding agents) | 2026-10-21 (on Ollama) | 39.8B / ~2.5B (MoE), per model card | 262K | Apache 2.0 |
| Gemma 4 (E2B to 31B) | 2026-04-03 | 2.3B effective to 31B dense; 26B A4B MoE | 128K–256K | Apache 2.0 |
| Kimi K3.1 Pro (Moonshot; weights due by 2026-11-04) | 2026-10-23 (API) | "3T-class"; no details | 1M | not stated |
| Mistral Large 4 (weights due end of Oct 2026) | 2026-10-06 (API preview) | 1T / 49B (MoE) | not stated | not stated |
| Mistral Large 3 | 2025-12-02 | ~675B / 41B (MoE) | 256K | Apache 2.0 |
| gpt-oss-120b / gpt-oss-20b (OpenAI) | 2025-08 | 117B / 5.1B; 21B / 3.6B (MoE, MXFP4) | not stated on model cards | Apache 2.0 |
| Llama 4 Scout / Maverick | 2025-04-05 | 109B / 17B; 400B / 17B (MoE) | Scout 10M | Llama 4 licence (custom) |

DeepSeek-V4-Pro is the largest open-weight model in the library. The newer, smaller
V4.1-Flash beats it on DeepSeek's own benchmarks, and since 2026-09-14 DeepSeek's API
routes `deepseek-v4-pro` requests to V4.1-Flash. DeepSeek's own news pages give the V4
timeline: V4-Pro and V4-Flash preview with open weights on 2026-04-24, V4-Pro general
availability on 2026-08-13, V4-Flash-Vision-Exp on 2026-08-21, and V4.1-Flash on
2026-09-10, and the V4.1-Flash-1017 update (more RL for agentic coding) on 2026-10-17.
(A news report gave 2026-07-31 for V4-Flash; DeepSeek's date is used here.) The 1017
Hugging Face page lists 763B parameters against the 552B DeepSeek gave for V4.1-Flash,
although DeepSeek calls 1017 a minor update; the gap is unexplained (see Open questions).

OpenAI's gpt-oss models (August 2025) are reasoning models with three effort levels,
built-in browsing and Python tools, and a required "harmony" response format. Their MoE
weights ship already quantised to MXFP4, so the 120B model fits one 80 GB GPU and the 20B
model runs in 16 GB.
Qwen3.8-Flash-Next previews the Qwen4 architecture. Licences are moving in opposite
directions: Gemma 4 moved from Google's custom terms to Apache 2.0, while Qwen moved from
Apache 2.0 (Qwen3.5) to a custom community licence for Qwen3.8-Flash-Next. Qwen3.5 uses
linear attention in most layers, and Qwen3.8-Flash-Next adds sparse attention to that
(see [transformers](../fundamentals/transformers.md)).

Recursive's Flint (2026-10-21) is a small MoE built for coding agents. Its model card
gives 39.8B total and about 2.5B active parameters (2.2B without the output head), 256
experts with 6 active, mixed sliding-window and full attention, 262K context, training
from scratch, a June 2026 cutoff, and Apache 2.0. Full precision needs one B300 or H200
per replica (SGLang); for local use, `ollama run flint` (about 23 GB) works on macOS
since Ollama 0.40.8 and on Linux and Windows since 0.40.9, and `ollama launch` connects
it to Claude Code and OpenCode. Recursive reports SWE-bench Verified 74.2%,
Terminal-Bench 2.1 54.9%, and an unusually high 89.7% on SWE-bench Pro v2 (average
pass@1 over at least 5 runs, with mini-swe-agent and Terminus 2; publisher figures only).
Ollama 0.40.9 also added d3 decision models (2B, 4B, 9B, 27B, from vLLM Semantic Router)
for local classification and yes/no scoring.

Small open models are also adapted for private, on-device use: Google DeepMind and
Singapore's government built a scam detector on a fine-tuned lightweight Gemma
(2026-10-14), though the fine-tuned model is not being released.

Open weights are also spreading to non-language foundation models. Mistral's Timestral
(2026-10-15) is its first family of time-series forecasting models: four sizes (5M, 28M,
123M, 209M) on Hugging Face under a Modified MIT licence, with 32K-step context and
21-quantile probabilistic forecasts, running zero-shot on a CPU. Mistral says the 209M
model leads pre-trained zero-shot models on GIFT-Eval, TIME, and fev-bench, ahead of
Chronos-2 and TimesFM-3 (vendor claims). Google's EmbeddingGemma 2 (2026-10-06, 740M
parameters, Apache 2.0) is an open multimodal embedding model small enough for phones;
see [embeddings](../fundamentals/embeddings.md). Mistral's Voxtral 3 speech family
(2026-10-20) covers voice agents: Small and Mini (4B) batch transcription, a realtime
model under 500 ms, a TTS model, and a Voice Agent SDK on LiveKit, from $0.0035 per
minute for transcription and $13 per 1M characters for TTS. Mistral reports about 4.1%
WER on FLEURS for Small, against about 16% for Whisper large-v3 (vendor figures). It
offers self-hosting, but unlike Voxtral 1 (Apache 2.0) its announcement names no licence
and does not say whether the weights are downloadable. Ollama 0.40.9 added Phonon speech
models on Apple Silicon.

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

- **2026-10-23:** Moonshot released Kimi K3.1 Pro (`kimi-k3.1-pro`, plus a 2–3× faster
  `-highspeed` variant at twice the price) on its API, apps, and Kimi Code, with a 1M
  context. It promises full weights by 2026-11-04 but names no licence. On Moonshot's own
  figures it scores 65.7% on Terminal-Bench 4.0 (Opus 5.5: 66.4%). Artificial Analysis
  ranks it second, behind Opus 5.5 (both reported by Simon Willison). Price per Willison:
  $2 / $10 per 1M tokens.
- **2026-10-21:** Recursive's Flint coding model arrived in Ollama (see above); local
  builds now cover macOS, Linux, and Windows, but its benchmarks have no independent
  results yet.
- **2026-10-20:** Mistral released Voxtral 3 (see above); the licence and weight
  availability are still not stated.
- **2026-10-17:** DeepSeek released V4.1-Flash-1017 (MIT weights, 1M context) with large
  agentic-coding gains on its own benchmarks, for example Terminal-Bench 4.0 42.3 vs 31.2
  for V4.1-Flash. It also opened Search and Fetch APIs at $0.75 per 1,000 calls, free
  through Claude Code, Codex, and DeepSeek Harness until 2026-10-31.
- **2026-10-06:** Mistral Large 4 (1T total / 49B active, multimodal MoE) entered API
  preview as `mistral-large-4-0` at $1.36 / $4.18 per 1M tokens. Mistral promises open
  weights at the end of October 2026, but has not stated the licence or context length.
  Mistral reports strong cyber and agentic scores, including 93% on Cybench.

## Open questions

- Flint benchmarks: the parameter counts and licence are confirmed by Recursive's model
  card (2026-10-23). Still open: why its SWE-bench Pro v2 score (89.7%) is above its
  Verified score (74.2%), the reverse of the usual pattern. The card names neither the
  subsets nor which scores Recursive measured itself, and there are no independent
  results yet. No release date or announcement post was found.
- Are Voxtral 3 weights downloadable, and under which licence? The announcement
  (2026-10-20) offers self-hosting but names no licence.
- Will leading labs keep releasing their largest models as open weights? DeepSeek still
  does (MIT). Meta's newest line is API-only. Qwen still releases weights, but under a
  custom licence. Mistral promises Large 4 weights; check at the end of October 2026
  whether they ship and under which licence (Large 3 was Apache 2.0).
- What does the Qwen Community 1.0 licence allow for commercial use? It has not been read
  yet.
- Did Llama 4 Behemoth ever ship? No primary source has been found.
- Did Alibaba's Qwen 3.7 Max (May 2026) ship as API-only, without weights? Only a
  secondary report says so (noted 2026-10-04); no primary source has been found.
- Kimi K3.1 Pro: check on or after 2026-11-04 whether the weights shipped, under which
  licence, and with what architecture. The price comes from Simon Willison, not from
  Moonshot's pricing page.
- Add a primary source for GLM. (Kimi was added 2026-10-26 from Moonshot's K3.1 Pro
  post; gpt-oss added 2026-10-19 from the model card
  paper and Hugging Face cards; its context length is still to be confirmed from the
  full paper.)
- Why does the V4.1-Flash-1017 Hugging Face page list 763B parameters when V4.1-Flash
  was announced at 552B? Possibly the count includes extra modules (vision encoder,
  speculative-decoding heads); not confirmed.

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
- [DeepSeek-V4.1-Flash-1017](../../sources/2026/10/2026-10-19-deepseek-v4-1-flash-1017.md)
- [gpt-oss-120b & gpt-oss-20b Model Card](../../sources/2026/10/2026-10-19-gpt-oss-model-card.md)
- [Voxtral 3](../../sources/2026/10/2026-10-21-mistral-voxtral-3.md)
- [Ollama v0.40.8 and Flint](../../sources/2026/10/2026-10-22-ollama-flint-coding-model.md)
- [Flint model card (Recursive)](../../sources/2026/10/2026-10-23-recursive-flint-model-card.md)
- [Ollama v0.40.9](../../sources/2026/10/2026-10-23-ollama-v0-40-9-phonon-d3.md)
- [Kimi K3.1 Pro](../../sources/2026/10/2026-10-26-kimi-k3-1-pro.md)
