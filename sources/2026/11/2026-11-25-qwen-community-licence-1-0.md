---
title: "Qwen Community License 1.0 (Qwen3.8-Flash-Next)"
url: https://huggingface.co/Qwen/Qwen3.8-Flash-Next/blob/main/LICENSE
archived:
type: docs
author: Alibaba Qwen team
date_published: 2026-08-26
date_added: 2026-11-25
tags: [open-source, other-provider, industry]
topics: [models/open-weight]
---

## Summary

The licence file of Qwen3.8-Flash-Next, titled "Qwen Community License 1.0"
("Copyright (c) 2026 Qwen", tagged `qwen-community-1.0` on Hugging Face). It is a short
permissive grant in the style of the MIT licence with two conditions added. The file
has no date of its own; the date above is the model's release. Other recent Qwen weights
checked on 2026-11-25 (Qwen3.5-397B-A17B, Qwen3.8-27B) are still Apache 2.0, and older
Qwen2.5 models use the separate "Qwen LICENSE AGREEMENT" (2024).

## Key points

- **Commercial use is allowed** under the grant (use, deploy, sell, fine-tune, create
  derivatives). The copyright and permission notice must be kept in all copies.
- **Condition 1, attribution for large users:** products with more than 100 million
  monthly active users or more than US$20 million monthly revenue must show the model
  name prominently in the user interface.
- **Condition 2, separate licence:** if you or an affiliate run a "Model as a Service"
  business (third-party access to inference or fine-tuning, for example via an API or
  hosted endpoint) or an "AI Work Assistant" business (products primarily for
  AI-assisted coding or office productivity), you need a separate licence from Qwen
  before any commercial use. Internal use that does not expose the model, its outputs,
  or its capabilities to third parties is excluded, and so is relaying requests to
  models hosted by others.
- Nothing addresses training other models on its outputs; there is no acceptable-use
  policy and no governing-law clause.
- Compared with the 2024 Qwen agreement (licence needed above 100M MAU), the new
  licence drops the general user threshold but targets API hosts and coding/office
  assistant products.

## Why it matters

It answers whether Qwen3.8-Flash-Next can be used commercially: yes for most internal
and product use, but not, without a separate deal, to host it as an API or build a
coding or office assistant product on it. That second carve-out is broader than the
model-as-a-service limits in Mistral Large 4 and GLM-5.3.
