---
title: "Managed ingestion and SearchDocuments in Agent Retrieval"
url: https://developers.googleblog.com/from-files-to-cited-answers-in-one-api-call-managed-ingestion-and-searchdocuments-in-agent-retrieval/
archived:
type: article
author: Google (Yingxin Jiang, Kaz Sato)
date_published: 2026-11-24
date_added: 2026-11-25
tags: [google, rag, embeddings, multimodal]
topics: [fundamentals/rag]
---

## Summary

Google's Agent Retrieval (formerly Vector Search 2.0, part of Gemini Enterprise Agent
Platform) now offers managed ingestion and a single `SearchDocuments` call, in public
preview as of 2026-11-24. You point a data store at files in Cloud Storage; Google
parses, chunks, and embeds them with Gemini Embedding 2, and one search call returns
results with page ranges or video timestamps to cite.

## Key points

- **Inputs:** PDF, DOCX, PPTX, XLSX, and TXT documents, and MP4, MOV, WebM, MKV and
  other video, from Cloud Storage only (a `gs://` URI, a pattern, or a JSONL manifest).
- **Chunking:** 100 to 500 token chunks (default) or one segment per page; video in
  fixed 30-second windows, with audio off by default.
- **Search:** hybrid semantic and full-text search by default, metadata filters, and
  optional reranking with `semantic-ranker-fast@latest` (not for video stores).
- **Citations:** each hit carries the file URI plus `startPage`/`endPage`, or
  `startOffset`/`endOffset` for video.
- **Getting started:** REST API at `v1beta` on `vectorsearch.googleapis.com`; no Python
  SDK support yet. Grant `roles/vectorsearch.serviceAgent` so the service can read the
  bucket. Example notebooks are in `GoogleCloudPlatform/generative-ai` under
  `embeddings/agent-retrieval-*.ipynb`.
- **Limits (preview):** regions us-east4 and europe-west4 only; ingestion is free during
  the preview, but the backing collection is billed; billing for the new features starts
  at GA. Video imports took 20 to 45 minutes in Google's example, and deleting a data
  store needs flags or the collection is left behind.

## Why it matters

It is a managed "files to cited answers" RAG pipeline in one API, joining similar
offerings (OpenAI file search, Gemini File Search), with video search and page-level
citations as the distinguishing features.
