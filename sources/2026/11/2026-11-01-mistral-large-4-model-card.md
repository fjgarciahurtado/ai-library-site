---
title: "Mistral Large 4 model card (Hugging Face)"
url: https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B
archived:
type: docs
author: Mistral AI
date_published: 2026-10-31
date_added: 2026-11-01
tags: [open-source, mistral, llm, multimodal]
topics: [models/open-weight]
---

## Summary

Mistral's Hugging Face model card for Mistral Large 4, which became publicly viewable
by 2026-11-01, keeping the promise of open weights "at the end of October". The card
describes a natively multimodal mixture-of-experts model with about 1T total parameters,
about 49B active per token (52B counting embeddings and output layers), and a 1M-token
context. The weights come under the Mistral Ecosystem Open-Weight License, a modified MIT
licence. The card gives no release date; `date_published` is an estimate (the repo was
private and returned 401 on 2026-10-29).

## Key points

- **Repos:** `mistralai/Mistral-Large-4-1T-A52B` (repo created 2026-09-30) and an NVFP4
  quantised checkpoint, `Mistral-Large-4-1T-A52B-NVFP4` (created 2026-10-15). The page is
  public with no gating notice and showed about 2,900 downloads in the last month on
  2026-11-01.
- **Licence:** commercial and non-commercial use are allowed, but offering the model as a
  service needs a separate commercial licence from Mistral. This is stricter than Large
  3's Apache 2.0.
- **Size:** about 1T total / 49B active (52B with embeddings and output layers); 1M
  context.
- **API:** also served as `mistral-large-4` on Mistral's API.

## Why it matters

Mistral kept its promise to release the weights of its largest model, but moved from
Apache 2.0 to a licence that, like GLM-5.3's, restricts model-as-a-service providers.
That supports the trend toward "open, except for competing API hosts" licences.
