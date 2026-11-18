---
title: "GPT-6.2 Astra and Sol (OpenAI API model pages), background completion windows"
url: https://developers.openai.com/api/docs/models/gpt-6.2-astra
archived:
type: release
author: OpenAI
date_published: 2026-11-17
date_added: 2026-11-18
tags: [openai, llm, coding-agents, cost, reasoning]
topics: [models/gpt, practices/cost-and-caching]
---

## Summary

OpenAI released GPT-6.2 Astra (`gpt-6.2-astra`, demanding reasoning and coding) and
GPT-6.2 Sol (`gpt-6.2-sol`, everyday coding and agent work) on 2026-11-17, in ChatGPT,
Codex, the API, and GitHub Copilot. The same day it added background completion windows
to the Responses API (public beta). The announcement post returned 403, so details come
from the Astra model page (this note's URL), the
[Sol model page](https://developers.openai.com/api/docs/models/gpt-6.2-sol), and the
[API changelog](https://developers.openai.com/api/docs/changelog) entries of 2026-11-17
(all read 2026-11-18). Pricing matches Simon Willison's write-up.

## Key points

- **Prices per 1M tokens (standard, ≤272K input):** Astra $8 input / $0.40 cached / $40
  output (20% below GPT-6 Astra's $10 / $50; cached down from $1). Sol $2 / $0.10 / $10,
  unchanged from GPT-6.1 Sol. Above 272K input, input and cache rates double and output
  costs 1.5x for the whole request.
- **Limits:** both 1.05M context, 922K max input, 128K output. Knowledge cutoff: Astra
  2026-05-18, Sol 2026-06-01. Reasoning effort `none` is rejected.
- **Astra cache writes:** $10 (30-minute) or $20 (12-hour). Batch 50% off; fast mode 2x;
  Ultrafast 3x until 2027-02-28, then 6x.
- **Endpoints:** Responses, Chat Completions, Batch; tool calling needs Responses. Tools
  include hosted shell, apply patch, skills, computer use, MCP, and tool search.
- **Behaviour changes:** the Responses API changes how reasoning is kept when you edit a
  conversation prefix and how top-level `instructions` are handled; OpenAI publishes a
  migration guide.
- **Background completion windows (beta):** choose a 2-hour or 8-hour window for 30% or
  40% off standard token rates, on `gpt-6.2-astra`, `gpt-6.2-sol`, `gpt-6.1-terra`, and
  `gpt-6-luna`.
- No benchmark figures were readable; Simon Willison notes Astra 6.2 scores below Claude
  Fable 5.2 on several benchmarks, without numbers.

## Why it matters

Astra gets cheaper and Sol gets newer knowledge at the same price. Background windows
add a middle option between real-time and Batch for agent jobs that can wait hours.
