---
title: "OpenAI API models and pricing: GPT-6 family"
url: https://developers.openai.com/api/docs/pricing
archived:
type: docs
author: OpenAI
date_published: 2026-10
date_added: 2026-10-06
tags: [openai, cost, tokens, caching]
topics: [models/gpt, practices/cost-and-caching, fundamentals/tokens-and-context]
---

## Summary

OpenAI's API pricing page and models page (https://developers.openai.com/api/docs/models),
read on 2026-10-06, give prices, context windows, and knowledge cutoffs for the GPT-6
family. All models have a 1.05M-token context window and 128K output. Inputs above 272K
tokens are charged at long-context rates.

## Key points

- Standard prices per 1M tokens (input / cached input / output), up to 272K input tokens:
  - GPT-6 Astra (`gpt-6-astra`): $10 / $1.00 / $50.
  - GPT-6.1 Sol (`gpt-6.1-sol`): $2 / $0.10 / $10.
  - GPT-6 Sol: $2 / $0.20 / $10.
  - GPT-6 Luna (`gpt-6-luna`): $0.10 / $0.01 / $0.50.
- Above 272K input tokens, input and cached input cost 2x and output costs 1.5x.
- Context window 1.05M tokens and max output 128K for Astra, 6.1 Sol, and Luna.
- Knowledge cutoff: Astra and 6.1 Sol 2026-04-30; Luna 2026-05-18.
- The models page lists GPT-6.1 Sol (not GPT-6 Sol) as the current Sol model. All three
  support function calling, web search, file search, and computer use.

## Why it matters

Gives a comparable, dated price table for OpenAI's current models. The long-context
surcharge means the 1M window costs more per token once a prompt passes 272K.
