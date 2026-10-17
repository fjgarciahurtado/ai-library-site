---
title: "Transformers"
tags: [transformers, llm]
related: [fundamentals/llms, fundamentals/tokens-and-context, fundamentals/embeddings]
last_reviewed: 2026-10-05
---

## Overview

The transformer is the neural network architecture behind nearly every modern LLM. It
was introduced in 2017 for translation and replaced recurrent networks because attention
can process a whole sequence in parallel, which makes training on huge datasets practical.

## Key concepts

- **Self-attention:** each token builds its representation by weighting every other
  token it can see. Weights come from comparing a token's *query* with others' *keys*,
  then mixing their *values*.
- **Multi-head attention:** several attention patterns run side by side, each able to
  track a different kind of relationship.
- **Feed-forward layers:** applied to each token after attention; hold much of the
  model's stored knowledge.
- **Residual connections and layer normalisation:** keep deep stacks trainable.
- **Positional information:** attention alone ignores order, so positions are encoded
  (originally sinusoidal; today usually rotary embeddings, RoPE).
- **Decoder-only and causal masking:** LLMs only let each token attend to earlier tokens,
  so the model can generate left to right.
- **KV cache:** at inference, keys and values for earlier tokens are stored so each new
  token costs one step instead of reprocessing the whole sequence. Prompt caching in
  APIs builds on this.
- **Mixture of experts (MoE):** the feed-forward part is split into many "experts" and a
  router activates only a few per token. Total parameters can be huge while compute per
  token stays modest. Many 2025–2026 open-weight models are MoE.
- **Efficient and hybrid attention:** to make long contexts affordable, many recent
  models mix full attention with cheaper layers: sliding-window attention (Gemma 4),
  linear-attention layers such as Gated DeltaNet (Qwen3.5 uses three for every full
  attention layer), or compressed sparse attention that shrinks the KV cache (DeepSeek
  V4-Pro reports 27% of the per-token FLOPs and 10% of the KV cache of V3.2 at 1M tokens).
  Qwen3.8-Flash-Next adds Qwen Sparse Attention, which first narrows a long sequence
  to its most relevant regions, to Gated DeltaNet layers.
- **Beyond decoder-only:** DeepSeek-V4.1-Flash (2026-09) uses a "causal encoder-decoder"
  MoE: a 20-layer encoder reads the input and a 20-layer decoder generates, with
  different active parameters for each (8B and 16B).

## How to use it

You rarely work with the architecture directly when using an API, but it explains:

- why cost and latency grow with context length (attention is roughly quadratic);
- why repeated prefixes can be cached cheaply;
- what "total vs active parameters" means in MoE model cards.

## Current state

- **2026-10-05:** Two 2026 open models have moved further away from the classic layout.
  DeepSeek-V4.1-Flash (2026-09-10) is a causal encoder-decoder MoE whose KV cache is about
  a quarter of V4-Flash's. Qwen3.8-Flash-Next (August 2026), a preview of Qwen4, combines
  linear attention with sparse attention.

- **2026-10-04:** Decoder-only transformers, often MoE, remain the dominant design, and
  hybrid attention is already in production in leading open models (Qwen3.5, February
  2026; DeepSeek V4, April 2026). Research on state-space and other non-attention
  designs continues for very long contexts.

## Open questions

- Will non-attention or hybrid architectures overtake transformers for long context?

## Sources

- [Attention Is All You Need](../../sources/2026/10/2026-10-04-attention-is-all-you-need.md)
- [DeepSeek-V4-Pro model card](../../sources/2026/10/2026-10-04-deepseek-v4-pro-model-card.md)
- [Qwen3.5-397B-A17B model card](../../sources/2026/10/2026-10-04-qwen3-5-397b-model-card.md)
- [DeepSeek-V4.1-Flash](../../sources/2026/10/2026-10-05-deepseek-v4-1-flash.md)
- [Qwen3.8-Flash-Next model card](../../sources/2026/10/2026-10-05-qwen3-8-flash-next-model-card.md)
