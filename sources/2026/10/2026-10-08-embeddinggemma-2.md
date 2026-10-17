---
title: "EmbeddingGemma 2: an open, lightweight multimodal embedding model"
url: https://blog.google/innovation-and-ai/technology/developers-tools/embeddinggemma-2/
archived:
type: release
author: Sahil Dua and Henrique Schechter Vera (Google DeepMind)
date_published: 2026-10-06
date_added: 2026-10-08
tags: [google, embeddings, multimodal, open-source]
topics: [fundamentals/embeddings, models/open-weight]
---

## Summary

Google DeepMind released EmbeddingGemma 2, an open-weight embedding model that maps text,
code, images, video, and audio into one vector space. It is small enough to run on a
phone and is licensed under Apache 2.0. The design is modular: the text-only part can be
used on its own at a fraction of the full size.

## Key points

- 740M parameters for the full multimodal model; the text-only path is 270M.
- 768-dimension vectors that can be truncated to 512, 256, or 128 (Matryoshka
  Representation Learning) to save storage.
- 8K-token input window, equal to about 5.5 minutes of audio, 29 images, or 58 video
  frames.
- On-device memory with quantisation: about 191 MB (text only) and 567 MB (multimodal),
  measured by Google on a Pixel 11 Pro.
- Google reports 78.68 on MTEB Code, 9.92 points above EmbeddingGemma 1, and leading
  MAEB (audio) and MIEB (image) scores among multimodal embedders under 1B parameters.
- Weights on Hugging Face and Kaggle; LiteRT builds for on-device use. Licence is
  Apache 2.0; access through Google's Gemini Enterprise Agent Platform is "coming soon".

## Why it matters

A single small, permissively licensed model for cross-modal search makes on-device and
self-hosted multimodal RAG practical without calling a cloud embedding API.
