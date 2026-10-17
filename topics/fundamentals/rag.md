---
title: "Retrieval-augmented generation (RAG)"
tags: [rag, embeddings, prompting]
related: [fundamentals/embeddings, agents/tool-use, agents/memory]
last_reviewed: 2026-10-04
---

## Overview

RAG answers a question by first retrieving relevant information from an external source
and then giving it to the model as context. It keeps answers current, grounded, and
citable without retraining the model, and lets you work with private data.

## Key concepts

- **Pipeline:** ingest (load, chunk, embed, index), retrieve (search for the query),
  augment (insert the results into the prompt), generate (answer with citations).
- **Retrieval methods:** vector search over [embeddings](embeddings.md), keyword (BM25),
  hybrid, plus metadata filters.
- **Reranking:** re-scores the top candidates with a stronger model.
- **Contextual retrieval:** adding a short description of each chunk's place in its
  document before embedding it, so chunks are less ambiguous.
- **Agentic RAG:** the model decides when and what to search using tools, can search
  several times, and refines queries. This is how most agents work today.
- **Long context as an alternative:** with 1M-token windows, small corpora can just be
  put in the prompt, ideally with prompt caching.
- **Citations:** some APIs (including Claude's) can return answers with exact quoted
  spans from the provided documents.

## How to use it

1. Corpus fits in context and changes rarely? Try putting it in the prompt with caching first.
2. Otherwise start with hybrid search and good chunking; add reranking if precision is low.
3. Evaluate retrieval separately from generation: did the right passages come back?
4. Ask the model to cite sources and to say when the context does not contain the answer.

## Current state

- **2026-10-04:** The trend is from fixed pipelines toward agentic retrieval, where the
  model calls search tools as needed, and toward long-context-plus-caching for small
  corpora.

## Open questions

- Reliable evaluation of retrieval quality on real, messy data.

## Sources

- [RAG paper (Lewis et al., 2020)](../../sources/2026/10/2026-10-04-rag-paper-lewis-2020.md)
- [Prompt caching docs](../../sources/2026/10/2026-10-04-claude-prompt-caching-docs.md)
