---
title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
url: https://arxiv.org/abs/2005.11401
archived:
type: paper
author: Lewis et al. (Facebook AI Research)
date_published: 2020-05-22
date_added: 2026-10-04
tags: [rag, embeddings, research]
topics: [fundamentals/rag]
---

## Summary

Names and formalises retrieval-augmented generation: a generator model conditioned on
passages fetched from an external index by a learned retriever. It beat purely
parametric models on open-domain question answering and produced more factual text.

## Key points

- Splits knowledge into parametric (model weights) and non-parametric (a document index).
- The index can be updated without retraining the model.
- Retrieved passages give a natural way to show provenance.

## Why it matters

Origin of the term "RAG" and of the design used, in simplified form, by most
document-grounded LLM applications.
