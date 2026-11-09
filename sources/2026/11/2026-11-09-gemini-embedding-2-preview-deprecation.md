---
title: "Gemini API changelog: Gemini Embedding 2 Preview deprecated"
url: https://aistudio.google.com/docs/changelog#2026-11-06
archived:
type: release
author: Google
date_published: 2026-11-06
date_added: 2026-11-09
tags: [google, embeddings]
topics: [models/gemini, fundamentals/embeddings]
---

## Summary

The Gemini API changelog entry of 2026-11-06 deprecates `gemini-embedding-2-preview`.
From that day, requests to it are routed to the stable `gemini-embedding-2` and billed at
its rates. The changelog now lives at aistudio.google.com; the old ai.google.dev address
redirects there.

## Key points

- Change the model string to `gemini-embedding-2`. Google says it "uses the same API
  schema, pricing, and embedding space", so you need no other code changes and no
  re-indexing of stored vectors.
- Requests to the preview name still work but are silently served by the stable model.

## Why it matters

Usually a new embedding model means re-embedding everything. Here Google promises the
stable model keeps the preview's vector space, so existing indexes stay valid.
