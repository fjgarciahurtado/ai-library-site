---
title: "Embeddings"
tags: [embeddings, rag]
related: [fundamentals/rag, fundamentals/transformers]
last_reviewed: 2026-10-08
---

## Overview

An embedding is a vector (a list of numbers) that represents the meaning of a piece of
text, image, or other data. Items with similar meaning end up close together in vector
space, so "find similar things" becomes "find nearby vectors". Embeddings power semantic
search, retrieval for [RAG](rag.md), clustering, deduplication, and recommendations.

## Key concepts

- **Embedding model:** a model trained so that related inputs produce nearby vectors.
  It is separate from the chat model; Anthropic, for example, points users to third-party
  embedding providers.
- **Dimensions:** vector length, commonly a few hundred to a few thousand. More is not
  always better; some models support shortening vectors (Matryoshka embeddings).
- **Similarity:** usually cosine similarity or dot product.
- **Vector database / index:** stores vectors for fast approximate nearest-neighbour
  search (for example HNSW indexes). Options range from Postgres with pgvector to
  dedicated databases.
- **Chunking:** documents are split into passages before embedding; chunk size and
  overlap strongly affect retrieval quality.
- **Hybrid search:** combining vector search with keyword search (BM25) usually beats
  either alone.
- **Reranking:** a second model re-scores the top results for better precision.
- **Multimodal embeddings:** one model maps text, images, audio, and video into the same
  space, so a text query can find a picture or a clip. Small open models such as
  EmbeddingGemma 2 (740M parameters) now do this on a phone.

## How to use it

- Pick an embedding model by testing retrieval quality on your own data, not leaderboards alone.
- Use the same embedding model for indexing and querying; re-embed everything if you switch.
- Store source text and metadata alongside vectors so results can be cited and filtered.

## Current state

- **2026-10-06:** Google DeepMind released EmbeddingGemma 2 under Apache 2.0: 740M
  parameters (270M text-only path), text, code, image, audio, and video input, 768-dim
  vectors truncatable to 128, and an 8K-token window. Google reports 78.68 on MTEB Code.
- **2026-10-04:** Hybrid search plus reranking is the common production default. Agents
  increasingly mix embeddings with direct tools (grep, file search, SQL) instead of
  relying on vectors alone.

## Open questions

- When does agentic search with ordinary tools beat a vector index?

## Sources

- [RAG paper (Lewis et al., 2020)](../../sources/2026/10/2026-10-04-rag-paper-lewis-2020.md)
- [EmbeddingGemma 2](../../sources/2026/10/2026-10-08-embeddinggemma-2.md)
