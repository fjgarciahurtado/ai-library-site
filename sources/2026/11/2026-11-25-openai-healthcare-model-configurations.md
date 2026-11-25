---
title: "OpenAI API: healthcare model configurations"
url: https://developers.openai.com/api/docs/pricing#healthcare-model-configurations
archived:
type: release
author: OpenAI
date_published: 2026-11-24
date_added: 2026-11-25
tags: [openai, llm, cost, tool-use]
topics: [models/gpt]
---

## Summary

According to the [API changelog](https://developers.openai.com/api/docs/changelog), on
2026-11-24 OpenAI released healthcare model configurations for the Responses API.
Each pairs a GPT-6 model with a harness tuned for clinical questions; when the model
uses web search it searches a dedicated index of medical sources. Prices, read from the
pricing page the same day, match the base models and are described as promotional
"at least through December 31, 2026". The same changelog day moved `chat-latest` to the
newest ChatGPT model.

## Key points

- **Model IDs:** `gpt-6.2-astra-healthcare`, `gpt-6.2-sol-healthcare`,
  `gpt-6-astra-healthcare`, `gpt-6.1-sol-healthcare` (Responses API only). The pages do
  not say how to select them; passing the ID as `model` is likely but not confirmed.
- **Prices (standard tier, short context, per 1M tokens input / cached / output):**
  6.2 Astra healthcare $8 / $0.40 / $40; 6.2 Sol healthcare $2 / $0.10 / $10; 6 Astra
  healthcare $10 / $1 / $50; 6.1 Sol healthcare $2 / $0.10 / $10. Long context costs
  about double on input. A fast tier costs twice the standard rate. There is no Batch or
  Flex pricing.
- No eligibility, BAA, or region rules are stated for these configurations.
- The pricing page also lists legal model configurations (for example
  `gpt-6.2-astra-law`); not read in detail.
- **`chat-latest`:** now points to the newest model in ChatGPT for paid plans; OpenAI
  recommends the GPT-6.2 family for production API use.

## Why it matters

Vertical "model plus harness" configurations at base-model prices are a new kind of API
product: the domain value is in the retrieval index and harness, not a separate model.
