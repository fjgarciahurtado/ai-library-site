---
title: "Flint model card (Recursive)"
url: https://huggingface.co/RecursiveSI/flint
archived:
type: docs
author: Recursive Superintelligence, Inc.
date_published: 2026-10-21
date_added: 2026-10-23
tags: [open-source, coding-agents, other-provider, evals]
topics: [models/open-weight]
---

## Summary

The Hugging Face model card for Flint, the open coding-agent model from Recursive
(Recursive Superintelligence, Inc.). Flint is a 39.8B-parameter mixture-of-experts model
with about 2.5B active per token, a 262,144-token context, and an Apache 2.0 licence. It
was trained from scratch, with a knowledge cutoff of June 2026. The card gives no release
date; the publication date here is approximate, from Ollama adding it on 2026-10-21/22.
It was read to fill the open question on Flint's figures.

## Key points

- **Architecture:** 49 layers (2 dense, 47 MoE). There are 256 routed experts per layer,
  6 chosen per token, plus a shared expert. 35 sliding-window attention layers (513-token
  window) alternate with 14 full-attention layers, using GQA with 32 query and 4 KV heads.
  Text only. The 2.5B active figure includes the output head; the body alone is about
  2.2B.
- **Benchmarks (Recursive-reported):** Terminal-Bench 2.1 54.9%, SWE-bench Pro v2 89.7%,
  SWE-bench Verified 74.2%. These are average pass@1 over at least five attempts, using
  Terminus 2 for Terminal-Bench and mini-swe-agent for SWE-bench, at temperature 1.0,
  top-p 0.95, top-k 20. Terminal-Bench answers found by web retrieval count as failures.
  The card does not explain why the Pro v2 score is higher than Verified, or which
  subsets were used.
- **Running it:** the documented path is an SGLang Docker kit on one B300 or H200 GPU
  per replica (about an 80 GB download). There are separate quantized builds for Apple
  Silicon (int4) and other GPUs (NVFP4 GGUF), and Ollama ships about a 23 GB build.
  Transformers code is not included yet.
- **Usage tips:** allow at least 32,768 output tokens for hard problems, and keep
  `reasoning_content` in the conversation history.

## Why it matters

The card confirms the parameter counts and licence that Ollama listed. It also shows the
benchmark numbers come from the developer alone, with no explanation of the unusual Pro
v2 vs Verified gap. Treat the scores as unverified until independent results appear.
