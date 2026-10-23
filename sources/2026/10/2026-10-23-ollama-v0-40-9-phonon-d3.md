---
title: "Ollama v0.40.9: Phonon speech, d3 decision models, Flint on Linux"
url: https://github.com/ollama/ollama/releases/tag/v0.40.9
archived:
type: release
author: Ollama
date_published: 2026-10-23
date_added: 2026-10-23
tags: [open-source, deployment, multimodal, coding-agents, structured-output]
topics: [models/open-weight, frameworks/landscape]
---

## Summary

Ollama 0.40.9 (2026-10-23) adds local speech generation with Phonon (Apple Silicon only)
and the d3 decision models from vLLM Semantic Router (2B to 27B). It also brings the
Flint coding model to Linux and Windows, where it was macOS-only. It fixes silent
failures in streamed Responses and Anthropic Messages requests.

## Key points

- **Phonon speech (Apple Silicon):** `ollama run phonon "Hello from Ollama."` speaks the
  text aloud while it is generated. Apps can stream audio from the OpenAI-compatible
  `/v1/audio/speech` endpoint. The release does not say who made Phonon. Its release
  candidates mention Gradium's GA Phonon checkpoint.
- **d3 decision models:** sizes 2B, 4B, 9B, and 27B. They "classify, answer yes or no,
  or score options with probabilities". Example:
  `ollama run d3 "A customer says their card was charged twice." --ask "Is this a billing issue?"`.
  This is a local counterpart to OpenAI's Decisions API for routing and yes/no checks.
- **Flint everywhere:** `ollama run flint` now works on Linux and Windows too. It is a
  download of about 23 GB.
- **Fixes:** streamed OpenAI Responses and Anthropic Messages requests now report
  generation failures instead of ending silently. `ollama launch` passes cloud models'
  context lengths to coding tools, so compaction settings are right.

## Why it matters

Small local decision models are a cheap way to route or gate agent steps without calling
a hosted API. With Flint on Linux, the Ollama coding-agent model can run on ordinary
GPU machines, not only Macs.
