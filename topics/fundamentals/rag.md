---
title: "Retrieval-augmented generation (RAG)"
tags: [rag, embeddings, prompting]
related: [fundamentals/embeddings, agents/tool-use, agents/memory]
last_reviewed: 2026-11-08
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
- **Long context as an alternative:** with 1M-token windows (all current Claude models,
  GPT-6, and Gemini 4 Argon as of 2026-11-08), small corpora can just be put in the
  prompt, ideally with prompt caching. Watch the price tiers: GPT-6 input above 272K
  tokens costs 2x, Gemini Pro models charge more above 200K, and Claude Haiku 5.5 costs
  5x above 100K (see [cost and caching](../practices/cost-and-caching.md)).
- **Citations:** some APIs (including Claude's) can return answers with exact quoted
  spans from the provided documents. On Claude API version `2026-10-21`, `citations` on
  `user` text and `document` blocks in `assistant` messages return 400, so put source
  documents in `document` blocks in the user turn. Frameworks are normalising citations
  across providers: Pydantic AI 2.61 (2026-10-23) returns structured citations on
  `TextPart` for Bedrock, OpenRouter, and xAI.
- **Retrieval for coding agents:** instead of embedding a codebase, coding agents
  usually search it with tools (grep, glob, file reads) or query a local code graph
  over MCP, such as codebase-memory-mcp (see [memory](../agents/memory.md)). Context
  Mode indexes fetched web pages for full-text search, so the agent retrieves only the
  relevant parts.

## How to use it

1. Corpus fits in context and changes rarely? Try putting it in the prompt with caching first.
2. Otherwise start with hybrid search and good chunking; add reranking if precision is low.
3. Evaluate retrieval separately from generation: did the right passages come back?
4. Ask the model to cite sources and to say when the context does not contain the answer.

## Current state

- **2026-11-08:** The trend is still from fixed pipelines toward agentic retrieval, where
  the model calls search tools as needed, and toward long-context-plus-caching for small
  corpora. Longer cache lifetimes (OpenAI's 12-hour cache since 2026-10-20) make the
  long-context route cheaper for documents queried across a day.

## Open questions

- Reliable evaluation of retrieval quality on real, messy data.

## Sources

- [RAG paper (Lewis et al., 2020)](../../sources/2026/10/2026-10-04-rag-paper-lewis-2020.md)
- [Prompt caching docs](../../sources/2026/10/2026-10-04-claude-prompt-caching-docs.md)
- [Migrating to API version 2026-10-21](../../sources/2026/10/2026-10-22-claude-api-version-2026-10-21.md)
- [Prompt caching: 12-hour lifetime (OpenAI API docs)](../../sources/2026/10/2026-10-21-openai-12-hour-prompt-caching.md)
- [Pydantic AI v2.61.0](../../sources/2026/10/2026-10-26-pydantic-ai-v2-61.md)
- [Context Mode](../../sources/2026/10/2026-10-26-context-mode-tool-output-sandbox.md)
- [codebase-memory-mcp](../../sources/2026/10/2026-10-30-codebase-memory-mcp-code-graph.md)
